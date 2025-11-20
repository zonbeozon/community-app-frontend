import { useState, useEffect, useRef } from "react";
import { useSetAtom } from "jotai";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { serverMemberAtom, accessTokenAtom } from "@/atoms/authAtoms";
import { ROUTE_PATH } from "@/constants/routePaths";
import { Spinner } from "@/components/ui/spinner";
import { reissue } from "@/apis/http/reissue.api";

const AuthGuard = () => {
  const setAccessToken = useSetAtom(accessTokenAtom);
  const setServerMember = useSetAtom(serverMemberAtom);
  const location = useLocation();

  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const isChecked = useRef(false);

  useEffect(() => {
    if (isChecked.current) return;
    isChecked.current = true;

    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");

      if (token && token !== "null") {
        setIsAuthenticated(true);
        setIsAuthChecking(false);
        return;
      }

      try {
        const newToken = await reissue();
        if (newToken) {
          setAccessToken(newToken);
          localStorage.setItem("accessToken", JSON.stringify(newToken));
          setIsAuthenticated(true);
        } else {
          throw new Error("No token returned");
        }
      } catch (error) {
        console.log("AuthGuard: 인증 실패", error);
        setAccessToken(null);
        setServerMember(null);
        localStorage.removeItem("accessToken");
        setIsAuthenticated(false);
      } finally {
        setIsAuthChecking(false);
      }
    };

    checkAuth();
  }, [setAccessToken, setServerMember]);

  if (isAuthChecking) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 h-screen w-screen">
        <Spinner />
        <div>페이지를 불러오는 중입니다...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTE_PATH.root} state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default AuthGuard;