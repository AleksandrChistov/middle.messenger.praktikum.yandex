import {Options, ResponseType} from "../../services/http-service";
import {ErrorResponse} from "../../api/types";
import {Indexed} from "../../core/types";
import {getAvatarLink, isArray} from "../../utils";
import store from "../../store/store";
import {CHAT_PAGE_EVENT_NAME} from "../../screens/chat/events";
import {ChatPageProps} from "../../screens/chat/types";
import {GetUsersByChatIdAPI, UsersResponse} from "../../api/chat-api/get-users-by-chat-id-api";
import {UserActionIcon} from "../../components/found-user/types";


const getUsersByChatIdAPI = new GetUsersByChatIdAPI();

export class GetUsersByChatIdController {
  static async get(selectedChatId: number): Promise<void> {
    try {
      // Запускаем крутилку
      return getUsersByChatIdAPI.get(getOptions(), selectedChatId)
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
        avatarImgSrc: getAvatarLink(user.avatar),
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
