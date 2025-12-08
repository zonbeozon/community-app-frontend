import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getChannels } from '@/apis/http/channel.api';
import { QUERY_KEYS } from '@/constants/queryKeys';
import type { ChannelsResponse, SearchChannelsParams } from '@/types/channel.type';

export const useGetChannels = (params: SearchChannelsParams) => {
  return useQuery<ChannelsResponse, Error>({
    queryKey: QUERY_KEYS.channels.search(params),
    
    queryFn: () => getChannels(params),
    
    enabled: !!params.keyword && params.keyword.trim().length > 0,
    
    placeholderData: keepPreviousData, 
    
    staleTime: 1000 * 60 * 1, 
  });
};