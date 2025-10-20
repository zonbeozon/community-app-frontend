// src/lib/stomp.ts (파일 경로 예시)

import { Client } from '@stomp/stompjs';
import { jotaiStore } from '@/atoms/store';
import { accessTokenAtom } from '@/atoms/authAtoms';

export const stompClient = new Client({
  brokerURL: import.meta.env.VITE_WS_URL,

  // 👇 초기 connectHeaders를 제거합니다.
  // connectHeaders: {
  //   Authorization: `Bearer ${jotaiStore.get(accessTokenAtom)}`,
  // },
  
  // ✅ beforeConnect에서만 헤더를 동적으로 설정합니다.
  // 이 콜백은 client.activate()가 호출될 때마다 실행됩니다.
  beforeConnect: () => {
    console.log("Attempting to connect with token...");
    const latestToken = jotaiStore.get(accessTokenAtom);

    // 디버깅을 위해 토큰 값을 확인합니다.
    console.log("Token from Jotai store:", latestToken);

    // connectHeaders를 최신 토큰으로 '덮어씁니다'.
    stompClient.connectHeaders = {
      Authorization: `Bearer ${latestToken}`,
    };
  },
  
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
});

// 디버깅을 위한 이벤트 핸들러 추가
stompClient.onConnect = (frame) => {
  console.log('STOMP: Connected to ' + frame.headers['server']);
};

stompClient.onStompError = (frame) => {
  console.error('STOMP: Broker reported error: ' + frame.headers['message']);
  console.error('STOMP: Additional details: ' + frame.body);
};