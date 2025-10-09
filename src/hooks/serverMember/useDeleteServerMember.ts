import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteServerMember } from '@/apis/http/serverMember.api';
import useSignOut from '../auth/useSignOut';
import { SUCCESS_MESSAGES, SERVER_ERROR_MESSAGES } from "@/constants/message";

const useDeleteServerMember = () => {
  const queryClient = useQueryClient();
  // 2. useSignOut 훅을 호출하여 로그아웃 mutate 함수를 가져옵니다.
  const { mutate: signOut } = useSignOut();

  return useMutation({
    // 3. 주된 비동기 작업: 회원 탈퇴 API 호출
    mutationFn: deleteServerMember,

    // 4. 회원 탈퇴가 성공했을 때 실행될 콜백
    onSuccess: () => {
      toast.success(SUCCESS_MESSAGES.SERVERMEMBER_DELETE_SUCCESS);

      // (핵심) 회원 탈퇴 후 로그아웃을 실행합니다.
      signOut();

      // 참고: signOut 훅 내부에서도 캐시를 클리어하겠지만,
      // 여기서 한 번 더 명시적으로 클리어하여 모든 데이터를 즉시 제거하는 것이 안전합니다.
      queryClient.clear();
    },

    // 5. 회원 탈퇴가 실패했을 때 실행될 콜백 (에러 처리)
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          SERVER_ERROR_MESSAGES.SERVERMEMBER_DELETE_FAILED
      );
    },
  });
};

export default useDeleteServerMember;