import { useState } from 'react';
import NewPostDialog from '@/components/post/PostCreateDialog/PostCreateDialog';
import ChannelDropdown from '@/components/channel/ChannelDropdown/ChannelDropdown';
import ChannelInfoDialog from '@/components/channel/ChannelInfoDialog/ChannelInfoDialog';
import ChannelBackButton from '../ChannelBackButton/ChannelBackButton';
import ChannelJoinButton from '@/components/channel/ChannelJoinButton/ChannelJoinButton';
import { Channel } from '@/types/channel.type';
import ChannelRoleManager from '@/utils/channelRoleManager';
import * as S from "@/components/channel/ChannelHeader/ChannelHeader.styles";

interface ChannelHeaderProps {
  showBackButton: boolean;
  channelData: Channel;
  isMember: boolean;
}

const ChannelHeader = ({ showBackButton, channelData, isMember }: ChannelHeaderProps) => {
  const [isPostDialogOpen, setPostDialogOpen] = useState(false);

  const canCreatePost = isMember && channelData.membership && ChannelRoleManager.isAdmin(channelData.membership.channelRole);

  return (
    <div className={S.wrapper}>
      <div className={S.goBackButtonWrapper}>
        {showBackButton && <ChannelBackButton channel={channelData} />}
        
        <div className={S.image}>
          <ChannelInfoDialog channel={channelData} />
        </div>
      </div>

      <div className={S.titleWrapper}>
        <span className={S.name}>{channelData.channelInfo.title}</span>
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
            <ChannelDropdown channel={channelData} />
          </div>
        </>
      ) : (
        <div className={S.button}>
          <ChannelJoinButton channel={channelData} onJoinSuccess={() => {}} />
        </div>
      )}
    </div>
  );
};

export default ChannelHeader;