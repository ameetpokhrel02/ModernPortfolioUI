// WebSocket Manager for AI Integration
// This is a utility class that can be extended if needed
// Currently, WebSocket logic is handled directly in useTerminalEngine
// but this provides a foundation for more complex AI integrations

export interface WebSocketMessage {
  message: string;
  timestamp?: number;
  type?: 'user' | 'ai' | 'system';
}

export interface WebSocketConfig {
  url: string;
  reconnectAttempts?: number;
  reconnectDelay?: number;
}

export class WebSocketManager {
  private ws: WebSocket | null = null;
  private config: WebSocketConfig;
  private reconnectCount = 0;
  private maxReconnectAttempts: number;
  private reconnectDelay: number;

  constructor(config: WebSocketConfig) {
    this.config = config;
    this.maxReconnectAttempts = config.reconnectAttempts || 3;
    this.reconnectDelay = config.reconnectDelay || 1000;
  }

  connect(
    onOpen?: () => void,
    onMessage?: (data: any) => void,
    onClose?: () => void,
    onError?: (error: Event) => void
  ): Promise<WebSocket> {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(this.config.url);

        this.ws.onopen = () => {
          this.reconnectCount = 0;
          onOpen?.();
          resolve(this.ws!);
        };

        this.ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            onMessage?.(data);
          } catch (error) {
            console.error('Failed to parse WebSocket message:', error);
          }
        };

        this.ws.onclose = () => {
          onClose?.();
          this.attemptReconnect(onOpen, onMessage, onClose, onError);
        };

        this.ws.onerror = (error) => {
          onError?.(error);
          reject(error);
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  private attemptReconnect(
    onOpen?: () => void,
    onMessage?: (data: any) => void,
    onClose?: () => void,
    onError?: (error: Event) => void
  ) {
    if (this.reconnectCount < this.maxReconnectAttempts) {
      this.reconnectCount++;
      setTimeout(() => {
        this.connect(onOpen, onMessage, onClose, onError);
      }, this.reconnectDelay * this.reconnectCount);
    }
  }

  send(message: WebSocketMessage): boolean {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
      return true;
    }
    return false;
  }

  close() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  get isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  get readyState(): number | undefined {
    return this.ws?.readyState;
  }
}