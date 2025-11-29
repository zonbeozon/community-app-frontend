import { updateChannel } from '@/apis/http/channel.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { SERVER_ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/constants/messages';
import { QUERY_KEYS } from '@/constants/queryKeys';
import type { UpdateChannelProps } from '@/types/channel.type';

export const useUpdateChannel = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ channelId, payload }: UpdateChannelProps) => updateChannel(channelId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.channels.all });
      toast.success(SUCCESS_MESSAGES.CHANNEL_UPDATE_SUCCESS);
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
    updateChannel: mutation.mutate,
    isUpdating: mutation.isPending,
    ...mutation,
  };
};
