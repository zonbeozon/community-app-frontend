import { getPost } from '@/apis/http/post.api';
import { InfiniteData, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import type { InfinitePostsData, Post, PostData } from '@/types/post.type';

export const useGetPost = (postId: number, channelId: number) => {
  const queryClient = useQueryClient();

  return useQuery<Post, Error, PostData>({
    queryKey: QUERY_KEYS.posts.detail(postId),
    queryFn: () => getPost(postId),
    enabled: !!postId && postId > 0,
    staleTime: 1000 * 60 * 5,

    initialData: () => {
      const queryKey = [QUERY_KEYS.posts.list, channelId];
      const cachedListData = queryClient.getQueryData<InfiniteData<InfinitePostsData>>(queryKey);

      if (!cachedListData) return undefined;

      for (const page of cachedListData.pages) {
        const foundPost = page.posts?.find((p) => p.postId === postId);

        if (foundPost) {
          const author = page.authors?.[foundPost.author.memberId];

          if (author) {
            return { ...foundPost, author };
          }

          return foundPost;
        }
      }

      return undefined;
    },

    select: (data: Post) => {
      return {
        post: data,
        author: data.author,
      };
    },
  });
};
