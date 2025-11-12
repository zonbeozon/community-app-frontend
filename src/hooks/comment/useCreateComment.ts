import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createComment } from '@/apis/http/comment.api';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { SUCCESS_MESSAGES, SERVER_ERROR_MESSAGES } from "@/constants/messages";
import { useAtomValue } from 'jotai';
import { serverMemberAtom } from '@/atoms/authAtoms';

interface CreateCommentVariables {
  postId: number;
  content: string;
}

const useCreateComment = () => {
  const queryClient = useQueryClient();
  const myInfo = useAtomValue(serverMemberAtom); 

  return useMutation({
    mutationFn: ({ postId, content }: CreateCommentVariables) => 
      createComment(postId, content),
    
    onMutate: async () => {
      if (!myInfo) {
        toast.error("로그인 정보가 없어 댓글을 작성할 수 없습니다.");
        throw new Error("Not logged in"); 
      }
    },

    onSuccess: (_data, { postId }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.comments.list(postId, {}) });
      
      toast.success(SUCCESS_MESSAGES.COMMENT_CREATE_SUCCESS);
    },

    onError: (error: any) => {
      if (error.message === "Not logged in") {
        return;
      }
      
      toast.error(
        error.response?.data?.message ||
          SERVER_ERROR_MESSAGES.COMMENT_CREATE_FAILED
      );
    },
  });
};

export default useCreateComment;