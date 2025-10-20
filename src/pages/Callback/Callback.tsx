import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import useSignIn from '@/hooks/auth/useSignIn';
import { ROUTE_PATH } from '@/constants/routePath';
import { toast } from 'sonner';

const Callback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { mutate: signIn, isPending } = useSignIn();

  useEffect(() => {
    const token = searchParams.get('accessToken');

    if (token) {
      signIn(token);
    } else {
      toast.error("로그인 정보가 올바르지 않습니다.");
      navigate(ROUTE_PATH.root);
    }
    
  }, [signIn, searchParams, navigate]);

  if (isPending) {
    return <div>로그인 처리 중입니다...</div>;
  }
  
  return null;
};

export default Callback;