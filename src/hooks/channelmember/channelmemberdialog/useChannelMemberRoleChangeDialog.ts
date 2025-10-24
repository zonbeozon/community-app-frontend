// src/hooks/channelmember/useChannelMemberRoleChangeDialog.ts

import { useState, useEffect } from "react";
import { ChannelMember, ChannelRole } from "@/types/channelMember.type";
import useUpdateChannelMemberRole from "../useUpdateChannelMemberRole";

interface UseDialogProps {
  channelId: number;
  targetMember: ChannelMember;
  onSuccess?: () => void;
}

/**
 * 멤버 역할 변경 다이얼로그의 UI 상태와 상호작용 로직을 관리하는 훅입니다.
 * 선택된 역할 상태를 관리하고, 제출 시 `useUpdateChannelMemberRole` 훅을 호출합니다.
 */
export const useChannelMemberRoleChangeDialog = ({
  channelId,
  targetMember,
  onSuccess,
}: UseDialogProps) => {
  const [selectedRole, setSelectedRole] = useState<ChannelRole>(targetMember.channelRole);
  const { mutateAsync: updateRole, isPending: isUpdating } = useUpdateChannelMemberRole();

  // 부모 컴포넌트에서 targetMember prop이 변경될 경우,
  // 다이얼로그 내부의 선택된 역할 상태를 다시 초기화합니다.
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
      onSuccess?.(); // 성공 콜백 호출 (예: 다이얼로그 닫기)
    } catch (error) {
      // 에러 로깅은 useUpdateChannelMemberRole 훅에서 이미 처리하고 있습니다.
      // 필요 시 여기에 추가적인 UI 피드백을 줄 수 있습니다.
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