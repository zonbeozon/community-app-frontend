import { ActionDropdown } from '@/components/common/ActionDropdown/ActionDropdown';
import { useChatDropdown } from '@/hooks/chat/useChatDropdown';
import { ChatDeleteDialog } from '@/components/chat/ChatDeleteDialog/ChatDeleteDialog';
import type { ChatDropdownProps } from '@/types/chat.type';
import * as S from './ChatDropdown.styles';

export const ChatDropdown = ({ chatId, chattingGroupId }: ChatDropdownProps) => {
  const { dropdown, deleteDialog, actions } = useChatDropdown(chatId);

  return (
    <>
      <ActionDropdown aria-label="채팅 옵션" {...dropdown} actions={actions} triggerClassName={S.dropdownButton} />

      <ChatDeleteDialog chatId={chatId} chattingGroupId={chattingGroupId} {...deleteDialog} />
    </>
  );
};
