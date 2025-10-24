import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2 } from "lucide-react";
import { ChannelMember } from "@/types/channelMember.type";
import { useChannelMemberRoleChangeDialog } from "@/hooks/channelmember/channelmemberdialog/useChannelMemberRoleChangeDialog";
import * as S from "./ChannelMemberRoleChangeDialog.styles";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  channelId: number;
  targetMember: ChannelMember;
}

const ChannelMemberRoleChangeDialog = ({ open, onOpenChange, channelId, targetMember }: DialogProps) => {
  const {
    selectedRole,
    isUpdating,
    isRoleUnchanged,
    handleRoleChange,
    handleSubmit,
  } = useChannelMemberRoleChangeDialog({
    channelId,
    targetMember,
    onSuccess: () => onOpenChange(false), // 성공 시 다이얼로그를 닫도록 콜백 전달
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={S.content}>
        <DialogHeader>
          <DialogTitle>멤버 권한 수정</DialogTitle>
          <DialogDescription>
            <strong>{targetMember.username}</strong> 님의 권한을 변경합니다.
          </DialogDescription>
        </DialogHeader>

        <div className={S.radioGroupContainer}>
          <RadioGroup
            value={selectedRole}
            onValueChange={handleRoleChange}
            className={S.radioGroup}
          >
            <Label htmlFor="role-admin" className={S.radioLabel}>
              <RadioGroupItem value="CHANNEL_ADMIN" id="role-admin" />
              관리자 (Admin)
            </Label>
            <Label htmlFor="role-member" className={S.radioLabel}>
              <RadioGroupItem value="CHANNEL_MEMBER" id="role-member" />
              일반 멤버 (Member)
            </Label>
          </RadioGroup>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>

          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isRoleUnchanged || isUpdating}
          >
            {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            권한 수정
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChannelMemberRoleChangeDialog;