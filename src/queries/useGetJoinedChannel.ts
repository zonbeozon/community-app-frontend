import { useQuery } from '@tanstack/react-query';
import { getJoinedChannels } from '@/apis/http/channel.api';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { ChannelsResponse, Channel } from '@/types/channel.type';

const useGetJoinedChannels = () => {
  return useQuery<ChannelsResponse, Error, Channel[]>({ 
    queryKey: QUERY_KEYS.channels.joinedLists(), 
    queryFn: getJoinedChannels,
    staleTime: 1000 * 60 * 3,
    select: (data) => data.channels, 
  });
};

export default useGetJoinedChannels;