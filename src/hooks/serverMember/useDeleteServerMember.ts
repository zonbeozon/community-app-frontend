import { deleteServerMember } from '@/apis/http/serverMember.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useSignOut } from '@/hooks/auth/useSignOut';
import { SERVER_ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/constants/messages';

export const useDeleteServerMember = () => {
  const queryClient = useQueryClient();
  const { mutate: signOut } = useSignOut();

  return useMutation({
    mutationFn: deleteServerMember,

    onSuccess: () => {
      toast.success(SUCCESS_MESSAGES.SERVERMEMBER_DELETE_SUCCESS);
      signOut();
      queryClient.clear();
    },

    onError: (error: any) => {
      toast.error(error.response?.data?.message || SERVER_ERROR_MESSAGES.SERVERMEMBER_DELETE_FAILED);
    },
  });
};
