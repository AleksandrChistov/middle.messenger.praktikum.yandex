import {Events} from '../../core/types';
import {Invalid} from '../../services/form-services/form-service';
import {FieldName} from "../../services/form-services/form-validation-service";
import {ShowErrorService} from "../../services/show-error-service";
import {ERROR_ACTIVE_CLASS} from '../../components/error-message/error-message';
import {router} from "../../index";
import {UserSignUpController} from "../../controllers/auth-controllers/signup-controller";
import {FIELD_ERROR_TEXT} from "../../services/form-services/constants";
import store from "../../store/store";
import {getEventName} from "../../core/utils/get-event-name";
import {SIGNUP_PAGE_EVENT_NAME} from "./signup";


class SignUpService extends ShowErrorService {
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

  public signupEvents: Events = {
    click: [
      {
        id: 'goToSignIn',
        fn: event => {
          event.preventDefault();
          router.go('/');
        },
      },
    ],
    focus: [
      {
        id: 'first_name',
        fn: event => {
          this.handleFormService.handleFieldFocus(event);
        },
      },
      {
        id: 'second_name',
        fn: event => {
          this.handleFormService.handleFieldFocus(event);
        },
      },
      {
        id: 'login',
        fn: event => {
          this.handleFormService.handleFieldFocus(event);
        },
      },
      {
        id: 'email',
        fn: event => {
          this.handleFormService.handleFieldFocus(event);
        },
      },
      {
        id: 'phone',
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
      {
        id: 'passwordAgain',
        fn: event => {
          this.handleFormService.handleFieldFocus(event);
        },
      },
    ],
    blur: [
      {
        id: 'first_name',
        fn: event => {
          const error = this.handleFormService.handleFieldBlur(event);

          if (!error) {
            this._hideError('signUpPage.errorName', getEventName(SIGNUP_PAGE_EVENT_NAME, 'errorName'));
          } else {
            this._showError('signUpPage.errorName', getEventName(SIGNUP_PAGE_EVENT_NAME, 'errorName'), error, FieldName.FirstName);
          }
        },
      },
      {
        id: 'second_name',
        fn: event => {
          const error = this.handleFormService.handleFieldBlur(event);

          if (!error) {
            this._hideError('signUpPage.errorSurname', getEventName(SIGNUP_PAGE_EVENT_NAME, 'errorSurname'));
          } else {
            this._showError('signUpPage.errorSurname', getEventName(SIGNUP_PAGE_EVENT_NAME, 'errorSurname'), error, FieldName.SecondName);
          }
        },
      },
      {
        id: 'login',
        fn: event => {
          const error = this.handleFormService.handleFieldBlur(event);

          if (!error) {
            this._hideError('signUpPage.errorLogin', getEventName(SIGNUP_PAGE_EVENT_NAME, 'errorLogin'));
          } else {
            this._showError('signUpPage.errorLogin', getEventName(SIGNUP_PAGE_EVENT_NAME, 'errorLogin'), error, FieldName.Login);
          }
        },
      },
      {
        id: 'email',
        fn: event => {
          const error = this.handleFormService.handleFieldBlur(event);

          if (!error) {
            this._hideError('signUpPage.errorEmail', getEventName(SIGNUP_PAGE_EVENT_NAME, 'errorEmail'));
          } else {
            this._showError('signUpPage.errorEmail', getEventName(SIGNUP_PAGE_EVENT_NAME, 'errorEmail'), error, FieldName.Email);
          }
        },
      },
      {
        id: 'phone',
        fn: event => {
          const error = this.handleFormService.handleFieldBlur(event);

          if (!error) {
            this._hideError('signUpPage.errorPhone', getEventName(SIGNUP_PAGE_EVENT_NAME, 'errorPhone'));
          } else {
            this._showError('signUpPage.errorPhone', getEventName(SIGNUP_PAGE_EVENT_NAME, 'errorPhone'), error, FieldName.Phone);
          }
        },
      },
      {
        id: 'password',
        fn: event => {
          const error = this.handleFormService.handleFieldBlur(event);

          if (!error) {
            this._hideError('signUpPage.errorPassword', getEventName(SIGNUP_PAGE_EVENT_NAME, 'errorPassword'));
          } else {
            this._showError('signUpPage.errorPassword', getEventName(SIGNUP_PAGE_EVENT_NAME, 'errorPassword'), error, FieldName.Password);
          }
        },
      },
      {
        id: 'passwordAgain',
        fn: event => {
          const error = this.handleFormService.handleFieldBlur(event);

          if (!error) {
            this._hideError('signUpPage.errorPasswordAgain', getEventName(SIGNUP_PAGE_EVENT_NAME, 'errorPasswordAgain'));
          } else {
            this._showError('signUpPage.errorPasswordAgain', getEventName(SIGNUP_PAGE_EVENT_NAME, 'errorPasswordAgain'), error, FieldName.PasswordAgain);
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
              this._hideError(`signUpPage.${element.dataName}`, getEventName(SIGNUP_PAGE_EVENT_NAME, element.dataName));
              return true;
            } else {
              this._showError(`signUpPage.${element.dataName}`, getEventName(SIGNUP_PAGE_EVENT_NAME, element.dataName), element.invalid, element.fieldName);
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

          UserSignUpController.signUp(formData);
        },
      },
    ],
  }
}

const signUpService = new SignUpService();

export const {signupEvents} = signUpService;
