import {Options, ResponseType} from '../../services/http-service';
import {ErrorResponse} from '../../api/types';
import {ChangeUserPasswordApi} from '../../api/user-profile-api/change-user-password-api';

type UserPasswordFormModel = {
	oldPassword: string;
	newPassword: string;
};

const changeUserPasswordApi = new ChangeUserPasswordApi();

export class ChangeUserPasswordController {
	static async change(data: UserPasswordFormModel): Promise<void> {
		try {
			changeUserPasswordApi.put(prepareDataToRequest(data))
				.then((response: ErrorResponse | null) => {
					// Останавливаем крутилку
					if (response) {
						throw new Error(response.reason);
					}
					// Notify user that the password has been changed successfully
				})
				.catch(error => {
					console.error(error, data);
					// Останавливаем крутилку
				});
		} catch (error: unknown) {
			console.error(error, data);
			// Останавливаем крутилку
		}
	}
}

function prepareDataToRequest(data: UserPasswordFormModel): Options {
	return {
		withCredentials: true,
		responseType: ResponseType.json,
		headers: {
			'content-type': 'application/json',
		},
		data,
	};
}
