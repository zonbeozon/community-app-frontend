import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ChannelMemberVariables } from '@/types/channelMember.type';
import { denyChannelMember } from '@/apis/http/channelMember.api';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { SUCCESS_MESSAGES, SERVER_ERROR_MESSAGES } from '@/constants/messages';

const useDenyChannelMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ channelId, targetMemberId }: ChannelMemberVariables) =>
      denyChannelMember(channelId, targetMemberId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.channelMember.all });
      toast.success(SUCCESS_MESSAGES.CHANNELMEMBER_DENY_SUCCESS); 
    },

    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          SERVER_ERROR_MESSAGES.CHANNELMEMBER_DENY_FAILED
      );
    },
  });
};

export default useDenyChannelMember;