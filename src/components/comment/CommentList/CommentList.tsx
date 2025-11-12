import { useMemo } from "react";
import { useAtomValue } from "jotai"; 
import { serverMemberAtom } from "@/atoms/authAtoms"; 
import useGetComments from "@/queries/useGetComments";
import { Comment } from "@/types/comment.type";
import { ChannelMember } from "@/types/channelMember.type";
import CommentItem from "@/components/comment/CommentItem/CommentItem";
import ItemSkeleton from "@/components/common/ItemSkeleton/ItemSkeleton";
import { MESSAGES } from "@/constants/messages";
import * as S from "./CommentList.styles";

interface CommentListProps {
  postId: number;
  channelId: number;
}

type CommentWithAuthor = Comment & { author: ChannelMember };

const CommentList = ({ postId, channelId }: CommentListProps) => {
  const { data: commentsData, isLoading, isError } = useGetComments(postId);
  const myInfo = useAtomValue(serverMemberAtom);
  const currentUserId = myInfo?.memberId;

  const commentsWithAuthors = useMemo((): CommentWithAuthor[] => {
    const comments = commentsData?.comments || [];
    const authors = commentsData?.authors || [];

    if (authors.length === 0 || comments.length === 0) {
      return [];
    }
    const authorMap = authors.reduce((map, author) => {
      map[author.memberId] = author;
      return map;
    }, {} as { [key: number]: ChannelMember });

    return comments
      .map(comment => {
        const author = authorMap[comment.authorId];
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