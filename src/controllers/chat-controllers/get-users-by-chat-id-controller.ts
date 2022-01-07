import {Options, ResponseType} from "../../services/http-service";
import {ErrorResponse} from "../../api/types";
import {Indexed} from "../../core/types";
import {isArray} from "../../utils";
import store from "../../store/store";
import {CHAT_PAGE_EVENT_NAME} from "../../screens/chat/events";
import {ChatPageProps} from "../../screens/chat/types";
import {GetUsersByChatIdAPI, UsersResponse} from "../../api/chat-api/get-users-by-chat-id-api";
import {host} from "../../constants";
import {UserActionIcon} from "../../components/found-user/types";


const getUsersByChatIdAPI = new GetUsersByChatIdAPI();

export class GetUsersByChatIdController {
  static async get(): Promise<void> {
    try {
      // Запускаем крутилку
      const chatId = store.getState().chatPage.selectedChat?.id as number;

      getUsersByChatIdAPI.get(getOptions(), chatId)
        .then((response: UsersResponse | ErrorResponse) => {
          // Останавливаем крутилку
          if (isErrorResponse(response)) {
            throw new Error(response.reason);
          }

          store.set('chatPage', prepareDataToStore(response), CHAT_PAGE_EVENT_NAME);
        })
        .catch((error) => {
          console.error(error);
          // Останавливаем крутилку
        })
    } catch (error) {
      console.error(error);
      // Логика обработки ошибок
    }
  }
}

function isErrorResponse(response: Indexed | Indexed[]): response is ErrorResponse {
  return isNotArray(response) && !!response.reason;
}

function isNotArray(response: Indexed | Indexed[]): response is Indexed {
  return !isArray(response);
}

function getOptions(): Options {
  return {
    withCredentials: true,
    responseType: ResponseType.json,
  }
}

function prepareDataToStore(usersInChat: UsersResponse): ChatPageProps {
  const state = store.getState();

  const users = usersInChat.map(user => {
    return {
      id: user.id,
      fullName: `${user.first_name} ${user.second_name}`,
      avatar: {
        avatarImgSrc: user.avatar ? `${host}/api/v2/resources${user.avatar}` : null,
        size: '30px',
      },
      iconType: UserActionIcon.Delete,
    }
  })

  return {
    ...state.chatPage,
    popupDeleteUserFromChat: {
      ...state.chatPage.popupDeleteUserFromChat,
      usersList: users
    }
  }
}
