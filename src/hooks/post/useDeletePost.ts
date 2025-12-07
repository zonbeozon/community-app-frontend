import { useNavigate } from 'react-router-dom';
import { deletePost } from '@/apis/http/post.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { SERVER_ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/constants/messages';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { ROUTE_PATH } from '@/constants/routePaths';

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ postId }: { channelId: number, postId: number }) => deletePost(postId),

    onSuccess: (_data, { postId, channelId }) => {
      queryClient.removeQueries({ queryKey: QUERY_KEYS.posts.detail(postId) });
      
      queryClient.invalidateQueries({ queryKey: ['posts', 'list', channelId] });

      toast.success(SUCCESS_MESSAGES.POST_DELETE_SUCCESS);
      const channelPath = ROUTE_PATH.channelId.replace(':channelId', String(channelId));
      navigate(channelPath, { replace: true });
    },

    onError: (error: any) => {
      toast.error(error.response?.data?.message || SERVER_ERROR_MESSAGES.POST_DELETE_FAILED);
    },
  });
};