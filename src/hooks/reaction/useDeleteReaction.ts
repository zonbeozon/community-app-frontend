import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { deleteReaction } from '@/apis/http/reaction.api';
import { ReactionType } from '@/types/reaction.type';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { SERVER_ERROR_MESSAGES } from '@/constants/messages';
import { Post } from '@/types/post.type';
import { InfiniteData } from '@tanstack/react-query';

interface DeleteReactionVariables {
  postId: number;
  channelId: number;
  reactionType: ReactionType;
}

type InfinitePostsData = InfiniteData<{ posts: Post[], nextCursor: number | null }>;

const useDeleteReaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId }: DeleteReactionVariables) =>
      deleteReaction(postId),

    onMutate: async ({ postId, channelId, reactionType }) => {
      // 필터 객체({})를 제외하여 다른 훅과 Query Key를 일치시킵니다.
      const listQueryKey = QUERY_KEYS.posts.list(channelId);
      const detailQueryKey = QUERY_KEYS.posts.detail(postId);

      await queryClient.cancelQueries({ queryKey: listQueryKey });
      await queryClient.cancelQueries({ queryKey: detailQueryKey });

      const previousListData = queryClient.getQueryData<InfinitePostsData>(listQueryKey);
      const previousDetailData = queryClient.getQueryData<Post>(detailQueryKey);

      const updatePostLogic = (post: Post): Post => {
        if (post.postId !== postId) return post;

        const newPost = { ...post, metric: { ...post.metric } };

        if (reactionType === 'LIKE') {
          newPost.isLikedByRequester = false;
          // 음수가 되지 않도록 방지
          newPost.metric.likeCount = Math.max(0, newPost.metric.likeCount - 1);
        } else { // DISLIKE
          newPost.isDislikedByRequester = false;
          // 음수가 되지 않도록 방지
          newPost.metric.dislikeCount = Math.max(0, newPost.metric.dislikeCount - 1);
        }
        return newPost;
      };

      // 목록 캐시 업데이트
      queryClient.setQueryData<InfinitePostsData | undefined>(listQueryKey, (oldData) => {
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
        error.response?.data?.message || SERVER_ERROR_MESSAGES.REACTION_DELETE_FAILED // 적절한 메시지로 변경
      );
      if (context?.previousListData) {
        queryClient.setQueryData(QUERY_KEYS.posts.list(variables.channelId), context.previousListData);
      }
      if (context?.previousDetailData) {
        queryClient.setQueryData(QUERY_KEYS.posts.detail(variables.postId), context.previousDetailData);
      }
    },

    onSettled: (_data, _error, { postId, channelId }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.posts.list(channelId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.posts.detail(postId) });
    },
  });
};

export default useDeleteReaction;