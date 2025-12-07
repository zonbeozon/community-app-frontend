import { useEffect } from 'react';
import { useStomp } from '@/stomp/StompProvider';
import { STOMP_DESTINATIONS } from '@/stomp/destinations';
import { handleCommentEvent } from '@/stomp/handlers/commentEventHandler';
import type { IMessage } from '@stomp/stompjs';

export const useCommentSubscription = (postId: number | null) => {
  const { client, isConnected } = useStomp();

  useEffect(() => {
    if (!isConnected || !client || !postId) {
      return;
    }

    const subscription = client.subscribe(STOMP_DESTINATIONS.comment(postId), (message: IMessage) => {
      handleCommentEvent(postId, JSON.parse(message.body));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [isConnected, client, postId]);
};
