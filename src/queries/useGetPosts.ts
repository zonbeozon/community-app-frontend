import { useQuery } from '@tanstack/react-query';
import { getPosts } from "@/apis/http/post.api";
import { QUERY_KEYS } from '@/constants/queryKeys';
import type { PostsResponse, Post } from "@/types/post.type";

/**
 * 특정 채널의 모든 게시물 목록을 가져오는 TanStack Query 훅입니다.
 * channelId가 변경되면 자동으로 새로운 데이터를 가져옵니다.
 *
 * @param channelId - 조회할 채널의 ID
 */
const useGetPosts = (channelId: number) => {
  // useQuery<TQueryFnData, TError, TData>
  // TQueryFnData: queryFn이 반환하는 원본 데이터 타입 (PostsResponse)
  // TError: 에러 타입 (Error)
  // TData: select를 통해 최종적으로 컴포넌트에 반환될 데이터 타입 (Post[])
  return useQuery<PostsResponse, Error, Post[]>({
    // 1. 쿼리 키에 channelId를 포함하여, 각 채널의 게시물 목록을 고유하게 식별합니다.
    // 예: channelId가 123이면, 키는 ['posts', 'list', { channelId: 123 }] 이 됩니다.
    queryKey: QUERY_KEYS.posts.list(channelId, {}),

    // 2. queryFn에서는 인자로 받은 channelId를 사용하여 API를 호출합니다.
    queryFn: () => getPosts(channelId),
    
    // 3. (핵심) 기존 `upsertPostsAndAuthors`의 데이터 가공 로직을 여기서 처리합니다.
    //    서버에서 받은 복잡한 응답(PostsResponse)에서 실제 사용할 게시물 배열(Post[])만 추출합니다.
    select: (data) => {
      // 서버 응답이 유효한지 확인하고, 게시물 배열만 반환합니다.
      return data && Array.isArray(data.posts) ? data.posts : [];
    },

    // 4. (매우 중요) channelId가 유효한 값일 때만 쿼리를 실행하도록 설정합니다.
    enabled: !!channelId,
  });
};

export default useGetPosts;