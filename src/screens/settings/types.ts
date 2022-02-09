import {Props} from '../../core/types';
import {TextInputProps} from '../../components/inputs/text/text-input';
import {EmailInputProps} from '../../components/inputs/email/email-input';
import {PhoneInputProps} from '../../components/inputs/phone/phone-input';
import {PasswordInputProps} from '../../components/inputs/password/password-input';
import {FormButtonProps} from '../../components/form-button/form-button';
import {ErrorMessageProps} from '../../components/error-message/error-message';
import {PopupAvatarProps} from '../../components/popups/popup-avatar/popup-avatar';

export interface SettingsPageProps extends Props {
	avatarImgSrc: string | null;
	nameInput: TextInputProps;
	errorName: ErrorMessageProps;
	surnameInput: TextInputProps;
	errorSurname: ErrorMessageProps;
	displayNameInput: TextInputProps;
	loginInput: TextInputProps;
	errorLogin: ErrorMessageProps;
	emailInput: EmailInputProps;
	errorEmail: ErrorMessageProps;
	phoneInput: PhoneInputProps;
	errorPhone: ErrorMessageProps;
	changeDataButton: FormButtonProps;
	oldPasswordInput: PasswordInputProps;
	errorOldPassword: ErrorMessageProps;
	passwordInput: PasswordInputProps;
	errorPassword: ErrorMessageProps;
	passwordAgainInput: PasswordInputProps;
	errorPasswordAgain: ErrorMessageProps;
	changePasswordButton: FormButtonProps;
	popupAvatar: PopupAvatarProps;
}
