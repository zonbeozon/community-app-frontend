import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { deletePost } from '@/apis/http/post.api';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { ROUTE_PATH } from '@/constants/routePaths';
import { SUCCESS_MESSAGES, SERVER_ERROR_MESSAGES } from "@/constants/messages";

interface DeletePostVariables {
  postId: number;
  channelId: number;
}

const useDeletePost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ postId }: DeletePostVariables) => deletePost(postId),

    onSuccess: (_data, { postId, channelId }) => {
      queryClient.removeQueries({ queryKey: QUERY_KEYS.posts.detail(postId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.posts.list(channelId) });

      toast.success(SUCCESS_MESSAGES.POST_DELETE_SUCCESS);
      const channelPath = ROUTE_PATH.channelId.replace(':channelId', String(channelId));
      navigate(channelPath, { replace: true });
    },

    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          SERVER_ERROR_MESSAGES.POST_DELETE_FAILED
      );
    },
  });
};

export default useDeletePost;