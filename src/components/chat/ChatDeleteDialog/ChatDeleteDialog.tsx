import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import * as S from './ChatDeleteDialog.styles';
import { useDeleteChat } from '@/hooks/chat/useDeleteChat';

interface ChatDeleteDialogProps {
  chatId: number | null;
  chattingGroupId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ChatDeleteDialog = ({ chatId, chattingGroupId, open, onOpenChange }: ChatDeleteDialogProps) => {
  const { mutate: deleteChatFn, isPending: isDeleting } = useDeleteChat();

  const handleDelete = () => {
    if (!chatId || !chattingGroupId) return;

    deleteChatFn(
      { chatId, chattingGroupId }, 
      {
        onSuccess: () => {
          onOpenChange(false); 
        },
      }
    );
  };

  if (!chatId) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={S.content}>
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <DialogTitle>채팅 삭제</DialogTitle>
                <DialogDescription>
                정말로 해당 채팅을 삭제하시겠습니까? <br/>
                삭제된 메시지는 복구할 수 없습니다.
                </DialogDescription>
            </div>

            <DialogFooter>
                <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isDeleting}>
                    취소
                </Button>
                <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                    {isDeleting ? '삭제 중...' : '삭제'}
                </Button>
            </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};