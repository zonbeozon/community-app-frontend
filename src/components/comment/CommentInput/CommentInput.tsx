import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as S from "./CommentInput.styles";

interface CommentInputProps {
  onSubmit: (content: string) => void;
}

const CommentInput = ({ onSubmit }: CommentInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = () => {
    const trimmedComment = comment.trim();
    if (!trimmedComment) return;
    onSubmit(trimmedComment);
    setComment("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.nativeEvent.isComposing) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={S.wrapper}>
      <Input
        ref={inputRef}
        placeholder="댓글을 입력해보세요!"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyDown={handleKeyDown}
        className={S.input}
      />
      <Button
        variant="ghost"
        onClick={handleSubmit}
        disabled={!comment.trim()}
        aria-label="댓글 전송"
      >
        <Send />
      </Button>
    </div>
  );
};

export default CommentInput;