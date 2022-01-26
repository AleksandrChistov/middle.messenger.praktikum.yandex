import {Options, ResponseType} from '../../services/http-service';
import {Indexed} from '../../core/types';
import {ErrorResponse} from '../../api/types';
import store from '../../store/store';
import {SettingsPageProps} from '../../screens/settings/types';
import {SETTINGS_PAGE_EVENT_NAME} from '../../screens/settings/events';
import {
	ChangeUserAvatarApi,
	UserAvatarResponse,
} from '../../api/user-profile-api/change-user-avatar-api';
import {getAvatarLink} from '../../utils';

const changeUserAvatarApi = new ChangeUserAvatarApi();

export class ChangeUserAvatarController {
	static async change(formData: FormData): Promise<void> {
		try {
			// Запускаем крутилку
			changeUserAvatarApi.put(prepareDataToRequest(formData))
				.then((response: UserAvatarResponse | ErrorResponse) => {
					// Останавливаем крутилку
					if (isErrorResponse(response)) {
						throw new Error(response.reason);
					}

					store.set('settingsPage', prepareDataToStore(response), SETTINGS_PAGE_EVENT_NAME);
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

function prepareDataToRequest(formData: FormData): Options {
	return {
		withCredentials: true,
		responseType: ResponseType.json,
		data: formData,
	};
}

function prepareDataToStore(data: UserAvatarResponse): SettingsPageProps {
	const state = store.getState();

	URL.revokeObjectURL(state.settingsPage.popupAvatar.avatarImgSrc);

	return {
		...state.settingsPage,
		avatarImgSrc: getAvatarLink(data.avatar),
		popupAvatar: {
			...store.getState().settingsPage.popupAvatar,
			avatarImgSrc: getAvatarLink(data.avatar),
			avatarBlobImgSrc: null,
			changeAvatarButton: {
				...store.getState().settingsPage.popupAvatar.changeAvatarButton,
				isDisabled: true,
			},
		},
	};
}
