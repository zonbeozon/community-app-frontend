import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useUnbanChannelMember } from '@/hooks/channelMember/useUnbanChannelMember';
import type { ChannelMemberDialogProps } from '@/types/channelMember.type';
import * as S from './ChannelMemberUnbanDialog.styles';

export const ChannelMemberUnbanDialog = ({ open, onOpenChange, channelId, targetMember }: ChannelMemberDialogProps) => {
  const { mutate: unbanMember, isPending } = useUnbanChannelMember();

  const handleUnban = () => {
    unbanMember(
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
          <DialogTitle>멤버 추방 해제</DialogTitle>
          <DialogDescription>
            <strong>{targetMember.username}</strong> 님의 채널 추방 상태를 해제하시겠습니까?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>

          <Button type="button" variant="destructive" onClick={handleUnban} disabled={isPending}>
            {isPending ? '처리 중...' : '추방 해제'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
