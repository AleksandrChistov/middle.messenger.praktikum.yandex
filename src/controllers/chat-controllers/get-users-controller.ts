import {Options, ResponseType} from '../../services/http-service';
import {ErrorResponse} from '../../api/types';
import {Indexed} from '../../core/types';
import {getAvatarLink, isArray} from '../../utils';
import store from '../../store/store';
import {GetUsersApi, UsersResponse} from '../../api/chat-api/get-user-api';
import {UserActionIcon} from '../../components/found-user/types';
import {getPathFromArray} from '../../core/utils/get-path-from-array';
import {getEventName} from '../../core/utils/get-event-name';
import {UsersListProps} from '../../components/found-users/users-list';

type UserLoginFormModel = {
	login: string;
};

const getUsersApi = new GetUsersApi();

export class GetUsersController {
	static async get(data: UserLoginFormModel): Promise<void> {
		try {
			// Запускаем крутилку
			getUsersApi.get(prepareDataToRequest(data))
				.then((response: UsersResponse | ErrorResponse) => {
					// Останавливаем крутилку
					if (isErrorResponse(response)) {
						throw new Error(response.reason);
					}

					store.set(
						getPathFromArray(['popupAddUserToChat', 'usersList']),
						prepareDataToStore(response),
						getEventName('popupAddUserToChat', 'usersList'),
					);
				})
				.catch(error => {
					console.error(error);
					// Останавливаем крутилку
				});
		} catch (error: unknown) {
			console.error(error);
			// Логика обработки ошибок
		}
	}
}

function isErrorResponse(response: Indexed | Indexed[]): response is ErrorResponse {
	return isNotArray(response) && Boolean(response.reason);
}

function isNotArray(response: Indexed | Indexed[]): response is Indexed {
	return !isArray(response);
}

function prepareDataToRequest(data: UserLoginFormModel): Options {
	return {
		withCredentials: true,
		responseType: ResponseType.json,
		headers: {
			'content-type': 'application/json',
		},
		data,
	};
}

function prepareDataToStore(foundUsers: UsersResponse): UsersListProps {
	const state = store.getState();

	const users = foundUsers.map(user => ({
		id: user.id,
		fullName: `${user.first_name} ${user.second_name}`,
		avatar: {
			avatarImgSrc: getAvatarLink(user.avatar),
			size: '30px',
		},
		iconType: UserActionIcon.Add,
	}));

	return {
		...state.chatPage.popupAddUserToChat.usersList,
		users,
	};
}
