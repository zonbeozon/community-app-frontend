import { Link, useParams } from "react-router-dom";
import { useAtomValue } from "jotai";
import { selectAtom } from "jotai/utils";
import { useMemo } from "react";
import ChannelDropdown from "@/components/channel/ChannelDropdown/ChannelDropdown";
import ChannelProfileImage from "../ChannelProfileImage/ChannelProfileImage";
import { latestPostByChannelAtom } from "@/atoms/postAtoms";
import { Channel } from "@/types/channel.type";
import * as S from "./ChannelItem.styles";

interface ChannelItemProps {
  channel: Channel;
}

const ChannelItem = ({ channel }: ChannelItemProps) => {
  const { channelId: currentUrlChannelId } = useParams<{ channelId: string }>();

  const latestPost = useAtomValue(
    useMemo(
      () => selectAtom(latestPostByChannelAtom, (postsMap) => postsMap[channel.channelInfo.channelId] || null),
      [channel.channelInfo.channelId]
    )
  );

  const { channelInfo } = channel;

  if (!channelInfo) {
    return null;
  }

  const isSelected = String(channelInfo.channelId) === currentUrlChannelId;

  return (
    <div className={S.wrapper}>
      <Link
        to={`/channels/${channelInfo.channelId}`}
        className={S.itemWrapper(isSelected)}
      >
        <ChannelProfileImage size={'sm'} channelInfo={channelInfo}/>
        <div className={S.contentWrapper}>
          <p className={S.title}>{channelInfo.title}</p>
          {latestPost ? (
            <p className={S.latestPost}>{latestPost.content}</p>
          ) : (
            <p className={S.latestPost}>작성된 포스트가 없습니다.</p>
          )}
        </div>
      </Link>

      <div className={S.dropdownContainer}>
        <div className={S.dropdownButtonWrapper(isSelected)}>
          <ChannelDropdown channel={channel} />
        </div>
      </div>
    </div>
  );
};

export default ChannelItem;