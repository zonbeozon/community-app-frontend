import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetMyServerMember from "@/queries/useGetServerMemberById";
import { Button } from "@/components/ui/button";
import NewChannelButton from "@/components/channel/ChannelCreateDialog/ChannelCreateDialog";
import SignInButton from "@/components/common/SignInButton/SignInButton";
import ServerMemberInfoDialog from "@/components/serverMember/ServerMemberInfoDialog/ServerMemberInfoDialog";
import ChannelSearchbar from "@/components/channel/ChannelSearchbar/ChannelSearchbar";
import * as S from "./Header.styles";
import NotificationButton from "../../notification/NotificationButton/NotificationButton";

const Header = () => {
  const { data: myInfo, isSuccess } = useGetMyServerMember();
  const isAuthenticated = isSuccess && !!myInfo;
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