import { CoinInfoDialog } from '@/components/coin/CoinInfoDialog/CoinInfoDialog';
import { useRealTimeTrade } from '@/hooks/chart/useRealTimeTrade';
import type { CoinBySymbol } from '@/types/coin.type';
import * as S from './CoinHeader.styles';

export const CoinHeader = ({ coin }: { coin: CoinBySymbol }) => {
  const currentPrice = useRealTimeTrade(coin.symbol);

  return (
    <header className={S.wrapper}>
      <div className={S.leftGroup}>
        <div className={S.imageWrapper}>
          <img className="rounded-full" src={coin.logo} alt={coin.symbol} />
        </div>

        <div className={S.textContainer}>
          <h1 className={S.name}>{coin.localizedInfo.name}</h1>
          <span className={S.symbol}>{coin.symbol}</span>
          <span className={S.infoIconWrapper}>
            <CoinInfoDialog coin={coin} />
          </span>
        </div>
      </div>

      <div className={S.rightGroup}>
        <div className={S.subStat}>Rank #{coin.currencyRank}</div>
        <div className={S.mainStat}>{currentPrice ? `$${currentPrice.toLocaleString()}` : 'Loading...'}</div>
      </div>
    </header>
  );
};
