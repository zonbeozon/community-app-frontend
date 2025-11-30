import { useState } from 'react';
import useGetBannedChannelMembers from '@/queries/useGetBannedChannelMembers.ts';
import { ChannelMemberItem } from '@/components/channelmember/ChannelMemberItem/ChannelMemberItem';
import { ChannelMemberUnbanDialog } from '@/components/channelmember/ChannelMemberUnbanDialog/ChannelMemberUnbanDialog';
import { ItemSkeleton } from '@/components/common/ItemSkeleton/ItemSkeleton';
import { Button } from '@/components/ui/button';
import { DEFAULT_PAGE_REQUEST } from '@/constants/constants';
import type { ChannelMember } from '@/types/channelMember.type';
import * as S from './ChannelBannedMemberList.styles';

export const ChannelBannedMemberList = ({ channelId }: { channelId: number }) => {
  const { data, isLoading, isError } = useGetBannedChannelMembers(channelId, DEFAULT_PAGE_REQUEST);
  const [selectedMember, setSelectedMember] = useState<ChannelMember | null>(null);

  const bannedMembers = data?.members || [];

  const handleOpenUnbanDialog = (member: ChannelMember) => {
    setSelectedMember(member);
  };

  const handleCloseDialog = () => {
    setSelectedMember(null);
  };

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 1 }).map((_, i) => (
          <ItemSkeleton key={i} />
        ))}
      </>
    );
  }

  if (isError || bannedMembers.length === 0) {
    return <p className={S.emptyMessage}>밴 된 멤버가 없습니다.</p>;
  }

  return (
    <div className={S.wrapper}>
      <ul className={S.list}>
        {bannedMembers.map((member: ChannelMember) => (
          <ChannelMemberItem
            key={member.memberId}
            member={member}
            actions={
              <Button variant="outline" size="sm" onClick={() => handleOpenUnbanDialog(member)}>
                추방 해제
              </Button>
            }
          />
        ))}
      </ul>

      {selectedMember && (
        <ChannelMemberUnbanDialog
          open={!!selectedMember}
          onOpenChange={(isOpen) => {
            if (!isOpen) handleCloseDialog();
          }}
          channelId={channelId}
          targetMember={selectedMember}
        />
      )}
    </div>
  );
};
