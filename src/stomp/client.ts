// src/lib/stomp.ts (파일 경로 예시)

import { Client } from '@stomp/stompjs';
import { jotaiStore } from '@/atoms/store';
import { accessTokenAtom } from '@/atoms/authAtoms';

export const stompClient = new Client({
  brokerURL: import.meta.env.VITE_WS_URL,

  beforeConnect: () => {
    console.log("Attempting to connect with token...");
    const latestToken = jotaiStore.get(accessTokenAtom);

    console.log("Token from Jotai store:", latestToken);

    stompClient.connectHeaders = {
      Authorization: `Bearer ${latestToken}`,
    };
  },
  
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
});

stompClient.onConnect = (frame) => {
  console.log('STOMP: Connected to ' + frame.headers['server']);
};

stompClient.onStompError = (frame) => {
  console.error('STOMP: Broker reported error: ' + frame.headers['message']);
  console.error('STOMP: Additional details: ' + frame.body);
};