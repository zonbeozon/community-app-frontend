import { ActionDropdown } from '@/components/common/ActionDropdown/ActionDropdown';
import { useChatDropdown } from '@/hooks/chat/useChatDropdown';
import { ChatDeleteDialog } from '../ChatDeleteDialog/ChatDeleteDialog';
import * as S from './ChatDropdown.styles';

interface ChatDropdownProps {
  chatId: number;
  chattingGroupId: number;
}

export const ChatDropdown = ({ chatId, chattingGroupId }: ChatDropdownProps) => {
  const { dropdown, deleteDialog, actions } = useChatDropdown(chatId);

  return (
    <>
      <ActionDropdown aria-label="채팅 옵션" {...dropdown} actions={actions} triggerClassName={S.dropdownButton} />

      <ChatDeleteDialog chatId={chatId} chattingGroupId={chattingGroupId} {...deleteDialog} />
    </>
  );
};
