import { useQuery } from '@tanstack/react-query';
import { getPendingChannelMembers } from '@/apis/http/channelMember.api';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { PageRequest } from '@/types/common.type';
import { ChannelMembersResponse } from '@/types/channelMember.type';
import { MembersData } from '@/types/channelMember.type';

const useGetPendingChannelMembers = (
  channelId: number,
  pageRequest: PageRequest
) => {
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

export default useGetPendingChannelMembers;