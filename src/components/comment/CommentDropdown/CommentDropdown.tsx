import { useState, useMemo } from "react";
import useGetMyServerMember from "@/queries/useGetServerMemberById";
import useGetJoinedChannels from "@/queries/useGetJoinedChannel";
import { Comment } from "@/types/comment.type";
import ChannelRoleManager from "@/utils/channelRoleManager";
import { ActionDropdown, DropdownAction } from "@/components/common/ActionDropdown/ActionDropdown";
import DeleteCommentDialog from "@/components/comment/CommentDeleteDialog/CommentDeleteDialog";
import * as S from "./CommentDropdown.styles";

interface CommentDropdownProps {
  comment: Comment;
  channelId: number;
}

const CommentDropdown = ({ comment, channelId }: CommentDropdownProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { data: myServerInfo } = useGetMyServerMember();
  const { data: myChannels } = useGetJoinedChannels();

  const myId = myServerInfo?.memberId;
  const myInfoInChannel = useMemo(() => {
    if (!myChannels) return null;
    return myChannels.find(c => c.channelInfo.channelId === channelId)?.requester;
  }, [myChannels, channelId]);

  if (!myInfoInChannel || !myId) {
    return null;
  }

  const isMyComment = myId === comment.authorId;
  const isChannelAdminOrOwner = ChannelRoleManager.isAdmin(myInfoInChannel.channelRole);
  
  const canDelete = isMyComment || isChannelAdminOrOwner;

  if (!canDelete) {
    return null;
  }

  const handleSelectDelete = () => {
    setIsDeleteDialogOpen(true);
    setIsDropdownOpen(false);
  };
  
  const actions: DropdownAction[] = [
    {
      label: "댓글 삭제",
      onSelect: handleSelectDelete,
      isDestructive: true,
    },
  ];

  return (
    <>
      <ActionDropdown
        aria-label="댓글 옵션"
        open={isDropdownOpen}
        onOpenChange={setIsDropdownOpen}
        actions={actions}
        triggerClassName={S.dropdownButton}
      />
      
      <DeleteCommentDialog 
        open={isDeleteDialogOpen}
        onOpen-change={setIsDeleteDialogOpen}
        comment={comment} 
      />
    </>
  );
};

export default CommentDropdown;