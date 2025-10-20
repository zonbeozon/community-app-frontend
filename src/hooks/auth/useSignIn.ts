import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { toast } from 'sonner';
import { jwtDecode } from 'jwt-decode';
import { accessTokenAtom, serverMemberAtom } from '@/atoms/authAtoms';
import { SUCCESS_MESSAGES } from "@/constants/message";
import { ROUTE_PATH } from '@/constants/routePath';
import { ServerMember } from '@/types/serverMember.type';
import { getServerMemberById } from '@/apis/http/serverMember.api';

interface JwtPayload {
  sub: string;
  role: string;
  iat: number;
  exp: number;
}

const useSignIn = () => {
  const navigate = useNavigate();
  const setAccessToken = useSetAtom(accessTokenAtom);
  const setServerMember = useSetAtom(serverMemberAtom);

  return useMutation<{ user: ServerMember; token: string; }, Error, string>({
    mutationFn: async (token: string) => {
      if (!token) {
        throw new Error("토큰이 제공되지 않았습니다.");
      }
      
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        const userId = decoded?.sub ? Number(decoded.sub) : null;
        const userInfo = await getServerMemberById(userId);

        const user: ServerMember = {
          memberId: parseInt(decoded.sub, 10),
          serverRole: userInfo.serverRole,
          username: userInfo.username,
          profile: userInfo.profile
        };

        if (!user.memberId) {
          throw new Error("토큰에서 사용자 정보를 찾을 수 없습니다.");
        }
        
        return { user, token };
      } catch (error) {
        console.error("Token processing failed:", error);
        throw new Error("유효하지 않은 토큰 형식입니다.");
      }
    },
    onSuccess: (data) => {
      const { user, token } = data;

      localStorage.setItem('accessToken', token);
      setAccessToken(token);
      setServerMember(user);
      
      toast.success(SUCCESS_MESSAGES.SIGNIN_SUCCESS);
      navigate(ROUTE_PATH.main, { replace: true });
    },
    onError: (error) => {
      localStorage.removeItem('accessToken');
      toast.error(error.message);
      navigate(ROUTE_PATH.root);
    },
  });
};

export default useSignIn;