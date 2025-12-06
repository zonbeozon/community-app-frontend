import { queryClient } from '@/lib/queryClient';
import { jotaiStore } from '@/atoms/store';
import { channelActivityMapAtom } from '@/atoms/channelAtoms';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { Post } from '@/types/post.type';
import { PostEvent } from '@/types/stompEvent.type';

export const handlePostEvent = (channelId: number, eventBody: PostEvent) => {
  if (!eventBody) return;

  const { type, postId } = eventBody;

  const postListPartialQueryKey = QUERY_KEYS.posts.list(channelId);
  const postDetailQueryKey = QUERY_KEYS.posts.detail(postId);

  switch (type) {
    case "CREATED": {
      queryClient.invalidateQueries({ queryKey: postListPartialQueryKey });

      jotaiStore.set(channelActivityMapAtom, (prevMap) => ({
        ...prevMap,
        [channelId]: new Date().toISOString(),
      }));
      break;
    }

    case "UPDATED": {
      queryClient.invalidateQueries({ queryKey: postListPartialQueryKey });
      
      queryClient.setQueryData<Post>(postDetailQueryKey, (oldData) => {
        if (!oldData) return;
        const { type, ...newPostData } = eventBody;
        return { ...oldData, ...newPostData };
      });
      break;
    }

    case "DELETED": {
      queryClient.invalidateQueries({ queryKey: postListPartialQueryKey });
      queryClient.removeQueries({ queryKey: postDetailQueryKey });
      break;
    }
  }
};