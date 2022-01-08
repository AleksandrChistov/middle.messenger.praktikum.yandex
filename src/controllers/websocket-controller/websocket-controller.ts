import {wssHost} from "../../constants";
import {
  LastMessageResponse,
  MessageResponse,
  WebsocketApi
} from "../../api/websocket-api/websocket-api";
import {Indexed} from "../../core/types";
import {isArray} from "../../utils";

class WebsocketController {
  private _socket: WebsocketApi;

  public start(userId: number, chatId: number, token: string): Promise<boolean> {
    this._socket = new WebsocketApi(`${wssHost}/ws/chats/${userId}/${chatId}/${token}`);

    this.close();
    this.error();

    return this._socket.open().then((success: string) => {
      console.log('wss:// ', success);
      return true;
    });
  }

  public close(): void {
    this._socket.close(
      (successMessage: string) => {
        console.log('wss:// ', successMessage);
      },
      (errorMessage: string) => {
        console.error(errorMessage); // TODO: reconnect
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
