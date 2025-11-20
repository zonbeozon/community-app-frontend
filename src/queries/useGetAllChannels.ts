import { useQuery } from "@tanstack/react-query";
import { getAllChannels } from "@/apis/http/channel.api";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { ChannelSearchResultTemp } from "@/types/channel.type";

const useGetAllChannels = (options = {}) => {
  return useQuery<ChannelSearchResultTemp[], Error>({
    queryKey: QUERY_KEYS.channels.lists(),
    queryFn: getAllChannels,
    ...options,
    staleTime: 1000 * 60 * 5,
  });
};

export default useGetAllChannels;
