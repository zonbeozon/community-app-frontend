import { queryClient } from '@/lib/queryClient';
import { jotaiStore } from '@/atoms/store';
import { channelActivityMapAtom } from '@/atoms/channelAtoms';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { Post } from '@/types/post.type';
import { Page } from '@/types/common.type';

interface PostEventBody {
  type: "CREATED" | "UPDATED" | "DELETED";
  postId: number;
  content?: string;
  images?: any[]; 
  updatedAt?: string;
  [key: string]: any;
}

export const handlePostEvent = (channelId: number, eventBody: PostEventBody) => {
  if (!eventBody) return;

  const { type, postId } = eventBody;
  const postListQueryKey = QUERY_KEYS.posts.list(channelId, {});
  const postDetailQueryKey = QUERY_KEYS.posts.detail(postId);

  switch (type) {
    case "CREATED": {
      queryClient.invalidateQueries({ queryKey: postListQueryKey });
      
      jotaiStore.set(channelActivityMapAtom, (prevMap) => ({
        ...prevMap,
        [channelId]: new Date().toISOString(),
      }));
      break;
    }

    case "UPDATED": {
      queryClient.setQueryData<Page<Post>>(postListQueryKey, (oldData) => {
        if (!oldData) return;
        return {
          ...oldData,
          content: oldData.content.map(post =>
            post.id === postId
              ? { 
                  ...post, 
                  content: eventBody.content, 
                  images: eventBody.images, 
                  updatedAt: eventBody.updatedAt 
                }
              : post
          ),
        };
      });
      
      queryClient.setQueryData<Post>(postDetailQueryKey, (oldData) => {
        if (!oldData) return;
        return {
          ...oldData,
          content: eventBody.content,
          images: eventBody.images,
          updatedAt: eventBody.updatedAt,
        };
      });
      break;
    }

    case "DELETED": {
      queryClient.setQueryData<Page<Post>>(postListQueryKey, (oldData) => {
        if (!oldData) return;
        return {
          ...oldData,
          content: oldData.content.filter(post => post.id !== postId),
        };
      });
      queryClient.removeQueries({ queryKey: postDetailQueryKey });
      break;
    }
  }
};