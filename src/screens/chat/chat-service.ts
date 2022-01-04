import {ShowErrorService} from "../../services/show-error-service";
import {router} from "../../index";
import {Events} from "../../core/types";
import {CHAT_PAGE_EVENT_NAME} from "./events";


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
        id: 'createChat',
        fn: event => {
          event.preventDefault();
          // call the create chat api
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
    ],
  };
}

export const {chatEvents} = new ChatHandleService();
