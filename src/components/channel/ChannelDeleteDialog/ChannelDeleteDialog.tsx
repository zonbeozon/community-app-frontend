import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { useChannelDelete } from '@/hooks/channel/useChannelDelete';
import type { ChannelDialogProps } from '@/types/channel.type';
import * as S from './ChannelDeleteDialog.styles';

export const ChannelDeleteDialog = ({ channel, open, onOpenChange }: ChannelDialogProps) => {
  const { deleteChannel, isDeleting } = useChannelDelete();

  const handleDelete = () => {
    if (!channel) return;

    deleteChannel(channel.channelInfo.channelId, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  if (!channel) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={S.content}>
        <DialogTitle>채널 삭제</DialogTitle>
        <DialogDescription>
          정말 <strong>{channel.channelInfo.title}</strong> 채널을 삭제하시겠습니까?
          <br />이 작업은 되돌릴 수 없습니다.
        </DialogDescription>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? '삭제 중...' : '삭제'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
