import { queryClient } from '@/lib/queryClient';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { CommentsResponse, Comment } from '@/types/comment.type';
import { ChannelMember } from '@/types/channelMember.type';

interface CommentPayload {
  type: "CREATED" | "DELETED";
  commentId: number;
  content?: string;
  author?: ChannelMember;
  createdAt?: string;
  authorId?: number;
}

export const handleChatEvent = (postId: number, payload: CommentPayload) => {
  if (!payload || !payload.type) {
    return;
  }

  const commentsQueryKey = QUERY_KEYS.comments.list(postId, {});
  const postDetailQueryKey = QUERY_KEYS.posts.detail(postId);
  const { type } = payload;

  switch (type) {
    case "CREATED": {
      const { author, ...commentData } = payload;
      if (!author) {
        return;
      }
      const authorInfo = author as ChannelMember;

      const newComment: Comment = {
        commentId: commentData.commentId,
        content: commentData.content || '',
        createdAt: commentData.createdAt || '',
        authorId: authorInfo.memberId,
      };

      queryClient.setQueryData<CommentsResponse>(commentsQueryKey, (oldData) => {
        if (!oldData) {
          return {
            comments: [newComment],
            authors: [authorInfo],
            totalElements: 1,
          };
        }

        const authorExists = oldData.authors.some(
          (existingAuthor) => existingAuthor.memberId === authorInfo.memberId
        );

        return {
          ...oldData,
          comments: [newComment, ...oldData.comments],
          authors: authorExists
            ? oldData.authors
            : [...oldData.authors, authorInfo],
          totalElements: oldData.totalElements + 1,
        };
      });

      queryClient.invalidateQueries({ queryKey: postDetailQueryKey });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.posts.lists() });
      break;
    }

    case "DELETED": {
      const { commentId } = payload;
      queryClient.setQueryData<CommentsResponse>(commentsQueryKey, (oldData) => {
        if (!oldData) {
          return undefined;
        }

        return {
          ...oldData,
          comments: oldData.comments.filter(comment => comment.commentId !== commentId),
          totalElements: Math.max(0, oldData.totalElements - 1),
        };
      });

      queryClient.invalidateQueries({ queryKey: postDetailQueryKey });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.posts.lists() });
      break;
    }
  }
};