import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useUnbanChannelMember from "@/hooks/channelmember/useUnbanChannelMember";
import { ChannelMember } from "@/types/channelMember.type";
import * as S from "./ChannelMemberUnbanDialog.styles";

interface MemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  channelId: number;
  targetMember: ChannelMember;
}

const ChannelMemberUnbanDialog = ({ open, onOpenChange, channelId, targetMember }: MemberDialogProps) => {
  const { mutate: unbanMember, isPending } = useUnbanChannelMember();

  const handleUnban = () => {
    unbanMember({ channelId, targetMemberId: targetMember.memberId }, {
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
            추방 해제
        </Button>
      </DialogTrigger>
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
            {isPending ? "처리 중..." : "강제 퇴장"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChannelMemberUnbanDialog;