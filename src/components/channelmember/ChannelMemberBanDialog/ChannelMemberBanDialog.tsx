import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useBanChannelMember from "@/hooks/channelmember/useBanChannelMember";
import { ChannelMember } from "@/types/channelMember.type";
import * as S from "./ChannelMemberBanDialog.styles";

interface MemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  channelId: number;
  targetMember: ChannelMember;
  onSuccess?: () => void;
}

const ChannelMemberBanDialog = ({ open, onOpenChange, channelId, targetMember, onSuccess }: MemberDialogProps) => {
  const { mutate: banMember, isPending } = useBanChannelMember();

  const handleBan = () => {
    banMember({ channelId, targetMemberId: targetMember.memberId }, {
      onSuccess: () => {
        onSuccess?.();
        onOpenChange(false);
      },
    });
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
            {isPending ? "처리 중..." : "추방하기"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChannelMemberBanDialog;