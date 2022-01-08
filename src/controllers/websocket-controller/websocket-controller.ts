import {wssHost} from "../../constants";
import {
  LastMessageResponse,
  MessageResponse,
  WebsocketApi
} from "../../api/websocket-api/websocket-api";
import {Indexed} from "../../core/types";
import {isArray} from "../../utils";


type ReturnedThenFunction = {
  then: (callback: (isOpened: boolean) => void) => void;
}

class WebsocketController {
  private _socket: WebsocketApi;
  private _url: string;
  private _startCallBack: (isOpened: boolean) => void;

  public start(userId: number, chatId: number, token: string): ReturnedThenFunction {
    this._url = `${wssHost}/ws/chats/${userId}/${chatId}/${token}`;

    return this.startConnection();
  }

  startConnection(): ReturnedThenFunction {
    this._socket = new WebsocketApi(this._url);

    this.close();
    this.error();

    return {
      then: (callback: (isOpened: boolean) => void) => {
        this._startCallBack = callback;

        this._socket.open((success: string) => {
          console.log('wss:// ', success);
          callback(true);
        });
      }
    }
  }

  public close(): void {
    this._socket.close(
      (successMessage: string) => {
        console.log('wss:// ', successMessage);
      },
      () => {
        this.startConnection().then(this._startCallBack);
      }
    )
  }

  public error(): void {
    this._socket.error((event: Event) => {
      console.error('wss:// ', event);
    });
  }

  public send(message: string): void {
    return this._socket.send(message);
  }

  public subscribeToMessage(callback: (response: MessageResponse) => void): void {
    this._socket.message((response) => {
      console.log('isMessageResponse(response) > ', isMessageResponse(response));

      if (isMessageResponse(response)) {
        callback(response);
      }
    });
  }

  getLastMessages(callback: (response: LastMessageResponse[]) => void, count: number = 0): void {
    this._socket.send(count.toString(), 'get old');

    this._socket.message((response) => {
      console.log('getLastMessages > ', response);

      if (isLastMessagesResponse(response)) {
        callback(response);
      }
    });
  }
}

function isMessageResponse(response: Indexed | Indexed[]): response is MessageResponse {
  return isNotArray(response) && response.type === "message";
}

function isLastMessagesResponse(response: Indexed | Indexed[]): response is LastMessageResponse[] {
  return isArray(response);
}

function isNotArray(response: Indexed | Indexed[]): response is Indexed {
  return !isArray(response);
}

export const webSocketController = new WebsocketController();
