import { useEffect, useRef, useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useChannelLogic } from '@/hooks/channel/useChannelLogic';
import type { CommentInputProps } from '@/types/comment.type';
import * as S from './CommentInput.styles';

export const CommentInput = ({ onSubmit }: CommentInputProps) => {
  const { isMember } = useChannelLogic();
  const inputRef = useRef<HTMLInputElement>(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = () => {
    const trimmedComment = comment.trim();
    if (!trimmedComment) return;
    onSubmit(trimmedComment);
    setComment('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={S.wrapper}>
      {isMember ? (
        <>
          <Input
            ref={inputRef}
            placeholder="댓글을 입력해보세요!"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleKeyDown}
            className={S.input}
          />
          <Button variant="ghost" onClick={handleSubmit} disabled={!comment.trim()} aria-label="댓글 전송">
            <Send />
          </Button>
        </>
      ) : (
        <Input disabled placeholder="채널 참가 후 댓글을 남길 수 있습니다." className={S.input} />
      )}
    </div>
  );
};
