import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useQueryClient } from '@tanstack/react-query';

import useGetJoinedChannels from "@/queries/useGetJoinedChannel";
import { QUERY_KEYS } from "@/constants/queryKeys";
import useGetPosts from "@/queries/useGetPosts";
import * as S from "@/pages/Main/Main.styles";
import ChannelSidebar from "@/components/channel/ChannelSidebar/ChannelSidebar";

/**
 * Main 컴포넌트는 이제 인증된 사용자가 보게 될 공통 레이아웃의 역할을 합니다.
 * 사이드바와 메인 콘텐츠 영역을 배치하고, 필요한 데이터를 미리 로딩하는 책임을 가집니다.
 */
export default function Main() {
  // 채널 목록 데이터를 '구독'합니다. 데이터 페칭은 이 훅이 자동으로 처리합니다.
  const { data: channels, isSuccess: areChannelsLoaded } = useGetJoinedChannels();

  // TanStack Query의 캐시를 직접 관리하기 위해 queryClient를 가져옵니다.
  const queryClient = useQueryClient();

  // 채널 목록이 성공적으로 로드되면, 각 채널의 게시물을 '미리 가져오기'합니다.
  useEffect(() => {
    // 채널 데이터가 존재하고, 로딩이 성공했을 때만 실행
    if (areChannelsLoaded && channels && Object.keys(channels).length > 0) {
      const channelIds = Object.keys(channels);

      // 각 채널의 게시물 데이터를 백그라운드에서 미리 캐시에 저장해 둡니다.
      // 사용자가 채널을 클릭했을 때 로딩 없이 데이터를 즉시 보여줄 수 있습니다.
      channelIds.forEach(channelId => {
        queryClient.prefetchQuery({
          queryKey: QUERY_KEYS.posts.list(Number(channelId), {}),
          queryFn: () => useGetPosts(Number(channelId)),
        });
      });
    }
  }, [areChannelsLoaded, channels, queryClient]);

  return (
    <>
      <div className={S.leftSidebar}>
        <ChannelSidebar />
      </div>
      <main className={S.main}>
        <Outlet />
      </main>
    </>
  );
}