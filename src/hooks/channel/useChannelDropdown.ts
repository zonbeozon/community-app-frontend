import { useState } from "react";
import { Channel } from "@/types/channel.type";
import ChannelRoleManager from "@/utils/channelRoleManager";
import { DropdownAction } from "@/components/common/ActionDropdown/ActionDropdown";

export const useChannelDropdown = (channel: Channel) => {
  const [isManageDialogOpen, setIsManageDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isChannelOwner = ChannelRoleManager.isOwner(channel.membership?.channelRole);

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

  return {
    dropdown: {
      open: isDropdownOpen,
      onOpenChange: setIsDropdownOpen,
    },
    manageDialog: {
      open: isManageDialogOpen,
      onOpenChange: setIsManageDialogOpen,
    },
    updateDialog: {
      open: isUpdateDialogOpen,
      onOpenChange: setIsUpdateDialogOpen,
    },
    deleteDialog: {
      open: isDeleteDialogOpen,
      onOpenChange: setIsDeleteDialogOpen,
    },
    leaveDialog: {
      open: isLeaveDialogOpen,
      onOpenChange: setIsLeaveDialogOpen,
    },
    actions,
  };
};