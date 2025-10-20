import { useState, useMemo } from "react";
import { useAtomValue } from "jotai";
import { serverMemberAtom } from "@/atoms/authAtoms";
import useGetJoinedChannels from "@/queries/useGetJoinedChannel";
import { ChannelMember } from "@/types/channelMember.type";
import ChannelRoleManager from "@/utils/channelRoleManager";
import { DropdownAction } from "@/components/common/ActionDropdown/ActionDropdown";

interface UseChannelMemberDropdownProps {
  channelId: number;
  targetMember: ChannelMember;
}

export const useChannelMemberDropdown = ({ channelId, targetMember }: UseChannelMemberDropdownProps) => {
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [isBanDialogOpen, setIsBanDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentServerMember = useAtomValue(serverMemberAtom);
  const { data: myChannels } = useGetJoinedChannels();

  const myRequesterInfo = useMemo(() => {
    if (!myChannels) return null;
    return myChannels.find(c => c.channelInfo.channelId === channelId)?.membership || null;
  }, [myChannels, channelId]);

  const canPerformActions = useMemo(() => {
    if (!myRequesterInfo || !currentServerMember) {
      return false;
    }
    if (currentServerMember.memberId === targetMember.memberId) {
      return false; // Can't act on self
    }
    return ChannelRoleManager.isRoleHigher(
      myRequesterInfo.channelRole,
      targetMember.channelRole
    );
  }, [myRequesterInfo, currentServerMember, targetMember]);

  const createSelectHandler = (openDialog: () => void) => {
    return () => {
      openDialog();
      setIsDropdownOpen(false);
    };
  };

  const actions: DropdownAction[] = [
    {
      label: "멤버 권한 수정",
      onSelect: createSelectHandler(() => setIsRoleDialogOpen(true)),
      isRendered: canPerformActions,
    },
    {
      label: "멤버 추방",
      onSelect: createSelectHandler(() => setIsBanDialogOpen(true)),
      isRendered: canPerformActions,
      isDestructive: true,
    },
  ];

  return {
    dropdown: {
      open: isDropdownOpen,
      onOpenChange: setIsDropdownOpen,
    },
    roleDialog: {
      open: isRoleDialogOpen,
      onOpenChange: setIsRoleDialogOpen,
    },
    banDialog: {
      open: isBanDialogOpen,
      onOpenChange: setIsBanDialogOpen,
    },
    actions,
    canPerformActions,
  };
};