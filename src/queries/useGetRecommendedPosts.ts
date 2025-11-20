import { useInfiniteQuery } from '@tanstack/react-query';
import { getRecommendedPosts } from '@/apis/http/post.api';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { Post } from '@/types/post.type';

const useGetRecommendedPosts = () => {
  return useInfiniteQuery<any, Error, Post[]>({
    queryKey: QUERY_KEYS.posts.recommend(), 
    queryFn: ({ pageParam = 0 }) => getRecommendedPosts({ page: pageParam, size: 20 }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.content.length === 0) {
        return undefined;
      }
      return allPages.length;
    },
    select: (data) => data.pages.flatMap(page => page.content),
  });
};

export default useGetRecommendedPosts;