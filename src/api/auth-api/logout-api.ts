import {BaseApi} from '../base-api';
import {Http, Options} from '../../services/http-service';
import {host} from '../../constants';
import {ErrorResponse} from '../types';

const logOutApiInstance = new Http(`${host}/api/v2/auth/logout`);

export class LogoutApi extends BaseApi {
	public async create(options: Options): Promise<ErrorResponse | null> {
		return logOutApiInstance.post<ErrorResponse | null>('', options)
			.then(data => data);
	}
}
