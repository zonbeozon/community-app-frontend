import { useEffect } from "react";
import type { IMessage } from "@stomp/stompjs";
import { useStomp } from "../StompProvider";
import { STOMP_DESTINATIONS } from "../destinations";
import { handlePostEvent } from "../handlers/postEventHandler";

export const usePostSubscription = (channelId: number | null) => {
  const { client, isConnected } = useStomp();

  useEffect(() => {
    if (!isConnected || !client || !channelId) {
      return;
    }

    const subscription = client.subscribe(
      STOMP_DESTINATIONS.post(channelId),
      (message: IMessage) => {
        handlePostEvent(channelId, JSON.parse(message.body));
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [isConnected, client, channelId]);
};
