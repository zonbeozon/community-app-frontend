import { Client } from "@stomp/stompjs";

export interface StompContextType {
  client: Client;
  isConnected: boolean;
}