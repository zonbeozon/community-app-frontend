import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useQueryClient } from '@tanstack/react-query';
import { useGetJoinedChannels } from "@/queries/useGetJoinedChannel";
import { useCoinList } from "@/queries/useCoinList";
import { QUERY_KEYS } from "@/constants/queryKeys";
import useGetPosts from "@/queries/useGetPosts";
import * as S from "@/pages/Main/Main.styles";
import { ChannelSidebar } from "@/components/channel/ChannelSidebar/ChannelSidebar";

export default function Main() {
  const { data: channels, isSuccess: areChannelsLoaded } = useGetJoinedChannels();

  const { data: coinList } = useCoinList();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (areChannelsLoaded && channels && Object.keys(channels).length > 0) {
      const channelIds = Object.keys(channels);

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