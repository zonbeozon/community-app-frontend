import { getJoinedChannels } from '@/apis/http/channel.api';
import { serverMemberAtom } from '@/atoms/authAtoms';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { QUERY_KEYS } from '@/constants/queryKeys';
import type { Channel, JoinedChannelsResponse } from '@/types/channel.type';

export const useGetJoinedChannels = () => {
  const serverMember = useAtomValue(serverMemberAtom);
  const isLoggedIn = !!serverMember;

  return useQuery<JoinedChannelsResponse, Error, Channel[]>({
    queryKey: QUERY_KEYS.channels.joinedLists(),

    queryFn: getJoinedChannels,

    staleTime: 1000 * 60 * 3,

    enabled: isLoggedIn,

    select: (data) => data.channels,
  });
};
