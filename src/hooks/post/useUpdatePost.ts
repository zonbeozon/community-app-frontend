import { updatePost } from '@/apis/http/post.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { SERVER_ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/constants/messages';
import { QUERY_KEYS } from '@/constants/queryKeys';
import type { PostPayload } from '@/types/post.type';

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, payload }: { channelId: number; postId: number; payload: PostPayload }) =>
      updatePost(postId, payload),

    onSuccess: (_data, { postId, channelId }) => {
      queryClient.invalidateQueries({ queryKey: ['posts', 'list', channelId] });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.posts.detail(postId) });

      toast.success(SUCCESS_MESSAGES.POST_UPDATE_SUCCESS);
    },

    onError: (error: any) => {
      toast.error(error.response?.data?.message || SERVER_ERROR_MESSAGES.POST_UPDATE_FAILED);
    },
  });
};
