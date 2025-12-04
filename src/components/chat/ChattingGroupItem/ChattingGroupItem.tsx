import { Link, useParams } from 'react-router-dom';
import { useLatestPost } from '@/hooks/post/useLatestPost';
import * as S from './ChattingGroupItem.styles';
import type { Coin } from '@/types/coin.type';

export const ChattingGroupItem = ({ coin }: { coin: Coin }) => {
  const { chattingGroupId: currentUrlChattingGroupId } = useParams<{ chattingGroupId: string }>();
  
  const { chattingGroupId, name, logo, symbol } = coin;

  const latestChat = useLatestPost(chattingGroupId);
  const isSelected = String(chattingGroupId) === currentUrlChattingGroupId;

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

          {latestChat ? (
            <p className={S.latestChat}>{latestChat.content}</p>
          ) : (
            <p className={S.latestChat}>대화가 없습니다.</p>
          )}
        </div>
      </Link>
    </li>
  );
};