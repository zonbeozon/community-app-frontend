import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { updateServerMemberProfile } from '@/apis/http/serverMember.api'; 
import { QUERY_KEYS } from '@/constants/queryKeys';
import { SUCCESS_MESSAGES, SERVER_ERROR_MESSAGES } from "@/constants/messages";

const useUpdateServerMemberProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { imageId: number }) => updateServerMemberProfile(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.serverMember.me() });
      toast.success(SUCCESS_MESSAGES.SERVERMEMBER_PROFILE_UPDATE_SUCCESS);
    },

    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          SERVER_ERROR_MESSAGES.SERVERMEMBER_PROFILE_UPDATE_FAILED
      );
    },
  });
};

export default useUpdateServerMemberProfile;