import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updatePost } from '@/apis/http/post.api';
import { PostRequest } from '@/types/post.type';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { SUCCESS_MESSAGES, SERVER_ERROR_MESSAGES } from "@/constants/messages";

// mutate 함수에 전달될 인자의 타입을 명확하게 정의합니다.
// 목록을 갱신하려면 channelId도 필요합니다.
interface UpdatePostVariables {
  postId: number;
  channelId: number;
  payload: PostRequest;
}

const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // 1. 실제 비동기 작업을 수행할 함수를 지정합니다.
    mutationFn: ({ postId, payload }: UpdatePostVariables) => 
      updatePost(postId, payload),

    // 2. 작업이 성공했을 때 실행될 콜백입니다.
    onSuccess: (_data, { postId, channelId }) => {
      // (핵심) 게시글이 수정되었으므로, 관련된 쿼리들을 모두 무효화합니다.

      // 1. 이 채널의 '게시글 목록' 쿼리를 무효화하여 목록을 갱신합니다.
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.posts.list(channelId, {}) });

      // 2. 수정된 '게시글 상세 정보' 쿼리도 무효화하여 상세 페이지를 갱신합니다.
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.posts.detail(postId) });

      toast.success(SUCCESS_MESSAGES.POST_UPDATE_SUCCESS);
    },

    // 3. 작업이 실패했을 때 실행될 콜백 (에러 처리)
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          SERVER_ERROR_MESSAGES.POST_UPDATE_FAILED
      );
    },
  });
};

export default useUpdatePost;