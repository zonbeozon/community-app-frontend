import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "@/apis/http/post.api";
import { QUERY_KEYS } from "@/constants/queryKeys";
import type { PostsResponse, Post } from "@/types/post.type";
import { ChannelMember } from "@/types/channelMember.type";

interface InfinitePostsData {
  posts: Post[];
  authors: Record<number, ChannelMember>;
}

const useInfinitePosts = (channelId: number | string, { enabled = true } = {}) => {
  const numericChannelId = Number(channelId);

  return useInfiniteQuery<PostsResponse, Error, InfinitePostsData>({
    queryKey: [...QUERY_KEYS.posts.lists(), numericChannelId],

    queryFn: ({ pageParam }) => getPosts(numericChannelId, pageParam),
    
    initialPageParam: undefined,
    
    getNextPageParam: (lastPage) => (lastPage.isLast ? undefined : lastPage.nextCursor),
    
    enabled: !isNaN(numericChannelId) && numericChannelId > 0 && enabled,
    
    select: (data) => {
      const posts = data.pages.flatMap((page) => page.posts);
      const authors = data.pages
        .flatMap((page) => page.authors)
        .reduce((acc, author) => {
          if (author && author.memberId) {
            acc[author.memberId] = author;
          }
          return acc;
        }, {} as Record<number, ChannelMember>);

      return { posts, authors };
    },
  });
};

export default useInfinitePosts;