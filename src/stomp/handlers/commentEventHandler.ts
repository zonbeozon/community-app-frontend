import { queryClient } from '@/lib/queryClient';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { CommentsResponse, Comment } from '@/types/comment.type';
import { ChannelMember } from '@/types/channelMember.type';
import { CommentEvent } from "@/types/stompEvent.type";

export const handleCommentEvent = (postId: number, eventBody: CommentEvent) => {
  if (!eventBody || !eventBody.body) return;

  const commentsQueryKey = QUERY_KEYS.comments.list(postId, {});
  const { type, body } = eventBody;

  switch (type) {
    case "CREATED": {
      const { author, ...commentData } = body;
      const authorInfo = author as ChannelMember;

      const newComment: Comment = {
        ...commentData,
        authorId: authorInfo.memberId,
      };

      queryClient.setQueryData<CommentsResponse>(commentsQueryKey, (oldData) => {
        if (!oldData) {
          return {
            comments: [newComment],
            authors: { [authorInfo.memberId]: authorInfo },
            totalElements: 1,
          };
        }
        
        return {
          ...oldData,
          comments: [...oldData.comments, newComment],
          authors: {
            ...oldData.authors,
            [authorInfo.memberId]: authorInfo,
          },
          totalElements: oldData.totalElements + 1,
        };
      });
      break;
    }
      
    case "DELETED": {
      const { commentId } = body;
      queryClient.setQueryData<CommentsResponse>(commentsQueryKey, (oldData) => {
        if (!oldData) return;

        return {
          ...oldData,
          comments: oldData.comments.filter(comment => comment.commentId !== commentId),
          totalElements: oldData.totalElements - 1,
        };
      });
      break;
    }
  }
};