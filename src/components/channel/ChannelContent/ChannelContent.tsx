import { Outlet } from 'react-router-dom';
import { ChannelHeader } from '@/components/channel/ChannelHeader/ChannelHeader';
import { Spinner } from '@/components/ui/spinner';
import { useChannelLogic } from '@/hooks/channel/useChannelLogic';
import * as S from './ChannelContent.styles';

const ChannelContent = () => {
  const { showBackButton, channelData, isMember, isLoading, selectedChannel, canCreatePost } = useChannelLogic();

  if (isLoading) {
    return <Spinner />;
  }

  if (!channelData) {
    return <div className={S.notFoundMessage}>❓ 요청한 채널을 찾을 수 없습니다.</div>;
  }

  return (
    <div className={S.layout}>
      <div className={S.headerWrapper}>
        <ChannelHeader
          showBackButton={showBackButton}
          channelData={channelData}
          isMember={isMember}
          selectedChannel={selectedChannel}
          canCreatePost={canCreatePost}
        />
      </div>
      <div className={S.contentWrapper}>
        <Outlet />
      </div>
    </div>
  );
};

export default ChannelContent;
