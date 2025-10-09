import { Navigate, Outlet } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { accessTokenAtom } from '@/atoms/authAtoms'; // 1. Jotai의 accessToken atom을 사용
import useGetServerMember from '@/queries/useGetServerMemberById';
import { ROUTE_PATH } from '@/constants/routePath';

const AuthGuard = () => {
  // 3. Jotai에서 Access Token의 존재 여부를 먼저 확인합니다.
  const accessToken = useAtomValue(accessTokenAtom);

  // 4. Access Token이 있을 때만 useGetMyServerMember 훅을 활성화(enabled)합니다.
  const { data: myInfo, isLoading, isSuccess } = useGetServerMember({
    enabled: !!accessToken, // 토큰이 없으면 API 요청을 보내지 않습니다.
  });

  // 5. 토큰의 유효성을 확인하는 동안 (API 요청 중) 로딩 UI를 보여줍니다.
  if (isLoading) {
    // return <FullScreenSpinner />; // 또는 빈 화면을 보여줘도 됩니다.
    return null;
  }

  // 6. API 요청이 성공하고, 유저 정보가 실제로 존재하면 자식 라우트를 보여줍니다.
  if (isSuccess && myInfo) {
    return <Outlet />;
  }

  // 7. 위의 모든 조건에 해당하지 않으면 (토큰이 없거나, 유효하지 않은 토큰) 루트 페이지로 리디렉트합니다.
  return <Navigate to={ROUTE_PATH.root} replace />;
};

export default AuthGuard;