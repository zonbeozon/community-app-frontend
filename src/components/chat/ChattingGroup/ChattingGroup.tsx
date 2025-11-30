import { Link, useParams } from 'react-router-dom';
import { useLatestChat } from "@/hooks/useLatestChat"; 
import * as S from './ChattingGroup.styles';
import { Coin } from '@/types/coin.type';

export const ChattingGroup = ({ coin }: { coin: Coin }) => {
  const { chattingGroupId: currentUrlChattingGroupId } = useParams<{ chattingGroupId: string }>();
  
  const { chattingGroupId, name, logo, symbol } = coin;

  const latestChat = useLatestChat(chattingGroupId);

  const isSelected = String(chattingGroupId) === currentUrlChattingGroupId;

  return (
    <div className={S.wrapper}>
      <Link to={`/chats/${chattingGroupId}`} className={S.itemWrapper(isSelected)}>
    
        <div className={S.profileImage}> 
           <img 
             src={logo} 
             alt={`${name} logo`} 
             style={{ width: '40px', height: '40px', borderRadius: '50%' }} 
           />
        </div>

        <div className={S.contentWrapper}>
          <div>
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
    </div>
  );
};