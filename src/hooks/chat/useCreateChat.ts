import { createChat } from '@/apis/http/chat.api';
import { serverMemberAtom } from '@/atoms/authAtoms';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { toast } from 'sonner';
import { SERVER_ERROR_MESSAGES } from '@/constants/messages';
import { QUERY_KEYS } from '@/constants/queryKeys';
import type { CreateChatProps } from '@/types/chat.type';

export const useCreateChat = () => {
  const queryClient = useQueryClient();
  const myInfo = useAtomValue(serverMemberAtom);

  return useMutation({
    mutationFn: ({ chattingGroupId, payload }: CreateChatProps): Promise<number> => createChat(chattingGroupId, payload),

    onMutate: async () => {
      if (!myInfo) {
        toast.error('로그인 정보가 없어 채팅을 작성할 수 없습니다.');
        throw new Error('Not logged in');
      }
    },

    onSuccess: (_data, variables) => {
      const { chattingGroupId } = variables;

      const queryKeyToInvalidate = [...QUERY_KEYS.chats.lists(), chattingGroupId];

      queryClient.invalidateQueries({
        queryKey: queryKeyToInvalidate,
        refetchType: 'all',
      });
    },

    onError: (error: any) => {
      if (error.message === 'Not logged in') return;

      toast.error(error.response?.data?.message || SERVER_ERROR_MESSAGES.POST_CREATE_FAILED);
    },
  });
};
