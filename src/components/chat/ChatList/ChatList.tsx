import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useGetChats } from '@/queries/useGetChats';
import { ChatItem } from '../ChatItem/ChatItem';
import { useAtomValue } from 'jotai';
import { serverMemberAtom } from '@/atoms/authAtoms';
import * as S from './ChatList.styles';

export const ChatList = () => {
  const { chattingGroupId } = useParams<{ chattingGroupId: string }>();
  const bottomRef = useRef<HTMLDivElement>(null);
  const { data: chatList, isLoading } = useGetChats(Number(chattingGroupId));

  const myInfo = useAtomValue(serverMemberAtom);

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