import {BaseApi} from '../base-api';
import {Http, Options} from '../../services/http-service';
import {host} from '../../constants';
import {ErrorResponse} from '../types';

export type ChatTokenResponse = {
	token: string;
};

const getChatTokenApiInstance = new Http(`${host}/api/v2/chats/token/`);

export class GetChatTokenApi extends BaseApi {
	public async get(options: Options, chatId: number): Promise<ChatTokenResponse | ErrorResponse> {
		return getChatTokenApiInstance.post<ChatTokenResponse | ErrorResponse>(`${chatId}`, options)
			.then(data => data);
	}
}
