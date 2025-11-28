import { useMemo } from "react";
import { useAtomValue } from "jotai";
import { Channel } from "@/types/channel.type";
import useGetJoinedChannels from "@/queries/useGetJoinedChannel";
import { channelActivityMapAtom } from "@/atoms/channelAtoms"; 
import ChannelGroup from "@/components/channel/ChannelGroup/ChannelGroup";
import * as S from "./ChannelSidebar.styles";

const SidebarSkeleton = () => {
  return <div className={S.sidebarWrapper}>채널 목록 로딩 중...</div>;
};

const ChannelSidebar = () => {
  const { data: channels, isLoading, isError } = useGetJoinedChannels();
  const activityMap = useAtomValue(channelActivityMapAtom);

  const communityChannels: Channel[] = useMemo(() => {
    if (!channels) return [];

    return [...channels].sort((a, b) => {
      const timeA = new Date(activityMap[a.channelInfo.channelId] || 0).getTime();
      const timeB = new Date(activityMap[b.channelInfo.channelId] || 0).getTime();
      return timeB - timeA;
    });

  }, [channels, activityMap]);
  
  if (isLoading) {
    return <SidebarSkeleton />;
  }

  if (isError) {
    return (
      <div className={S.sidebarWrapper}>
        <p>채널 목록을 불러올 수 없습니다.</p>
      </div>
    );
  }
  
  return (
    <div className={S.sidebarWrapper}>
      <ul className={S.sidebarContent}>
        <ChannelGroup
          title="커뮤니티 채널"
          channels={communityChannels}
        />
      </ul>
    </div>
  );
};

export default ChannelSidebar;