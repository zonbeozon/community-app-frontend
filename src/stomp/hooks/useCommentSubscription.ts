import { useEffect } from 'react';
import type { IMessage } from "@stomp/stompjs";
import { useStomp } from '../StompProvider';
import { STOMP_DESTINATIONS } from '../destinations';
import { handleCommentEvent } from '../handlers/commentEventHandler';

export const useCommentSubscription = (postId: number | null) => {
  const { client, isConnected } = useStomp();

  useEffect(() => {
    if (!isConnected || !client || !postId) {
      return;
    }

    const subscription = client.subscribe(
      STOMP_DESTINATIONS.comment(postId),
      (message: IMessage) => {
        handleCommentEvent(postId, JSON.parse(message.body));
      }
    );

    return () => {
      subscription.unsubscribe();
    };

  }, [isConnected, client, postId]);
};