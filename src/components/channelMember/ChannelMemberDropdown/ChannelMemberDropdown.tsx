import { useState, useMemo } from "react";
import { useAtomValue } from "jotai";
import useGetMyServerMember from "@/queries/useGetServerMemberById";
import useGetJoinedChannels from "@/queries/useGetJoinedChannel";
import { selectedChannelIdAtom } from "@/atoms/channelAtoms";
import { ChannelMember } from "@/types/channelMember.type";
import ChannelRoleManager from "@/utils/channelRoleManager";
import { ActionDropdown, DropdownAction } from "@/components/common/ActionDropdown/ActionDropdown";
import ChannelMemberBanDialog from "../ChannelMemberKickDialog/ChannelMemberBanDialog";
import ChannelMemberRoleChangeDialog from "../ChannelMemberRoleChangeDialog/ChannelMemberRoleChangeDialog";
import * as S from "./ChannelMemberDropdown.styles";

type MemberDropdownProps = {
  channelId: number;
  targetMember: ChannelMember;
};

const ChannelMemberDropdown = ({ channelId, targetMember }: MemberDropdownProps) => {
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [isBanDialogOpen, setIsBanDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { data: currentServerMember } = useGetMyServerMember();
  const { data: myChannels } = useGetJoinedChannels();

  const myRequesterInfo = useMemo(() => {
    if (!myChannels) return null;
    return myChannels.find(c => c.channelInfo.channelId === channelId)?.requester;
  }, [myChannels, channelId]);

  if (!myRequesterInfo || !currentServerMember) {
    return null;
  }

  const isSelf = currentServerMember.memberId === targetMember.memberId;
  if (isSelf) {
    return null;
  }

  const canManage = ChannelRoleManager.isRoleHigher(
    myRequesterInfo.channelRole,
    targetMember.channelRole
  );

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
      isRendered: canManage,
    },
    {
      label: "멤버 추방",
      onSelect: createSelectHandler(() => setIsBanDialogOpen(true)),
      isRendered: canManage,
      isDestructive: true,
    },
  ];

  const availableActions = actions.filter((action) => action.isRendered);
  if (availableActions.length === 0) {
    return null;
  }

  return (
    <>
      <ActionDropdown
        aria-label="멤버 옵션"
        open={isDropdownOpen}
        onOpenChange={setIsDropdownOpen}
        actions={availableActions}
        triggerClassName={S.dropdownButton}
      />
      <ChannelMemberRoleChangeDialog
        open={isRoleDialogOpen}
        onOpenChange={setIsRoleDialogOpen}
        channelId={channelId}
        targetMember={targetMember}
      />
      <ChannelMemberBanDialog
        open={isBanDialogOpen}
        onOpenChange={setIsBanDialogOpen}
        channelId={channelId}
        targetMemberId={targetMember.memberId}
      />
    </>
  );
};

export default ChannelMemberDropdown;