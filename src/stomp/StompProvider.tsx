import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { useAtomValue } from 'jotai'; 
import { StompContextType } from '@/types/stomp.type';
import { accessTokenAtom } from '@/atoms/authAtoms'; 
import { stompClient } from './client';

const StompContext = createContext<StompContextType>({
  client: stompClient,
  isConnected: false,
});

export const useStomp = () => useContext(StompContext);

export const StompProvider = ({ children }: { children: React.ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const accessToken = useAtomValue(accessTokenAtom);

  useEffect(() => {
    if (accessToken) {
      stompClient.onConnect = () => {
        console.log('STOMP: Connection successful!');
        setIsConnected(true);
      };

      stompClient.onDisconnect = () => {
        console.log('STOMP: Disconnected.');
        setIsConnected(false);
      };

      stompClient.onStompError = (frame) => {
        console.error('STOMP: Broker reported error: ' + frame.headers['message']);
        console.error('STOMP: Additional details: ' + frame.body);
        setIsConnected(false);
      };

      stompClient.activate();

      return () => {
        if (stompClient.connected) {
          stompClient.deactivate();
        }
      };
    }
  }, [accessToken]); 
  const value = useMemo(() => ({ client: stompClient, isConnected }), [isConnected]);

  return (
    <StompContext.Provider value={value}>
      {children}
    </StompContext.Provider>
  );
};