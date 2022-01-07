import {ShowErrorService} from "../../services/show-error-service";
import {router} from "../../index";
import {Events} from "../../core/types";
import {CHAT_PAGE_EVENT_NAME} from "./events";
import store from "../../store/store";
import {getPathFromArray} from "../../core/utils/get-path-from-array";
import {getEventName} from "../../core/utils/get-event-name";
import {CreateChatController} from "../../controllers/chat-controllers/create-chat-controller";
import {ChatCardProps} from "../../components/chat-card/chat-card";
import {debounce} from "../../utils";
import {GetUsersController} from "../../controllers/chat-controllers/get-users-controller";
import {AddUsersToChatController} from "../../controllers/chat-controllers/add-users-to-chat-controller";
import {GetUsersByChatIdController} from "../../controllers/chat-controllers/get-users-by-chat-id-controller";
import {DeleteUsersFromChatController} from "../../controllers/chat-controllers/delete-users-from-chat-controller";


class ChatHandleService extends ShowErrorService {
  public chatEvents: Events = {
    click: [
      {
        id: 'goToSettings',
        fn: event => {
          event.preventDefault();
          router.go('/settings');
        },
      },
      {
        id: 'openCreateChatPopup',
        fn: event => {
          event.preventDefault();

          store.set(
            getPathFromArray(['chatPage']),
            {
              ...store.getState().chatPage,
              createChatPopupIsOpened: true,
            },
            getEventName(CHAT_PAGE_EVENT_NAME)
          );
        },
      },
      {
        id: 'popupCreateChat',
        fn: event => {
          const closePopup = (event.target as HTMLElement).getAttribute('data') === 'popupCreateChat';

          if (!closePopup) {
            return;
          }

          store.set(
            getPathFromArray(['chatPage']),
            {
              ...store.getState().chatPage,
              createChatPopupIsOpened: false,
            },
            getEventName(CHAT_PAGE_EVENT_NAME)
          );
        },
      },
      {
        id: 'closeCreateChatPopup',
        fn: () => {
          store.set(
            getPathFromArray(['chatPage']),
            {
              ...store.getState().chatPage,
              createChatPopupIsOpened: false,
            },
            getEventName(CHAT_PAGE_EVENT_NAME)
          );
        },
      },
      {
        id: 'chatCards',
        fn: event => {
          const chatCardElement = (event.target as HTMLElement).closest('.chat-card');

          if (!chatCardElement) {
            return;
          }

          const chats = store.getState().chatPage.chats;

          const getChats = (chats: ChatCardProps[]) => chats.map(chat => {
            return {
              ...chat,
              active: chat.id === Number(chatCardElement.id),
            }
          })

          const selectedChat = chats.find(chat => chat.id === Number(chatCardElement.id));

          store.set(
            getPathFromArray(['chatPage']),
            {
              ...store.getState().chatPage,
              selectedChat: selectedChat,
              chats: getChats(chats),
              chatName: selectedChat?.chatName,
              chatAvatar: {
                avatarImgSrc: selectedChat?.avatar.avatarImgSrc || null,
                size: '36px',
              }
            },
            getEventName(CHAT_PAGE_EVENT_NAME)
          );
        },
      },
      {
        id: 'vertical-ellipsis',
        fn: () => {
          store.set(
            getPathFromArray(['chatPage']),
            {
              ...store.getState().chatPage,
              ellipsisMenuIsOpened: true,
            },
            getEventName(CHAT_PAGE_EVENT_NAME)
          );
        },
      },
      {
        id: 'closeEllipsisMenu',
        fn: event => {
          const idClickedElement = (event.target as HTMLElement).getAttribute('id');

          if (idClickedElement !== 'closeEllipsisMenu') {
            return;
          }

          store.set(
            getPathFromArray(['chatPage']),
            {
              ...store.getState().chatPage,
              ellipsisMenuIsOpened: false,
            },
            getEventName(CHAT_PAGE_EVENT_NAME)
          );
        },
      },
      {
        id: 'addUser',
        fn: () => {
          store.set(
            getPathFromArray(['chatPage']),
            {
              ...store.getState().chatPage,
              addUserToChatPopupIsOpened: true,
              ellipsisMenuIsOpened: false,
            },
            getEventName(CHAT_PAGE_EVENT_NAME)
          );
        },
      },
      {
        id: 'deleteUser',
        fn: () => {
          store.set(
            getPathFromArray(['chatPage']),
            {
              ...store.getState().chatPage,
              deleteUserFromChatPopupIsOpened: true,
              ellipsisMenuIsOpened: false,
            },
            getEventName(CHAT_PAGE_EVENT_NAME)
          );

          GetUsersByChatIdController.get();
        },
      },
      {
        id: 'closePopupAddUserToChat',
        fn: event => {
          const idClickedElement = (event.target as HTMLElement).getAttribute('id');

          if (idClickedElement !== 'closePopupAddUserToChat') {
            return;
          }

          store.set(
            getPathFromArray(['chatPage']),
            {
              ...store.getState().chatPage,
              addUserToChatPopupIsOpened: false,
              popupAddUserToChat: {
                searchUserInput: {
                  ...store.getState().chatPage.popupAddUserToChat.searchUserInput,
                  value: '',
                },
                usersList: [],
              }
            },
            getEventName(CHAT_PAGE_EVENT_NAME)
          );
        },
      },
      {
        id: 'closePopupDeleteUserFromChat',
        fn: event => {
          const idClickedElement = (event.target as HTMLElement).getAttribute('id');

          if (idClickedElement !== 'closePopupDeleteUserFromChat') {
            return;
          }

          store.set(
            getPathFromArray(['chatPage']),
            {
              ...store.getState().chatPage,
              deleteUserFromChatPopupIsOpened: false,
            },
            getEventName(CHAT_PAGE_EVENT_NAME)
          );
        },
      },
      {
        id: 'closeAddUserPopup',
        fn: () => {
          store.set(
            getPathFromArray(['chatPage']),
            {
              ...store.getState().chatPage,
              addUserToChatPopupIsOpened: false,
              popupAddUserToChat: {
                searchUserInput: {
                  ...store.getState().chatPage.popupAddUserToChat.searchUserInput,
                  value: '',
                },
                usersList: [],
              }
            },
            getEventName(CHAT_PAGE_EVENT_NAME)
          );
        },
      },
      {
        id: 'closeDeleteUserPopup',
        fn: () => {
          store.set(
            getPathFromArray(['chatPage']),
            {
              ...store.getState().chatPage,
              deleteUserFromChatPopupIsOpened: false,
            },
            getEventName(CHAT_PAGE_EVENT_NAME)
          );
        },
      },
      {
        id: 'addUserToChat',
        fn: event => {
          const userItem = (event.target as HTMLElement).closest('.found-user-item');

          if (!userItem) {
            return;
          }

          const userItemId = userItem.getAttribute('id');

          const chatId = store.getState().chatPage.selectedChat?.id;

          if (!chatId) {
            return;
          }

          AddUsersToChatController.add({
            users: [Number(userItemId)],
            chatId: chatId,
          })
        },
      },
      {
        id: 'deleteUserFromChat',
        fn: event => {
          const userItem = (event.target as HTMLElement).closest('.found-user-item');

          if (!userItem) {
            return;
          }

          const userItemId = userItem.getAttribute('id');

          const chatId = store.getState().chatPage.selectedChat?.id;

          if (!chatId) {
            return;
          }

          DeleteUsersFromChatController.delete({
            users: [Number(userItemId)],
            chatId: chatId,
          })
        },
      },
    ],
    input: [
      {
        id: 'user_login',
        fn: debounce(handleSearchUsers, 500),
      }
    ],
    focus: [
      {
        id: 'message',
        fn: event => {
          this.handleFormService.handleFieldFocus(event);
        },
      },
    ],
    submit: [
      {
        id: 'form',
        fn: event => {
          event.preventDefault();
          const isFormValid = this.validateFormItems(event, 'chat', CHAT_PAGE_EVENT_NAME);

          if (!isFormValid) {
            return;
          }

          const formData = this.handleFormService.handleFormSubmit(event);

          if (!formData) {
            return;
          }
          // send message to BE by controller
        },
      },
      {
        id: 'formCreateChat',
        fn: event => {
          event.preventDefault();
          const formData = this.handleFormService.handleFormSubmit(event);

          if (!formData) {
            return;
          }

          CreateChatController.create({
            title: formData.chat_name,
          });
        },
      },
    ],
  };
}

function handleSearchUsers(event: Event): void {
  const text = (event.target as HTMLInputElement).value.trim();

  if (!text) {
    return;
  }

  GetUsersController.get({login: text});
}

export const {chatEvents} = new ChatHandleService();
