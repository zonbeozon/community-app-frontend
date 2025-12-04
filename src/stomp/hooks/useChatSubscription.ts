import { useEffect } from 'react';
import type { IMessage } from '@stomp/stompjs';
import { useStomp } from '../StompProvider';
import { STOMP_DESTINATIONS } from '../destinations';
import { handleChatEvent } from '../handlers/chatEventHandler';

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
