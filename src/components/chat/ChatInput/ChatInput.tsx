import { useEffect, useRef, useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import * as S from './ChatInput.styles';
import { useCreateChat } from '@/hooks/chat/useCreateChat';

export const ChatInput = ({ chattingGroupId }: { chattingGroupId: number }) => {
  
  const inputRef = useRef<HTMLInputElement>(null);
  const [chat, setChat] = useState('');
  
  const { mutate: createChat } = useCreateChat(); 

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = () => {
    const trimmedChat = chat.trim();
    
    if (!trimmedChat || !chattingGroupId) return;

    createChat({ 
      chattingGroupId, 
      payload: { 
        content: trimmedChat,
        imageIds: [],
      } 
    });
    
    setChat('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={S.wrapper}>
        <>
          <Input
            ref={inputRef}
            placeholder="채팅을 입력해보세요!"
            value={chat}
            onChange={(e) => setChat(e.target.value)}
            onKeyDown={handleKeyDown}
            className={S.input}
          />
          <Button variant="ghost" onClick={handleSubmit} disabled={!chat.trim()} aria-label="채팅 전송">
            <Send />
          </Button>
        </>
    </div>
  );
};