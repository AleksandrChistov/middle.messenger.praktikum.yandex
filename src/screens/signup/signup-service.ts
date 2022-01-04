import {Events} from '../../core/types';
import {FieldName} from "../../services/form-services/form-validation-service";
import {ShowErrorService} from "../../services/show-error-service";
import {router} from "../../index";
import {UserSignUpController} from "../../controllers/auth-controllers/signup-controller";
import {getEventName} from "../../core/utils/get-event-name";
import {SIGNUP_PAGE_EVENT_NAME} from "./events";


class SignUpService extends ShowErrorService {
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
            this.hideError('signUpPage.errorName', getEventName(SIGNUP_PAGE_EVENT_NAME, 'errorName'));
          } else {
            this.showError('signUpPage.errorName', getEventName(SIGNUP_PAGE_EVENT_NAME, 'errorName'), error, FieldName.FirstName);
          }
        },
      },
      {
        id: 'second_name',
        fn: event => {
          const error = this.handleFormService.handleFieldBlur(event);

          if (!error) {
            this.hideError('signUpPage.errorSurname', getEventName(SIGNUP_PAGE_EVENT_NAME, 'errorSurname'));
          } else {
            this.showError('signUpPage.errorSurname', getEventName(SIGNUP_PAGE_EVENT_NAME, 'errorSurname'), error, FieldName.SecondName);
          }
        },
      },
      {
        id: 'login',
        fn: event => {
          const error = this.handleFormService.handleFieldBlur(event);

          if (!error) {
            this.hideError('signUpPage.errorLogin', getEventName(SIGNUP_PAGE_EVENT_NAME, 'errorLogin'));
          } else {
            this.showError('signUpPage.errorLogin', getEventName(SIGNUP_PAGE_EVENT_NAME, 'errorLogin'), error, FieldName.Login);
          }
        },
      },
      {
        id: 'email',
        fn: event => {
          const error = this.handleFormService.handleFieldBlur(event);

          if (!error) {
            this.hideError('signUpPage.errorEmail', getEventName(SIGNUP_PAGE_EVENT_NAME, 'errorEmail'));
          } else {
            this.showError('signUpPage.errorEmail', getEventName(SIGNUP_PAGE_EVENT_NAME, 'errorEmail'), error, FieldName.Email);
          }
        },
      },
      {
        id: 'phone',
        fn: event => {
          const error = this.handleFormService.handleFieldBlur(event);

          if (!error) {
            this.hideError('signUpPage.errorPhone', getEventName(SIGNUP_PAGE_EVENT_NAME, 'errorPhone'));
          } else {
            this.showError('signUpPage.errorPhone', getEventName(SIGNUP_PAGE_EVENT_NAME, 'errorPhone'), error, FieldName.Phone);
          }
        },
      },
      {
        id: 'password',
        fn: event => {
          const error = this.handleFormService.handleFieldBlur(event);

          if (!error) {
            this.hideError('signUpPage.errorPassword', getEventName(SIGNUP_PAGE_EVENT_NAME, 'errorPassword'));
          } else {
            this.showError('signUpPage.errorPassword', getEventName(SIGNUP_PAGE_EVENT_NAME, 'errorPassword'), error, FieldName.Password);
          }
        },
      },
      {
        id: 'passwordAgain',
        fn: event => {
          const error = this.handleFormService.handleFieldBlur(event);

          if (!error) {
            this.hideError('signUpPage.errorPasswordAgain', getEventName(SIGNUP_PAGE_EVENT_NAME, 'errorPasswordAgain'));
          } else {
            this.showError('signUpPage.errorPasswordAgain', getEventName(SIGNUP_PAGE_EVENT_NAME, 'errorPasswordAgain'), error, FieldName.PasswordAgain);
          }
        },
      },
    ],
    submit: [
      {
        id: 'form',
        fn: event => {
          event.preventDefault();
          const isFormValid = this.validateFormItems(event, 'signUpPage', SIGNUP_PAGE_EVENT_NAME);

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

export const {signupEvents} = new SignUpService();
