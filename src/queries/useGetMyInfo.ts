import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { accessTokenAtom } from '@/atoms/authAtoms';
import { getServerMemberById } from '@/apis/http/serverMember.api';

const useGetMyInfo = (memberId: number) => {
  const accessToken = useAtomValue(accessTokenAtom);

  return useQuery({
    queryKey: ['member', memberId],
    queryFn: () => getServerMemberById(memberId),

    enabled: !!accessToken && !!memberId,
  });
};

export default useGetMyInfo;