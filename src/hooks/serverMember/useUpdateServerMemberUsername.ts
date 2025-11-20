import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { updateServerMemberUserName } from '@/apis/http/serverMember.api';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { SUCCESS_MESSAGES, SERVER_ERROR_MESSAGES } from '@/constants/messages';

const useUpdateServerMemberUsername = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { username: string }) => updateServerMemberUserName(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.serverMember.me() });
      
      toast.success(SUCCESS_MESSAGES.SERVERMEMBER_NAME_UPDATE_SUCCESS);
    },

    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          SERVER_ERROR_MESSAGES.SERVERMEMBER_NAME_UPDATE_FAILED
      );
    },
  });
};

export default useUpdateServerMemberUsername;