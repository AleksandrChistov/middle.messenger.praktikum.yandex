import {BaseApi} from '../base-api';
import {Http, Options} from '../../services/http-service';
import {host} from '../../constants';
import {ErrorResponse} from '../types';

export type SignUpResponse = {
	id: number;
};

const signUpApiInstance = new Http(`${host}/api/v2/auth/signup`);

export class SignUpApi extends BaseApi {
	public async create(options: Options): Promise<SignUpResponse | ErrorResponse> {
		return signUpApiInstance.post<SignUpResponse | ErrorResponse>('', options)
			.then(data => data);
	}
}
