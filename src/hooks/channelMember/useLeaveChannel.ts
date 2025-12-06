import { leaveChannel } from '@/apis/http/channelMember.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { SERVER_ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/constants/messages';
import { QUERY_KEYS } from '@/constants/queryKeys';

export const useLeaveChannel = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (channelId: number) => leaveChannel(channelId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.channels.all });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.channelMember.all });
      toast.success(SUCCESS_MESSAGES.CHANNEL_LEAVE_SUCCESS);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || SERVER_ERROR_MESSAGES.CHANNELMEMBER_LEAVE_FAILED);
    },
  });

  return {
    leaveChannel: mutation.mutate,
    isLeaving: mutation.isPending,
    ...mutation,
  };
};
