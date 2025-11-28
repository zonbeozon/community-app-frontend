import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtomValue } from "jotai"; 
import { serverMemberAtom } from "@/atoms/authAtoms"; 
import { Button } from "@/components/ui/button";
import NewChannelButton from "@/components/channel/ChannelCreateDialog/ChannelCreateDialog";
import ServerMemberInfoDialog from "@/components/servermember/ServerMemberInfoDialog/ServerMemberInfoDialog";
import ChannelSearchbar from "@/components/channel/ChannelSearchbar/ChannelSearchbar";
import * as S from "./Header.styles";
import NotificationButton from "../../notification/NotificationButton/NotificationButton";
import { ROUTE_PATH } from "@/constants/routePaths";

const Header = () => {
  const myInfo = useAtomValue(serverMemberAtom);
  const isAuthenticated = !!myInfo;
  
  const navigate = useNavigate();
  const [isCreateChannelOpen, setCreateChannelOpen] = useState(false);

  const handleMain = () => {
    navigate(ROUTE_PATH.main);
  };

  return (
    <div className={S.layout}>
      <Button
        onClick={handleMain}
        aria-label="메인 페이지로 이동"
        className={S.logoButton}
        variant="ghost"
      >
        <h1 className={S.logo}>zonbeozon</h1>
      </Button>
      
      {isAuthenticated && (
        <div className={S.rightSection}>      
          <ChannelSearchbar />
          <NewChannelButton 
            open={isCreateChannelOpen}
            onOpenChange={setCreateChannelOpen}
          />
          <NotificationButton />
          <ServerMemberInfoDialog />
        </div>
      )}
    </div>
  );
};

export default Header;