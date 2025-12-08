import { useState } from 'react';
import { useDialog } from '@/hooks/common/useDialog';
import { channelMemberRoleManager } from '@/utils/channelMemberRoleManager';
import type { Channel } from '@/types/channel.type';
import type { DropdownAction } from '@/types/common.type';

export const useChannelDropdown = (channel: Channel) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const manageDialog = useDialog();
  const updateDialog = useDialog();
  const leaveDialog = useDialog();
  const deleteDialog = useDialog();

  const isChannelOwner = channelMemberRoleManager.isOwner(channel.membership?.channelRole);

  const handleSelect = (openDialogFn: () => void) => {
    return () => {
      setIsDropdownOpen(false);
      openDialogFn();
    };
  };

  const actions: DropdownAction[] = [
    {
      label: '채널 관리',
      onSelect: handleSelect(manageDialog.open),
      isRendered: isChannelOwner,
    },
    {
      label: '채널 수정',
      onSelect: handleSelect(updateDialog.open),
      isRendered: isChannelOwner,
    },
    {
      label: '채널 나가기',
      onSelect: handleSelect(leaveDialog.open),
      isRendered: !isChannelOwner,
      isDestructive: true,
    },
    {
      label: '채널 삭제',
      onSelect: handleSelect(deleteDialog.open),
      isRendered: isChannelOwner,
      isDestructive: true,
    },
  ];

  return {
    dropdown: {
      open: isDropdownOpen,
      onOpenChange: setIsDropdownOpen,
    },
    manageDialog: manageDialog.props,
    updateDialog: updateDialog.props,
    deleteDialog: deleteDialog.props,
    leaveDialog: leaveDialog.props,
    actions,
  };
};
