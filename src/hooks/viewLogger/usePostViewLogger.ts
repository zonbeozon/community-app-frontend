import { useCallback, useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { postViewQueueAtom } from '@/atoms/postViewsAtoms';
import useFlushPostViews from '@/hooks/viewLogger/useFlushPostViews';

export const usePostViewLogger = () => {
  const [queue, setQueue] = useAtom(postViewQueueAtom);
  const { mutate: flush, isPending } = useFlushPostViews();

  const stateRef = useRef({ queue, isPending });

  useEffect(() => {
    stateRef.current = { queue, isPending };
  }, [queue, isPending]);

  const logView = useCallback(
    (postId: number) => {
      if (queue.includes(postId) || isPending) {
        return;
      }

      const newQueue = [...queue, postId];
      setQueue(newQueue);

      if (newQueue.length >= 10) {
        flush(newQueue);
      }
    },
    [queue, setQueue, flush, isPending],
  );

  const manualFlush = useCallback(() => {
    const { queue: latestQueue, isPending: latestIsPending } = stateRef.current;
    if (latestQueue.length > 0 && !latestIsPending) {
      flush(queue);
    }
  }, [queue, flush, isPending]);

  return { logView, manualFlush, isFlushing: isPending };
};
