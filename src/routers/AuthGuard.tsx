import { useState, useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { Navigate, Outlet } from 'react-router-dom';
import { serverMemberAtom } from '@/atoms/authAtoms';
import { ROUTE_PATH } from '@/constants/routePaths';
import { Spinner } from "@/components/ui/spinner";

const AuthGuard = () => {
  const serverMember = useAtomValue(serverMemberAtom);

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setIsInitialized(true);
  }, []); 

  if (!isInitialized) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 h-screen w-screen">
        <Spinner />
        인증 정보를 확인하는 중입니다...
      </div>
    );
  }

  if (!serverMember) {
    return <Navigate to={ROUTE_PATH.root} replace />;
  }

  return <Outlet />;
};

export default AuthGuard;