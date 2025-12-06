import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useApproveChannelMember } from '@/hooks/channelmember/useApproveChannelMember';
import type { ChannelMemberDialogProps } from '@/types/channelMember.type';
import * as S from './ChannelMemberApproveDialog.styles';

export const ChannelMemberApproveDialog = ({ open, onOpenChange, channelId, targetMember }: ChannelMemberDialogProps) => {
  const { mutate: approveMember, isPending } = useApproveChannelMember();

  const handleApprove = () => {
    approveMember(
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
          수락
        </Button>
      </DialogTrigger>
      <DialogContent className={S.content}>
        <DialogTitle>멤버 입장 요청 수락</DialogTitle>
        <DialogDescription>
          <strong>{targetMember.username}</strong> 님의 참가 요청을 수락하시겠습니까?
        </DialogDescription>

        <Button type="button" onClick={handleApprove} disabled={isPending}>
          {isPending ? '수락 중...' : '수락'}
        </Button>
        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
          취소
        </Button>
      </DialogContent>
    </Dialog>
  );
};
