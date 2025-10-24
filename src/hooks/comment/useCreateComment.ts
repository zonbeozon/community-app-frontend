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
  const myInfo = useAtomValue(serverMemberAtom); // 1. Zustand 대신 Jotai atom 사용

  return useMutation({
    // 2. 실제 비동기 작업을 수행할 함수를 지정합니다.
    mutationFn: ({ postId, content }: CreateCommentVariables) => 
      createComment(postId, content),
    
    // 3. (선택 사항) Mutation 실행 전, 클라이언트 측 유효성 검사를 수행합니다.
    onMutate: async () => {
      if (!myInfo) {
        // toast를 여기서 띄우고, 에러를 발생시켜 mutation을 중단시킵니다.
        toast.error("로그인 정보가 없어 댓글을 작성할 수 없습니다.");
        throw new Error("Not logged in"); 
      }
    },

    // 4. 작업이 성공했을 때 실행될 콜백입니다.
    onSuccess: (_data, { postId }) => {
      // (핵심) 댓글이 생성되었으므로, 해당 게시물의 댓글 목록 쿼리를 무효화합니다.
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.comments.list(postId, {}) });
      
      toast.success(SUCCESS_MESSAGES.COMMENT_CREATE_SUCCESS);
    },

    // 5. 작업이 실패했을 때 실행될 콜백 (에러 처리)
    onError: (error: any) => {
      // onMutate에서 던진 에러는 여기서 잡히지만, 별도 처리 없이 무시할 수 있습니다.
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