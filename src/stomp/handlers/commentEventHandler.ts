import { queryClient } from '@/lib/queryClient';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { CommentsResponse, Comment } from '@/types/comment.type';
import { Author } from '@/types/post.type';
import { CommentEventBody, CommentCreatedEvent, CommentDeletedEvent } from "@/types/stompEvent.type";

export const handleCommentEvent = (postId: number, eventBody: CommentEventBody) => {
  if (!eventBody) return;

  const commentsQueryKey = QUERY_KEYS.comments.list(postId, {});
  const { type } = eventBody;

  switch (type) {
    case "CREATED": {
      const { author, ...commentData } = eventBody as CommentCreatedEvent;
      const newComment: Comment = {
        ...commentData,
        authorId: author.memberId,
      };

      queryClient.setQueryData<CommentsResponse>(commentsQueryKey, (oldData) => {
        if (!oldData) {
          return { comments: [newComment], authors: { [author.memberId]: author } };
        }
        return {
          ...oldData,
          comments: [...oldData.comments, newComment],
          authors: {
            ...oldData.authors,
            [author.memberId]: author,
          },
        };
      });
      break;
    }
      
    case "DELETED": {
      const { commentId } = eventBody as CommentDeletedEvent;
      queryClient.setQueryData<CommentsResponse>(commentsQueryKey, (oldData) => {
        if (!oldData) return;
        return {
          ...oldData,
          comments: oldData.comments.filter(comment => comment.commentId !== commentId),
        };
      });
      break;
    }
  }
};