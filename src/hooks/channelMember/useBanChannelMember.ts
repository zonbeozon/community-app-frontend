import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ChannelMemberVariables } from '@/types/channelMember.type';
import { banChannelMember } from '@/apis/http/channelMember.api';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { SUCCESS_MESSAGES, SERVER_ERROR_MESSAGES } from "@/constants/messages";

const useBanChannelMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ channelId, targetMemberId }: ChannelMemberVariables) =>
      banChannelMember(channelId, targetMemberId),

    onSuccess: (_data, { channelId }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.channelMember.all });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.channels.detail(channelId) });
      toast.success(SUCCESS_MESSAGES.CHANNELMEMBER_BAN_SUCCESS);
    },

    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          SERVER_ERROR_MESSAGES.CHANNELMEMBER_BAN_FAILED 
      );
    },
  });
};

export default useBanChannelMember;