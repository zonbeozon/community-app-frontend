import { queryClient } from '@/lib/queryClient';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { CommentCountEvent } from "@/types/stompEvent.type";
import { Post } from '@/types/post.type';

export const handleCommentCountEvent = (event: CommentCountEvent) => {
  const { postId, commentCount } = event;

  const postDetailQueryKey = QUERY_KEYS.posts.detail(postId);
  queryClient.setQueryData<Post>(postDetailQueryKey, (oldData) => {
    if (!oldData) return;
    return {
      ...oldData,
      commentCount: commentCount,
    };
  });

  queryClient.invalidateQueries({ queryKey: QUERY_KEYS.posts.lists() });
};