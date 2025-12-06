import { getComments } from '@/apis/http/comment.api';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { CommentsResponse } from '@/types/comment.type';

export const useGetComments = (postId: number) => {
  return useQuery<CommentsResponse, Error>({
    queryKey: QUERY_KEYS.comments.list(postId, {}),
    queryFn: () => getComments(postId),
    enabled: !!postId && postId > 0,
    staleTime: 1000 * 60 * 3,
  });
};
