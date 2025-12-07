import { getChannelMembers } from '@/apis/http/channelMember.api';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { ChannelMembersData, ChannelMembersResponse } from '@/types/channelMember.type';
import { PagePayload } from '@/types/common.type';

export const useGetChannelMembers = (channelId: number, pageRequest: PagePayload) => {
  return useQuery<ChannelMembersResponse, Error, ChannelMembersData>({
    queryKey: QUERY_KEYS.channelMember.list(channelId, pageRequest),
    queryFn: () => getChannelMembers(channelId, pageRequest),
    enabled: !!channelId,
    select: (data) => {
      return {
        members: data.content,
        pageInfo: data,
      };
    },
  });
};
