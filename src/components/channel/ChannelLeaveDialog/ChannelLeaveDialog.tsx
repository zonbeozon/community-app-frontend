import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { useLeaveChannel } from '@/hooks/channelmember/useLeaveChannel';
import type { ChannelDialogProps } from '@/types/channel.type';
import * as S from './ChannelLeaveDialog.styles';

export const ChannelLeaveDialog = ({ channel, open, onOpenChange }: ChannelDialogProps) => {
  const { leaveChannel, isLeaving } = useLeaveChannel();

  const handleLeave = () => {
    if (!channel) return;

    leaveChannel(channel.channelInfo.channelId, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  if (!channel) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={S.content}>
        <DialogTitle>채널 나가기</DialogTitle>
        <DialogDescription>
          정말 <strong>{channel.channelInfo.title}</strong> 채널에서 나가시겠습니까? 이 작업은 되돌릴 수 없습니다.
        </DialogDescription>

        <Button variant="destructive" onClick={handleLeave} disabled={isLeaving}>
          {isLeaving ? '나가는 중...' : '나가기'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
