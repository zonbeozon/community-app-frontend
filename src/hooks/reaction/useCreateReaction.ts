import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createReaction } from '@/apis/http/reaction.api';
import { ReactionType } from '@/types/reaction.type';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { SERVER_ERROR_MESSAGES } from '@/constants/messages';

// mutate 함수에 전달될 인자의 타입을 명확하게 정의합니다.
interface CreateReactionVariables {
  postId: number;
  channelId: number; // 게시글 목록을 무효화하기 위해 필요
  reactionType: ReactionType;
}

const useCreateReaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // 1. 실제 비동기 작업을 수행할 함수를 지정합니다.
    mutationFn: ({ postId, reactionType }: CreateReactionVariables) =>
      createReaction(postId, reactionType),

    // 2. 작업이 성공했을 때 실행될 콜백입니다.
    onSuccess: (_data, { postId, channelId }) => {
      // (핵심) 리액션이 추가되었으므로, 이 리액션을 포함하는 'Post' 데이터를 무효화합니다.

      // 1. '게시글 상세 정보' 쿼리를 무효화하여 상세 페이지의 리액션을 갱신합니다.
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.posts.detail(postId) });

      // 2. '게시글 목록' 쿼리를 무효화하여 목록 페이지의 리액션 카운트 등을 갱신합니다.
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.posts.list(channelId, {}) });
    },

    // 3. 작업이 실패했을 때 실행될 콜백 (에러 처리)
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          SERVER_ERROR_MESSAGES.REACTION_CREATE_FAILED
      );
    },
  });
};

export default useCreateReaction;