import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinner';
import useJoinChannel from '@/hooks/channelmember/useJoinChannel';
import type { ChannelJoinDialogProps } from '@/types/channel.type';

interface DialogControlProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ChannelJoinDialog = ({
  channel,
  onJoinSuccess,
  open,
  onOpenChange,
}: ChannelJoinDialogProps & DialogControlProps) => {
  const { mutateAsync: joinChannel, isPending: isLoading } = useJoinChannel();
  const { channelInfo } = channel;
  const {
    title,
    settings: { joinPolicy },
  } = channelInfo;

  const dialogContent = useMemo(() => {
    switch (joinPolicy) {
      case 'APPROVAL':
        return {
          title: '참여 요청',
          description: `'${title}' 채널은 관리자의 승인이 필요합니다. 참여를 요청하시겠습니까?`,
          buttonText: '요청 보내기',
        };
      case 'OPEN':
      default:
        return {
          title: '채널 참여',
          description: `'${title}' 채널에 바로 참여하시겠습니까?`,
          buttonText: '참여하기',
        };
    }
  }, [joinPolicy, title]);

  const handleJoin = async () => {
    try {
      await joinChannel(channel.channelInfo.channelId);
      onJoinSuccess?.();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>{dialogContent.title}</DialogTitle>
        <DialogDescription>{dialogContent.description}</DialogDescription>

        <Button onClick={handleJoin} disabled={isLoading}>
          {isLoading && <Spinner />}
          {dialogContent.buttonText}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
