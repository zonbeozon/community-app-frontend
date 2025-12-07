import { getPendingChannelMembers } from '@/apis/http/channelMember.api';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { ChannelMembersResponse } from '@/types/channelMember.type';
import { ChannelMembersData } from '@/types/channelMember.type';
import { PagePayload } from '@/types/common.type';

export const useGetPendingChannelMembers = (channelId: number, pageRequest: PagePayload) => {
  return useQuery<ChannelMembersResponse, Error, ChannelMembersData>({
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
