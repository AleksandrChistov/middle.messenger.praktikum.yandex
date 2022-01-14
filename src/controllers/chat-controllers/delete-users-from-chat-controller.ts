import {Options, ResponseType} from "../../services/http-service";
import {ErrorResponse} from "../../api/types";
import store from "../../store/store";
import {CHAT_PAGE_EVENT_NAME} from "../../screens/chat/events";
import {DeleteUsersFromChatAPI} from "../../api/chat-api/delete-users-api";
import {getPathFromArray} from "../../core/utils/get-path-from-array";
import {getEventName} from "../../core/utils/get-event-name";
import {PopupDeleteUserProps} from "../../components/popups/popup-delete-user/popup-delete-user";


type DeleteUsersFromChatFormModel = {
  users: number[];
  chatId: number;
}

const deleteUsersFromChatAPI = new DeleteUsersFromChatAPI();

export class DeleteUsersFromChatController {
  static async delete(data: DeleteUsersFromChatFormModel): Promise<void> {
    try {
      // Запускаем крутилку
      deleteUsersFromChatAPI.delete(prepareDataToRequest(data))
        .then((response: ErrorResponse | null) => {
          // Останавливаем крутилку
          if (response) {
            throw new Error(response.reason);
          }

          store.set(
            getPathFromArray(['chatPage', 'popupDeleteUserFromChat']),
            prepareDataToStore(data.users),
            getEventName(CHAT_PAGE_EVENT_NAME, 'popupDeleteUserFromChat')
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

function prepareDataToRequest(data: DeleteUsersFromChatFormModel): Options {
  return {
    withCredentials: true,
    responseType: ResponseType.json,
    headers: {
      'content-type': 'application/json',
    },
    data: data,
  }
}

function prepareDataToStore(usersIds: number[]): PopupDeleteUserProps {
  const state = store.getState();

  const deleteUsersFromList = (usersList) => {
    return usersList.filter(user => !usersIds.includes(user.id))
  }

  return {
    ...state.chatPage.popupDeleteUserFromChat,
    usersList: deleteUsersFromList(state.chatPage.popupDeleteUserFromChat.usersList),
  }
}
