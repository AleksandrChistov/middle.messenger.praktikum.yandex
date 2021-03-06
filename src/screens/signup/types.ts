import {Props} from '../../core/types';
import {TextInputProps} from '../../components/inputs/text/text-input';
import {EmailInputProps} from '../../components/inputs/email/email-input';
import {PhoneInputProps} from '../../components/inputs/phone/phone-input';
import {PasswordInputProps} from '../../components/inputs/password/password-input';
import {FormButtonProps} from '../../components/form-button/form-button';
import {ErrorMessageProps} from '../../components/error-message/error-message';

export interface SignUpPageProps extends Props {
	nameInput?: TextInputProps;
	errorName?: ErrorMessageProps;
	surnameInput?: TextInputProps;
	errorSurname?: ErrorMessageProps;
	loginInput?: TextInputProps;
	errorLogin?: ErrorMessageProps;
	emailInput?: EmailInputProps;
	errorEmail?: ErrorMessageProps;
	phoneInput?: PhoneInputProps;
	errorPhone?: ErrorMessageProps;
	passwordInput?: PasswordInputProps;
	errorPassword?: ErrorMessageProps;
	passwordAgainInput?: PasswordInputProps;
	errorPasswordAgain?: ErrorMessageProps;
	formButton?: FormButtonProps;
}
