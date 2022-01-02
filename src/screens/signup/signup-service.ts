import {Events} from '../../core/types';
import {Invalid} from '../../services/form-services/form-service';
import {FieldName} from "../../services/form-services/form-validation-service";
import {ShowErrorService} from "../../services/show-error-service";
import {ERROR_ACTIVE_CLASS} from '../../components/error-message/error-message';
import {router} from "../../index";
import {UserSignUpController} from "../../controllers/auth-controllers/signup-controller";
import {FIELD_ERROR_TEXT} from "../../services/form-services/constants";
import store from "../../store/store";

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
            this._hideError('signUpPage.errorName', 'errorName');
          } else {
            this._showError('signUpPage.errorName', 'errorName', error, FieldName.FirstName);
          }
        },
      },
      {
        id: 'second_name',
        fn: event => {
          const error = this.handleFormService.handleFieldBlur(event);

          if (!error) {
            this._hideError('signUpPage.errorSurname', 'errorSurname');
          } else {
            this._showError('signUpPage.errorSurname', 'errorSurname', error, FieldName.SecondName);
          }
        },
      },
      {
        id: 'login',
        fn: event => {
          const error = this.handleFormService.handleFieldBlur(event);

          if (!error) {
            this._hideError('signUpPage.errorLogin', 'errorLogin');
          } else {
            this._showError('signUpPage.errorLogin', 'errorLogin', error, FieldName.Login);
          }
        },
      },
      {
        id: 'email',
        fn: event => {
          const error = this.handleFormService.handleFieldBlur(event);

          if (!error) {
            this._hideError('signUpPage.errorEmail', 'errorEmail');
          } else {
            this._showError('signUpPage.errorEmail', 'errorEmail', error, FieldName.Email);
          }
        },
      },
      {
        id: 'phone',
        fn: event => {
          const error = this.handleFormService.handleFieldBlur(event);

          if (!error) {
            this._hideError('signUpPage.errorPhone', 'errorPhone');
          } else {
            this._showError('signUpPage.errorPhone', 'errorPhone', error, FieldName.Phone);
          }
        },
      },
      {
        id: 'password',
        fn: event => {
          const error = this.handleFormService.handleFieldBlur(event);

          if (!error) {
            this._hideError('signUpPage.errorPassword', 'errorPassword');
          } else {
            this._showError('signUpPage.errorPassword', 'errorPassword', error, FieldName.Password);
          }
        },
      },
      {
        id: 'passwordAgain',
        fn: event => {
          const error = this.handleFormService.handleFieldBlur(event);

          if (!error) {
            this._hideError('signUpPage.errorPasswordAgain', 'errorPasswordAgain');
          } else {
            this._showError('signUpPage.errorPasswordAgain', 'errorPasswordAgain', error, FieldName.PasswordAgain);
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

            if (!element.invalid && element.dataName) { // remove dataName and swap hide and show
              this._hideError(`signUpPage.${element.dataName}`, element.dataName);
              return true;
            } else {
              this._showError(`signUpPage.${element.dataName}`, element.dataName, element.invalid, element.fieldName);
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
