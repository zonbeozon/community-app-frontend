import { Link, useParams } from 'react-router-dom';
import { ChannelDropdown } from '@/components/channel/ChannelDropdown/ChannelDropdown';
import { ChannelProfileImage } from '@/components/channel/ChannelProfileImage/ChannelProfileImage';
import { useLatestPost } from '@/hooks/post/useLatestPost';
import type { Channel } from '@/types/channel.type';
import * as S from './ChannelItem.styles';

export const ChannelItem = ({ channel }: { channel: Channel }) => {
  const { channelId: currentUrlChannelId } = useParams<{ channelId: string }>();
  const { channelInfo } = channel;
  const latestPost = useLatestPost(channelInfo.channelId);

  if (!channelInfo) {
    return null;
  }

  const isSelected = String(channelInfo.channelId) === currentUrlChannelId;

  return (
    <div className={S.wrapper}>
      <Link to={`/channels/${channelInfo.channelId}`} className={S.itemWrapper(isSelected)}>
        <ChannelProfileImage size={'sm'} channelInfo={channelInfo} />
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
