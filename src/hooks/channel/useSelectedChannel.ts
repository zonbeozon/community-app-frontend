import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import useGetJoinedChannels from '@/queries/useGetJoinedChannel';
import { selectedChannelIdAtom } from '@/atoms/channelAtoms'; 
import ChannelRoleManager from '@/utils/channelRoleManager';

export const useSelectedChannel = () => {
  const selectedChannelId = useAtomValue(selectedChannelIdAtom);
  const { data: myChannels, isLoading } = useGetJoinedChannels();

  const selectedChannel = useMemo(() => {
    if (!myChannels || !selectedChannelId) {
      return null;
    }
    return myChannels.find(
      (channel) => channel.channelInfo.channelId === selectedChannelId
    );
  }, [myChannels, selectedChannelId]);

  const isMember = !!selectedChannel?.membership;
  const canCreatePost = isMember && ChannelRoleManager.isAdmin(selectedChannel.membership.channelRole);

  return { 
    selectedChannel, 
    isLoading, 
    isMember, 
    canCreatePost 
  };
};