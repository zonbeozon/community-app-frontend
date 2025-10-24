import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { updatePost } from '@/apis/http/post.api';
import { PostRequest } from '@/types/post.type';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { SUCCESS_MESSAGES, SERVER_ERROR_MESSAGES } from "@/constants/messages";

interface UpdatePostVariables {
  postId: number;
  channelId: number;
  payload: PostRequest;
}

const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, payload }: UpdatePostVariables) => 
      updatePost(postId, payload),

    onSuccess: (_data, { postId, channelId }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.posts.list(channelId, {}) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.posts.detail(postId) });
      toast.success(SUCCESS_MESSAGES.POST_UPDATE_SUCCESS);
    },

    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          SERVER_ERROR_MESSAGES.POST_UPDATE_FAILED
      );
    },
  });
};

export default useUpdatePost;