import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteComment } from '@/apis/http/comment.api';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { SUCCESS_MESSAGES, SERVER_ERROR_MESSAGES } from "@/constants/messages";

interface DeleteCommentVariables {
  postId: number;
  commentId: number;
}

const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId }: DeleteCommentVariables) => deleteComment(commentId),

    onSuccess: (_data, { postId }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.comments.list(postId, {}) });
      
      toast.success(SUCCESS_MESSAGES.COMMENT_DELETE_SUCCESS);
    },

    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          SERVER_ERROR_MESSAGES.COMMENT_DELETE_FAILED
      );
    },
  });
};

export default useDeleteComment;