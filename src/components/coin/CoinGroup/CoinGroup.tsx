import { MESSAGES } from '@/constants/messages';
import * as S from './CoinGroup.styles';
import { CoinItem } from '@/components/coin/CoinItem/CoinItem';
import type { ChattingGroupProps } from '@/types/chat.type';

export const CoinGroup = ({ title, chattingGroups }: ChattingGroupProps) => {
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
      <h3 className={S.title}>{title}</h3>
      <ul>
        {chattingGroups.map((coin) => (
          <CoinItem 
            key={coin.chattingGroupId} 
            coin={coin} 
          />
        ))}
      </ul>
    </div>
  );
};