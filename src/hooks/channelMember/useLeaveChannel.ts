import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { leaveChannel } from '@/apis/http/channelMember.api';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { ROUTE_PATH } from '@/constants/routePath';
import { SUCCESS_MESSAGES, SERVER_ERROR_MESSAGES } from '@/constants/message';

const useLeaveChannel = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (channelId: number) => leaveChannel(channelId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.channels.all });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.channelMember.all });
      toast.success(SUCCESS_MESSAGES.CHANNEL_LEAVE_SUCCESS);

      navigate(ROUTE_PATH.main);
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          SERVER_ERROR_MESSAGES.CHANNELMEMBER_LEAVE_FAILED 
      );
    },
  });
};

export default useLeaveChannel;