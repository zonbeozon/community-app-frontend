// src/services/sseClient.ts

// 환경 변수에서 URL을 가져옵니다.
const BINANCE_WS_URL = import.meta.env.VITE_BINANCE_WS_URL;

type MessageCallback = (message: string) => void;
type OpenCallback = () => void;
type CloseCallback = (event: CloseEvent) => void;
type ErrorCallback = (error: Event) => void;

class SseClient {
  private socket: WebSocket | null = null;
  private url: string = '';

  // 이벤트 발생 시 호출될 콜백 함수들
  private onMessageHandler: MessageCallback = () => {};
  private onOpenHandler: OpenCallback = () => {};
  private onCloseHandler: CloseCallback = () => {};
  private onErrorHandler: ErrorCallback = () => {};

  public connect(streamName: string): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      console.log('WebSocket is already connected.');
      return;
    }
    
    this.url = `${BINANCE_WS_URL}/${streamName}`;
    console.log(`Attempting to connect to: ${this.url}`);
    
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      this.onOpenHandler();
    };

    this.socket.onmessage = (event: MessageEvent) => {
      this.onMessageHandler(event.data);
    };

    this.socket.onclose = (event: CloseEvent) => {
      this.onCloseHandler(event);
    };

    this.socket.onerror = (error: Event) => {
      this.onErrorHandler(error);
    };
  }

  public disconnect(): void {
    if (this.socket) {
      console.log('Disconnecting WebSocket...');
      this.socket.close(1000, "User initiated disconnect"); // 1000은 정상 종료 코드
      this.socket = null;
    }
  }

  // 콜백 함수를 등록하는 메서드들
  public onMessage(callback: MessageCallback): void {
    this.onMessageHandler = callback;
  }

  public onOpen(callback: OpenCallback): void {
    this.onOpenHandler = callback;
  }

  public onClose(callback: CloseCallback): void {
    this.onCloseHandler = callback;
  }
  
  public onError(callback: ErrorCallback): void {
    this.onErrorHandler = callback;
  }
}

// 싱글턴 인스턴스를 생성하여 내보냅니다.
// 앱 전체에서 단 하나의 sseClient 인스턴스만 사용하도록 보장합니다.
export const sseClient = new SseClient();