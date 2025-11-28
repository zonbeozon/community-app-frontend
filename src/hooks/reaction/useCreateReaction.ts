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
      const listQueryKey = QUERY_KEYS.posts.list(channelId); 
      const detailQueryKey = QUERY_KEYS.posts.detail(postId);

      await queryClient.cancelQueries({ queryKey: listQueryKey });
      await queryClient.cancelQueries({ queryKey: detailQueryKey });

      const previousListData = queryClient.getQueryData<InfinitePostsData>(listQueryKey);
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
        } else { 
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
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.posts.list(channelId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.posts.detail(postId) });
    },
  });
};

export default useCreateReaction;