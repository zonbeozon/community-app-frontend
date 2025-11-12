import { useState, useEffect } from "react";
import { ChannelMember, ChannelRole } from "@/types/channelMember.type";
import useUpdateChannelMemberRole from "../useUpdateChannelMemberRole";

interface UseDialogProps {
  channelId: number;
  targetMember: ChannelMember;
  onSuccess?: () => void;
}

export const useChannelMemberRoleChangeDialog = ({
  channelId,
  targetMember,
  onSuccess,
}: UseDialogProps) => {
  const [selectedRole, setSelectedRole] = useState<ChannelRole>(targetMember.channelRole);
  const { mutateAsync: updateRole, isPending: isUpdating } = useUpdateChannelMemberRole();

  useEffect(() => {
    setSelectedRole(targetMember.channelRole);
  }, [targetMember]);

  const handleRoleChange = (role: string) => {
    setSelectedRole(role as ChannelRole);
  };

  const handleSubmit = async () => {
    try {
      await updateRole({
        channelId,
        memberId: targetMember.memberId,
        wantToRole: selectedRole,
      });
      onSuccess?.(); 
    } catch (error) {
    }
  };

  const isRoleUnchanged = targetMember.channelRole === selectedRole;

  return {
    selectedRole,
    isUpdating,
    isRoleUnchanged,
    handleRoleChange,
    handleSubmit,
  };
};