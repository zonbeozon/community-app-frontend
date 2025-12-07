import { Client } from '@stomp/stompjs';

export const stompClient = new Client({
  brokerURL: import.meta.env.VITE_WS_URL,

  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
});

stompClient.onStompError = (frame) => {
  console.error('STOMP: Broker reported error: ' + frame.headers['message']);
  console.error('STOMP: Additional details: ' + frame.body);
};
