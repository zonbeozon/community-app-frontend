import { useNavigate } from 'react-router-dom';
import { signOut } from '@/apis/http/auth.api';
import { accessTokenAtom, serverMemberAtom } from '@/atoms/authAtoms';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { toast } from 'sonner';
import { CLIENT_ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/constants/messages';
import { ROUTE_PATH } from '@/constants/routePaths';

export const useSignOut = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const setAccessToken = useSetAtom(accessTokenAtom);
  const setServerMember = useSetAtom(serverMemberAtom);

  return useMutation({
    mutationFn: signOut,

    onSuccess: () => {
      setAccessToken(null);
      setServerMember(null);

      queryClient.clear();

      navigate(ROUTE_PATH.root);
      toast.success(SUCCESS_MESSAGES.SIGNOUT_SUCCESS);
    },

    onError: (error: any) => {
      toast.error(error.response?.data?.message || CLIENT_ERROR_MESSAGES.SIGNOUT_FAIL);
    },
  });
};
