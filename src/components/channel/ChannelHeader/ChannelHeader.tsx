import { useState } from 'react'; 
import NewPostDialog from '@/components/post/PostCreateDialog/PostCreateDialog';
import ChannelDropdown from '@/components/channel/ChannelDropdown/ChannelDropdown';
import ChannelInfoDialog from '@/components/channel/ChannelInfoDialog/ChannelInfoDialog';
import ChannelBackButton from '../ChannelBackButton/ChannelBackButton';
import ChannelJoinButton from '@/components/channel/ChannelJoinButton/ChannelJoinButton';
import { ChannelHeaderProps } from '@/types/channel.type';
import { useSelectedChannel } from '@/hooks/channel/useSelectedChannel';
import * as S from "@/components/channel/ChannelHeader/ChannelHeader.styles";

const ChannelHeader = ({ showBackButton }: ChannelHeaderProps) => {
  const { selectedChannel, isLoading, isMember, canCreatePost } = useSelectedChannel();
  const [isPostDialogOpen, setPostDialogOpen] = useState(false);

  if (isLoading || !selectedChannel) {
    return null
  }

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