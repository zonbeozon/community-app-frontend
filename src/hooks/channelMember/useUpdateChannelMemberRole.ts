import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updateChannelMemberRole } from '@/apis/http/channelMember.api';
import { ChannelRole } from '@/types/channelMember.type';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { SUCCESS_MESSAGES, SERVER_ERROR_MESSAGES } from "@/constants/message";

interface UpdateRoleVariables {
  channelId: number;
  targetMemberId: number;
  newRole: ChannelRole;
}

const useUpdateChannelMemberRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ channelId, targetMemberId, newRole }: UpdateRoleVariables) =>
      updateChannelMemberRole(channelId, targetMemberId, newRole),

    onSuccess: (_data, { channelId }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.channelMember.lists() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.channels.detail(channelId) });

      toast.success(SUCCESS_MESSAGES.CHANNELMEMBER_UPDATE_ROLE_SUCCESS);
    },

    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          SERVER_ERROR_MESSAGES.CHANNELMEMBER_ROLE_UPDATE_FAILED
      );
    },
  });
};

export default useUpdateChannelMemberRole;