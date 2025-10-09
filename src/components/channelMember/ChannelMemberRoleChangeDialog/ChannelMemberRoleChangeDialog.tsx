import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useUpdateChannelMemberRole from "@/hooks/channelMember/useUpdateChannelMemberRole";
import { ChannelMember, ChannelRole } from "@/types/channelMember.type";
import * as S from "./ChannelMemberRoleChangeDialog.styles";

interface ChannelMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  channelId: number;
  targetMember: ChannelMember;
}

const ChannelMemberRoleChangeDialog = ({ open, onOpenChange, channelId, targetMember }: ChannelMemberDialogProps) => {
  const [newRole, setNewRole] = useState<ChannelRole>(targetMember.channelRole);
  const updateChannelMemberRoleHandler = useUpdateChannelMemberRole();

  const handleChangeRole = async () => {
    try {
      await updateChannelMemberRoleHandler(channelId, targetMember.memberId, newRole);
    } finally {
      onOpenChange(false);
    }
  };

  const isRoleUnchanged = targetMember.channelRole === newRole;

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
            value={newRole}
            onValueChange={(value) => setNewRole(value as ChannelRole)}
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
            variant="destructive"
            onClick={handleChangeRole}
            disabled={isRoleUnchanged}
          >
            권한 수정
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChannelMemberRoleChangeDialog;