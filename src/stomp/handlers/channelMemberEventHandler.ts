import { queryClient } from '@/lib/queryClient';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { ChannelMemberEvent } from "@/types/stompEvent.type";
import { Channel } from '@/types/channel.type';

export const handleChannelMemberEvent = (event: ChannelMemberEvent) => {
  const { type, channelId } = event;
  const joinedChannelsQueryKey = QUERY_KEYS.channels.joinedLists();

  switch (type) {
    case "BANNED": {
      queryClient.setQueryData<Channel[]>(joinedChannelsQueryKey, (oldData) => {
        if (!oldData) return [];
        return oldData.filter(channel => channel.channelInfo.channelId !== channelId);
      });
      queryClient.invalidateQueries({ queryKey: joinedChannelsQueryKey });
      break;
    }

    case "JOIN_REQUEST_APPROVED": {
      queryClient.invalidateQueries({ queryKey: joinedChannelsQueryKey });
      break;
    }
      
    default:
      break;
  }
};