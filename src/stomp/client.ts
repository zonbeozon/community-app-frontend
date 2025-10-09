import { Client } from '@stomp/stompjs';
import { jotaiStore } from '@/atoms/store';
import { accessTokenAtom } from '@/atoms/authAtoms';

export const stompClient = new Client({
  brokerURL: import.meta.env.VITE_WS_URL,

  connectHeaders: {
    Authorization: `Bearer ${jotaiStore.get(accessTokenAtom)}`,
  },
  
  beforeConnect: () => {
    const latestToken = jotaiStore.get(accessTokenAtom);
    stompClient.connectHeaders = {
      Authorization: `Bearer ${latestToken}`,
    };
  },
  
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
});