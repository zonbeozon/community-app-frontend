import { useQuery } from '@tanstack/react-query';
import { getJoinedChannels } from '@/apis/http/channel.api';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { useAtomValue } from 'jotai';
import { JoinedChannelsResponse, Channel } from '@/types/channel.type';
import { serverMemberAtom } from '@/atoms/authAtoms';

const useGetJoinedChannels = () => {

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

export default useGetJoinedChannels;