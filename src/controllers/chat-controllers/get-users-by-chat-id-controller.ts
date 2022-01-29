import {Options, ResponseType} from '../../services/http-service';
import {ErrorResponse} from '../../api/types';
import {Indexed} from '../../core/types';
import {getAvatarLink, isArray} from '../../utils';
import store from '../../store/store';
import {GetUsersByChatIdApi, UsersResponse} from '../../api/chat-api/get-users-by-chat-id-api';
import {UserActionIcon} from '../../components/found-user/types';
import {getPathFromArray} from '../../core/utils/get-path-from-array';
import {getEventName} from '../../core/utils/get-event-name';
import {UsersListProps} from '../../components/found-users/users-list';
import {hideSpinner, showSpinner} from '../../components/spinner/spinner';
import {POPUP_DELETE_USER_FROM_CHAT_EVENT_NAME} from '../../components/popups/popup-delete-user/events';

const getUsersByChatIdApi = new GetUsersByChatIdApi();

export class GetUsersByChatIdController {
	static async get(selectedChatId: number): Promise<boolean> {
		try {
			showSpinner(POPUP_DELETE_USER_FROM_CHAT_EVENT_NAME);

			return await getUsersByChatIdApi.get(getOptions(), selectedChatId)
				.then((response: UsersResponse | ErrorResponse) => {
					hideSpinner(POPUP_DELETE_USER_FROM_CHAT_EVENT_NAME);

					if (isErrorResponse(response)) {
						throw new Error(response.reason);
					}

					store.set(
						getPathFromArray(['popupDeleteUserFromChat', 'usersList']),
						prepareDataToStore(response),
						getEventName('popupDeleteUserFromChat', 'usersList'),
					);

					return true;
				})
				.catch(error => {
					hideSpinner(POPUP_DELETE_USER_FROM_CHAT_EVENT_NAME);
					throw new Error(error);
				});
		} catch (error: unknown) {
			throw new Error(JSON.stringify(error));
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

function getOptions(): Options {
	return {
		withCredentials: true,
		responseType: ResponseType.json,
	};
}

function prepareDataToStore(usersInChat: UsersResponse): UsersListProps {
	const state = store.getState();

	const users = usersInChat.map(user => ({
		id: user.id,
		fullName: `${user.first_name} ${user.second_name}`,
		avatar: {
			avatarImgSrc: getAvatarLink(user.avatar),
			size: '30px',
		},
		iconType: UserActionIcon.Delete,
	}));

	return {
		...state.chatPage.popupDeleteUserFromChat.usersList,
		users,
	};
}
