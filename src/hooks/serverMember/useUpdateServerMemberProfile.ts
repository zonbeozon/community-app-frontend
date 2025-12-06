import { updateServerMemberProfile } from '@/apis/http/serverMember.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { SERVER_ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/constants/messages';
import { QUERY_KEYS } from '@/constants/queryKeys';

export const useUpdateServerMemberProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { imageId: number }) => updateServerMemberProfile(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.serverMember.me() });
      toast.success(SUCCESS_MESSAGES.SERVERMEMBER_PROFILE_UPDATE_SUCCESS);
    },

    onError: (error: any) => {
      toast.error(error.response?.data?.message || SERVER_ERROR_MESSAGES.SERVERMEMBER_PROFILE_UPDATE_FAILED);
    },
  });
};
