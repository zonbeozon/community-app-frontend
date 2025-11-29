import { MessageCircleIcon } from 'lucide-react';
import type { CommentButtonProps } from '@/types/comment.type';
import * as S from './CommentButton.styles';

export const CommentButton = ({ post, onClick }: CommentButtonProps) => {
  return (
    <div className={S.wrapper}>
      <button onClick={onClick} className={S.button} aria-label="댓글 보기">
        <MessageCircleIcon size={16} className={S.icon} />
      </button>
      <span className={S.count}>{post.metric.commentCount}</span>
    </div>
  );
};
