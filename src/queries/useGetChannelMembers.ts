import { useQuery } from '@tanstack/react-query';
import { getChannelMembers } from '@/apis/http/channelMember.api';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { PageRequest, Page } from '@/types/common.type';
import { ChannelMembersResponse, ChannelMember } from '@/types/channelMember.type';

interface MembersData {
  members: ChannelMember[];
  pageInfo: Page<ChannelMember>;
}

const useGetChannelMembers = (
  channelId: number,
  pageRequest: PageRequest
) => {
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

export default useGetChannelMembers;