import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ChannelMemberVariables } from '@/types/channelMember.type';
import { unbanChannelMember } from '@/apis/http/channelMember.api';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { SUCCESS_MESSAGES, SERVER_ERROR_MESSAGES } from '@/constants/message';

const useUnbanChannelMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ channelId, targetMemberId }: ChannelMemberVariables) =>
      unbanChannelMember(channelId, targetMemberId),

    onSuccess: (_data, { channelId }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.channelMember.all });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.channels.detail(channelId) });
      toast.success(SUCCESS_MESSAGES.CHANNELMEMBER_UNBAN_SUCCESS);
    },

    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          SERVER_ERROR_MESSAGES.CHANNELMEMBER_UNBAN_FAILED
      );
    },
  });
};

export default useUnbanChannelMember;