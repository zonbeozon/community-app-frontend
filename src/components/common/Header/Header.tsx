// src/components/common/Header/Header.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtomValue } from "jotai"; // Jotai 훅 추가
import { serverMemberAtom } from "@/atoms/authAtoms"; // 사용자 정보 Atom 추가
import { Button } from "@/components/ui/button";
import NewChannelButton from "@/components/channel/ChannelCreateDialog/ChannelCreateDialog";
import SignInButton from "@/components/common/SignInButton/SignInButton";
import ServerMemberInfoDialog from "@/components/servermember/ServerMemberInfoDialog/ServerMemberInfoDialog";
import ChannelSearchbar from "@/components/channel/ChannelSearchbar/ChannelSearchbar";
import * as S from "./Header.styles";
import NotificationButton from "../../notification/NotificationButton/NotificationButton";

const Header = () => {
  // 1. Jotai Atom에서 현재 로그인된 사용자의 정보를 가져옵니다.
  const myInfo = useAtomValue(serverMemberAtom);

  // 2. myInfo 객체가 존재하면 로그인된 것으로 간주합니다.
  const isAuthenticated = !!myInfo;
  
  const navigate = useNavigate();
  const [isCreateChannelOpen, setCreateChannelOpen] = useState(false);

  const handleMain = () => {
    navigate("/main");
  };

  return (
    <div className={S.layout}>
      <Button
        onClick={handleMain}
        aria-label="메인 페이지로 이동"
        className={S.logoButton}
        variant="ghost"
      >
        <h1 className={S.logo}>placeHolder</h1>
      </Button>
      
      {/* 3. isAuthenticated 값에 따라 UI가 올바르게 렌더링됩니다. */}
      {isAuthenticated ? (
        <div className={S.rightSection}>      
          <ChannelSearchbar />
          <NewChannelButton 
            open={isCreateChannelOpen}
            onOpenChange={setCreateChannelOpen}
          />
          <NotificationButton />
          <ServerMemberInfoDialog />
        </div>
      ) : (
        <SignInButton />
      )}
    </div>
  );
};

export default Header;