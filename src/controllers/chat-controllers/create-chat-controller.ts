import {Options, ResponseType} from '../../services/http-service';
import {ErrorResponse} from '../../api/types';
import {CreateChatApi, CreateChatResponse} from '../../api/chat-api/create-chat-api';
import {Indexed} from '../../core/types';
import {isArray} from '../../utils';
import {GetChatsController} from './get-chats-controller';

type CreateChatFormModel = {
	title: string;
};

const createChatApi = new CreateChatApi();

export class CreateChatController {
	static async create(data: CreateChatFormModel): Promise<void> {
		try {
			// Запускаем крутилку
			createChatApi.create(prepareDataToRequest(data))
				.then((response: CreateChatResponse | ErrorResponse | null) => {
					if (isErrorResponse(response)) {
						throw new Error(response.reason);
					}

					GetChatsController.get()
						.catch(error => {
							throw new Error(error);
							// Останавливаем крутилку
						});
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

function isErrorResponse(response: Indexed | Indexed[] | null): response is ErrorResponse {
	return response !== null && isNotArray(response) && Boolean(response.reason);
}

function isNotArray(response: Indexed | Indexed[]): response is Indexed {
	return !isArray(response);
}

function prepareDataToRequest(data: CreateChatFormModel): Options {
	return {
		withCredentials: true,
		responseType: ResponseType.json,
		headers: {
			'content-type': 'application/json',
		},
		data,
	};
}
