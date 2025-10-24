import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { deletePost } from '@/apis/http/post.api';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { ROUTE_PATH } from '@/constants/routePaths';
import { SUCCESS_MESSAGES, SERVER_ERROR_MESSAGES } from "@/constants/messages";

// mutate 함수에 전달될 인자의 타입을 정의합니다.
// onSuccess에서 channelId를 사용하기 위해 함께 받습니다.
interface DeletePostVariables {
  postId: number;
  channelId: number;
}

const useDeletePost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    // 1. 실제 비동기 작업을 수행할 함수를 지정합니다.
    // deletePost API는 postId만 필요하지만, 다른 정보도 함께 받습니다.
    mutationFn: ({ postId }: DeletePostVariables) => deletePost(postId),

    // 2. 작업이 성공했을 때 실행될 콜백입니다.
    onSuccess: (_data, { postId, channelId }) => {
      // (핵심) 게시글이 삭제되었으므로, 관련된 쿼리들을 모두 무효화하거나 제거합니다.

      // 1. 삭제된 '게시글 상세 정보' 쿼리 캐시를 즉시 제거합니다.
      // 이렇게 하면 사용자가 뒤로가기로 돌아왔을 때 삭제된 데이터를 보지 않습니다.
      queryClient.removeQueries({ queryKey: QUERY_KEYS.posts.detail(postId) });
      
      // 2. 이 채널의 '게시글 목록' 쿼리를 무효화하여 목록을 갱신합니다.
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.posts.list(channelId, {}) });

      toast.success(SUCCESS_MESSAGES.POST_DELETE_SUCCESS);
      
      // 3. (UX 개선) 게시글이 삭제되었으므로, 해당 채널의 목록 페이지로 이동합니다.
      const channelPath = ROUTE_PATH.channelId.replace(':channelId', String(channelId));
      navigate(channelPath, { replace: true });
    },

    // 3. 작업이 실패했을 때 실행될 콜백 (에러 처리)
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          SERVER_ERROR_MESSAGES.POST_DELETE_FAILED
      );
    },
  });
};

export default useDeletePost;