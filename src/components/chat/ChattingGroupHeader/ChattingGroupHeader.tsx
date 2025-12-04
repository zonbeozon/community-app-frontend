import { CoinBySymbol } from '@/types/coin.type';
import { CoinInfoDialog } from '../CoinInfoDialog/CoinInfoDialog';
import * as S from './ChattingGroupHeader.styles';

export const ChattingGroupHeader = ({ coin }: { coin: CoinBySymbol }) => {
  const formattedSupply = coin.totalSupply 
    ? Number(coin.totalSupply).toLocaleString() 
    : '-';

  return (
    <header className={S.wrapper}>
      <div className={S.leftGroup}>
        <div className={S.imageWrapper}>
          <CoinInfoDialog coin={coin} />
        </div>
        
        <div className={S.textContainer}>
          <h1 className={S.name}>
            {coin.localizedInfo.name}
          </h1>
          <span className={S.symbol}>
            {coin.symbol}
          </span>
        </div>
      </div>

      <div className={S.rightGroup}>
        <div className={S.subStat}>
          Rank #{coin.currencyRank}
        </div>
        <div className={S.mainStat}>
          Total ${coin.quote.marketCap.toFixed(1)}
        </div>
        
      </div>
    </header>
  );
};