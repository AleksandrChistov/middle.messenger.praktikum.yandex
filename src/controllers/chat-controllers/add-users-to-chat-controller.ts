import {Options, ResponseType} from "../../services/http-service";
import {ErrorResponse} from "../../api/types";
import {AddUsersToChatAPI} from "../../api/chat-api/add-users-api";
import store from "../../store/store";
import {getPathFromArray} from "../../core/utils/get-path-from-array";
import {getEventName} from "../../core/utils/get-event-name";
import {UsersListProps} from "../../components/found-users/users-list";


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

          store.set(
            getPathFromArray(['popupAddUserToChat', 'usersList']),
            prepareDataToStore(data.users),
            getEventName('popupAddUserToChat', 'usersList')
          );
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

function prepareDataToStore(usersIds: number[]): UsersListProps {
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
    ...state.chatPage.popupAddUserToChat.usersList,
    users: getUsersWithDisabledPlusButton(state.chatPage.popupAddUserToChat.usersList.users),
  }
}
