export type MessageResponse = {
  id: string;
  time: string;
  user_id: string;
  content: string;
  type: "message";
}

export type ConnectedResponse = {
  content: string;
  type: string;
}

export type LastMessageResponse = {
  chat_id: number;
  time: string;
  type: string;
  user_id: number;
  content: string;
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  }
}

export class WebsocketApi {
  private _socket: WebSocket;

  constructor(url: string) {
    this._socket = new WebSocket(url);
  }

  open(callback: (successMessage: string) => void): void {
    this._socket.addEventListener('open', () => {
      callback('Соединение установлено');
    });
  }

  close(successCallback: (message: string) => void, errorCallback: (message: string) => void): void {
    this._socket.addEventListener('close', event => {
      if (event.wasClean) {
        successCallback('Соединение закрыто чисто');
      } else {
        errorCallback('Обрыв соединения');
      }
      // Событие close будет вызвано, если кто-то или что-то «убило» процесс
      console.error(`Код: ${event.code} | Причина: ${event.reason}`);
    });
  }

  error(errorCallback: (event: Event) => void): void {
    this._socket.addEventListener('error', event => {
      errorCallback(event);
    });
  }

  message(callback: (data: MessageResponse | ConnectedResponse | LastMessageResponse[]) => void): void {
    this._socket.addEventListener('message', event => {
      if (typeof event.data === 'string') {
        callback(JSON.parse(event.data));
      } else {
        callback(event.data);
      }
    });
  }

  send(message: string, type: string = 'message'): void {
    this._socket.send(JSON.stringify({
      content: message,
      type: type,
    }));
  }

  ping(): void {
    setTimeout(() => this.heartbeat(), 10000);
  }

  private heartbeat() {
    if (!this._socket || this._socket.readyState !== 1) {
      return;
    }

    this._ping();
    setTimeout(() => this.heartbeat(), 10000);
  }

  private _ping(): void {
    this._socket.send(JSON.stringify({
      type: 'ping',
    }));

    console.log('wss:// ping');
  }
}
