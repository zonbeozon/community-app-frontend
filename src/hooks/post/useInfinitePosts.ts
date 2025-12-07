import { getPosts } from '@/apis/http/post.api';
import { useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import type { ChannelMember } from '@/types/channelMember.type';
import type { InfinitePostsData, PostsResponse } from '@/types/post.type';

export const useInfinitePosts = (channelId: number | string, { enabled = true } = {}) => {
  const numericChannelId = Number(channelId);

  return useInfiniteQuery<PostsResponse, Error, InfinitePostsData>({
    queryKey: [...QUERY_KEYS.posts.lists(), numericChannelId],

    queryFn: ({ pageParam }) => 
      getPosts(numericChannelId, { cursorPostId: pageParam as number | undefined }),

    initialPageParam: undefined,

    getNextPageParam: (lastPage) => (lastPage.isLast ? undefined : lastPage.nextCursor),

    enabled: !isNaN(numericChannelId) && numericChannelId > 0 && enabled,

    select: (data) => {
      const posts = data.pages.flatMap((page) => page.posts);
      
      const authors = posts.reduce((acc, post) => {
        if (post.author && post.author.memberId) {
          acc[post.author.memberId] = post.author;
        }
        return acc;
      }, {} as Record<number, ChannelMember>);

      return { posts, authors };
    },
  });
};