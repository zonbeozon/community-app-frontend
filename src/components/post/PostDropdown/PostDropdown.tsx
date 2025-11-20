import { useState, useMemo } from "react";
import { useAtomValue } from "jotai";
import { serverMemberAtom } from "@/atoms/authAtoms"; 
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

  const myServerInfo = useAtomValue(serverMemberAtom);
  const { data: myChannels } = useGetJoinedChannels();

  const myId = myServerInfo?.memberId;
  const myInfoInChannel = useMemo(() => {
    if (!myChannels) return null;
    return myChannels.find(c => c.channelInfo.channelId === channelId)?.membership;
  }, [myChannels, channelId]);

  if (!myInfoInChannel || !author || !myId) {
    return null;
  }
  
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
          channelId={channelId} 
        />
      )}
      {canDelete && (
        <DeletePostDialog 
          open={isDeleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          post={post}
          channelId={channelId} 
        />
      )}
    </>
  );
};

export default PostDropdown;