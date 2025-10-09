import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { updatePostViewCount } from '@/apis/http/post.api';
import { postViewQueueAtom } from '@/atoms/postViewsAtoms';

const useFlushPostViews = () => {
  const setQueue = useSetAtom(postViewQueueAtom);

  return useMutation({
    // 1. 실제 비동기 작업을 수행할 함수
    mutationFn: (queue: number[]) => updatePostViewCount(queue),

    // 2. 작업이 성공했을 때 실행될 콜백
    onSuccess: () => {
      // (핵심) 서버에 성공적으로 전송했으므로, 클라이언트의 큐를 비웁니다.
      setQueue([]);
    },

    // 3. 작업이 실패했을 때 실행될 콜백 (에러 처리)
    onError: (error) => {
      // 실패 시 큐를 비우지 않아야 나중에 재시도할 수 있습니다.
      console.error("포스트 조회수 업데이트 실패:", error);
    },
  });
};

export default useFlushPostViews;