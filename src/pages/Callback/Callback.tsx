import { useEffect } from "react";
import { MoonLoader } from "react-spinners";
import useSignIn from "@/hooks/auth/useSignIn";
import * as S from "./Callback.styles";

export default function Callback() {
  const signInHandler = useSignIn();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");

    signInHandler(accessToken);

  }, []); 

  return (
    <div className={S.wrapper}>
      <p className={S.message}>로그인 중입니다. 잠시만 기다려 주세요...</p>
      <MoonLoader />
    </div>
  );
}