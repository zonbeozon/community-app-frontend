import { serverMemberAtom } from '@/atoms/authAtoms';
import useGetChannelMembers from '@/queries/useGetChannelMembers';
import { useAtomValue } from 'jotai';
import { ChannelMemberDropdown } from '@/components/channelmember/ChannelMemberDropdown/ChannelMemberDropdown';
import { ChannelMemberItem } from '@/components/channelmember/ChannelMemberItem/ChannelMemberItem';
import { ChannelMemberRoleIcon } from '@/components/channelmember/ChannelMemberRoleIcon/ChannelMemberRoleIcon';
import { ItemSkeleton } from '@/components/common/ItemSkeleton/ItemSkeleton';
import { useChannelLogic } from '@/hooks/channel/useChannelLogic';
import { DEFAULT_PAGE_REQUEST } from '@/constants/constants';
import * as S from './ChannelActiveMemberList.styles';

export const ChannelActiveMemberList = ({ channelId }: { channelId: number }) => {
  const { isMember } = useChannelLogic();
  const { data, isLoading, isError } = useGetChannelMembers(channelId, DEFAULT_PAGE_REQUEST);

  const meId = useAtomValue(serverMemberAtom)?.memberId;
  const members = data?.members || [];

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 1 }).map((_, i) => (
          <ItemSkeleton key={i} />
        ))}
      </>
    );
  }

  if (isError || members.length === 0) {
    return <p className={S.emptyMessage}>채널에 멤버가 없습니다.</p>;
  }

  return (
    <div className={S.wrapper}>
      <ul className={S.list}>
        {members.map((member) => (
          <ChannelMemberItem
            key={member.memberId}
            member={member}
            actions={
              <>
                <ChannelMemberRoleIcon role={member.channelRole} />
                {isMember && member.memberId !== meId && (
                  <ChannelMemberDropdown channelId={channelId} targetMember={member} />
                )}
              </>
            }
          />
        ))}
      </ul>
    </div>
  );
};
