import { useQuery } from '@tanstack/react-query';
import { getPost } from '@/apis/http/post.api';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { PostResponse } from '@/types/post.type';

const useGetPost = (postId: number) => {
  return useQuery<PostResponse, Error>({
    // 1. 쿼리 키: postId가 변경되면 자동으로 새로운 데이터를 요청합니다.
    queryKey: QUERY_KEYS.posts.detail(postId),

    // 2. 실제 API를 호출하는 함수
    queryFn: () => getPost(postId),

    // 3. postId가 유효한 숫자일 때만 쿼리를 실행합니다.
    enabled: !!postId && postId > 0,
    
    // 4. (선택 사항) 캐시 시간 등을 설정할 수 있습니다.
    // 게시물 내용은 자주 바뀌지 않으므로 staleTime을 길게 잡아도 좋습니다.
    staleTime: 1000 * 60 * 5, // 5분
  });
};

export default useGetPost;