import { useCallback } from 'react';
import { useAtom } from 'jotai';
import { postViewQueueAtom } from '@/atoms/postViewsAtoms';
import useFlushPostViews from '@/queries/useFlushPostViews';

const usePostViewLogger = () => {
  const [queue, setQueue] = useAtom(postViewQueueAtom);
  const { mutate: flush, isPending } = useFlushPostViews();

  const logView = useCallback((postId: number) => {
    // 큐에 이미 있거나, 현재 flush가 진행 중이면 아무것도 하지 않음
    if (queue.includes(postId) || isPending) {
      return;
    }

    // 새로운 postId를 큐에 추가
    const newQueue = [...queue, postId];
    setQueue(newQueue);

    // 큐가 10개 이상 쌓이면 자동으로 flush 실행
    if (newQueue.length >= 10) {
      flush(newQueue);
    }
  }, [queue, setQueue, flush, isPending]);
  
  // 수동으로 flush를 실행하고 싶을 때를 대비해 flush 함수도 반환
  const manualFlush = useCallback(() => {
    if (queue.length > 0 && !isPending) {
      flush(queue);
    }
  }, [queue, flush, isPending]);

  return { logView, manualFlush, isFlushing: isPending };
};

export default usePostViewLogger;