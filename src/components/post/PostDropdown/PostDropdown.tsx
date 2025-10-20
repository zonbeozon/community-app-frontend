// src/components/post/PostDropdown/PostDropdown.tsx

import { useState, useMemo } from "react";
import { useAtomValue } from "jotai"; // Jotai 훅 추가
import { serverMemberAtom } from "@/atoms/authAtoms"; // 사용자 정보 Atom 추가
import { Post } from "@/types/post.type";
import { ChannelMember } from "@/types/channelMember.type";
import ChannelRoleManager from "@/utils/channelRoleManager";
import useGetJoinedChannels from "@/queries/useGetJoinedChannel";
import { ActionDropdown, DropdownAction } from "@/components/common/ActionDropdown/ActionDropdown";
import PostUpdateDialog from "../PostUpdateDialog/PostUpdateDialog";
import DeletePostDialog from "@/components/post/PostDeleteDialog/PostDeleteDialog";
import * as S from "./PostDropdown.styles";

interface PostDropdownProps {
  post: Post;
  author: ChannelMember;
  channelId: number;
}

const PostDropdown = ({ post, author, channelId }: PostDropdownProps) => {
  const [isPatchDialogOpen, setPatchDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
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
  if (!myInfoInChannel || !author || !myId) {
    return null;
  }
  
  // 4. 나머지 권한 체크 로직은 myId가 올바르게 설정되었으므로 정상적으로 동작합니다.
  const isMyPost = myId === post.authorId;
  const canManagePost = ChannelRoleManager.isRoleHigher(
    myInfoInChannel.channelRole,
    author.channelRole
  );

  const canEdit = isMyPost;
  const canDelete = isMyPost || canManagePost;

  const createSelectHandler = (setter: (isOpen: boolean) => void) => {
    return () => {
      setter(true); 
      setIsDropdownOpen(false); 
    };
  };
  
  const actions: DropdownAction[] = [
    {
      label: "포스트 수정",
      onSelect: createSelectHandler(setPatchDialogOpen),
      isRendered: canEdit,
    },
    {
      label: "포스트 삭제",
      onSelect: createSelectHandler(setDeleteDialogOpen),
      isRendered: canDelete,
      isDestructive: true,
    },
  ];

  const availableActions = actions.filter(action => action.isRendered);
  if (availableActions.length === 0) {
    return null;
  }

  return (
    <>
      <ActionDropdown
        aria-label="포스트 옵션"
        open={isDropdownOpen}
        onOpenChange={setIsDropdownOpen}
        actions={availableActions}
        triggerClassName={S.dropdownButton}
      />
      
      {canEdit && (
        <PostUpdateDialog
          open={isPatchDialogOpen}
          onOpenChange={setPatchDialogOpen}
          post={post} 
        />
      )}
      {canDelete && (
        <DeletePostDialog 
          open={isDeleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          post={post}
        />
      )}
    </>
  );
};

export default PostDropdown;