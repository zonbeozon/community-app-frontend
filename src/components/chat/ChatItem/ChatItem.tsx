import { memo } from 'react';
import { TimeDisplay } from '@/components/common/TimeDisplay/TimeDisplay';
import type { Chat } from '@/types/chat.type';
import { ChatDropdown } from '../ChatDropdown/ChatDropdown';
import * as S from './ChatItem.styles';

interface ChatItemProps {
  chat: Chat;
  isMe: boolean;
  chattingGroupId: number;
}

export const ChatItem = memo(({ chat, isMe, chattingGroupId }: ChatItemProps) => {
  const { chatId, content, author, createdAt } = chat;

  return (
    <li className={`${S.wrapper} ${isMe ? S.wrapperMe : S.wrapperOther}`}>
      {!isMe && <img src={author.profile?.imageUrl} alt={author.username} className={S.profileImage} />}

      <div className={`${S.contentGroup} ${isMe ? S.contentGroupMe : S.contentGroupOther}`}>
        {!isMe && <span className={S.nickname}>{author.username}</span>}

        <div className={`${S.bubbleRow} ${isMe ? S.bubbleRowMe : S.bubbleRowOther}`}>
          <div className={`${S.bubble} ${isMe ? S.bubbleMe : S.bubbleOther}`}>{content}</div>
          <span className={S.time}>
            <TimeDisplay createdAt={createdAt} />
          </span>
          {isMe && (
            <div className="flex items-center ml-1">
              <ChatDropdown chatId={chatId} chattingGroupId={chattingGroupId} />
            </div>
          )}
        </div>
      </div>
    </li>
  );
});

ChatItem.displayName = 'ChatItem';
