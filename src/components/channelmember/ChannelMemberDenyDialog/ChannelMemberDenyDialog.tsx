import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useDenyChannelMember from "@/hooks/channelmember/useDenyChannelMember";
import { ChannelMember } from "@/types/channelMember.type";
import * as S from "./ChannelMemberDenyDialog.styles"

interface MemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  channelId: number;
  targetMember: ChannelMember;
}

const ChannelMemberDenyDialog = ({ open, onOpenChange, channelId, targetMember }: MemberDialogProps) => {
  const { mutate: denyMember, isPending } = useDenyChannelMember();

  const handleDeny = () => {
    denyMember({ channelId, targetMemberId: targetMember.memberId }, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
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
        <DialogHeader>
          <DialogTitle>멤버 입장 요청 거절</DialogTitle>
          <DialogDescription>
           <strong>{targetMember.username}</strong> 님의 참가 요청을 거절하시겠습니까?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>

          <Button type="button" variant="destructive" onClick={handleDeny} disabled={isPending}>
            {isPending ? "처리 중..." : "강제 퇴장"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChannelMemberDenyDialog;