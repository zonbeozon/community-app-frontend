import useGetBannedChannelMembers from "@/queries/useGetBannedChannelMembers.ts";
import ChannelMemberItem from "../ChannelMemberItem/ChannelMemberItem";
import ItemSkeleton from "@/components/common/ItemSkeleton/ItemSkeleton";
import * as S from "./ChannelBannedMemberList.styles";

const ChannelBannedMemberList = ({ channelId }: { channelId: number }) => {
  const pageRequest = { page: 0, size: 20 };
  const { data, isLoading, isError } = useGetBannedChannelMembers(channelId, pageRequest);

  const bannedMembers = data?.members || [];

  if (isLoading) {
    return <>{Array.from({ length: 5 }).map((_, i) => <ItemSkeleton key={i} />)}</>;
  }

  if (isError || bannedMembers.length === 0) {
    return <p className={S.emptyMessage}>밴 된 멤버가 없습니다.</p>;
  }

  return (
    <div className={S.wrapper}>
      <ul className={S.list}>
        {bannedMembers.map((member) => (
          <ChannelMemberItem
            key={member.memberId}
            channelId={channelId}
            member={member}
            type="banned"
          />
        ))}
      </ul>
    </div>
  );
};

export default ChannelBannedMemberList;