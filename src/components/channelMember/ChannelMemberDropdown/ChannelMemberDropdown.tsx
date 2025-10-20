import { useChannelMemberDropdown } from "@/hooks/channelMember/useChannelMemberDropdown";
import { ChannelMember } from "@/types/channelMember.type";
import { ActionDropdown } from "@/components/common/ActionDropdown/ActionDropdown";
import ChannelMemberBanDialog from "../ChannelMemberKickDialog/ChannelMemberBanDialog";
import ChannelMemberRoleChangeDialog from "../ChannelMemberRoleChangeDialog/ChannelMemberRoleChangeDialog";
import * as S from "./ChannelMemberDropdown.styles";

type MemberDropdownProps = {
  channelId: number;
  targetMember: ChannelMember;
};

const ChannelMemberDropdown = ({ channelId, targetMember }: MemberDropdownProps) => {
  const {
    dropdown,
    roleDialog,
    banDialog,
    actions,
    canPerformActions,
  } = useChannelMemberDropdown({ channelId, targetMember });

  if (!canPerformActions) {
    return null;
  }

  return (
    <>
      <ActionDropdown
        aria-label="멤버 옵션"
        {...dropdown}
        actions={actions}
        triggerClassName={S.dropdownButton}
      />
      <ChannelMemberRoleChangeDialog
        {...roleDialog}
        channelId={channelId}
        targetMember={targetMember}
      />
      <ChannelMemberBanDialog
        {...banDialog}
        channelId={channelId}
        targetMember={targetMember}
      />
    </>
  );
};

export default ChannelMemberDropdown;