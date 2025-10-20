import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAtomValue } from 'jotai';

import { createPost } from '@/apis/http/post.api';
import { PostRequest } from '@/types/post.type';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { serverMemberAtom } from '@/atoms/authAtoms';
import { SUCCESS_MESSAGES, SERVER_ERROR_MESSAGES } from "@/constants/message";


// mutate 함수에 전달될 인자의 타입을 명확하게 정의합니다.
interface CreatePostVariables {
  channelId: number;
  payload: PostRequest;
}

const useCreatePost = () => {
  const queryClient = useQueryClient();

  const myInfo = useAtomValue(serverMemberAtom);

  return useMutation({
    // 1. 실제 비동기 작업을 수행할 함수를 지정합니다.
    // createPost API는 생성된 postId를 반환한다고 가정합니다. (Promise<number>)
    mutationFn: ({ channelId, payload }: CreatePostVariables): Promise<number> =>
      createPost(channelId, payload),
    
    // 2. Mutation 실행 전, 클라이언트 측 유효성 검사를 수행합니다.
    onMutate: async () => {
      if (!myInfo) {
        toast.error("로그인 정보가 없어 게시글을 작성할 수 없습니다.");
        throw new Error("Not logged in"); 
      }
    },

    // 3. 작업이 성공했을 때 실행될 콜백입니다.
    onSuccess: () => {
      // (핵심) 게시글이 생성되었으므로, 해당 채널의 '게시글 목록' 쿼리를 무효화합니다.
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.posts.lists() });
      // 정확히는 특정 채널의 목록만 무효화하는 것이 더 좋습니다.
      // queryClient.invalidateQueries({ queryKey: QUERY_KEYS.posts.list(channelId, {}) });

      toast.success(SUCCESS_MESSAGES.POST_CREATE_SUCCESS);

      // (UX 개선) 생성된 게시글 상세 페이지로 바로 이동시킵니다.
    },

    // 4. 작업이 실패했을 때 실행될 콜백 (에러 처리)
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