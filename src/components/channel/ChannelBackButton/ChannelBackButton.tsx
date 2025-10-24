import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Channel } from "@/types/channel.type";
import { ROUTE_PATH } from "@/constants/routePaths";
import * as S from "./ChannelBackButton.styles";

const ChannelBackButton = ({ channel }: { channel: Channel }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (channel) {
      const channelPath = ROUTE_PATH.channelId.replace(
        ":channelId",
        String(channel.channelInfo.channelId)
      );
      navigate(channelPath);
    } else {
      navigate(ROUTE_PATH.main);
    }
  };

  return (
    <button
      onClick={handleGoBack}
      className={S.goBackButton}
      aria-label="뒤로가기"
    >
      <ArrowLeft size={20} />
    </button>
  );
};

export default ChannelBackButton;