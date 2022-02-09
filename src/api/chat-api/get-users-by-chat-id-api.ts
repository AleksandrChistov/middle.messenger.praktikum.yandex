import {BaseApi} from '../base-api';
import {Http, Options} from '../../services/http-service';
import {host} from '../../constants';
import {ErrorResponse} from '../types';

export type UsersResponse = User[];

export type User = {
	id: number;
	first_name: string;
	second_name: string;
	display_name: string;
	login: string;
	email: string;
	phone: string;
	avatar: string;
	role: string;
};

const getUsersByChatIdApiInstance = new Http(`${host}/api/v2/chats/`);

export class GetUsersByChatIdApi extends BaseApi {
	public async get(options: Options, chatId: number): Promise<UsersResponse | ErrorResponse> {
		return getUsersByChatIdApiInstance
			.get<UsersResponse | ErrorResponse>(`${chatId}/users`, options)
			.then(data => data);
	}
}
