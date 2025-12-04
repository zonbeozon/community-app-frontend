import { useEffect, useRef } from 'react';
import { useGetChats } from '@/queries/useGetChats';
import { ChatItem } from '../ChatItem/ChatItem';
import { useAtomValue } from 'jotai';
import { serverMemberAtom } from '@/atoms/authAtoms';
import { useChatSubscription } from '@/stomp/hooks/useChatSubscription';
import * as S from './ChatList.styles';

interface ChatListProps {
  chattingGroupId: number;
}

export const ChatList = ({ chattingGroupId }: ChatListProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const { data: chatList, isLoading } = useGetChats(chattingGroupId);

  const myInfo = useAtomValue(serverMemberAtom);

  useChatSubscription(chattingGroupId)

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatList]);

  if (isLoading) {
    return <div className={S.emptyState}>로딩 중...</div>;
  }

  if (!chatList || chatList.length === 0) {
    return <div className={S.emptyState}>첫 번째 메시지를 남겨보세요!</div>;
  }

  return (
    <ul className={S.container}>
      {chatList.map((chat) => (
        <ChatItem 
          key={chat.chatId} 
          chat={chat} 
          isMe={chat.author.memberId === myInfo?.memberId} 
        />
      ))}
      <div ref={bottomRef} />
    </ul>
  );
};