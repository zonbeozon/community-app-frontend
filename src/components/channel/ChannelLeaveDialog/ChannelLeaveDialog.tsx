import { useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useGetJoinedChannels from '@/queries/useGetJoinedChannel';
import useLeaveChannel from '@/hooks/channelMember/useLeaveChannel';
import { ChannelDialogProps } from "@/types/channel.type";
import * as S from "./ChannelLeaveDialog.styles";

const ChannelLeaveDialog = ({ open, onOpenChange, channelId }: ChannelDialogProps) => {
  const { mutate: leaveChannel, isPending } = useLeaveChannel();
  const { data: myChannels } = useGetJoinedChannels();

  const channel = useMemo(() => {
    return myChannels?.find(c => c.channelInfo.channelId === channelId);
  }, [myChannels, channelId]);

  if (!channel) return null;
  
  const handleLeave = () => {
    leaveChannel(channelId, {
      onSuccess: () => {
        onOpenChange(false);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={S.content}>
        <DialogHeader>
          <DialogTitle>채널 나가기</DialogTitle>
          <DialogDescription>
            정말 <strong>{channel.channelInfo.title}</strong> 채널에서 나가시겠습니까? 이 작업은
            되돌릴 수 없습니다.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">취소</Button>
          </DialogClose>
          <Button variant="destructive" onClick={handleLeave} disabled={isPending}>
            {isPending ? "나가는 중..." : "나가기"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChannelLeaveDialog;