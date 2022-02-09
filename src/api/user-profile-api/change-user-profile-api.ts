import {BaseApi} from '../base-api';
import {Http, Options} from '../../services/http-service';
import {host} from '../../constants';
import {ErrorResponse} from '../types';

export type UserProfileResponse = {
	id: number;
	first_name: string;
	second_name: string;
	display_name: string;
	login: string;
	email: string;
	phone: string;
	avatar: string;
};

const userProfileApiInstance = new Http(`${host}/api/v2/user/profile`);

export class ChangeUserProfileApi extends BaseApi {
	public async put(options: Options): Promise<UserProfileResponse | ErrorResponse> {
		return userProfileApiInstance.put<UserProfileResponse | ErrorResponse>('', options)
			.then(data => data);
	}
}
