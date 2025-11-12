import { useState } from "react";
import { Comment } from "@/types/comment.type";
import { ChannelMember } from "@/types/channelMember.type";
import ChannelMemberInfoDialog from "@/components/channelmember/ChannelMemberInfoDialog/ChannelMemberInfoDialog";
import ServerMemberInfoDialog from "@/components/servermember/ServerMemberInfoDialog/ServerMemberInfoDialog";
import CommentDropdown from "../CommentDropdown/CommentDropdown";
import TimeDisplay from "@/components/common/TimeDisplay/TimeDisplay";
import * as S from "./CommentItem.styles";

interface CommentItemProps {
  comment: Comment;
  author: ChannelMember;
  isCurrentUser: boolean;
  channelId: number;
}

export default function CommentItem({ 
  comment, 
  author, 
  isCurrentUser, 
  channelId 
}: CommentItemProps) {
  const { content, createdAt } = comment;
  const [isServerMemberInfoOpen, setServerMemberInfoOpen] = useState(false);
  const [isChannelMemberInfoOpen, setChannelMemberInfoOpen] = useState(false);

  if (!author) {
    return null;
  }

  return (
    <div className="relative">
      <div className={`${S.commentRow} group`}>
        {isCurrentUser ? (
          <ServerMemberInfoDialog
            open={isServerMemberInfoOpen}
            onOpenChange={setServerMemberInfoOpen}
          />
        ) : (
          <ChannelMemberInfoDialog
            open={isChannelMemberInfoOpen}
            onOpenChange={setChannelMemberInfoOpen}
            channelMember={author}
          />
        )}
        <div className={S.commentContent}>
          <div className={S.commentHeader}>
            <span className={S.username}>{author.username}</span>
            <TimeDisplay createdAt={createdAt} />
          </div>
          <p className={S.commentText}>{content}</p>
        </div>
      </div>
      <div className={S.dropdownContainer}>
        <div className={S.dropdownButtonWrapper}>
          <CommentDropdown
            channelId={channelId}
            comment={comment}
          />
        </div>
      </div>
    </div>
  );
}