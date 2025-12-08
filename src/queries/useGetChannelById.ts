import { getChannelById } from '@/apis/http/channel.api';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import type { Channel } from '@/types/channel.type';

export const useGetChannelById = (channelId: number) => {
  return useQuery<Channel, Error>({
    queryKey: QUERY_KEYS.channels.detail(channelId),
    
    queryFn: () => getChannelById(channelId),
    
    enabled: !!channelId && channelId !== -1,
    
    staleTime: 1000 * 60 * 5,
  });
};
