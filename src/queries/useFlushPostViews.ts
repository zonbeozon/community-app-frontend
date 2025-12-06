import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { updatePostViewCount } from '@/apis/http/post.api';
import { postViewQueueAtom } from '@/atoms/postViewsAtoms';

const useFlushPostViews = () => {
  const setQueue = useSetAtom(postViewQueueAtom);

  return useMutation({
    mutationFn: (queue: number[]) => updatePostViewCount(queue),

    onSuccess: () => {
      setQueue([]);
    },

    onError: (error) => {
      console.error("포스트 조회수 업데이트 실패:", error);
    },
  });
};

export default useFlushPostViews;