export interface BinanceTradeData {
    e: 'trade';      // 이벤트 타입
    E: number;       // 이벤트 시간 (timestamp)
    s: string;       // 심볼 (e.g., "BTCUSDT")
    t: number;       // 체결 ID
    p: string;       // 체결 가격
    q: string;       // 체결 수량
    b: number;       // 구매자 주문 ID
    a: number;       // 판매자 주문 ID
    T: number;       // 체결 시간 (timestamp)
    m: boolean;      // 구매자가 마켓 메이커(지정가 주문)인지 여부
  }
  
  /**
   * 수신된 메시지가 유효한 BinanceTradeData인지 확인하는 타입 가드 함수
   * @param data - 파싱된 JSON 객체
   * @returns boolean
   */
  function isValidTradeData(data: any): data is BinanceTradeData {
    return (
      data &&
      data.e === 'trade' &&
      typeof data.s === 'string' &&
      typeof data.p === 'string' &&
      typeof data.q === 'string' &&
      typeof data.E === 'number'
    );
  }
  
  /**
   * WebSocket으로부터 받은 원시 메시지(문자열)를 파싱하고 유효성을 검사합니다.
   * @param message - WebSocket MessageEvent 데이터
   * @returns 유효한 경우 BinanceTradeData 객체, 그렇지 않으면 null
   */
  export function parseTradeMessage(message: string): BinanceTradeData | null {
    try {
      const data = JSON.parse(message);
      if (isValidTradeData(data)) {
        return data;
      }
      console.warn('Received message is not valid trade data:', data);
      return null;
    } catch (error) {
      console.error('Failed to parse WebSocket message:', error);
      return null;
    }
  }