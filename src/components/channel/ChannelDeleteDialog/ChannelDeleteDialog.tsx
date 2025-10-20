import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useChannelDeleteDialog } from "@/hooks/channel/channeldialog/useChannelDeleteDialog";
import { ChannelDialogProps } from "@/types/channel.type";
import * as S from "./ChannelDeleteDialog.styles";

const ChannelDeleteDialog = ({ open, onOpenChange, channelId }: ChannelDialogProps) => {
  const { channel, handleDelete, isDeleting } = useChannelDeleteDialog({
    channelId,
    onSuccess: () => onOpenChange(false), 
  });

  if (!channel) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={S.content}>
        <DialogHeader>
          <DialogTitle>채널 삭제</DialogTitle>
          <DialogDescription>
            정말 <strong>{channel.channelInfo.title}</strong> 채널을 삭제하시겠습니까? 이 작업은
            되돌릴 수 없습니다.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">취소</Button>
          </DialogClose>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "삭제 중..." : "삭제"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChannelDeleteDialog;