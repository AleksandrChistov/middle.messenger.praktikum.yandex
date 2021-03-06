import {Options, ResponseType} from '../../services/http-service';
import {Indexed} from '../../core/types';
import {GetUserInfoApi, UserInfoResponse} from '../../api/user-profile-api/get-user-info-api';
import {ErrorResponse} from '../../api/types';
import store from '../../store/store';
import {UserProfileResponse} from '../../api/user-profile-api/change-user-profile-api';
import {SettingsPageProps} from '../../screens/settings/types';
import {UPDATE_USER_PROFILE_EVENT_NAME} from '../../screens/settings/events';
import {getAvatarLink} from '../../utils';

const getUserInfoApi = new GetUserInfoApi();

export class UserInfoController {
	static async getInfo(): Promise<void> {
		try {
			// Запускаем крутилку
			getUserInfoApi.get(getOptions())
				.then((response: UserInfoResponse | ErrorResponse) => {
					// Останавливаем крутилку
					if (isErrorResponse(response)) {
						throw new Error(response.reason);
					}

					store.set('settingsPage', prepareDataToStore(response), UPDATE_USER_PROFILE_EVENT_NAME);
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

function prepareDataToStore(data: UserProfileResponse): SettingsPageProps {
	const state = store.getState();

	return {
		...state.settingsPage,
		avatarImgSrc: getAvatarLink(data.avatar),
		nameInput: {
			...state.settingsPage.nameInput,
			value: data.first_name,
		},
		surnameInput: {
			...state.settingsPage.surnameInput,
			value: data.second_name,
		},
		displayNameInput: {
			...state.settingsPage.displayNameInput,
			value: data.display_name,
		},
		loginInput: {
			...state.settingsPage.loginInput,
			value: data.login,
		},
		emailInput: {
			...state.settingsPage.emailInput,
			value: data.email,
		},
		phoneInput: {
			...state.settingsPage.phoneInput,
			value: data.phone,
		},
		popupAvatar: {
			...store.getState().settingsPage.popupAvatar,
			avatarImgSrc: getAvatarLink(data.avatar),
		},
	};
}
