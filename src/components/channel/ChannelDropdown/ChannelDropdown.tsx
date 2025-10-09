import { useState } from "react";
import { Channel } from "@/types/channel.type";
import ChannelRoleManager from "@/utils/channelRoleManager";
import { ActionDropdown, DropdownAction } from "@/components/common/ActionDropdown/ActionDropdown";
import ChannelUpdateDialog from "@/components/channel/ChannelUpdateDialog/ChannelUpdateDialog";
import ChannelLeaveDialog from "@/components/channel/ChannelLeaveDialog/ChannelLeaveDialog";
import ChannelDeleteDialog from "@/components/channel/ChannelDeleteDialog/ChannelDeleteDialog";
import ChannelManageDialog from "@/components/channel/ChannelManageDialog/ChannelManageDialog";
import * as S from "./ChannelDropdown.styles";

const ChannelDropdown = ({ channel }: { channel: Channel }) => {
  const [isManageDialogOpen, setIsManageDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const requester = channel.requester;
  const channelId = channel.channelInfo.channelId;
  const isChannelOwner = ChannelRoleManager.isOwner(requester?.channelRole);

  const createSelectHandler = (openDialog: () => void) => {
    return () => {
      openDialog();
      setIsDropdownOpen(false);
    };
  };
  
  const actions: DropdownAction[] = [
    {
      label: "채널 관리",
      onSelect: createSelectHandler(() => setIsManageDialogOpen(true)),
      isRendered: isChannelOwner,
    },
    {
      label: "채널 수정",
      onSelect: createSelectHandler(() => setIsUpdateDialogOpen(true)),
      isRendered: isChannelOwner,
    },
    {
      label: "채널 나가기",
      onSelect: createSelectHandler(() => setIsLeaveDialogOpen(true)),
      isRendered: !isChannelOwner,
      isDestructive: true,
    },
    {
      label: "채널 삭제",
      onSelect: createSelectHandler(() => setIsDeleteDialogOpen(true)),
      isRendered: isChannelOwner,
      isDestructive: true,
    },
  ];

  return (
    <>
      <ActionDropdown
        aria-label="채널 옵션"
        open={isDropdownOpen}
        onOpenChange={setIsDropdownOpen}
        actions={actions}
        triggerClassName={S.dropdownButton}
      /> 
      
      <ChannelManageDialog
        open={isManageDialogOpen}
        onOpenChange={setIsManageDialogOpen}
        channelId={channelId}
      />
      <ChannelUpdateDialog
        open={isUpdateDialogOpen}
        onOpenChange={setIsUpdateDialogOpen}
        channelId={channelId}
      />
      <ChannelDeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        channelId={channelId}
      />
      <ChannelLeaveDialog
        open={isLeaveDialogOpen}
        onOpenChange={setIsLeaveDialogOpen}
        channelId={channelId}
      />
    </>
  );
};

export default ChannelDropdown;