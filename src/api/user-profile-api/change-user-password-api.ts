import {BaseApi} from '../base-api';
import {Http, Options} from '../../services/http-service';
import {host} from '../../constants';
import {ErrorResponse} from '../types';

const userPasswordApiInstance = new Http(`${host}/api/v2/user/password`);

export class ChangeUserPasswordApi extends BaseApi {
	public async put(options: Options): Promise<ErrorResponse | null> {
		return userPasswordApiInstance.put<ErrorResponse | null>('', options)
			.then(data => data);
	}
}
