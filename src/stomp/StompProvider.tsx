import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { accessTokenAtom } from '@/atoms/authAtoms';
import { useAtomValue } from 'jotai';
import type { StompContextType } from '@/types/stomp.type';
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
      stompClient.connectHeaders = {
        Authorization: `Bearer ${accessToken}`,
      };
      stompClient.onConnect = () => {
        setIsConnected(true);
      };

      stompClient.onDisconnect = () => {
        setIsConnected(false);
      };

      stompClient.onStompError = () => {
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

  return <StompContext.Provider value={value}>{children}</StompContext.Provider>;
};
