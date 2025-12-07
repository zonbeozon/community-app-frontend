import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useDenyChannelMember } from '@/hooks/channelMember/useDenyChannelMember';
import type { ChannelMemberDialogProps } from '@/types/channelMember.type';
import * as S from './ChannelMemberDenyDialog.styles'

export const ChannelMemberDenyDialog = ({ open, onOpenChange, channelId, targetMember }: ChannelMemberDialogProps) => {
  const { mutate: denyMember, isPending } = useDenyChannelMember();

  const handleDeny = () => {
    denyMember(
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
      <DialogTrigger>
        <Button variant="outline" size="sm">
          거절
        </Button>
      </DialogTrigger>
      <DialogContent className={S.content}>
        <DialogTitle>멤버 입장 요청 거절</DialogTitle>
        <DialogDescription>
          <strong>{targetMember.username}</strong> 님의 참가 요청을 거절하시겠습니까?
        </DialogDescription>

        <Button type="button" variant="destructive" onClick={handleDeny} disabled={isPending}>
          {isPending ? '거절 중...' : '거절'}
        </Button>
        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
          취소
        </Button>
      </DialogContent>
    </Dialog>
  );
};
