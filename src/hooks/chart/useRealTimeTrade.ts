import { useEffect, useRef, useState } from 'react';
import useWebSocket from 'react-use-websocket';

const WS_BASE_URL = import.meta.env.VITE_BINANCE_WS_URL;

export const useRealTimeTrade = (symbol: string) => {
  const [displayPrice, setDisplayPrice] = useState<number | null>(null);
  
  const latestPriceRef = useRef<number | null>(null);

  const wsUrl = symbol 
    ? `${WS_BASE_URL}/${symbol.toLowerCase()}usdt@trade` 
    : null;

  useWebSocket(wsUrl, {
    onMessage: (event) => {
      const tradeData = JSON.parse(event.data);
      if (tradeData.e === 'trade' && tradeData.p) {
        const price = parseFloat(tradeData.p);
        latestPriceRef.current = price;

        if (displayPrice === null) {
          setDisplayPrice(price);
        }
      }
    },
    shouldReconnect: () => true,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (latestPriceRef.current !== null) {
        setDisplayPrice(latestPriceRef.current);
      }
    }, 15000); 

    return () => clearInterval(intervalId);
  }, []);

  return displayPrice;
};