import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useApproveChannelMember from "@/hooks/channelmember/useApproveChannelMember";
import { ChannelMember } from "@/types/channelMember.type";
import * as S from "./ChannelMemberApproveDialog.styles";

interface MemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  channelId: number;
  targetMember: ChannelMember;
}

const ChannelMemberApproveDialog = ({
  open,
  onOpenChange,
  channelId,
  targetMember,
}: MemberDialogProps) => {
  const { mutate: approveMember, isPending } = useApproveChannelMember();

  const handleApprove = () => {
    approveMember(
      { channelId, targetMemberId: targetMember.memberId },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      }
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
        <DialogHeader>
          <DialogTitle>멤버 입장 요청 수락</DialogTitle>
          <DialogDescription>
            <strong>{targetMember.username}</strong> 님의 참가 요청을
            수락하시겠습니까?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type="button" onClick={handleApprove} disabled={isPending}>
            {isPending ? "처리 중..." : "수락"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            취소
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChannelMemberApproveDialog;
