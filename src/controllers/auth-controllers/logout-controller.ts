import {Options, ResponseType} from '../../services/http-service';
import {router} from '../../index';
import {LogoutApi} from '../../api/auth-api/logout-api';
import {ErrorResponse} from '../../api/types';
import {authService} from '../../services/auth-service';

const logOutApi = new LogoutApi();

export class UserLogOutController {
	static async logOut(): Promise<void> {
		try {
			// Запускаем крутилку
			logOutApi.create(prepareDataToRequest())
				.then((response: ErrorResponse | null) => {
					// Останавливаем крутилку
					if (response) {
						throw new Error(response.reason);
					}

					authService.logOut();

					router.go('/');
				})
				.catch(error => {
					console.error(error);
					// Останавливаем крутилку
					// Логика обработки ошибок
				});
		} catch (error: unknown) {
			console.error(error);
			// Логика обработки ошибок
		}
	}
}

function prepareDataToRequest(): Options {
	return {
		withCredentials: true,
		responseType: ResponseType.json,
	};
}
