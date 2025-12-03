import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getPost } from '@/apis/http/post.api';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { Post } from '@/types/post.type'; 
import { ChannelMember } from '@/types/channelMember.type';
import { InfiniteData } from '@tanstack/react-query'; 

interface PostDetailData {
  post: Post;
  author: ChannelMember;
}

interface PostListPage {
  posts: Post[];
  authors: ChannelMember[]; 
}

const useGetPost = (postId: number, channelId: number) => {
  const queryClient = useQueryClient();

  return useQuery<Post, Error, PostDetailData>({
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
        const { authorId, ...restOfPost } = foundPost;
        
        return {
          ...restOfPost, 
          author: foundAuthor, 
        };
      }
      
      return undefined;
    },

    select: (data: Post) => {
      
      const { author, ...postProperties } = data;
      
      const post: Post = {
        ...postProperties,
        authorId: author.memberId,
      };

      return { post, author };
    },
  });
};

export default useGetPost;