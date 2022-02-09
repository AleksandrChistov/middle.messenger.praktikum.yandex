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
};

const getUsersApiInstance = new Http(`${host}/api/v2/user/search`);

export class GetUsersApi extends BaseApi {
	public async get(options: Options): Promise<UsersResponse | ErrorResponse> {
		return getUsersApiInstance.post<UsersResponse | ErrorResponse>('', options)
			.then(data => data);
	}
}
