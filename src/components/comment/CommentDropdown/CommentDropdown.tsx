import { useMemo, useState } from 'react';
import { serverMemberAtom } from '@/atoms/authAtoms';
import { useGetJoinedChannels } from '@/queries/useGetJoinedChannel';
import { useAtomValue } from 'jotai';
import { CommentDeleteDialog } from '@/components/comment/CommentDeleteDialog/CommentDeleteDialog';
import { ActionDropdown } from '@/components/common/ActionDropdown/ActionDropdown';
import ChannelRoleManager from '@/utils/channelRoleManager';
import type { CommentDropdownProps } from '@/types/comment.type';
import type { DropdownAction } from '@/types/common.type';
import * as S from './CommentDropdown.styles';

export const CommentDropdown = ({ comment, channelId }: CommentDropdownProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const myServerInfo = useAtomValue(serverMemberAtom);
  const { data: myChannels } = useGetJoinedChannels();

  const myId = myServerInfo?.memberId;
  const myInfoInChannel = useMemo(() => {
    if (!myChannels) return null;
    return myChannels.find((c) => c.channelInfo.channelId === channelId)?.membership;
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
      label: '댓글 삭제',
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

      <CommentDeleteDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen} comment={comment} />
    </>
  );
};
