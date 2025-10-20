import { useState, useMemo } from 'react';
import { useAtomValue } from 'jotai';
import useGetJoinedChannels from '@/queries/useGetJoinedChannel';
import { selectedChannelIdAtom } from '@/atoms/channelAtoms'; 
import ChannelRoleManager from '@/utils/channelRoleManager';
import NewPostDialog from '@/components/post/PostCreateDialog/PostCreateDialog';
import ChannelDropdown from '@/components/channel/ChannelDropdown/ChannelDropdown';
import ChannelInfoDialog from '@/components/channel/ChannelInfoDialog/ChannelInfoDialog';
import ChannelBackButton from '../ChannelBackButton/ChannelBackButton';
import ChannelJoinButton from '@/components/channel/ChannelJoinButton/ChannelJoinButton';
import { ChannelHeaderProps } from '@/types/channel.type';
import * as S from "@/components/channel/ChannelHeader/ChannelHeader.styles";

const ChannelHeader = ({ showBackButton }: ChannelHeaderProps) => {
  const selectedChannelId = useAtomValue(selectedChannelIdAtom);
  const { data: myChannels, isLoading } = useGetJoinedChannels();

  const selectedChannel = useMemo(() => {
    if (!myChannels || !selectedChannelId) {
      return null;
    }
    return myChannels.find(
      (channel) => channel.channelInfo.channelId === selectedChannelId
    );
  }, [myChannels, selectedChannelId]);

  const [isPostDialogOpen, setPostDialogOpen] = useState(false);

  if (isLoading) {
    return null;
  }
  
  if (!selectedChannel) {
    return null;
  }

  const isMember = !!selectedChannel.membership;
  const canCreatePost = isMember && ChannelRoleManager.isAdmin(selectedChannel.membership.channelRole);

  console.log(isMember)

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
          <ChannelJoinButton channel={selectedChannel} onJoinSuccess={() => {}} />
        </div>
      )}
    </div>
  );
};

export default ChannelHeader;