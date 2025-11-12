import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAtomValue } from 'jotai';
import { createPost } from '@/apis/http/post.api';
import { PostRequest } from '@/types/post.type';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { serverMemberAtom } from '@/atoms/authAtoms';
import { SUCCESS_MESSAGES, SERVER_ERROR_MESSAGES } from "@/constants/messages";

interface CreatePostVariables {
  channelId: number;
  payload: PostRequest;
}

const useCreatePost = () => {
  const queryClient = useQueryClient();
  const myInfo = useAtomValue(serverMemberAtom);

  return useMutation({
    mutationFn: ({ channelId, payload }: CreatePostVariables): Promise<number> =>
      createPost(channelId, payload),
    
    onMutate: async () => {
      if (!myInfo) {
        toast.error("로그인 정보가 없어 게시글을 작성할 수 없습니다.");
        throw new Error("Not logged in"); 
      }
    },

    onSuccess: (data, variables) => {
      const { channelId } = variables;
      const queryKeyToInvalidate = [...QUERY_KEYS.posts.lists(), channelId];
      
      console.log('✅ Corrected query key invalidation:', queryKeyToInvalidate);

      queryClient.invalidateQueries({ queryKey: queryKeyToInvalidate });
      
      toast.success(SUCCESS_MESSAGES.POST_CREATE_SUCCESS);
    },

    onError: (error: any) => {
      if (error.message === "Not logged in") return;
      
      toast.error(
        error.response?.data?.message ||
          SERVER_ERROR_MESSAGES.POST_CREATE_FAILED
      );
    },
  });
};

export default useCreatePost;