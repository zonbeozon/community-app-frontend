import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { StompContextType } from '@/types/stomp.type';
import { stompClient } from './client';

const StompContext = createContext<StompContextType>({
  client: stompClient,
  isConnected: false,
});

export const useStomp = () => useContext(StompContext);

export const StompProvider = ({ children }: { children: React.ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    stompClient.onConnect = () => {
      setIsConnected(true);
    };

    stompClient.onDisconnect = () => {
      setIsConnected(false);
    };

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, []); 

  const value = useMemo(() => ({ client: stompClient, isConnected }), [isConnected]);

  return (
    <StompContext.Provider value={value}>
      {children}
    </StompContext.Provider>
  );
};