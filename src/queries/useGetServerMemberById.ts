import { useQuery } from '@tanstack/react-query';
import { getServerMembers } from '@/apis/http/serverMember.api';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { ServerMember, ServerMembersResponse } from '@/types/serverMember.type';

// 훅이 받을 옵션의 타입을 정의합니다.
interface UseGetMyServerMemberOptions {
  enabled?: boolean;
  retry?: boolean | number;
}

const useGetMyServerMember = (options?: UseGetMyServerMemberOptions) => {
  return useQuery<ServerMembersResponse, Error, ServerMember | null>({
    queryKey: QUERY_KEYS.serverMember.me(),
    queryFn: getServerMembers,
    select: (data) => data.content?.[0] || null,
    staleTime: 1000 * 60 * 5, // 5분
    
    // AuthGuard에서 전달한 옵션 객체를 여기에 적용합니다.
    ...options,
  });
};

export default useGetMyServerMember;