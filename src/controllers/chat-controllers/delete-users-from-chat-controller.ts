import {Options, ResponseType} from "../../services/http-service";
import {ErrorResponse} from "../../api/types";
import {ChatPageProps} from "../../screens/chat/types";
import store from "../../store/store";
import {CHAT_PAGE_EVENT_NAME} from "../../screens/chat/events";
import {DeleteUsersFromChatAPI} from "../../api/chat-api/delete-users-api";


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

function prepareDataToStore(usersIds: number[]): ChatPageProps {
  const state = store.getState();

  const deleteUsersFromList = (usersList) => {
    return usersList.filter(user => !usersIds.includes(user.id))
  }

  return {
    ...state.chatPage,
    popupDeleteUserFromChat: {
      ...state.chatPage.popupDeleteUserFromChat,
      usersList: deleteUsersFromList(state.chatPage.popupDeleteUserFromChat.usersList),
    }
  }
}
