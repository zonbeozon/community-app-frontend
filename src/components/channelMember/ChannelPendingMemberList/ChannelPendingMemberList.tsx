import { useState } from "react";
import useGetPendingChannelMembers from "@/queries/useGetPendingChannelMembers";
import ChannelMemberItem from "../ChannelMemberItem/ChannelMemberItem";
import ItemSkeleton from "@/components/common/ItemSkeleton/ItemSkeleton";
import * as S from "./ChannelPendingMemberList.styles";

const ChannelPendingMemberList = ({ channelId }: { channelId: number }) => {
  const [pageRequest, setPageRequest] = useState({ page: 0, size: 20 });
  const { data, isLoading, isError } = useGetPendingChannelMembers(channelId, pageRequest);

  const pendingMembers = data?.members || [];

  if (isLoading) {
    return <>{Array.from({ length: 5 }).map((_, i) => <ItemSkeleton key={i} />)}</>;
  }

  if (isError || pendingMembers.length === 0) {
    return <p className={S.emptyMessage}>참가 요청 중인 멤버가 없습니다.</p>;
  }

  return (
    <div className={S.wrapper}>
      <ul className={S.list}>
        {pendingMembers.map((member) => (
          <ChannelMemberItem
            key={member.memberId}
            channelId={channelId}
            member={member}
            type="pending"
          />
        ))}
      </ul>
    </div>
  );
};

export default ChannelPendingMemberList;