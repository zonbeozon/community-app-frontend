import { createContext, useContext, useEffect, useState, ReactNode, useMemo } from 'react';

// --- [추가] 공통으로 사용할 데이터 타입 정의 ---

/**
 * @kline 스트림에서 받는 캔들 데이터 타입
 */
export interface BinanceKlineData {
  e: 'kline';      // 이벤트 타입
  E: number;       // 이벤트 시간
  s: string;       // 심볼
  k: {
    t: number;     // 캔들 시작 시간
    T: number;     // 캔들 마감 시간
    s: string;     // 심볼
    i: string;     // 시간 간격 (e.g., "1m")
    f: number;     // 첫 거래 ID
    L: number;     // 마지막 거래 ID
    o: string;     // 시가
    c: string;     // 종가
    h: string;     // 고가
    l: string;     // 저가
    v: string;     // 거래량
    n: number;     // 거래 횟수
    x: boolean;    // 이 캔들이 마감되었는지 여부
    q: string;     // 호가 통화 거래량
    V: string;     // 매수 거래량
    Q: string;     // 매수 호가 통화 거래량
  };
}

/**
 * @trade 스트림에서 받는 실시간 체결 데이터 타입
 */
export interface BinanceTradeData {
  e: 'trade';
  E: number;
  s: string;
  t: number;
  p: string;
  q: string;
  b: number;
  a: number;
  T: number;
  m: boolean;
}

// --- [수정] Context와 Provider를 제네릭으로 변경 ---

/**
 * Context에서 공유할 값의 타입을 제네릭 <T>로 변경
 * T에는 BinanceKlineData 또는 BinanceTradeData 등이 들어올 수 있습니다.
 */
interface SseContextType<T> {
  lastMessage: T | null;
  isConnected: boolean;
}

/**
 * Context 생성 시, 어떤 타입이든 받을 수 있도록 <any>로 초기화
 */
const SseContext = createContext<SseContextType<any> | undefined>(undefined);

interface SseProviderProps {
  children: ReactNode;
  streamName: string;
}

// Vite 환경 변수에서 웹소켓 기본 URL 가져오기
const BINANCE_WS_URL = import.meta.env.VITE_BINANCE_WS_URL;

/**
 * SseProvider 컴포넌트를 제네릭 함수 컴포넌트로 변경
 * <T>를 통해 이 Provider가 다룰 데이터 타입을 외부에서 지정할 수 있습니다.
 */
export const SseProvider = <T,>({ children, streamName }: SseProviderProps) => {
  const [lastMessage, setLastMessage] = useState<T | null>(null); // state 타입도 T로 변경
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    if (!streamName) return;

    const fullUrl = `${BINANCE_WS_URL}/${streamName}`;
    console.log(`Connecting to WebSocket at: ${fullUrl}`);
    
    const socket = new WebSocket(fullUrl);

    socket.onopen = () => {
      console.log(`✅ Binance WebSocket connection established for ${streamName}.`);
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      try {
        const data: T = JSON.parse(event.data); // 수신 데이터를 제네릭 타입 T로 간주
        setLastMessage(data);
      } catch (error) {
        console.error('Failed to parse message:', event.data, error);
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket Error:', error);
      setIsConnected(false);
    };

    socket.onclose = () => {
      console.log(`⚪️ WebSocket connection closed for ${streamName}.`);
      setIsConnected(false);
    };

    return () => {
      console.log('Closing WebSocket connection...');
      socket.close();
    };
    
  }, [streamName]); 

  const value = useMemo(() => ({ lastMessage, isConnected }), [lastMessage, isConnected]);

  return (
    <SseContext.Provider value={value}>
      {children}
    </SseContext.Provider>
  );
};

/**
 * useSse 커스텀 훅도 제네릭으로 변경
 * 이 훅을 사용하는 컴포넌트에서 데이터 타입을 명시해주어야 합니다.
 */
export const useSse = <T,>(): SseContextType<T> => {
  // as를 사용하여 context의 타입을 명시적으로 지정
  const context = useContext(SseContext) as SseContextType<T>;
  if (context === undefined) {
    throw new Error('useSse must be used within a SseProvider');
  }
  return context;
};