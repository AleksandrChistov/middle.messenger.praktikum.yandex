import {Options, ResponseType} from '../../services/http-service';
import {ErrorResponse} from '../../api/types';
import {Indexed} from '../../core/types';
import {ChatTokenResponse, GetChatTokenApi} from '../../api/chat-api/get-chat-token-api';

const getChatTokenApi = new GetChatTokenApi();

export class GetChatTokenController {
	static async get(chatId: number): Promise<string | void> {
		try {
			// Запускаем крутилку
			return await getChatTokenApi.get(getOptions(), chatId)
				.then((response: ChatTokenResponse | ErrorResponse) => {
					// Останавливаем крутилку
					if (isErrorResponse(response)) {
						throw new Error(response.reason);
					}

					return response?.token;
				})
				.catch(error => {
					console.error(error, chatId);
					// Останавливаем крутилку
				});
		} catch (error: unknown) {
			console.error(error, chatId);
			// Логика обработки ошибок
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
