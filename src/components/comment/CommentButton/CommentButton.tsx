import { MessageCircleIcon } from "lucide-react";
import { Post } from "@/types/post.type";
import * as S from "./CommentButton.styles"; 

interface CommentButtonProps {
  post: Post;
  onClick: () => void;
}

const CommentButton = ({ post, onClick }: CommentButtonProps) => {
  return (
    <div className={S.wrapper}>
      <button
        onClick={onClick}
        className={S.button}
        aria-label="댓글 보기"
      >
        <MessageCircleIcon 
          size={16} 
          className={S.icon} 
        />
      </button>
      <span className={S.count}>
        {post.metric.commentCount}
      </span>
    </div>
  );
};

export default CommentButton;