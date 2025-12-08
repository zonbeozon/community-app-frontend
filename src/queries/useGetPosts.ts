import { getPosts } from '@/apis/http/post.api';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import type { PagePayload } from '@/types/common.type';
import type { Post, PostsResponse } from '@/types/post.type';

export const useGetPosts = (channelId: number, options: PagePayload) => {
  const { page = 0, size = 20 } = options;
  const numericChannelId = Number(channelId);
  const currentQueryKey = QUERY_KEYS.posts.list(numericChannelId, { page, size });

  return useQuery<PostsResponse, Error, Post[]>({
    queryKey: currentQueryKey,

    queryFn: () => {
      return getPosts(channelId, { page, size });
    },

    select: (data) => data?.posts ?? [],
    enabled: !!channelId,
  });
};
