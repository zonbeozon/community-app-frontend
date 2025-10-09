import { useState, useMemo } from 'react';
import { useAtomValue } from 'jotai';
import useGetJoinedChannels from '@/queries/useGetJoinedChannel';
import { selectedChannelIdAtom } from '@/atoms/channelAtoms'; // 2. 클라이언트 상태를 가져오는 atom
import ChannelRoleManager from '@/utils/channelRoleManager';
import NewPostDialog from '@/components/post/PostCreateDialog/PostCreateDialog';
import ChannelDropdown from '@/components/channel/ChannelDropdown/ChannelDropdown';
import ChannelInfoDialog from '@/components/channel/ChannelInfoDialog/ChannelInfoDialog';
import ChannelBackButton from '../ChannelBackButton/ChannelBackButton';
import ChannelJoinButton from '@/components/channel/ChannelJoinButton/ChannelJoinButton';
import { ChannelHeaderProps } from '@/types/channel.type';
import * as S from "@/components/channel/ChannelHeader/ChannelHeader.styles";

const ChannelHeader = ({ showBackButton }: ChannelHeaderProps) => {
  // 3. Jotai를 사용하여 현재 선택된 채널 ID만 가져옵니다.
  const selectedChannelId = useAtomValue(selectedChannelIdAtom);
  
  // 4. TanStack Query를 사용하여 '내가 참여한 모든 채널 목록'과 로딩 상태를 가져옵니다.
  const { data: myChannels, isLoading } = useGetJoinedChannels();

  // 5. useMemo를 사용하여, 채널 목록이나 선택된 ID가 변경될 때만 현재 채널을 찾는 작업을 수행합니다.
  const selectedChannel = useMemo(() => {
    if (!myChannels || !selectedChannelId) {
      return null;
    }
    // TanStack Query 캐시에서 가져온 전체 목록에서 현재 채널을 찾습니다.
    return myChannels.find(
      (channel) => channel.channelInfo.channelId === selectedChannelId
    );
  }, [myChannels, selectedChannelId]);

  const [isPostDialogOpen, setPostDialogOpen] = useState(false);

  // 6. 채널 목록을 불러오는 중이거나, 유효한 채널이 선택되지 않았으면 아무것도 보여주지 않거나 로딩 UI를 보여줍니다.
  if (isLoading) {
    // return <ChannelHeaderSkeleton />; // 로딩 스켈레톤 UI를 보여주는 것이 더 좋은 UX입니다.
    return null;
  }
  
  if (!selectedChannel) {
    return null;
  }

  const isMember = !!selectedChannel.requester;
  const canCreatePost = isMember && ChannelRoleManager.isAdmin(selectedChannel.requester.channelRole);

  return (
    <div className={S.wrapper}>
      <div className={S.goBackButtonWrapper}>
        {showBackButton && <ChannelBackButton channel={selectedChannel} />}
        
        <div className={S.image}>
          <ChannelInfoDialog channel={selectedChannel} />
        </div>
      </div>

      <div className={S.titleWrapper}>
        <span className={S.name}>{selectedChannel.channelInfo.title}</span>
      </div>

      {isMember ? (
        <>
          <div className={S.button}>
            {canCreatePost && (
              <NewPostDialog 
                open={isPostDialogOpen}
                onOpenChange={setPostDialogOpen}
              />
            )}
          </div>
          <div className={S.dropdownButton}>
            <ChannelDropdown channel={selectedChannel} />
          </div>
        </>
      ) : (
        <div className={S.button}>
          <ChannelJoinButton channel={selectedChannel} />
        </div>
      )}
    </div>
  );
};

export default ChannelHeader;