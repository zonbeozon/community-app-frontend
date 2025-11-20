import { queryClient } from '@/lib/queryClient';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { Post } from '@/types/post.type';

interface CommentCountPayload {
  postId: number;
  commentCount: number;
}

export const handleCommentCountEvent = (payload: CommentCountPayload) => {
  const { postId, commentCount } = payload;

  const postDetailQueryKey = QUERY_KEYS.posts.detail(postId);
  const postListQueryKey = QUERY_KEYS.posts.lists();

  queryClient.setQueryData<Post>(postDetailQueryKey, (oldData) => {
    if (!oldData) {
      return undefined;
    }
    return {
      ...oldData,
      metric: {
        ...oldData.metric,
        commentCount,
      },
    };
  });

  queryClient.invalidateQueries({ queryKey: postListQueryKey });
};