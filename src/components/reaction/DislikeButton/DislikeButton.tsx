import { ThumbsDown } from 'lucide-react';
import type { DislikeButtonProps } from '@/types/reaction.type';
import * as S from './DislikeButton.styles';

export const DislikeButton = ({ isDisliked, count, onClick }: DislikeButtonProps) => {
  return (
    <div className={S.wrapper}>
      <button onClick={onClick} className={S.button} aria-label="싫어요">
        <ThumbsDown size={S.iconSize} className={S.icon(isDisliked)} />
      </button>
      <span className={S.count(isDisliked)}>{count}</span>
    </div>
  );
};
