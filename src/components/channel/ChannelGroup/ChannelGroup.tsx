import { ChannelGroupProps } from "@/types/channel.type";
import { MESSAGES } from "@/constants/messages";
import ChannelItem from "@/components/channel/ChannelItem/ChannelItem";
import * as S from "./ChannelGroup.styles";

const ChannelGroup = ({ title, channels }: ChannelGroupProps) => {
  if (channels.length === 0) {
    return (
      <div>
        <h3>{title}</h3>
        <p className={S.emptyMessage}>{MESSAGES.EMPTY_CHANNEL_GROUP}</p>
      </div>
    );
  }

  return (
    <div>
      <h3>{title}</h3>
      <ul className={S.list}>
        {channels.map((channel) => (
          <ChannelItem
            key={channel.channelInfo.channelId}
            channel={channel}
          />
        ))}
      </ul>
    </div>
  );
};

export default ChannelGroup;