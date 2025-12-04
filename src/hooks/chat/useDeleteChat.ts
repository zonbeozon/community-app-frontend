import { deleteChat } from '@/apis/http/chat.api';
import { serverMemberAtom } from '@/atoms/authAtoms';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { toast } from 'sonner';
import { QUERY_KEYS } from '@/constants/queryKeys';

interface DeleteChatVariables {
  chatId: number;
  chattingGroupId: number; 
}

export const useDeleteChat = () => {
  const queryClient = useQueryClient();
  const myInfo = useAtomValue(serverMemberAtom);

  return useMutation({
    mutationFn: ({ chatId }: DeleteChatVariables): Promise<void> => deleteChat(chatId),

    onMutate: async () => {
      if (!myInfo) {
        toast.error('로그인 정보가 없어 삭제할 수 없습니다.');
        throw new Error('Not logged in');
      }
    },

    onSuccess: (_data, variables) => {
      const { chattingGroupId } = variables;

      queryClient.invalidateQueries({
        queryKey: [...QUERY_KEYS.chats.lists(), chattingGroupId.toString()],
      });
      
      toast.success('채팅이 삭제되었습니다.');
    },

    onError: (error: any) => {
      if (error.message === 'Not logged in') return;
      toast.error(error.response?.data?.message);
    },
  });
};