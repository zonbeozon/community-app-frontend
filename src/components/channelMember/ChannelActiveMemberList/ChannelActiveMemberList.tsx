import useGetChannelMembers from "@/queries/useGetChannelMembers";
import ChannelMemberItem from "../ChannelMemberItem/ChannelMemberItem";
import ItemSkeleton from "@/components/common/ItemSkeleton/ItemSkeleton";
import * as S from "./ChannelActiveMemberList.styles";

const ChannelActiveMemberList = ({ channelId }: { channelId: number }) => {
  const pageRequest = { page: 0, size: 20 };
  const { data, isLoading, isError } = useGetChannelMembers(channelId, pageRequest);

  const members = data?.members || [];

  if (isLoading) {
    return <>{Array.from({ length: 5 }).map((_, i) => <ItemSkeleton key={i} />)}</>;
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
            channelId={channelId}
            member={member}
            type="active"
          />
        ))}
      </ul>
    </div>
  );
};

export default ChannelActiveMemberList;