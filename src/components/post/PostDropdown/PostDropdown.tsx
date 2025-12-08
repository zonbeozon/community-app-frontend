import { useMemo, useState } from 'react';
import { serverMemberAtom } from '@/atoms/authAtoms';
import { useGetJoinedChannels } from '@/queries/useGetJoinedChannel';
import { useAtomValue } from 'jotai';
import { ActionDropdown } from '@/components/common/ActionDropdown/ActionDropdown';
import { PostDeleteDialog } from '@/components/post/PostDeleteDialog/PostDeleteDialog';
import { PostUpdateDialog } from '@/components/post/PostUpdateDialog/PostUpdateDialog';
import { channelMemberRoleManager } from '@/utils/channelMemberRoleManager';
import type { DropdownAction } from '@/types/common.type';
import type { PostDropdownProps } from '@/types/post.type';
import * as S from './PostDropdown.styles';

export const PostDropdown = ({ post, author, channelId }: PostDropdownProps) => {
  const [isPatchDialogOpen, setPatchDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const myServerInfo = useAtomValue(serverMemberAtom);
  const { data: myChannels } = useGetJoinedChannels();

  const myId = myServerInfo?.memberId;
  const myInfoInChannel = useMemo(() => {
    if (!myChannels) return null;
    return myChannels.find((c) => c.channelInfo.channelId === channelId)?.membership;
  }, [myChannels, channelId]);

  if (!myInfoInChannel || !author || !myId) {
    return null;
  }

  const isMyPost = myId === author.memberId;
  const canManagePost = channelMemberRoleManager.isRoleHigher(myInfoInChannel.channelRole, author.channelRole);

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
      label: '포스트 수정',
      onSelect: createSelectHandler(setPatchDialogOpen),
      isRendered: canEdit,
    },
    {
      label: '포스트 삭제',
      onSelect: createSelectHandler(setDeleteDialogOpen),
      isRendered: canDelete,
      isDestructive: true,
    },
  ];

  const availableActions = actions.filter((action) => action.isRendered);
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
        <PostUpdateDialog open={isPatchDialogOpen} onOpenChange={setPatchDialogOpen} post={post} channelId={channelId} />
      )}
      {canDelete && (
        <PostDeleteDialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen} post={post} channelId={channelId} />
      )}
    </>
  );
};
