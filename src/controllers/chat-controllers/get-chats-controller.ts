import {Options, ResponseType} from '../../services/http-service';
import {ErrorResponse} from '../../api/types';
import {ChatsResponse, GetChatsApi} from '../../api/chat-api/get-chats-api';
import {Indexed} from '../../core/types';
import {getAvatarLink, isArray} from '../../utils';
import store from '../../store/store';
import {CHAT_PAGE_EVENT_NAME} from '../../screens/chat/events';
import {TimeProps, TimeType} from '../../components/time/types';
import {getPathFromArray} from '../../core/utils/get-path-from-array';
import {getEventName} from '../../core/utils/get-event-name';
import {ChatsListProps} from '../../components/chat-list/chats-list';

const getChatsApi = new GetChatsApi();

export class GetChatsController {
	static async get(): Promise<void> {
		try {
			// Запускаем крутилку
			getChatsApi.get(getOptions())
				.then((response: ChatsResponse | ErrorResponse) => {
					// Останавливаем крутилку
					if (isErrorResponse(response)) {
						throw new Error(response.reason);
					}

					store.set(
						getPathFromArray(['chatPage', 'popupCreateChat']),
						{
							...store.getState().chatPage.popupCreateChat,
							isOpened: false,
						},
						getEventName(CHAT_PAGE_EVENT_NAME, 'popupCreateChat'),
					);

					store.set(
						getPathFromArray(['chatPage', 'chatsList']),
						prepareDataToStore(response),
						getEventName(CHAT_PAGE_EVENT_NAME, 'chatsList'),
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

function getOptions(): Options {
	return {
		withCredentials: true,
		responseType: ResponseType.json,
	};
}

function prepareDataToStore(chats: ChatsResponse): ChatsListProps {
	const state = store.getState();

	const chatCards = chats.map(chat => ({
		chatName: chat.title,
		textMessage: chat.last_message?.content,
		unreadMessageCount: chat.unread_count,
		avatar: {
			avatarImgSrc: getAvatarLink(chat.avatar),
			size: '40px',
		},
		time: getTime(chat.last_message?.time),
		active: false,
		id: chat.id,
	}));

	return {
		...state.chatPage.chatsList,
		chats: chatCards,
	};
}

function getTime(date: string | undefined): TimeProps | null {
	if (!date) {
		return null;
	}

	return {
		type: TimeType.Card,
		date: new Date(date),
	};
}
