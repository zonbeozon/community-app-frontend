import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { toast } from 'sonner';
import { accessTokenAtom, serverMemberAtom } from '@/atoms/authAtoms';
import { SUCCESS_MESSAGES, SERVER_ERROR_MESSAGES } from "@/constants/messages";
import { ROUTE_PATH } from '@/constants/routePaths';
import { ServerMember } from '@/types/serverMember.type';
import { getServerMemberById } from '@/apis/http/serverMember.api';
import { decodeToken } from '@/utils/decodeToken';

const useSignIn = () => {
  const navigate = useNavigate();
  const setAccessToken = useSetAtom(accessTokenAtom);
  const setServerMember = useSetAtom(serverMemberAtom);

  return useMutation<{ user: ServerMember; token: string }, Error, string>({
    mutationFn: async (token: string) => {
      const userId = decodeToken(token);

      if (!userId) {
        throw new Error(SERVER_ERROR_MESSAGES.TOKEN_INVALID);
      }

      const userInfo = await getServerMemberById(userId, token);

      if (!userInfo || !userInfo.memberId) {
        throw new Error(SERVER_ERROR_MESSAGES.USER_INVALID);
      }
      
      return { user: userInfo, token };
    },
    onSuccess: (data) => {
      const { user, token } = data;

      setAccessToken(token);
      setServerMember(user);
      
      toast.success(SUCCESS_MESSAGES.SIGNIN_SUCCESS);
      navigate(ROUTE_PATH.main, { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
      navigate(ROUTE_PATH.root);
    },
  });
};

export default useSignIn;