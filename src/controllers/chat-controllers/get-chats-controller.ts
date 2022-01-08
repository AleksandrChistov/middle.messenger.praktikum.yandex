import {Options, ResponseType} from "../../services/http-service";
import {ErrorResponse} from "../../api/types";
import {ChatsResponse, GetChatsAPI} from "../../api/chat-api/get-chats-api";
import {Indexed} from "../../core/types";
import {getAvatarLink, isArray} from "../../utils";
import store from "../../store/store";
import {CHAT_PAGE_EVENT_NAME} from "../../screens/chat/events";
import {ChatPageProps} from "../../screens/chat/types";
import {TimeProps, TimeType} from "../../components/time/types";


const getChatsAPI = new GetChatsAPI();

export class GetChatsController {
  static async get(): Promise<void> {
    try {
      // Запускаем крутилку
      getChatsAPI.get(getOptions())
        .then((response: ChatsResponse | ErrorResponse) => {
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

function prepareDataToStore(chats: ChatsResponse): ChatPageProps {
  const state = store.getState();

  const chatCards = chats.map(chat => {
    return {
      chatName: chat.title,
      textMessage: chat.last_message?.content,
      unreadMessageCount: chat.unread_count,
      avatar: {
        avatarImgSrc: getAvatarLink(chat.avatar),
        size: '40px',
      },
      time: getTime(chat.last_message?.time),
      active: false,
      id: chat.id
    }
  })

  return {
    ...state.chatPage,
    createChatPopupIsOpened: false,
    chats: chatCards,
  }
}

function getTime(date: string | undefined): TimeProps | null {
  if (!date) {
    return null;
  }

  return {
    type: TimeType.Card,
    date: new Date(date),
  }
}
