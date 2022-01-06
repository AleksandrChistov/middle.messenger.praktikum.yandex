import {ShowErrorService} from "../../services/show-error-service";
import {router} from "../../index";
import {Events} from "../../core/types";
import {CHAT_PAGE_EVENT_NAME} from "./events";
import store from "../../store/store";
import {getPathFromArray} from "../../core/utils/get-path-from-array";
import {getEventName} from "../../core/utils/get-event-name";


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

          // send message to BE by controller
        },
      },
    ],
  };
}

export const {chatEvents} = new ChatHandleService();
