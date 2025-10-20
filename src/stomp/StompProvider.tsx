import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { useAtomValue } from 'jotai'; // 👈 jotai 훅을 import 합니다.
import { StompContextType } from '@/types/stomp.type';
import { accessTokenAtom } from '@/atoms/authAtoms'; // 👈 accessTokenAtom을 import 합니다.
import { stompClient } from './client';

const StompContext = createContext<StompContextType>({
  client: stompClient,
  isConnected: false,
});

export const useStomp = () => useContext(StompContext);

export const StompProvider = ({ children }: { children: React.ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  // ✅ Jotai 스토어에서 accessToken 값을 구독합니다.
  const accessToken = useAtomValue(accessTokenAtom);

  useEffect(() => {
    // ✅ 토큰이 존재할 경우에만 연결 로직을 실행합니다.
    if (accessToken) {
      stompClient.onConnect = () => {
        console.log('STOMP: Connection successful!');
        setIsConnected(true);
      };

      stompClient.onDisconnect = () => {
        console.log('STOMP: Disconnected.');
        setIsConnected(false);
      };

      // 에러 핸들링을 추가하면 디버깅에 매우 유용합니다.
      stompClient.onStompError = (frame) => {
        console.error('STOMP: Broker reported error: ' + frame.headers['message']);
        console.error('STOMP: Additional details: ' + frame.body);
        setIsConnected(false);
      };

      // 이제 토큰이 확실히 존재하므로 연결을 활성화합니다.
      stompClient.activate();

      // cleanup 함수: 컴포넌트가 언마운트되거나, accessToken이 사라지면(로그아웃) 연결을 해제합니다.
      return () => {
        if (stompClient.connected) {
          stompClient.deactivate();
        }
      };
    }
  }, [accessToken]); // ✅ useEffect가 accessToken의 변경에 반응하도록 의존성 배열에 추가합니다.

  const value = useMemo(() => ({ client: stompClient, isConnected }), [isConnected]);

  return (
    <StompContext.Provider value={value}>
      {children}
    </StompContext.Provider>
  );
};