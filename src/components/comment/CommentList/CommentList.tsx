import { useMemo } from "react";
import useGetComments from "@/queries/useGetComments";
import useGetMyServerMember from "@/queries/useGetServerMemberById";
import { Comment } from "@/types/comment.type";
import { ChannelMember } from "@/types/channelMember.type";
import CommentItem from "@/components/comment/CommentItem/CommentItem";
import ItemSkeleton from "@/components/common/ItemSkeleton/ItemSkeleton";
import { MESSAGES } from "@/constants/message";
import * as S from "./CommentList.styles";

interface CommentListProps {
  postId: number;
  channelId: number;
}

type CommentWithAuthor = Comment & { author: ChannelMember };

const CommentList = ({ postId, channelId }: CommentListProps) => {
  const { data: commentsData, isLoading, isError } = useGetComments(postId);
  const { data: myInfo } = useGetMyServerMember();
  const currentUserId = myInfo?.memberId;

  const commentsWithAuthors = useMemo((): CommentWithAuthor[] => {
    const comments = commentsData?.comments || [];
    const authors = commentsData?.authors || {};
    
    return comments
      .map(comment => {
        const author = authors[comment.authorId];
        if (!author) return null;
        return { ...comment, author };
      })
      .filter((c): c is CommentWithAuthor => !!c);
  }, [commentsData]);

  if (isLoading) {
    return <>{Array.from({ length: 3 }).map((_, i) => <ItemSkeleton key={i} />)}</>;
  }
  
  if (isError || commentsWithAuthors.length === 0) {
    return (
      <p className={S.emptyMessage}>
        {MESSAGES.NO_COMMENTS_WRITTEN}
      </p>
    );
  }

  return (
    <div>
      {commentsWithAuthors.map((commentData) => (     
        <CommentItem
          key={commentData.commentId}
          comment={commentData}
          author={commentData.author}
          isCurrentUser={commentData.author.memberId === currentUserId}
          channelId={channelId}
        />
      ))}
    </div>
  );
};

export default CommentList;