import {Options, ResponseType} from '../../services/http-service';
import {ErrorResponse} from '../../api/types';
import {AddUsersToChatApi} from '../../api/chat-api/add-users-api';
import store from '../../store/store';
import {getPathFromArray} from '../../core/utils/get-path-from-array';
import {getEventName} from '../../core/utils/get-event-name';
import {UsersListProps} from '../../components/found-users/users-list';
import {FoundUserProps} from '../../components/found-user/types';

export type AddUsersToChatFormModel = {
	users: number[];
	chatId: number;
};

const addUsersToChatApi = new AddUsersToChatApi();

export class AddUsersToChatController {
	static async add(data: AddUsersToChatFormModel): Promise<void> {
		try {
			// Запускаем крутилку
			addUsersToChatApi.add(prepareDataToRequest(data))
				.then((response: ErrorResponse | null) => {
					// Останавливаем крутилку
					if (response) {
						throw new Error(response.reason);
					}

					store.set(
						getPathFromArray(['popupAddUserToChat', 'usersList']),
						prepareDataToStore(data.users),
						getEventName('popupAddUserToChat', 'usersList'),
					);
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

function prepareDataToRequest(data: AddUsersToChatFormModel): Options {
	return {
		withCredentials: true,
		responseType: ResponseType.json,
		headers: {
			'content-type': 'application/json',
		},
		data,
	};
}

function prepareDataToStore(usersIds: number[]): UsersListProps {
	const state = store.getState();

	const getUsersWithDisabledPlusButton = (usersList: FoundUserProps[]) =>
		usersList.map(user => {
			if (usersIds.includes(user.id)) {
				return {
					...user,
					iconDisabled: true,
				};
			}

			return user;
		});

	return {
		...state.chatPage.popupAddUserToChat.usersList,
		users: getUsersWithDisabledPlusButton(state.chatPage.popupAddUserToChat.usersList.users),
	};
}
