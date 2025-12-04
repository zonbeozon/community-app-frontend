import { latestChatByChattingGroupAtom } from '@/atoms/chatAtoms';
import { useSetAtom } from 'jotai';
import type { Chat } from '@/types/chat.type';

export const useUpdateLatestChat = () => {
  const setLatestChatMap = useSetAtom(latestChatByChattingGroupAtom);

  const updateLatestChat = (chattingGroupId: number, chat: Chat) => {
    setLatestChatMap((prev) => ({
      ...prev,
      [String(chattingGroupId)]: chat,
    }));
  };

  return updateLatestChat;
};
