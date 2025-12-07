import { useEffect } from 'react';
import { useStomp } from '@/stomp/StompProvider';
import { STOMP_DESTINATIONS } from '@/stomp/destinations';
import { handlePostEvent } from '@/stomp/handlers/postEventHandler';
import type { IMessage } from '@stomp/stompjs';

export const usePostSubscription = (channelId: number | null) => {
  const { client, isConnected } = useStomp();

  useEffect(() => {
    if (!isConnected || !client || !channelId) {
      return;
    }

    const subscription = client.subscribe(STOMP_DESTINATIONS.post(channelId), (message: IMessage) => {
      handlePostEvent(channelId, JSON.parse(message.body));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [isConnected, client, channelId]);
};
