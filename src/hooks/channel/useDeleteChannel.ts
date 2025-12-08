import { deleteChannel } from '@/apis/http/channel.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { SERVER_ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/constants/messages';
import { QUERY_KEYS } from '@/constants/queryKeys';

export const useDeleteChannel = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (channelId: number) => deleteChannel(channelId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.channels.joinedLists() });
      toast.success(SUCCESS_MESSAGES.CHANNEL_DELETE_SUCCESS);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || SERVER_ERROR_MESSAGES.CHANNEL_DELETE_FAILED);
    },
  });

  return {
    deleteChannel: mutation.mutate,
    isDeleting: mutation.isPending,
    ...mutation,
  };
};
