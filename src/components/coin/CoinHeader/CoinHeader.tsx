import { CoinBySymbol } from '@/types/coin.type';
import { CoinInfoDialog } from '../CoinInfoDialog/CoinInfoDialog';
import { useRealTimeTrade } from '@/hooks/chart/useRealTimeTrade';
import * as S from './CoinHeader.styles';

export const CoinHeader = ({ coin }: { coin: CoinBySymbol }) => {
  // 훅을 사용하여 실시간(15초 갱신) 가격 가져오기
  const currentPrice = useRealTimeTrade(coin.symbol);

  return (
    <header className={S.wrapper}>
      <div className={S.leftGroup}>
        <div className={S.imageWrapper}>
          <img className='rounded-full' src={coin.logo} alt={coin.symbol} />
        </div>
        
        <div className={S.textContainer}>
          <h1 className={S.name}>
            {coin.localizedInfo.name}
          </h1>
          <span className={S.symbol}>
            {coin.symbol}
          </span>
          <span className={S.infoIconWrapper}>
            <CoinInfoDialog coin={coin}/>
          </span>
        </div>
      </div>

      <div className={S.rightGroup}>
        <div className={S.subStat}>
          Rank #{coin.currencyRank}
        </div>
        <div className={S.mainStat}>
          {currentPrice 
            ? `$${currentPrice.toLocaleString()}` 
            : 'Loading...'}
        </div>
      </div>
    </header>
  );
};