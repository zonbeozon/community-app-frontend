import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { updateChannel } from '@/apis/http/channel.api';
import { UpdatechannelVariables } from '@/types/channel.type';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { SUCCESS_MESSAGES, SERVER_ERROR_MESSAGES } from "@/constants/messages";

const useUpdateChannel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ channelId, payload }: UpdatechannelVariables) => 
      updateChannel(channelId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.channels.all });
      toast.success(SUCCESS_MESSAGES.CHANNEL_UPDATE_SUCCESS);
    },

    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          SERVER_ERROR_MESSAGES.CHANNEL_UPDATE_FAILED
      );
    },
  });
};

export default useUpdateChannel;