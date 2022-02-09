import {BaseApi} from '../base-api';
import {Http, Options} from '../../services/http-service';
import {host} from '../../constants';
import {ErrorResponse} from '../types';

export type UserInfoByIdResponse = {
	id: number;
	first_name: string;
	second_name: string;
	display_name: string;
	login: string;
	email: string;
	phone: string;
	avatar: string;
};

const userInfoByIdApiInstance = new Http(`${host}/api/v2/user/`);

export class GetUserInfoByIdApi extends BaseApi {
	public async get(options: Options, userId: string):
	Promise<UserInfoByIdResponse | ErrorResponse> {
		return userInfoByIdApiInstance.get<UserInfoByIdResponse | ErrorResponse>(userId, options)
			.then(data => data);
	}
}
