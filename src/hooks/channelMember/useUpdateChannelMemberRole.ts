import { updateChannelMemberRole } from '@/apis/http/channelMember.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ChannelMemberRoleProps } from '@/types/channelMember.type';

export const useUpdateChannelMemberRole = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, ChannelMemberRoleProps>({
    mutationFn: ({ channelId, targetMemberId, wantToRole }: ChannelMemberRoleProps) =>
      updateChannelMemberRole(channelId, targetMemberId, wantToRole),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['channelMembers', variables.channelId],
      });
    },

    onError: (error) => {
      console.error('멤버 역할 변경 API 호출에 실패했습니다:', error);
    },
  });
};
