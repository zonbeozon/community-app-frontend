import { createPost } from '@/apis/http/post.api';
import { serverMemberAtom } from '@/atoms/authAtoms';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { toast } from 'sonner';
import { SERVER_ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/constants/messages';
import { QUERY_KEYS } from '@/constants/queryKeys';
import type { CreatePostVars } from '@/types/post.type';

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const myInfo = useAtomValue(serverMemberAtom);

  return useMutation({
    mutationFn: ({ channelId, payload }: CreatePostVars): Promise<number> => createPost(channelId, payload),

    onMutate: async () => {
      if (!myInfo) {
        toast.error('로그인 정보가 없어 게시글을 작성할 수 없습니다.');
        throw new Error('Not logged in');
      }
    },

    onSuccess: (_data, variables) => {
      const { channelId } = variables;

      const queryKeyToInvalidate = [...QUERY_KEYS.posts.lists(), channelId];

      queryClient.invalidateQueries({
        queryKey: queryKeyToInvalidate,
        refetchType: 'all',
      });

      toast.success(SUCCESS_MESSAGES.POST_CREATE_SUCCESS);
    },

    onError: (error: any) => {
      if (error.message === 'Not logged in') return;

      toast.error(error.response?.data?.message || SERVER_ERROR_MESSAGES.POST_CREATE_FAILED);
    },
  });
};
