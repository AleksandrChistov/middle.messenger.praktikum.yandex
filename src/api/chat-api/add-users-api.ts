import {BaseApi} from '../base-api';
import {Http, Options} from '../../services/http-service';
import {host} from '../../constants';
import {ErrorResponse} from '../types';

const addUsersToChatApiInstance = new Http(`${host}/api/v2/chats/users`);

export class AddUsersToChatApi extends BaseApi {
	public async add(options: Options): Promise<ErrorResponse | null> {
		return addUsersToChatApiInstance.put<ErrorResponse | null>('', options)
			.then(data => data);
	}
}
