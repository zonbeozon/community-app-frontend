import { useState } from 'react';
import { useDialog } from '@/hooks/common/useDialog';
import type { DropdownAction } from '@/types/common.type';

export const useChatDropdown = (chatId: number) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const deleteDialog = useDialog();

  const handleSelect = (openDialogFn: () => void) => {
    return () => {
      setIsDropdownOpen(false);
      openDialogFn();
    };
  };

  const actions: DropdownAction[] = [
    {
      label: '채팅 삭제',
      onSelect: handleSelect(deleteDialog.open),
      isDestructive: true,
    },
  ];

  return {
    dropdown: {
      open: isDropdownOpen,
      onOpenChange: setIsDropdownOpen,
    },
    deleteDialog: deleteDialog.props,
    actions,
  };
};
