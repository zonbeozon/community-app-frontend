import { useEffect } from 'react';
import { useStomp } from '@/stomp/StompProvider';
import { STOMP_DESTINATIONS } from '@/stomp/destinations';
import { handleChatEvent } from '@/stomp/handlers/chatEventHandler';
import type { IMessage } from '@stomp/stompjs';

export const useChatSubscription = (chattingGroupId: number) => {
  const { client, isConnected } = useStomp();

  useEffect(() => {
    if (!isConnected || !client || !chattingGroupId) {
      return;
    }

    const subscription = client.subscribe(STOMP_DESTINATIONS.chat(chattingGroupId), (message: IMessage) => {
      handleChatEvent(chattingGroupId, JSON.parse(message.body));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [isConnected, client, chattingGroupId]);
};
