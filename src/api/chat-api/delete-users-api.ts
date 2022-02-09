import {BaseApi} from '../base-api';
import {Http, Options} from '../../services/http-service';
import {host} from '../../constants';
import {ErrorResponse} from '../types';

const deleteUsersFromChatApiInstance = new Http(`${host}/api/v2/chats/users`);

export class DeleteUsersFromChatApi extends BaseApi {
	public async delete(options: Options): Promise<ErrorResponse | null> {
		return deleteUsersFromChatApiInstance.delete<ErrorResponse | null>('', options)
			.then(data => data);
	}
}
