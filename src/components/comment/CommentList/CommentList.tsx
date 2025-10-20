// src/components/comment/CommentList/CommentList.tsx

import { useMemo } from "react";
import { useAtomValue } from "jotai"; // Jotai 훅 추가
import { serverMemberAtom } from "@/atoms/authAtoms"; // 사용자 정보 Atom 추가
import useGetComments from "@/queries/useGetComments";
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

  // 1. Jotai Atom에서 현재 로그인된 사용자의 정보를 가져옵니다.
  const myInfo = useAtomValue(serverMemberAtom);
  
  // 2. myInfo?.memberId를 사용하여 currentUserId를 할당합니다.
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
          // 3. isCurrentUser 비교 로직이 정상적으로 동작합니다.
          isCurrentUser={commentData.author.memberId === currentUserId}
          channelId={channelId}
        />
      ))}
    </div>
  );
};

export default CommentList;