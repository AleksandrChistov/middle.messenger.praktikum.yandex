import {Options, ResponseType} from '../../services/http-service';
import {Indexed} from '../../core/types';
import {GetUserInfoApi, UserInfoResponse} from '../../api/user-profile-api/get-user-info-api';
import {ErrorResponse} from '../../api/types';

export type UserIdAndAvatarRequest = {
	id: number;
	avatar: string;
};

const getUserInfoApi = new GetUserInfoApi();

export class UserIdAndAvatarController {
	static async getIdAndAvatar(): Promise<UserIdAndAvatarRequest | void> {
		try {
			return await getUserInfoApi.get(getOptions())
				.then((response: UserInfoResponse | ErrorResponse) => {
					if (isErrorResponse(response)) {
						throw new Error(response.reason);
					}

					return {
						id: response.id,
						avatar: response.avatar,
					};
				})
				.catch(error => {
					throw new Error(error);
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
