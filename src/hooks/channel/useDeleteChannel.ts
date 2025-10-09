import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { deleteChannel } from '@/apis/http/channel.api';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { ROUTE_PATH } from '@/constants/routePath';
import { SUCCESS_MESSAGES, SERVER_ERROR_MESSAGES } from "@/constants/message";

const useDeleteChannel = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (channelId: number) => deleteChannel(channelId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.channels.joinedLists() });
      toast.success(SUCCESS_MESSAGES.CHANNEL_DELETE_SUCCESS);
      navigate(ROUTE_PATH.main)
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          SERVER_ERROR_MESSAGES.CHANNEL_DELETE_FAILED
      );
    },
  });
};

export default useDeleteChannel;