import { Navigate, Outlet } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { serverMemberAtom } from '@/atoms/authAtoms';
import { ROUTE_PATH } from '@/constants/routePath';

const AuthGuard = () => {
  const serverMember = useAtomValue(serverMemberAtom);

  if (!serverMember) {
    return <Navigate to={ROUTE_PATH.root} replace />;
  }
  
  return <Outlet />;
};

export default AuthGuard;