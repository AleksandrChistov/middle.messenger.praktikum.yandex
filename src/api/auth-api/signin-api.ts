import {BaseApi} from '../base-api';
import {Http, Options} from '../../services/http-service';
import {host} from '../../constants';
import {ErrorResponse} from '../types';

const signInApiInstance = new Http(`${host}/api/v2/auth/signin`);

export class SignInApi extends BaseApi {
	public async create(options: Options): Promise<ErrorResponse | null> {
		return signInApiInstance.post<ErrorResponse | null>('', options)
			.then(data => data);
	}
}
