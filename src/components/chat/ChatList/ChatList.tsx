import { useEffect, useRef } from 'react';
import { serverMemberAtom } from '@/atoms/authAtoms';
import { useAtomValue, useSetAtom } from 'jotai';
import { latestChatByChattingGroupAtom } from '@/atoms/chatAtoms';
import { useGetChats } from '@/queries/useGetChats';
import { useChatSubscription } from '@/stomp/hooks/useChatSubscription';
import { ChatItem } from '../ChatItem/ChatItem';
import * as S from './ChatList.styles';

export const ChatList = ({ chattingGroupId }: { chattingGroupId: number }) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const { data: chatList, isLoading } = useGetChats(chattingGroupId);

  const myInfo = useAtomValue(serverMemberAtom);
  const setLatestChatMap = useSetAtom(latestChatByChattingGroupAtom);

  useChatSubscription(chattingGroupId);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatList]);

  useEffect(() => {
    if (chatList) {
      const latestChat = chatList.length > 0 ? chatList[0] : null;

      setLatestChatMap((prev) => ({
        ...prev,
        [String(chattingGroupId)]: latestChat,
      }));
    }
  }, [chatList, chattingGroupId, setLatestChatMap]);

  if (isLoading) {
    return <div className={S.emptyState}>로딩 중...</div>;
  }

  if (!chatList || chatList.length === 0) {
    return <div className={S.emptyState}>첫 번째 메시지를 남겨보세요!</div>;
  }

  return (
    <ul className={S.container}>
      {chatList
        .slice()
        .reverse()
        .map((chat) => (
          <ChatItem
            key={chat.chatId}
            chat={chat}
            isMe={chat.author.memberId === myInfo?.memberId}
            chattingGroupId={chattingGroupId}
          />
        ))}
      <div ref={bottomRef} style={{ height: 0, margin: 0, padding: 0, flexShrink: 0 }} />
    </ul>
  );
};
