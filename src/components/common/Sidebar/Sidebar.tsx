import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { channelActivityMapAtom } from '@/atoms/channelAtoms';
import { useGetJoinedChannels } from '@/queries/useGetJoinedChannel';
import { useCoinList } from '@/queries/useCoinList';

import { ChannelGroup } from '@/components/channel/ChannelGroup/ChannelGroup';
import { ChattingGroup } from '@/components/chat/ChattingGroup/ChattingGroup';
import * as S from './Sidebar.styles';
import type { Channel } from '@/types/channel.type';

export const Sidebar = () => {
  const { data: channels, isLoading: isChannelsLoading } = useGetJoinedChannels();
  const activityMap = useAtomValue(channelActivityMapAtom);

  const { data: coins } = useCoinList(); 

  const communityChannels: Channel[] = useMemo(() => {
    if (!channels) return [];
    return [...channels].sort((a, b) => {
      const timeA = new Date(activityMap[a.channelInfo.channelId] || 0).getTime();
      const timeB = new Date(activityMap[b.channelInfo.channelId] || 0).getTime();
      return timeB - timeA;
    });
  }, [channels, activityMap]);

  if (isChannelsLoading) { 
    return <div className={S.sidebarWrapper}>로딩 중...</div>;
  }

  return (
    <div className={S.sidebarWrapper}>
      <ul className={S.sidebarContent}>
        <ChattingGroup 
          title="종목 토론방" 
          chattingGroups={coins || []} 
        />
      </ul>
      <ul className={S.sidebarContent}>
        <ChannelGroup title="커뮤니티 채널" channels={communityChannels} />
      </ul>
    </div>
  );
};