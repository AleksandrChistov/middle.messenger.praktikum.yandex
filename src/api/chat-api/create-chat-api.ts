import {BaseApi} from '../base-api';
import {Http, Options} from '../../services/http-service';
import {host} from '../../constants';
import {ErrorResponse} from '../types';

export type CreateChatResponse = {
	id: number;
};

const createChatApiInstance = new Http(`${host}/api/v2/chats`);

export class CreateChatApi extends BaseApi {
	public async create(options: Options): Promise<CreateChatResponse | ErrorResponse | null> {
		return createChatApiInstance.post<CreateChatResponse | ErrorResponse | null>('', options)
			.then(data => data);
	}
}
