import { denyChannelMember } from '@/apis/http/channelMember.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { SERVER_ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/constants/messages';
import { QUERY_KEYS } from '@/constants/queryKeys';
import type { ChannelMemberIdProps } from '@/types/channelMember.type';

export const useDenyChannelMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ channelId, targetMemberId }: ChannelMemberIdProps) => denyChannelMember(channelId, targetMemberId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.channelMember.all });
      toast.success(SUCCESS_MESSAGES.CHANNELMEMBER_DENY_SUCCESS);
    },

    onError: (error: any) => {
      toast.error(error.response?.data?.message || SERVER_ERROR_MESSAGES.CHANNELMEMBER_DENY_FAILED);
    },
  });
};
