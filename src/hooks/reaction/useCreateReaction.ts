import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createReaction } from '@/apis/http/reaction.api';
import { ReactionType } from '@/types/reaction.type';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { SERVER_ERROR_MESSAGES } from '@/constants/messages';
import { Post } from '@/types/post.type';
import { InfiniteData } from '@tanstack/react-query';

interface CreateReactionVariables {
  postId: number;
  channelId: number;
  reactionType: ReactionType;
}

type InfinitePostsData = InfiniteData<{ posts: Post[]; nextCursor: number | null }>;

const useCreateReaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, reactionType }: CreateReactionVariables) =>
      createReaction(postId, reactionType),

    onMutate: async ({ postId, channelId, reactionType }) => {
      // 더 유연한 매칭을 위해 필터({}) 객체를 제외한 부분 키를 사용합니다.
      const listQueryKey = QUERY_KEYS.posts.list(channelId); 
      const detailQueryKey = QUERY_KEYS.posts.detail(postId);

      console.log(`[Reaction] Optimistic Update 시작. PostID: ${postId}, Type: ${reactionType}`);
      console.log(`[Reaction] 업데이트할 목록 키:`, listQueryKey);

      await queryClient.cancelQueries({ queryKey: listQueryKey });
      await queryClient.cancelQueries({ queryKey: detailQueryKey });

      const previousListData = queryClient.getQueryData<InfinitePostsData>(listQueryKey);

      if (!previousListData) {
        console.error("[Reaction] 치명적 오류: 목록 캐시 데이터를 찾을 수 없습니다. Query Key가 일치하지 않습니다.");
        // 여기서 return 하면 롤백할 데이터가 없으므로 onSettled에서 invalidate만 실행됩니다.
        return; 
      }
      
      console.log("[Reaction] 기존 목록 캐시 데이터를 찾았습니다.", previousListData);
      const previousDetailData = queryClient.getQueryData<Post>(detailQueryKey);

      const updatePostLogic = (post: Post): Post => {
        if (post.postId !== postId) return post;

        const newPost = { ...post, metric: { ...post.metric } };
        const wasLiked = newPost.isLikedByRequester;
        const wasDisliked = newPost.isDislikedByRequester;

        if (reactionType === 'LIKE') {
          if (wasLiked) {
            newPost.isLikedByRequester = false;
            newPost.metric.likeCount -= 1;
          } else {
            newPost.isLikedByRequester = true;
            newPost.metric.likeCount += 1;
            if (wasDisliked) {
              newPost.isDislikedByRequester = false;
              newPost.metric.dislikeCount -= 1;
            }
          }
        } else { // DISLIKE
          if (wasDisliked) {
            newPost.isDislikedByRequester = false;
            newPost.metric.dislikeCount -= 1;
          } else {
            newPost.isDislikedByRequester = true;
            newPost.metric.dislikeCount += 1;
            if (wasLiked) {
              newPost.isLikedByRequester = false;
              newPost.metric.likeCount -= 1;
            }
          }
        }
        console.log(`[Reaction] PostID: ${postId}의 상태가 업데이트되었습니다.`, newPost);
        return newPost;
      };

      // 목록 캐시 업데이트
      queryClient.setQueryData<InfinitePostsData>(listQueryKey, (oldData) => {
        if (!oldData) return undefined;
        return {
          ...oldData,
          pages: oldData.pages.map(page => ({
            ...page,
            posts: page.posts.map(updatePostLogic),
          })),
        };
      });

      // 상세 페이지 캐시가 존재하면 함께 업데이트
      if (previousDetailData) {
        queryClient.setQueryData<Post>(detailQueryKey, updatePostLogic);
      }

      return { previousListData, previousDetailData };
    },

    onError: (error: any, variables, context) => {
      toast.error(
        error.response?.data?.message || SERVER_ERROR_MESSAGES.REACTION_CREATE_FAILED
      );
      if (context?.previousListData) {
        queryClient.setQueryData(QUERY_KEYS.posts.list(variables.channelId), context.previousListData);
      }
      if (context?.previousDetailData) {
        queryClient.setQueryData(QUERY_KEYS.posts.detail(variables.postId), context.previousDetailData);
      }
    },

    onSettled: (_data, _error, { postId, channelId }) => {
      // 서버와 데이터 최종 동기화
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.posts.list(channelId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.posts.detail(postId) });
    },
  });
};

export default useCreateReaction;