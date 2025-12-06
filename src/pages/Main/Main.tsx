import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import * as S from '@/pages/Main/Main.styles';
import { useGetJoinedChannels } from '@/queries/useGetJoinedChannel';
import { useGetPosts } from '@/queries/useGetPosts';
import { useQueryClient } from '@tanstack/react-query';
import { Sidebar } from '@/components/common/Sidebar/Sidebar';
import { QUERY_KEYS } from '@/constants/queryKeys';

export default function Main() {
  const { data: channels, isSuccess: areChannelsLoaded } = useGetJoinedChannels();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (areChannelsLoaded && channels && Object.keys(channels).length > 0) {
      const channelIds = Object.keys(channels);

      channelIds.forEach((channelId) => {
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
        <Sidebar />
      </div>
      <main className={S.main}>
        <Outlet />
      </main>
    </>
  );
}
