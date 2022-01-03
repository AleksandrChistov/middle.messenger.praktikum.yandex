import {Events} from '../../core/types';
import {ShowErrorService} from "../../services/show-error-service";
import {ERROR_ACTIVE_CLASS} from '../../components/error-message/error-message';
import {router} from "../../index";
import {UserSignInController} from "../../controllers/auth-controllers/signin-controller";
import store from "../../store/store";
import {FIELD_ERROR_TEXT, FieldName} from "../../services/form-services/constants";
import {Invalid} from "../../services/form-services/form-service";
import {getEventName} from "../../core/utils/get-event-name";
import {SIGNIN_PAGE_EVENT_NAME} from "./signin";


class SignInService extends ShowErrorService {
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

  public signinEvents: Events = {
    click: [
      {
        id: 'goToSignUp',
        fn: event => {
          event.preventDefault();
          router.go('/sign-up');
        },
      },
    ],
    focus: [
      {
        id: 'login',
        fn: event => {
          this.handleFormService.handleFieldFocus(event);
        },
      },
      {
        id: 'password',
        fn: event => {
          this.handleFormService.handleFieldFocus(event);
        },
      },
    ],
    blur: [
      {
        id: 'login',
        fn: event => {
          const error = this.handleFormService.handleFieldBlur(event);

          if (!error) {
            this._hideError('signInPage.errorLogin', getEventName(SIGNIN_PAGE_EVENT_NAME, 'errorLogin'));
          } else {
            this._showError('signInPage.errorLogin', getEventName(SIGNIN_PAGE_EVENT_NAME, 'errorLogin'), error, FieldName.Login);
          }
        },
      },
      {
        id: 'password',
        fn: event => {
          const error = this.handleFormService.handleFieldBlur(event);

          if (!error) {
            this._hideError('signInPage.errorPassword', getEventName(SIGNIN_PAGE_EVENT_NAME, 'errorPassword'));
          } else {
            this._showError('signInPage.errorPassword', getEventName(SIGNIN_PAGE_EVENT_NAME, 'errorPassword'), error, FieldName.Password);
          }
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

            if (!element.invalid && element.dataName) {
              this._hideError(`signInPage.${element.dataName}`, getEventName(SIGNIN_PAGE_EVENT_NAME, element.dataName));
              return true;
            } else {
              this._showError(`signInPage.${element.dataName}`, getEventName(SIGNIN_PAGE_EVENT_NAME, element.dataName), element.invalid, element.fieldName);
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

          UserSignInController.signIn(formData);
        },
      },
    ],
  }
}

const signInService = new SignInService();

export const {signinEvents} = signInService;
