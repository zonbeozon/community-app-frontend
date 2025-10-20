import { queryClient } from '@/lib/queryClient';
import { jotaiStore } from '@/atoms/store';
import { channelActivityMapAtom } from '@/atoms/channelAtoms';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { Post } from '@/types/post.type';
import { Page } from '@/types/common.type';
import { PostEvent } from '@/types/stompEvent.type';

export const handlePostEvent = (channelId: number, eventBody: PostEvent) => {
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
      const { type, ...newPostData } = eventBody;

      queryClient.setQueryData<Page<Post>>(postListQueryKey, (oldData) => {
        if (!oldData) return;
        return {
          ...oldData,
          content: oldData.content.map(post =>
            post.postId === postId
              ? { ...post, ...newPostData } 
              : post
          ),
        };
      });
      
      queryClient.setQueryData<Post>(postDetailQueryKey, (oldData) => {
        if (!oldData) return;
        return { ...oldData, ...newPostData };
      });
      break;
    }

    case "DELETED": {
      queryClient.setQueryData<Page<Post>>(postListQueryKey, (oldData) => {
        if (!oldData) return;
        return {
          ...oldData,
          content: oldData.content.filter(post => post.postId !== postId),
        };
      });
      queryClient.removeQueries({ queryKey: postDetailQueryKey });
      break;
    }
  }
};