import { getRecommendedPosts } from '@/apis/http/post.api';
import { useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';

export const useGetRecommendedPosts = () => {
  const queryInfo = useInfiniteQuery<any, Error>({
    queryKey: QUERY_KEYS.posts.recommend(),

    queryFn: ({ pageParam }) => getRecommendedPosts({ page: pageParam as number, size: 20 }),

    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.content.length === 0) {
        return undefined;
      }
      return allPages.length;
    },
  });
  const posts = queryInfo.data?.pages.flatMap((page) => page.content) || [];
  const lastUpdated = queryInfo.data?.pages[0]?.lastUpdated || null;

  return {
    ...queryInfo,
    data: posts,
    lastUpdated,
  };
};
