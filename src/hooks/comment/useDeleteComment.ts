import { deleteComment } from '@/apis/http/comment.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { SERVER_ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/constants/messages';
import { QUERY_KEYS } from '@/constants/queryKeys';

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId }: { postId: number, commentId: number }) => deleteComment(commentId),

    onSuccess: (_data, { postId }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.comments.list(postId, {}) });

      toast.success(SUCCESS_MESSAGES.COMMENT_DELETE_SUCCESS);
    },

    onError: (error: any) => {
      toast.error(error.response?.data?.message || SERVER_ERROR_MESSAGES.COMMENT_DELETE_FAILED);
    },
  });
};
