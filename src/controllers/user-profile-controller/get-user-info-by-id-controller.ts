import {Options, ResponseType} from '../../services/http-service';
import {Indexed} from '../../core/types';
import {ErrorResponse} from '../../api/types';
import {
	GetUserInfoByIdApi,
	UserInfoByIdResponse,
} from '../../api/user-profile-api/get-user-info-by-id-api';

const getUserInfoByIdApi = new GetUserInfoByIdApi();

export class UserInfoByIdController {
	static async getInfo(userId: string): Promise<UserInfoByIdResponse | void> {
		try {
			// Запускаем крутилку
			return await getUserInfoByIdApi.get(getOptions(), userId)
				.then((response: UserInfoByIdResponse | ErrorResponse) => {
					// Останавливаем крутилку
					if (isErrorResponse(response)) {
						throw new Error(response.reason);
					}

					return response;
				})
				.catch(error => {
					console.error(error);
					// Останавливаем крутилку
				});
		} catch (error: unknown) {
			console.error(error);
			// Останавливаем крутилку
		}
	}
}

function isErrorResponse(response: Indexed): response is ErrorResponse {
	return Boolean(response?.reason);
}

function getOptions(): Options {
	return {
		withCredentials: true,
		responseType: ResponseType.json,
	};
}
