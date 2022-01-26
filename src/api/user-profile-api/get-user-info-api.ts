import {BaseApi} from '../base-api';
import {Http, Options} from '../../services/http-service';
import {host} from '../../constants';
import {ErrorResponse} from '../types';

export type UserInfoResponse = {
	id: number;
	first_name: string;
	second_name: string;
	display_name: string;
	login: string;
	email: string;
	phone: string;
	avatar: string;
};

const userInfoApiInstance = new Http(`${host}/api/v2/auth/user`);

export class GetUserInfoApi extends BaseApi {
	public async get(options: Options): Promise<UserInfoResponse | ErrorResponse> {
		return userInfoApiInstance.get<UserInfoResponse | ErrorResponse>('', options)
			.then(data => data);
	}
}
