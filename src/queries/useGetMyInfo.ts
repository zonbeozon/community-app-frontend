import { getServerMemberById } from '@/apis/http/serverMember.api';
import { accessTokenAtom } from '@/atoms/authAtoms';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';

export const useGetMyInfo = (memberId: number) => {
  const accessToken = useAtomValue(accessTokenAtom);

  return useQuery({
    queryKey: ['member', memberId],

    queryFn: () => getServerMemberById(memberId),

    enabled: !!accessToken && !!memberId,
  });
};
