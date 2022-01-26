import {wssHost} from '../../constants';
import {WebsocketApi} from '../../api/websocket-api/websocket-api';
import {CloseCode, LastMessageResponse, MessageResponse} from '../../api/websocket-api/types';
import {Indexed} from '../../core/types';
import {isArray} from '../../utils';

type ReturnedThenFunction = {
	then: (callback: (isOpened: boolean) => void) => void;
};

class WebsocketController {
	public isStarted = false;
	private _socketApi: WebsocketApi;
	private _url: string;
	private _startCallBack: (isOpened: boolean) => void;

	public start(userId: number, chatId: number, token: string): ReturnedThenFunction {
		this._url = `${wssHost}/ws/chats/${userId}/${chatId}/${token}`;

		return this.startConnection();
	}

	public closeConnection(code: CloseCode = CloseCode.Success, reason?: string): void {
		this._socketApi.closeConnection(code, reason);
	}

	public close(): void {
		this._socketApi.close(
			(successMessage: string) => {
				this.isStarted = false;
				console.log('wss:// ', successMessage);
			},
			() => {
				this.isStarted = false;
				this.startConnection().then(this._startCallBack);
			},
		);
	}

	public error(): void {
		this._socketApi.error((event: Event) => {
			this.isStarted = false;
			console.error('wss:// ', event);
		});
	}

	public send(message: string): void {
		this._socketApi.send(message);
	}

	public subscribeToMessage(callback: (response: MessageResponse) => void): void {
		this._socketApi.message(response => {
			if (isMessageResponse(response)) {
				callback(response);
			}
		});
	}

	public getLastMessages(callback: (response: LastMessageResponse[]) => void, count = 0): void {
		this._socketApi.message(response => {
			if (isLastMessagesResponse(response)) {
				callback(response);
			}
		});

		this._socketApi.send(count.toString(), 'get old');
	}

	private startConnection(): ReturnedThenFunction {
		this._socketApi = new WebsocketApi(this._url);

		this.close();
		this.error();

		return {
			then: (callback: (isOpened: boolean) => void) => {
				this._startCallBack = callback;

				this._socketApi.open((success: string) => {
					console.log('wss:// ', success);
					this.isStarted = true;
					callback(true);
					this._socketApi.ping();
				});
			},
		};
	}
}

function isMessageResponse(response: Indexed | Indexed[]): response is MessageResponse {
	return isNotArray(response) && response.type === 'message';
}

function isLastMessagesResponse(response: Indexed | Indexed[]): response is LastMessageResponse[] {
	return isArray(response);
}

function isNotArray(response: Indexed | Indexed[]): response is Indexed {
	return !isArray(response);
}

export const webSocketController = new WebsocketController();
