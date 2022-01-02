import {Events} from '../../core/types';
import {Invalid} from '../../services/form-services/form-service';
import {FieldName} from "../../services/form-services/form-validation-service";
import {ShowErrorService} from "../../services/show-error-service";
import {ERROR_ACTIVE_CLASS} from '../../components/error-message/error-message';
import {router} from "../../index";
import {UserLogOutController} from "../../controllers/auth-controllers/logout-controller";
import {FIELD_ERROR_TEXT} from "../../services/form-services/constants";
import store from "../../store/store";
import {ChangeUserProfileController} from "../../controllers/user-profile-controller/change-user-profile-controller";


class SettingsService extends ShowErrorService {
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

  public settingsEvents: Events = {
    click: [
      {
        id: 'goToChat',
        fn: event => {
          event.preventDefault();
          router.go('/messenger');
        },
      },
      {
        id: 'logout',
        fn: event => {
          event.preventDefault();
          UserLogOutController.logOut();
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
        id: 'oldPassword',
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
        id: 'newPassword',
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
            this._hideError('settingsPage.errorName', 'errorName');
          } else {
            this._showError('settingsPage.errorName', 'errorName', error, FieldName.FirstName);
          }
        },
      },
      {
        id: 'second_name',
        fn: event => {
          const error = this.handleFormService.handleFieldBlur(event);

          if (!error) {
            this._hideError('settingsPage.errorSurname', 'errorSurname');
          } else {
            this._showError('settingsPage.errorSurname', 'errorSurname', error, FieldName.SecondName);
          }
        },
      },
      {
        id: 'login',
        fn: event => {
          const error = this.handleFormService.handleFieldBlur(event);

          if (!error) {
            this._hideError('settingsPage.errorLogin', 'errorLogin');
          } else {
            this._showError('settingsPage.errorLogin', 'errorLogin', error, FieldName.Login);
          }
        },
      },
      {
        id: 'email',
        fn: event => {
          const error = this.handleFormService.handleFieldBlur(event);

          if (!error) {
            this._hideError('settingsPage.errorEmail', 'errorEmail');
          } else {
            this._showError('settingsPage.errorEmail', 'errorEmail', error, FieldName.Email);
          }
        },
      },
      {
        id: 'phone',
        fn: event => {
          const error = this.handleFormService.handleFieldBlur(event);

          if (!error) {
            this._hideError('settingsPage.errorPhone', 'errorPhone');
          } else {
            this._showError('settingsPage.errorPhone', 'errorPhone', error, FieldName.Phone);
          }
        },
      },
      {
        id: 'oldPassword',
        fn: event => {
          const error = this.handleFormService.handleFieldBlur(event);

          if (!error) {
            this._hideError('settingsPage.errorOldPassword', 'errorOldPassword');
          } else {
            this._showError('settingsPage.errorOldPassword', 'errorOldPassword', error, FieldName.OldPassword);
          }
        },
      },
      {
        id: 'password',
        fn: event => {
          const error = this.handleFormService.handleFieldBlur(event);

          if (!error) {
            this._hideError('settingsPage.errorPassword', 'errorPassword');
          } else {
            this._showError('settingsPage.errorPassword', 'errorPassword', error, FieldName.Password);
          }
        },
      },
      {
        id: 'newPassword',
        fn: event => {
          const error = this.handleFormService.handleFieldBlur(event);

          if (!error) {
            this._hideError('settingsPage.errorPasswordAgain', 'errorPasswordAgain');
          } else {
            this._showError('settingsPage.errorPasswordAgain', 'errorPasswordAgain', error, FieldName.PasswordAgain);
          }
        },
      },
    ],
    submit: [
      {
        id: 'form-profile',
        fn: event => {
          event.preventDefault();
          const formValidElements = this.handleFormService.validateForm(event);

          const isFormValid = formValidElements.every(element => {
            if (!element) return true;

            if (!element.invalid && element.dataName) {
              this._hideError(`settingsPage.${element.dataName}`, element.dataName);
              return true;
            } else {
              this._showError(`settingsPage.${element.dataName}`, element.dataName, element.invalid, element.fieldName);
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

          ChangeUserProfileController.changeData(formData);
        },
      },
      {
        id: 'form-password',
        fn: event => {
          event.preventDefault();
          const formValidElements = this.handleFormService.validateForm(event);

          const isFormValid = formValidElements.every(element => {
            if (!element) return true;

            if (!element.invalid && element.dataName) {
              this._hideError(`settingsPage.${element.dataName}`, element.dataName);
              return true;
            } else {
              this._showError(`settingsPage.${element.dataName}`, element.dataName, element.invalid, element.fieldName);
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
        },
      },
    ],
  }
}

const settingsService = new SettingsService();

export const {settingsEvents} = settingsService;
