import {Events} from '../../core/types';
import {FieldName} from "../../services/form-services/form-validation-service";
import {ShowErrorService} from "../../services/show-error-service";
import {router} from "../../index";
import {UserLogOutController} from "../../controllers/auth-controllers/logout-controller";
import {ChangeUserProfileController} from "../../controllers/user-profile-controller/change-user-profile-controller";
import {getEventName} from "../../core/utils/get-event-name";
import {SETTINGS_PAGE_EVENT_NAME} from "./events";
import {ChangeUserPasswordController} from "../../controllers/user-profile-controller/change-user-password-controller";
import store from "../../store/store";
import {getPathFromArray} from "../../core/utils/get-path-from-array";
import {ChangeUserAvatarController} from "../../controllers/user-profile-controller/change-user-avatar-controller";


class SettingsService extends ShowErrorService {
  public settingsEvents: Events = {
    change: [
      {
        id: 'popupAvatar',
        fn: event => {
          event.preventDefault();
          const files = (event.target as HTMLInputElement).files;

          if (!files) {
            return;
          }

          const uploadedImgSrc = window.URL.createObjectURL(files[0]);

          store.set(
            getPathFromArray(['settingsPage']),
            {
              ...store.getState().settingsPage,
              avatarBlobImgSrc: files[0],
              popupAvatar: {
                ...store.getState().settingsPage.popupAvatar,
                avatarImgSrc: uploadedImgSrc,
                changeAvatarButton: {
                  ...store.getState().settingsPage.popupAvatar.changeAvatarButton,
                  isDisabled: false
                }
              }
            },
            getEventName(SETTINGS_PAGE_EVENT_NAME)
          );
        },
      },
    ],
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
      {
        id: 'openPopupAvatar',
        fn: event => {
          event.preventDefault();

          store.set(
            getPathFromArray(['settingsPage']),
            {
              ...store.getState().settingsPage,
              avatarPopupIsOpened: true,
            },
            getEventName(SETTINGS_PAGE_EVENT_NAME)
          );
        },
      },
      {
        id: 'popupAvatar',
        fn: event => {
          const closePopup = (event.target as HTMLElement).getAttribute('data') === 'popupAvatar';

          if (!closePopup) {
            return;
          }

          store.set(
            getPathFromArray(['settingsPage']),
            {
              ...store.getState().settingsPage,
              avatarPopupIsOpened: false,
            },
            getEventName(SETTINGS_PAGE_EVENT_NAME)
          );
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
            this.hideError('settingsPage.errorName', getEventName(SETTINGS_PAGE_EVENT_NAME, 'errorName'));
          } else {
            this.showError('settingsPage.errorName', getEventName(SETTINGS_PAGE_EVENT_NAME, 'errorName'), error, FieldName.FirstName);
          }
        },
      },
      {
        id: 'second_name',
        fn: event => {
          const error = this.handleFormService.handleFieldBlur(event);

          if (!error) {
            this.hideError('settingsPage.errorSurname', getEventName(SETTINGS_PAGE_EVENT_NAME, 'errorSurname'));
          } else {
            this.showError('settingsPage.errorSurname', getEventName(SETTINGS_PAGE_EVENT_NAME, 'errorSurname'), error, FieldName.SecondName);
          }
        },
      },
      {
        id: 'login',
        fn: event => {
          const error = this.handleFormService.handleFieldBlur(event);

          if (!error) {
            this.hideError('settingsPage.errorLogin', getEventName(SETTINGS_PAGE_EVENT_NAME, 'errorLogin'));
          } else {
            this.showError('settingsPage.errorLogin', getEventName(SETTINGS_PAGE_EVENT_NAME, 'errorLogin'), error, FieldName.Login);
          }
        },
      },
      {
        id: 'email',
        fn: event => {
          const error = this.handleFormService.handleFieldBlur(event);

          if (!error) {
            this.hideError('settingsPage.errorEmail', getEventName(SETTINGS_PAGE_EVENT_NAME, 'errorEmail'));
          } else {
            this.showError('settingsPage.errorEmail', getEventName(SETTINGS_PAGE_EVENT_NAME, 'errorEmail'), error, FieldName.Email);
          }
        },
      },
      {
        id: 'phone',
        fn: event => {
          const error = this.handleFormService.handleFieldBlur(event);

          if (!error) {
            this.hideError('settingsPage.errorPhone', getEventName(SETTINGS_PAGE_EVENT_NAME, 'errorPhone'));
          } else {
            this.showError('settingsPage.errorPhone', getEventName(SETTINGS_PAGE_EVENT_NAME, 'errorPhone'), error, FieldName.Phone);
          }
        },
      },
      {
        id: 'oldPassword',
        fn: event => {
          const error = this.handleFormService.handleFieldBlur(event);

          if (!error) {
            this.hideError('settingsPage.errorOldPassword', getEventName(SETTINGS_PAGE_EVENT_NAME, 'errorOldPassword'));
          } else {
            this.showError('settingsPage.errorOldPassword', getEventName(SETTINGS_PAGE_EVENT_NAME, 'errorOldPassword'), error, FieldName.OldPassword);
          }
        },
      },
      {
        id: 'password',
        fn: event => {
          const error = this.handleFormService.handleFieldBlur(event);

          if (!error) {
            this.hideError('settingsPage.errorPassword', getEventName(SETTINGS_PAGE_EVENT_NAME, 'errorPassword'));
          } else {
            this.showError('settingsPage.errorPassword', getEventName(SETTINGS_PAGE_EVENT_NAME, 'errorPassword'), error, FieldName.Password);
          }
        },
      },
      {
        id: 'newPassword',
        fn: event => {
          const error = this.handleFormService.handleFieldBlur(event);

          if (!error) {
            this.hideError('settingsPage.errorPasswordAgain', getEventName(SETTINGS_PAGE_EVENT_NAME, 'errorPasswordAgain'));
          } else {
            this.showError('settingsPage.errorPasswordAgain', getEventName(SETTINGS_PAGE_EVENT_NAME, 'errorPasswordAgain'), error, FieldName.PasswordAgain);
          }
        },
      },
    ],
    submit: [
      {
        id: 'form-profile',
        fn: event => {
          event.preventDefault();
          const isFormValid = this.validateFormItems(event, 'settingsPage', SETTINGS_PAGE_EVENT_NAME);

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
          const isFormValid = this.validateFormItems(event, 'settingsPage', SETTINGS_PAGE_EVENT_NAME);

          if (!isFormValid) {
            return;
          }

          const formData = this.handleFormService.handleFormSubmit(event);

          if (!formData) {
            return;
          }

          ChangeUserPasswordController.change({
            oldPassword: formData.oldPassword,
            newPassword: formData.password
          });
        },
      },
      {
        id: 'popupAvatar',
        fn: event => {
          event.preventDefault();

          const form = new FormData();

          const avatarBlobImg = store.getState().settingsPage.avatarBlobImgSrc as string;

          form.append('avatar', avatarBlobImg, 'my-avatar.png');

          ChangeUserAvatarController.change(form);
        },
      },
    ],
  }
}

export const {settingsEvents} = new SettingsService();
