import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteReaction } from '@/apis/http/reaction.api';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { SERVER_ERROR_MESSAGES } from '@/constants/message';

// mutate 함수에 전달될 인자의 타입을 명확하게 정의합니다.
// 게시글 목록과 상세 정보를 모두 갱신하기 위해 postId와 channelId가 필요합니다.
interface DeleteReactionVariables {
  postId: number;
  channelId: number;
}

const useDeleteReaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // 1. 실제 비동기 작업을 수행할 함수를 지정합니다.
    mutationFn: ({ postId }: DeleteReactionVariables) => deleteReaction(postId),

    // 2. 작업이 성공했을 때 실행될 콜백입니다.
    onSuccess: (_data, { postId, channelId }) => {
      // (핵심) 리액션이 삭제되었으므로, 이 리액션을 포함하고 있던 'Post' 데이터를 무효화합니다.

      // 1. '게시글 상세 정보' 쿼리를 무효화하여 상세 페이지의 리액션을 갱신합니다.
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.posts.detail(postId) });

      // 2. '게시글 목록' 쿼리를 무효화하여 목록 페이지의 리액션 카운트 등을 갱신합니다.
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.posts.list(channelId, {}) });

      // 성공 토스트는 선택적으로 추가할 수 있습니다. 
      // 리액션 삭제는 보통 즉각적인 UI 피드백이 있으므로 토스트가 없어도 괜찮습니다.
      // toast.success("리액션이 삭제되었습니다."); 
    },

    // 3. 작업이 실패했을 때 실행될 콜백 (기존 로직과 동일)
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          SERVER_ERROR_MESSAGES.REACTION_DELETE_FAILED
      );
    },
  });
};

export default useDeleteReaction;