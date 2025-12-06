import { ChannelProfileImage } from '@/components/channel/ChannelProfileImage/ChannelProfileImage';
import { ChannelActiveMemberList } from '@/components/channelmember/ChannelActiveMemberList/ChannelActiveMemberList';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useDialog } from '@/hooks/common/useDialog';
import type { Channel } from '@/types/channel.type';
import * as S from './ChannelInfoDialog.styles';

export const ChannelInfoDialog = ({ channel }: { channel: Channel }) => {
  const { props: dialogProps } = useDialog();

  if (!channel) return null;

  return (
    <Dialog {...dialogProps}>
      <DialogTrigger asChild>
        <ChannelProfileImage channelInfo={channel.channelInfo} size="sm" />
      </DialogTrigger>
      <DialogContent className={S.dialogContent}>
        <DialogTitle>{channel.channelInfo.title}</DialogTitle>
        <DialogDescription>{channel.channelInfo.description || '설명이 없습니다.'}</DialogDescription>

        <div className={S.scrollableArea}>
          <div className={S.profileSection.wrapper}>
            <ChannelProfileImage channelInfo={channel.channelInfo} size="lg" />
          </div>
          <div className={S.divider} />
          <div>
            <h4 className={S.memberSection.title}>멤버 ({channel.channelInfo.memberCount})</h4>
            <ChannelActiveMemberList channelId={channel.channelInfo.channelId} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
