import { CoinItem } from '@/components/coin/CoinItem/CoinItem';
import { MESSAGES } from '@/constants/messages';
import type { CoinGroupProps } from '@/types/coin.type';
import * as S from './CoinGroup.styles';

export const CoinGroup = ({ title, coinGroups }: CoinGroupProps) => {
  if (!coinGroups || coinGroups.length === 0) {
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
        {coinGroups.map((coin) => (
          <CoinItem key={coin.chattingGroupId} coin={coin} />
        ))}
      </ul>
    </div>
  );
};
