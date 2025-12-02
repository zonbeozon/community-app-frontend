import { useState } from 'react';
import { ChannelBackButton } from '@/components/channel/ChannelBackButton/ChannelBackButton';
import { ChannelDropdown } from '@/components/channel/ChannelDropdown/ChannelDropdown';
import { ChannelInfoDialog } from '@/components/channel/ChannelInfoDialog/ChannelInfoDialog';
import { ChannelJoinButton } from '@/components/channel/ChannelJoinButton/ChannelJoinButton';
import { PostCreateDialog } from '@/components/post/PostCreateDialog/PostCreateDialog';
import * as S from './ChattingGroupHeader.styles';
import type { ChattingHeaderProps } from '@/types/chat.type';

export const ChattingGroupHeader = ({ showBackButton, coinData }: ChattingHeaderProps) => {
  const [isPostDialogOpen, setPostDialogOpen] = useState(false);

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
            {canCreatePost && <PostCreateDialog open={isPostDialogOpen} onOpenChange={setPostDialogOpen} />}
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
