import {Options, ResponseType} from "../../services/http-service";
import {ErrorResponse} from "../../api/types";
import {AddUsersToChatAPI} from "../../api/chat-api/add-users-api";
import {ChatPageProps} from "../../screens/chat/types";
import store from "../../store/store";
import {CHAT_PAGE_EVENT_NAME} from "../../screens/chat/events";


export type AddUsersToChatFormModel = {
  users: number[];
  chatId: number;
}

const addUsersToChatAPI = new AddUsersToChatAPI();

export class AddUsersToChatController {
  static async add(data: AddUsersToChatFormModel): Promise<void> {
    try {
      // Запускаем крутилку
      addUsersToChatAPI.add(prepareDataToRequest(data))
        .then((response: ErrorResponse | null) => {
          // Останавливаем крутилку
          if (response) {
            throw new Error(response.reason);
          }

          store.set('chatPage', prepareDataToStore(data.users), CHAT_PAGE_EVENT_NAME);
        })
        .catch((error) => {
          console.error(error, data);
          // Останавливаем крутилку
        })
    } catch (error) {
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
    data: data,
  }
}

function prepareDataToStore(usersIds: number[]): ChatPageProps {
  const state = store.getState();

  const getUsersWithDisabledPlusButton = (usersList) => {
    return usersList.map(user => {
      if (usersIds.includes(user.id)) {
        return {
          ...user,
          iconDisabled: true,
        }
      }

      return user;
    })
  }

  return {
    ...state.chatPage,
    popupAddUserToChat: {
      ...state.chatPage.popupAddUserToChat,
      usersList: getUsersWithDisabledPlusButton(state.chatPage.popupAddUserToChat.usersList),
    }
  }
}
