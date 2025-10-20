import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "@/apis/http/post.api";
import { QUERY_KEYS } from "@/constants/queryKeys";
import type { PostsParams, PostsResponse, Post } from "@/types/post.type";
import { ChannelMember } from "@/types/channelMember.type";

interface InfinitePostsData {
  posts: Post[];
  authors: Record<number, ChannelMember>; // { [memberId]: ChannelMember } 형태의 객체
  // react-query의 select가 반환하는 데이터 타입을 명시합니다.
  // 이 외에 페이지 정보가 필요하다면 여기에 추가할 수 있습니다.
  // 예: pages: PostsResponse[]; pageParams: (string | number | undefined)[];
}

const useInfinitePosts = (channelId: number, { enabled = true }) => {
  // useInfiniteQuery의 제네릭 타입을 명확히 합니다.
  // 1. queryFn이 반환하는 타입 (PostsResponse)
  // 2. 에러 타입 (Error)
  // 3. select 함수가 최종적으로 반환하는 타입 (InfinitePostsData)
  return useInfiniteQuery<PostsResponse, Error, InfinitePostsData>({
    queryKey: [QUERY_KEYS.posts.list, channelId],
    queryFn: ({ pageParam }) => getPosts(channelId, pageParam as PostsParams),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => (lastPage.isLast ? undefined : lastPage.cursor),
    enabled: !!channelId && enabled,
    
    // 이 부분을 아래와 같이 수정합니다.
    select: (data) => {
      // 1. 모든 페이지의 posts를 하나의 배열로 합칩니다.
      const posts = data.pages.flatMap((page) => page.posts);

      // 2. 모든 페이지의 authors 배열을 하나의 배열로 합친 뒤,
      //    reduce를 사용하여 { [memberId]: authorInfo } 형태의 객체로 변환합니다.
      const authors = data.pages
        .flatMap((page) => page.authors) // 모든 페이지의 authors 배열을 하나로 합침
        .reduce((acc, author) => {
          // acc: 누적되고 있는 객체, author: 현재 순회중인 작성자 정보
          // author.memberId가 존재할 경우에만 객체에 추가 (안전장치)
          if (author && author.memberId) {
            acc[author.memberId] = author;
          }
          return acc;
        }, {} as Record<number, ChannelMember>); // 초기값을 빈 객체로 설정하고 타입을 명시

      // 3. 컴포넌트에서 사용하기 좋게 가공된 데이터를 반환합니다.
      return { posts, authors };
    },
  });
};

export default useInfinitePosts;