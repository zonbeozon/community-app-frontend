import { useMemo } from "react";
import { useAtomValue } from "jotai";
import { Channel } from "@/types/channel.type";
import useGetJoinedChannels from "@/queries/useGetJoinedChannel";
import { channelActivityMapAtom } from "@/atoms/channelAtoms"; // 1. Jotai atom을 임포트
import ChannelGroup from "@/components/channel/ChannelGroup/ChannelGroup";
import * as S from "./ChannelSidebar.styles";

const SidebarSkeleton = () => {
  return <div className={S.sidebarWrapper}>채널 목록 로딩 중...</div>;
};

const ChannelSidebar = () => {
  // 2. Zustand 대신 TanStack Query와 Jotai를 사용합니다.
  const { data: channels, isLoading, isError } = useGetJoinedChannels();
  const activityMap = useAtomValue(channelActivityMapAtom);

  const communityChannels: Channel[] = useMemo(() => {
    // 3. channels는 이제 배열이므로, 바로 사용합니다. 데이터가 없으면 빈 배열을 반환합니다.
    if (!channels) return [];

    // 4. 불변성을 위해 원본 배열을 복사한 후 정렬합니다.
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
  
  // TODO: 공식 채널을 구분하는 로직 필요
  const officialChannels: Channel[] = [];
  
  return (
    <div className={S.sidebarWrapper}>
      <ul className={S.sidebarContent}>
        <ChannelGroup
          title="공식 크립토 채널"
          channels={officialChannels}
        />
        <ChannelGroup
          title="커뮤니티 채널"
          channels={communityChannels}
        />
      </ul>
    </div>
  );
};

export default ChannelSidebar;