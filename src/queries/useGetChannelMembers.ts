import { getChannelMembers } from '@/apis/http/channelMember.api';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { ChannelMember, ChannelMembersResponse } from '@/types/channelMember.type';
import { Page, PageRequest } from '@/types/common.type';

interface MembersData {
  members: ChannelMember[];
  pageInfo: Page<ChannelMember>;
}

export const useGetChannelMembers = (channelId: number, pageRequest: PageRequest) => {
  return useQuery<ChannelMembersResponse, Error, MembersData>({
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
