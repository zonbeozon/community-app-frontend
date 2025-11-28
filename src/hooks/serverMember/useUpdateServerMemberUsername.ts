import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateServerMemberUserName } from "@/apis/http/serverMember.api";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { SUCCESS_MESSAGES, SERVER_ERROR_MESSAGES } from "@/constants/messages";

const useUpdateServerMemberUsername = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { username: string }) =>
      updateServerMemberUserName(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.serverMember.me() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.posts.lists() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.posts.details() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.comments.lists() });

      toast.success(SUCCESS_MESSAGES.SERVERMEMBER_NAME_UPDATE_SUCCESS);
    },

    onError: (error: any) => {
      if (error?.response?.status === 409) {
        toast.error(SERVER_ERROR_MESSAGES.SERVERMEMBER_NAME_DUPLICATED);
      } else {
        toast.error(SERVER_ERROR_MESSAGES.SERVERMEMBER_NAME_UPDATE_FAILED);
      }
    },
  });
};

export default useUpdateServerMemberUsername;
