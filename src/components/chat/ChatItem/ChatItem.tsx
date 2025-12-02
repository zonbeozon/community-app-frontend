import { memo } from 'react';
import type { Chat } from '@/types/chat.type';
import * as S from './ChatItem.styles';

interface ChatItemProps {
  chat: Chat;
  isMe: boolean;
}

export const ChatItem = memo(({ chat, isMe }: ChatItemProps) => {
  const { content, author, createdAt } = chat;

  const formattedTime = new Date(createdAt).toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <li className={`${S.wrapper} ${isMe ? S.wrapperMe : S.wrapperOther}`}>
      
      {!isMe && (
        <img 
          src={author.profile?.imageUrl} 
          alt={author.username} 
          className={S.profileImage} 
        />
      )}

      <div className={`${S.contentGroup} ${isMe ? S.contentGroupMe : S.contentGroupOther}`}>
        
        {!isMe && <span className={S.nickname}>{author.username}</span>}

        <div className={`${S.bubbleRow} ${isMe ? S.bubbleRowMe : S.bubbleRowOther}`}>
          
          <div className={`${S.bubble} ${isMe ? S.bubbleMe : S.bubbleOther}`}>
            {content}
          </div>

          <span className={S.time}>{formattedTime}</span>
        </div>
      </div>
    </li>
  );
});

ChatItem.displayName = 'ChatItem';