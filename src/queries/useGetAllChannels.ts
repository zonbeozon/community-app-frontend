import { useQuery } from '@tanstack/react-query';
import { getChannels } from "@/apis/http/channel.api";
import { QUERY_KEYS } from '@/constants/queryKeys';
import { ChannelSearchResultTemp } from '@/types/channel.type';

const useGetAllChannels = () => {
  return useQuery<ChannelSearchResultTemp[], Error>({
    queryKey: QUERY_KEYS.channels.lists(), 
    queryFn: getChannels, 
    staleTime: 1000 * 60 * 5,
  });
};

export default useGetAllChannels;