import { Outlet } from "react-router-dom";
import ChannelHeader from "@/components/channel/ChannelHeader/ChannelHeader";
import { useChannelLogic } from "@/hooks/channel/useChannelLogic";
import * as S from "./ChannelContent.styles";

const ChannelContent = () => {
  const { currentChannel, showBackButton } = useChannelLogic();

  if (!currentChannel) {
    return <div>❓ 요청한 채널을 찾을 수 없습니다.</div>;
  }

  return (
    <div className={S.layout}>
      <div className={S.headerWrapper}>
        <ChannelHeader showBackButton={showBackButton} />
      </div>
      <div className={S.contentWrapper}>
        <Outlet />
      </div>
    </div>
  );
};

export default ChannelContent;