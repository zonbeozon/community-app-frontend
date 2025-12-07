import { Link, useParams } from 'react-router-dom';
import * as S from './CoinItem.styles';
import type { Coin } from '@/types/coin.type';

export const CoinItem = ({ coin }: { coin: Coin }) => {
  const { symbol: currentUrlSymbol } = useParams<{ symbol: string }>();
  
  const { name, logo, symbol } = coin;

  const isSelected = String(coin.symbol) === currentUrlSymbol;


  return (
    <li className={S.wrapper}>
      <Link to={`/info/coin/${symbol}`} className={S.itemWrapper(isSelected)}>
        <div className={S.profileImage}> 
           <img 
             src={logo} 
             alt={`${name} logo`} 
             style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} 
           />
        </div>

        <div className={S.contentWrapper}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p className={S.title}>{name}</p>
            <span style={{ fontSize: '12px', color: '#999', marginLeft: '4px' }}>
              {symbol}
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
};