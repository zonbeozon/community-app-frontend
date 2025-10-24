import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChannelRole } from "@/types/channelMember.type";
import { updateChannelMemberRole } from "@/apis/http/channelMember.api";

interface UpdateRoleVariables {
  channelId: number;
  memberId: number;
  wantToRole: ChannelRole;
}

const useUpdateChannelMemberRole = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, UpdateRoleVariables>({
    mutationFn: ({ channelId, memberId, wantToRole }) => 
      updateChannelMemberRole(channelId, memberId, wantToRole),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["channelMembers", variables.channelId],
      });
    },
    
    onError: (error) => {
      console.error("멤버 역할 변경 API 호출에 실패했습니다:", error);
    },
  });
};

export default useUpdateChannelMemberRole;