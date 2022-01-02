import {ShowErrorService} from "../../services/show-error-service";
import {router} from "../../index";
import {ERROR_ACTIVE_CLASS} from "../../components/error-message/error-message";
import store from "../../store/store";
import {Events} from "../../core/types";
import {FIELD_ERROR_TEXT, FieldName} from "../../services/form-services/constants";
import {Invalid} from "../../services/form-services/form-service";


class ChatHandleService extends ShowErrorService {
  private _showError(path: string, eventName: string, error: Invalid, fieldName: FieldName): void {
    const LoginErrorText = FIELD_ERROR_TEXT[fieldName];
    const textError = error?.text ? LoginErrorText.text : LoginErrorText.length;

    const errorProps = {
      addClass: ERROR_ACTIVE_CLASS,
      textError: textError
    }

    store.set(path, errorProps, eventName);
  }

  private _hideError(path: string, eventName: string): void {
    const errorProps = {
      addClass: '',
      textError: ''
    }

    store.set(path, errorProps, eventName);
  }

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
          const formValidElements = this.handleFormService.validateForm(event);

          const isFormValid = formValidElements.every(element => {
            if (!element) return true;

            if (!element.invalid && element.dataName) { // remove dataName and swap hide and show
              this._hideError(`chat.${element.dataName}`, element.dataName);
              return true;
            } else {
              this._showError(`chat.${element.dataName}`, element.dataName, element.invalid, element.fieldName);
              return false;
            }
          })

          if (!isFormValid) {
            return;
          }

          const formData = this.handleFormService.handleFormSubmit(event);

          if (!formData) {
            return;
          }
          // запрашиваем данные у контроллера
          // send message to BE
        },
      },
    ],
  };
}

const chatHandleService = new ChatHandleService();

export const {chatEvents} = chatHandleService;
