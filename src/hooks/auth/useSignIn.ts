import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { toast } from 'sonner';
import { accessTokenAtom, serverMemberAtom } from '@/atoms/authAtoms';
import { getServerMemberById } from '@/apis/http/serverMember.api';
import { decodeToken } from '@/utils/decodeToken';
import { SERVER_ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/constants/message";
import { ROUTE_PATH } from '@/constants/routePath';

const useSignIn = () => {
  const navigate = useNavigate();
  const setAccessToken = useSetAtom(accessTokenAtom);
  const setServerMember = useSetAtom(serverMemberAtom);

  return useMutation({
    mutationFn: async (token: string) => {
      if (!token) {
        throw new Error("토큰이 제공되지 않았습니다.");
      }
      
      const userId = decodeToken(token);
      if (!userId) {
        throw new Error("토큰에서 사용자 ID를 추출할 수 없습니다.");
      }

      const user = await getServerMemberById(userId);
      if (!user) {
        throw new Error("사용자 정보를 불러올 수 없습니다.");
      }

      return { user, token };
    },

    onSuccess: (data) => {
      const { user, token } = data;

      setAccessToken(token);
      setServerMember(user);
      
      toast.success(SUCCESS_MESSAGES.SIGNIN_SUCCESS);
      navigate(ROUTE_PATH.main, { replace: true });
    },
    
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : SERVER_ERROR_MESSAGES.AUTHENTICATION_FAILED);
      navigate(ROUTE_PATH.error);
    },
  });
};

export default useSignIn;