import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updateServerMemberUserName } from '@/apis/http/serverMember.api';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { SUCCESS_MESSAGES, SERVER_ERROR_MESSAGES } from "@/constants/messages";

const useUpdateServerMemberUsername = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // 1. 실제 비동기 작업을 수행할 함수를 지정합니다.
    // API가 { username: string } 형태의 객체를 받는다고 가정합니다.
    mutationFn: (payload: { username: string }) => updateServerMemberUserName(payload),

    // 2. 작업이 성공했을 때 실행될 콜백입니다.
    onSuccess: () => {
      // (핵심) 현재 유저의 서버 정보(username)가 변경되었으므로, 관련 쿼리를 무효화합니다.
      // 이렇게 하면 useGetMyServerMember 훅이 자동으로 최신 유저 정보를 다시 가져옵니다.
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.serverMember.me() });
      
      toast.success(SUCCESS_MESSAGES.SERVERMEMBER_UPDATE_SUCCESS);
    },

    // 3. 작업이 실패했을 때 실행될 콜백 (에러 처리)
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          SERVER_ERROR_MESSAGES.SERVERMEMBER_UPDATE_FAILED
      );
    },
  });
};

export default useUpdateServerMemberUsername;