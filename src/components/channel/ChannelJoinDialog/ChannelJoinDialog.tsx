import { useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import useJoinChannel from '@/hooks/channelmember/useJoinChannel';
import { ChannelJoinDialogProps } from '@/types/channel.type';

const ChannelJoinDialog = ({
  channel,
  onJoinSuccess,
  open,
  onOpenChange,
}: ChannelJoinDialogProps) => {

  const { mutateAsync: joinChannel, isPending: isLoading } = useJoinChannel();
  const { channelInfo } = channel;
  const { title, settings: { joinPolicy } } = channelInfo;

  const dialogContent = useMemo(() => {
    switch (joinPolicy) {
      case 'OPEN':
        return {
          title: '채널 참여',
          description: `'${title}' 채널에 바로 참여하시겠습니까?`,
          buttonText: '참여하기',
        };
      case 'APPROVAL':
        return {
          title: '참여 요청',
          description: `'${title}' 채널은 관리자의 승인이 필요합니다. 참여를 요청하시겠습니까?`,
          buttonText: '요청 보내기',
        };
      case 'DENY':
      default:
        return {
          title: '참여 불가',
          description: `죄송합니다. '${title}' 채널은 현재 새로운 멤버를 받지 않습니다.`,
          buttonText: '확인',
        };
    }
  }, [joinPolicy, title]);

  const handleJoin = async () => {
    try {
      await joinChannel(channel.channelInfo.channelId);
      onJoinSuccess?.();
      onOpenChange(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogContent.title}</DialogTitle>
          <DialogDescription>{dialogContent.description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">취소</Button>
          </DialogClose>
          
          {joinPolicy !== 'DENY' ? (
            <Button onClick={handleJoin} disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {dialogContent.buttonText}
            </Button>
          ) : (
            <Button onClick={() => onOpenChange(false)}>
              {dialogContent.buttonText}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChannelJoinDialog;