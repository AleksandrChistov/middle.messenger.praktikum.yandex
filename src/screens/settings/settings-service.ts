import {Events} from '../../core/types';
import {FieldName} from '../../services/form-services/form-validation-service';
import {ShowErrorService} from '../../services/show-error-service';
import {router} from '../../index';
import {UserLogOutController} from '../../controllers/auth-controllers/logout-controller';
import {ChangeUserProfileController} from '../../controllers/user-profile-controller/change-user-profile-controller';
import {getEventName} from '../../core/utils/get-event-name';
import {SETTINGS_PAGE_EVENT_NAME} from './events';
import {ChangeUserPasswordController} from '../../controllers/user-profile-controller/change-user-password-controller';
import store from '../../store/store';
import {getPathFromArray} from '../../core/utils/get-path-from-array';
import {ChangeUserAvatarController} from '../../controllers/user-profile-controller/change-user-avatar-controller';

class SettingsService extends ShowErrorService {
	public settingsEvents: Events = {
		change: [
			{
				id: 'popupAvatar',
				fn: event => {
					event.preventDefault();
					const {files} = event.target as HTMLInputElement;

					if (!files) {
						return;
					}

					const uploadedImgSrc = window.URL.createObjectURL(files[0]);

					store.set(
						getPathFromArray(['settingsPage', 'popupAvatar']),
						{
							...store.getState().settingsPage.popupAvatar,
							avatarImgSrc: uploadedImgSrc,
							avatarBlobImgSrc: files[0],
							changeAvatarButton: {
								...store.getState().settingsPage.popupAvatar.changeAvatarButton,
								isDisabled: false,
							},
						},
						getEventName(SETTINGS_PAGE_EVENT_NAME, 'popupAvatar'),
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
					UserLogOutController.logOut()
						.catch(error => {
							console.error(error);
						});
				},
			},
			{
				id: 'openPopupAvatar',
				fn: event => {
					event.preventDefault();

					store.set(
						getPathFromArray(['settingsPage', 'popupAvatar']),
						{
							...store.getState().settingsPage.popupAvatar,
							isOpened: true,
						},
						getEventName(SETTINGS_PAGE_EVENT_NAME, 'popupAvatar'),
					);
				},
			},
			{
				id: 'popupAvatar',
				fn: event => {
					const closePopup = (event.target as HTMLElement).getAttribute('id') === 'popupAvatar';

					if (!closePopup) {
						return;
					}

					store.set(
						getPathFromArray(['settingsPage', 'popupAvatar']),
						{
							...store.getState().settingsPage.popupAvatar,
							isOpened: false,
						},
						getEventName(SETTINGS_PAGE_EVENT_NAME, 'popupAvatar'),
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

					if (error) {
						this.showError(
							'settingsPage.errorName',
							getEventName(SETTINGS_PAGE_EVENT_NAME,
								'errorName',
							),
							error,
							FieldName.FirstName,
						);
					} else {
						this.hideError('settingsPage.errorName', getEventName(SETTINGS_PAGE_EVENT_NAME, 'errorName'));
					}
				},
			},
			{
				id: 'second_name',
				fn: event => {
					const error = this.handleFormService.handleFieldBlur(event);

					if (error) {
						this.showError(
							'settingsPage.errorSurname',
							getEventName(SETTINGS_PAGE_EVENT_NAME, 'errorSurname'),
							error,
							FieldName.SecondName,
						);
					} else {
						this.hideError(
							'settingsPage.errorSurname',
							getEventName(SETTINGS_PAGE_EVENT_NAME, 'errorSurname'),
						);
					}
				},
			},
			{
				id: 'login',
				fn: event => {
					const error = this.handleFormService.handleFieldBlur(event);

					if (error) {
						this.showError(
							'settingsPage.errorLogin',
							getEventName(SETTINGS_PAGE_EVENT_NAME, 'errorLogin'),
							error,
							FieldName.Login,
						);
					} else {
						this.hideError('settingsPage.errorLogin', getEventName(SETTINGS_PAGE_EVENT_NAME, 'errorLogin'));
					}
				},
			},
			{
				id: 'email',
				fn: event => {
					const error = this.handleFormService.handleFieldBlur(event);

					if (error) {
						this.showError(
							'settingsPage.errorEmail',
							getEventName(SETTINGS_PAGE_EVENT_NAME, 'errorEmail'),
							error,
							FieldName.Email,
						);
					} else {
						this.hideError('settingsPage.errorEmail', getEventName(SETTINGS_PAGE_EVENT_NAME, 'errorEmail'));
					}
				},
			},
			{
				id: 'phone',
				fn: event => {
					const error = this.handleFormService.handleFieldBlur(event);

					if (error) {
						this.showError(
							'settingsPage.errorPhone',
							getEventName(SETTINGS_PAGE_EVENT_NAME, 'errorPhone'),
							error,
							FieldName.Phone,
						);
					} else {
						this.hideError('settingsPage.errorPhone', getEventName(SETTINGS_PAGE_EVENT_NAME, 'errorPhone'));
					}
				},
			},
			{
				id: 'oldPassword',
				fn: event => {
					const error = this.handleFormService.handleFieldBlur(event);

					if (error) {
						this.showError(
							'settingsPage.errorOldPassword',
							getEventName(SETTINGS_PAGE_EVENT_NAME, 'errorOldPassword'),
							error,
							FieldName.OldPassword,
						);
					} else {
						this.hideError(
							'settingsPage.errorOldPassword',
							getEventName(SETTINGS_PAGE_EVENT_NAME, 'errorOldPassword'),
						);
					}
				},
			},
			{
				id: 'password',
				fn: event => {
					const error = this.handleFormService.handleFieldBlur(event);

					if (error) {
						this.showError(
							'settingsPage.errorPassword',
							getEventName(SETTINGS_PAGE_EVENT_NAME, 'errorPassword'),
							error,
							FieldName.Password,
						);
					} else {
						this.hideError(
							'settingsPage.errorPassword',
							getEventName(SETTINGS_PAGE_EVENT_NAME, 'errorPassword'),
						);
					}
				},
			},
			{
				id: 'newPassword',
				fn: event => {
					const error = this.handleFormService.handleFieldBlur(event);

					if (error) {
						this.showError(
							'settingsPage.errorPasswordAgain',
							getEventName(SETTINGS_PAGE_EVENT_NAME,
								'errorPasswordAgain'),
							error,
							FieldName.PasswordAgain,
						);
					} else {
						this.hideError(
							'settingsPage.errorPasswordAgain',
							getEventName(SETTINGS_PAGE_EVENT_NAME, 'errorPasswordAgain'),
						);
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

					ChangeUserProfileController.changeData(formData)
						.catch(error => {
							console.error(error);
						});
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
						newPassword: formData.password,
					}).catch(error => {
						console.error(error);
					});
				},
			},
			{
				id: 'popupAvatar',
				fn: event => {
					event.preventDefault();

					const form = new FormData();

					const avatarBlobImg = store.getState().settingsPage.popupAvatar.avatarBlobImgSrc;

					form.append('avatar', avatarBlobImg, 'my-avatar.png');

					ChangeUserAvatarController.change(form)
						.catch(error => {
							console.error(error);
						});
				},
			},
		],
	};
}

export const {settingsEvents} = new SettingsService();
