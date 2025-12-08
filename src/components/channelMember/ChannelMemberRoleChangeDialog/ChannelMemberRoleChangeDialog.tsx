import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Spinner } from '@/components/ui/spinner';
import { useUpdateChannelMemberRole } from '@/hooks/channelMember/useUpdateChannelMemberRole';
import type { ChannelMemberDialogProps, ChannelMemberRole } from '@/types/channelMember.type';
import * as S from './ChannelMemberRoleChangeDialog.styles';

export const ChannelMemberRoleChangeDialog = ({ open, onOpenChange, channelId, targetMember }: ChannelMemberDialogProps) => {
  const [selectedRole, setSelectedRole] = useState<ChannelMemberRole>(targetMember.channelRole);

  const { mutate: updateChannelMemberRole, isPending: isUpdating } = useUpdateChannelMemberRole();

  useEffect(() => {
    if (open && targetMember) {
      setSelectedRole(targetMember.channelRole);
    }
  });

  const handleRoleChange = (value: string) => {
    setSelectedRole(value as ChannelMemberRole);
  };

  const isRoleUnchanged = targetMember.channelRole === selectedRole;

  const handleSubmit = async () => {
    if (!targetMember) return;

    updateChannelMemberRole(
      {
        channelId,
        targetMemberId: targetMember.memberId,
        wantToRole: selectedRole,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      },
    );
  };

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
          <RadioGroup value={selectedRole} onValueChange={handleRoleChange} className={S.radioGroup}>
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

          <Button type="button" onClick={handleSubmit} disabled={isRoleUnchanged || isUpdating}>
            {isUpdating && <Spinner />}
            권한 수정
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
