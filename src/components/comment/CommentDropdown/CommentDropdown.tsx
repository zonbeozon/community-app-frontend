// src/components/comment/CommentDropdown/CommentDropdown.tsx

import { useState, useMemo } from "react";
import { useAtomValue } from "jotai"; // Jotai 훅 추가
import { serverMemberAtom } from "@/atoms/authAtoms"; // 사용자 정보 Atom 추가
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

  // 1. Jotai Atom에서 현재 로그인된 사용자의 정보를 가져옵니다.
  const myServerInfo = useAtomValue(serverMemberAtom);
  const { data: myChannels } = useGetJoinedChannels();

  // 2. myId를 Jotai로부터 온 정보로 직접 할당합니다.
  const myId = myServerInfo?.memberId;
  const myInfoInChannel = useMemo(() => {
    if (!myChannels) return null;
    return myChannels.find(c => c.channelInfo.channelId === channelId)?.membership;
  }, [myChannels, channelId]);
  
  // 3. 이제 myId가 Jotai로부터 오므로, 정상적으로 null 체크가 가능합니다.
  if (!myInfoInChannel || !myId) {
    return null;
  }

  // 4. 나머지 로직은 myId가 올바르게 설정되었으므로 정상적으로 동작합니다.
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
        onOpenChange={setIsDeleteDialogOpen}
        comment={comment} 
      />
    </>
  );
};

export default CommentDropdown;