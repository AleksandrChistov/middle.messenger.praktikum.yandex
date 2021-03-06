import {Options, ResponseType} from '../../services/http-service';
import {router} from '../../index';
import {SignInApi} from '../../api/auth-api/signin-api';
import {Indexed} from '../../core/types';
import {ErrorResponse} from '../../api/types';
import {authService} from '../../services/auth-service';

const validationKeys = ['login', 'password'];

type SignInFormModel = {
	login: string;
	password: string;
};

const signInApi = new SignInApi();

export class UserSignInController {
	static async signIn(data: Indexed): Promise<void> {
		try {
			// Запускаем крутилку
			const isValid = userSignInValidator(data);

			if (!isValid) {
				throw new Error('SignUp form data  does not correspond to Sign Up Form Model type');
			}

			signInApi.create(prepareDataToRequest(data))
				.then((response: ErrorResponse | null) => {
					// Останавливаем крутилку
					if (response) {
						throw new Error(response.reason);
					}

					authService.logIn();

					router.go('/messenger');
				})
				.catch(error => {
					console.error(error, data);
					// Останавливаем крутилку
				});
		} catch (error: unknown) {
			console.error(error, data);
			// Логика обработки ошибок
		}
	}
}

function userSignInValidator(data: Record<string, unknown>): data is SignInFormModel {
	const keysArray = Object.keys(data);

	return validationKeys.every((key: string) => keysArray.includes(key));
}

function prepareDataToRequest(data: SignInFormModel): Options {
	return {
		withCredentials: true,
		responseType: ResponseType.json,
		headers: {
			'content-type': 'application/json',
		},
		data,
	};
}
