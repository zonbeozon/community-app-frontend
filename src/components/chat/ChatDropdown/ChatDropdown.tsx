import { ChatDeleteDialog } from '../ChatDeleteDialog/ChatDeleteDialog';
import { ActionDropdown } from '@/components/common/ActionDropdown/ActionDropdown';
import * as S from './ChatDropdown.styles';
import { useChatDropdown } from '@/hooks/chat/useChatDropdown';

interface ChatDropdownProps {
  chatId: number;
  chattingGroupId: number;
}

export const ChatDropdown = ({ chatId, chattingGroupId }: ChatDropdownProps) => {
  const { dropdown, deleteDialog, actions } = useChatDropdown(chatId);

  return (
    <>
      <ActionDropdown 
        aria-label="채팅 옵션" 
        {...dropdown} 
        actions={actions} 
        triggerClassName={S.dropdownButton} 
      />

      <ChatDeleteDialog 
        chatId={chatId} 
        chattingGroupId={chattingGroupId}
        {...deleteDialog} 
      />
    </>
  );
};