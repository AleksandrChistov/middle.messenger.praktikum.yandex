import {Options, ResponseType} from '../../services/http-service';
import {ErrorResponse} from '../../api/types';
import store from '../../store/store';
import {DeleteUsersFromChatApi} from '../../api/chat-api/delete-users-api';
import {getPathFromArray} from '../../core/utils/get-path-from-array';
import {getEventName} from '../../core/utils/get-event-name';
import {UsersListProps} from '../../components/found-users/users-list';
import {GetChatsController} from './get-chats-controller';
import {FoundUserProps} from '../../components/found-user/types';

type DeleteUsersFromChatFormModel = {
	users: number[];
	chatId: number;
};

const deleteUsersFromChatApi = new DeleteUsersFromChatApi();

export class DeleteUsersFromChatController {
	static async delete(data: DeleteUsersFromChatFormModel): Promise<void> {
		try {
			// Запускаем крутилку
			deleteUsersFromChatApi.delete(prepareDataToRequest(data))
				.then((response: ErrorResponse | null) => {
					// Останавливаем крутилку
					if (response) {
						throw new Error(response.reason);
					}

					store.set(
						getPathFromArray(['popupDeleteUserFromChat', 'usersList']),
						prepareDataToStore(data.users),
						getEventName('popupDeleteUserFromChat', 'usersList'),
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

function prepareDataToRequest(data: DeleteUsersFromChatFormModel): Options {
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

	const deleteUsersFromList = (usersList: FoundUserProps[]) => {
		const newUsersList = usersList.filter(user => !usersIds.includes(user.id));

		if (!newUsersList.length) {
			GetChatsController.get()
				.catch(error => {
					throw new Error(error);
					// Останавливаем крутилку
				});
		}

		return newUsersList;
	};

	return {
		...state.chatPage.popupDeleteUserFromChat.usersList,
		users: deleteUsersFromList(state.chatPage.popupDeleteUserFromChat.usersList.users),
	};
}
