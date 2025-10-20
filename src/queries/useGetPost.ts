import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getPost } from '@/apis/http/post.api';
import { QUERY_KEYS } from '@/constants/queryKeys';
// 이제 정확한 타입을 알고 있습니다.
import { PostResponse, Post } from '@/types/post.type'; 
import { ChannelMember } from '@/types/channelMember.type';
import { InfiniteData } from '@tanstack/react-query'; 

// select가 반환할 최종 데이터 타입
interface PostDetailData {
  post: Post;
  author: ChannelMember;
}

// PostList의 API 응답 페이지 타입
interface PostListPage {
  posts: Post[];
  authors: ChannelMember[]; // 타입 정의에 따라 배열이 맞습니다.
}

const useGetPost = (postId: number, channelId: number) => {
  const queryClient = useQueryClient();

  return useQuery<PostResponse, Error, PostDetailData>({
    queryKey: QUERY_KEYS.posts.detail(postId),
    queryFn: () => getPost(postId),
    enabled: !!postId && postId > 0,
    staleTime: 1000 * 60 * 5,

    initialData: () => {
      const queryKey = [QUERY_KEYS.posts.list, channelId];
      const cachedListData = queryClient.getQueryData<InfiniteData<PostListPage>>(queryKey);

      if (!cachedListData) return undefined;
      
      let foundPost: Post | undefined;
      let foundAuthor: ChannelMember | undefined;

      for (const page of cachedListData.pages) {
        foundPost = page.posts?.find((p) => p.postId === postId);
        if (foundPost) {
          foundAuthor = page.authors?.find((a) => a.memberId === foundPost!.authorId);
          break; 
        }
      }

      if (foundPost && foundAuthor) {
        // initialData는 API 응답 타입인 PostResponse와 구조가 같아야 합니다.
        // PostResponse는 Post의 속성 + author 객체입니다.
        // 따라서 foundPost에서 authorId를 제외하고, foundAuthor를 author 속성으로 추가합니다.
        const { authorId, ...restOfPost } = foundPost;
        
        return {
          ...restOfPost, // postId, content 등 나머지 post 속성들
          author: foundAuthor, // author 객체
        };
      }
      
      return undefined;
    },

    select: (data: PostResponse) => {
      // API 응답 데이터(data)는 PostResponse 타입입니다.
      // 이 타입은 Post 속성들과 author 객체를 포함하고 있습니다.
      // 우리는 이걸 { post: Post, author: ChannelMember } 구조로 변환해야 합니다.
      
      const { author, ...postProperties } = data;
      
      // Post 타입에는 authorId가 필요하므로, author 객체에서 가져와 다시 채워줍니다.
      const post: Post = {
        ...postProperties,
        authorId: author.memberId,
      };

      return { post, author };
    },
  });
};

export default useGetPost;