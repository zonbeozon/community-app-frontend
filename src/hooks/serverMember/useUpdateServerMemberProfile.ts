import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

// 1. 존재하지 않는 UpdateProfilePayload 임포트 구문을 제거합니다.
import { updateServerMemberProfile } from '@/apis/http/serverMember.api'; 
import { QUERY_KEYS } from '@/constants/queryKeys';
import { SUCCESS_MESSAGES, SERVER_ERROR_MESSAGES } from "@/constants/message";

const useUpdateServerMemberProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // 2. mutationFn의 인자 타입으로 { imageId: number }를 직접 명시합니다.
    mutationFn: (payload: { imageId: number }) => updateServerMemberProfile(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.serverMember.me() });
      toast.success(SUCCESS_MESSAGES.SERVERMEMBER_UPDATE_SUCCESS);
    },

    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          SERVER_ERROR_MESSAGES.SERVERMEMBER_UPDATE_FAILED
      );
    },
  });
};

export default useUpdateServerMemberProfile;