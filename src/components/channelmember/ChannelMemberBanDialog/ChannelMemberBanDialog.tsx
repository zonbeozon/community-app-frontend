import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useBanChannelMember } from '@/hooks/channelMember/useBanChannelMember';
import type { ChannelMemberDialogProps } from '@/types/channelMember.type';
import * as S from './ChannelMemberBanDialog.styles';

export const ChannelMemberBanDialog = ({ open, onOpenChange, channelId, targetMember }: ChannelMemberDialogProps) => {
  const { mutate: banMember, isPending } = useBanChannelMember();

  const handleBan = () => {
    banMember(
      { channelId, targetMemberId: targetMember.memberId },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      },
    );
  };

  if (!targetMember) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={S.content}>
        <DialogHeader>
          <DialogTitle>멤버 추방</DialogTitle>
          <DialogDescription>
            정말로 <strong>{targetMember.username}</strong> 님을 추방하시겠습니까?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button type="button" variant="destructive" onClick={handleBan} disabled={isPending}>
            {isPending ? '추방 중...' : '추방'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
