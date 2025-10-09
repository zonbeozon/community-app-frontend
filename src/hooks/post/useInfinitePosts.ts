import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "@/apis/http/post.api";
import { QUERY_KEYS } from "@/constants/queryKeys";
import type { PostsParams, PostsResponse, Post } from "@/types/post.type";
import { ChannelMember } from "@/types/channelMember.type";

interface InfinitePostsData {
  posts: Post[];
  authors: Record<number, ChannelMember>;
}

const useInfinitePosts = (channelId: number, { enabled = true }) => {
  return useInfiniteQuery<PostsResponse, Error, InfinitePostsData>({
    queryKey: QUERY_KEYS.posts.list(channelId, {}),
    queryFn: ({ pageParam }) => getPosts(channelId, pageParam as PostsParams),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      if (lastPage.isLast) {
        return undefined;
      }
      return lastPage.cursor;
    },
    enabled: !!channelId && enabled,
    select: (data) => {
      return {
        posts: data.pages.flatMap((page) => page.posts),
        authors: data.pages.reduce(
          (acc, page) => ({ ...acc, ...page.authors }),
          {}
        ),
      };
    },
  });
};

export default useInfinitePosts;