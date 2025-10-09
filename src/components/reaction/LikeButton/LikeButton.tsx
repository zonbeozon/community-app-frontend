import { ThumbsUp } from 'lucide-react';
import { LikeButtonProps } from '@/types/reaction.type';
import * as S from './LikeButton.styles';

const LikeButton = ({ isLiked, count, onClick }: LikeButtonProps) => {
  return (
    <div className={S.wrapper}>
      <button
        onClick={onClick}
        className={S.button}
        aria-label="좋아요"
      >
        <ThumbsUp
          size={S.iconSize}
          className={S.icon(isLiked)}
        />
      </button>
      <span className={S.count(isLiked)}>
        {count}
      </span>
    </div>  
  );
};

export default LikeButton;