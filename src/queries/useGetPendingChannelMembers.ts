import { getPendingChannelMembers } from '@/apis/http/channelMember.api';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { ChannelMembersResponse } from '@/types/channelMember.type';
import { MembersData } from '@/types/channelMember.type';
import { PageRequest } from '@/types/common.type';

export const useGetPendingChannelMembers = (channelId: number, pageRequest: PageRequest) => {
  return useQuery<ChannelMembersResponse, Error, MembersData>({
    queryKey: QUERY_KEYS.channelMember.pendingList(channelId, pageRequest),
    queryFn: () => getPendingChannelMembers(channelId, pageRequest),
    enabled: !!channelId,
    select: (data) => {
      const members = data.content;
      const pageInfo = data;
      return { members, pageInfo };
    },
  });
};
