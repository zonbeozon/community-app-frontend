import { MESSAGES } from '@/constants/messages';
import * as S from './ChattingGroup.styles';
import { ChattingGroupItem } from '../ChattingGroupItem/ChattingGroupItem';
import type { ChattingGroupProps } from '@/types/chat.type';

export const ChattingGroup = ({ title, chattingGroups }: ChattingGroupProps) => {
  if (!chattingGroups || chattingGroups.length === 0) {
    return (
      <div>
        <h3>{title}</h3>
        <p className={S.emptyMessage}>{MESSAGES.EMPTY_CHANNEL_GROUP}</p>
      </div>
    );
  }

  return (
    <div>
      <h3>{title}</h3>
      <ul>
        {chattingGroups.map((coin) => (
          <ChattingGroupItem 
            key={coin.chattingGroupId} 
            coin={coin} 
          />
        ))}
      </ul>
    </div>
  );
};