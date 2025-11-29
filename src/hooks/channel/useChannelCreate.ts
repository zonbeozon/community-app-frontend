import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Channel, ChannelRequest } from '@/types/channel.type';
import { createChannel } from '@/apis/http/channel.api';
import { SERVER_ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/constants/messages';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { ROUTE_PATH } from '@/constants/routePaths';

export const useChannelCreate = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (payload: ChannelRequest): Promise<Channel> => createChannel(payload),
    onSuccess: (newChannel) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.channels.all });
      toast.success(SUCCESS_MESSAGES.CHANNEL_CREATE_SUCCESS);

      if (newChannel?.channelInfo?.channelId) {
        const newChannelId = newChannel.channelInfo.channelId;
        const destinationPath = ROUTE_PATH.channelId.replace(':channelId', String(newChannelId));
        navigate(destinationPath);
      }
    },
    onError: (error: any) => {
      if (error?.response?.status === 409) {
        toast.error(SERVER_ERROR_MESSAGES.CHANNEL_DUPLICATE_NAME);
      } else {
        toast.error(SERVER_ERROR_MESSAGES.CHANNEL_CREATE_FAILED);
      }
    },
  });

  return {
    createChannel: mutation.mutate, 
    isCreating: mutation.isPending, 
    ...mutation,
  };
};
