import { getChats } from '@/apis/http/chat.api';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import type { Chat, ChattingGroupResponse } from '@/types/chat.type';

export const useGetChats = (chattingGroupId: number) => {
  return useQuery<ChattingGroupResponse, Error, Chat[]>({
    queryKey: QUERY_KEYS.chats.list(chattingGroupId),

    queryFn: () => getChats(chattingGroupId),

    enabled: !!chattingGroupId,

    select: (data) => data.content,
  });
};
