import {Options, ResponseType} from "../../services/http-service";
import {ErrorResponse} from "../../api/types";
import {Indexed} from "../../core/types";
import {isArray} from "../../utils";
import store from "../../store/store";
import {CHAT_PAGE_EVENT_NAME} from "../../screens/chat/events";
import {ChatPageProps} from "../../screens/chat/types";
import {GetUsersAPI, UsersResponse} from "../../api/chat-api/get-user-api";
import {host} from "../../constants";
import {UserActionIcon} from "../../components/found-user/types";
import {getPathFromArray} from "../../core/utils/get-path-from-array";
import {getEventName} from "../../core/utils/get-event-name";


type UserLoginFormModel = {
  login: string;
}

const getUsersAPI = new GetUsersAPI();

export class GetUsersController {
  static async get(data: UserLoginFormModel): Promise<void> {
    try {
      // Запускаем крутилку
      getUsersAPI.get(prepareDataToRequest(data))
        .then((response: UsersResponse | ErrorResponse) => {
          // Останавливаем крутилку
          if (isErrorResponse(response)) {
            throw new Error(response.reason);
          }

          store.set(
            getPathFromArray(['chatPage']),
            prepareDataToStore(response, data.login),
            getEventName(CHAT_PAGE_EVENT_NAME),
          );
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

function prepareDataToRequest(data: UserLoginFormModel): Options {
  return {
    withCredentials: true,
    responseType: ResponseType.json,
    headers: {
      'content-type': 'application/json',
    },
    data: data,
  }
}

function prepareDataToStore(foundUsers: UsersResponse, searchText: string): ChatPageProps {
  const state = store.getState();

  const users = foundUsers.map(user => {
    return {
      id: user.id,
      fullName: `${user.first_name} ${user.second_name}`,
      avatar: {
        avatarImgSrc: user.avatar ? `${host}/api/v2/resources${user.avatar}` : null,
        size: '30px',
      },
      iconType: UserActionIcon.Add,
    }
  })

  return {
    ...state.chatPage,
    popupAddUserToChat: {
      ...state.chatPage.popupAddUserToChat,
      searchUserInput: {
        ...state.chatPage.popupAddUserToChat.searchUserInput,
        value: searchText,
      },
      usersList: users
    }
  }
}