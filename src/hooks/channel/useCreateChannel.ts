import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { createChannel } from '@/apis/http/channel.api';
import { Channel, ChannelRequest } from '@/types/channel.type';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { ROUTE_PATH } from '@/constants/routePath';
import { SUCCESS_MESSAGES, SERVER_ERROR_MESSAGES } from "@/constants/message";

const useCreateChannel = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: ChannelRequest): Promise<Channel> => createChannel(payload),
    onSuccess: (newChannel) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.channels.all });
      toast.success(SUCCESS_MESSAGES.CHANNEL_CREATE_SUCCESS);

      if (newChannel?.channelInfo?.channelId) {
        const newChannelId = newChannel.channelInfo.channelId;
        const destinationPath = ROUTE_PATH.channelId.replace(
          ':channelId',
          String(newChannelId)
        );
        navigate(destinationPath);
      }
    },

    onError: (error: any) => {
      if (error?.response?.status === 409) {
        toast.error(error.response.data?.message);
      } else {
        toast.error(
          error.response?.data?.message ||
            SERVER_ERROR_MESSAGES.CHANNEL_CREATE_FAILED
        );
      }
    },
  });
};

export default useCreateChannel;