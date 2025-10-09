import { Client } from "@stomp/stompjs";

export interface StompContextType {
  client: Client;
  isConnected: boolean;
}

export interface StompStore {
  client: Client | null;
  isConnected: boolean;
  setClient: (client: Client | null) => void;
  setConnected: (isConnected: boolean) => void;
};