import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { joinChannel } from '@/apis/http/channelMember.api';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { SUCCESS_MESSAGES, SERVER_ERROR_MESSAGES } from '@/constants/message';

const useJoinChannel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (channelId: number) => joinChannel(channelId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.channels.all });
      toast.success(SUCCESS_MESSAGES.CHANNELMEMBER_JOIN_SUCCESS);
    },

    onError: (error: any) => {
      toast.error(error.response?.data?.message || SERVER_ERROR_MESSAGES.CHANNELMEMBER_JOIN_FAILED);
    },
  });
};

export default useJoinChannel;