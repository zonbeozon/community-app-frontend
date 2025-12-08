import { ChannelMemberInfoDialog } from '@/components/channelMember/ChannelMemberInfoDialog/ChannelMemberInfoDialog';
import { CommentDropdown } from '@/components/comment/CommentDropdown/CommentDropdown';
import { TimeDisplay } from '@/components/common/TimeDisplay/TimeDisplay';
import { ServerMemberInfoDialog } from '@/components/serverMember/ServerMemberInfoDialog/ServerMemberInfoDialog';
import type { CommentItemProps } from '@/types/comment.type';
import * as S from './CommentItem.styles';

export const CommentItem = ({ comment, author, isCurrentUser, channelId }: CommentItemProps) => {
  const { content, createdAt } = comment;

  if (!author) {
    return null;
  }

  return (
    <div className="relative">
      <div className={`${S.commentRow} group`}>
        {isCurrentUser ? <ServerMemberInfoDialog /> : <ChannelMemberInfoDialog channelMember={author} />}
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
          <CommentDropdown channelId={channelId} comment={comment} />
        </div>
      </div>
    </div>
  );
}
