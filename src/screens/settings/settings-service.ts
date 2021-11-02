import {Props} from '../../core/types';
import {FormServiceAbstract} from '../../services/form-service-abstract';
import {HandleFormService} from "../../services/form-service";
import {TextInput} from '../../components/inputs/text/text-input';
import {PasswordInput} from '../../components/inputs/password/password-input';
import {ErrorMessage} from '../../components/error-message/error-message';
import {FormButton} from '../../components/form-button/form-button';
import {EmailInput} from '../../components/inputs/email/email-input';
import {PhoneInput} from '../../components/inputs/phone/phone-input';

export interface SettingsPageProps extends Props {}

class SettingsService extends FormServiceAbstract {
	public props: SettingsPageProps;

	constructor() {
		super();
		this.props = getProps(this.handleFormService);
	}

	protected showError(errorMessage: string, inputName: string): void {
		const isFormPassword = inputName === 'password' || inputName === 'oldPassword' || inputName === 'newPassword';
		const formComponent = isFormPassword ? 'ErrorMessage2' : 'ErrorMessage1';

		if (this.props.children) {
			this.props.children[formComponent].setProps({
				textError: errorMessage,
				addClass: errorMessage ? 'error-text--display' : '',
			});
		}
	}
}

function getProps(handleFormService: HandleFormService): SettingsPageProps {
	return {
		children: {
			TextInput1: new TextInput({
				label: 'Name',
				id: 'first_name',
				name: 'first_name',
				inputClass: 'mb-5',
				required: true,
			}),
			TextInput2: new TextInput({
				label: 'Surname',
				id: 'second_name',
				name: 'second_name',
				inputClass: 'mb-5',
				required: true,
			}),
			TextInput3: new TextInput({
				label: 'Display name',
				id: 'display_name',
				name: 'display_name',
				inputClass: 'mb-5',
				required: true,
			}),
			TextInput4: new TextInput({
				label: 'Login',
				id: 'login',
				name: 'login',
				inputClass: 'mb-5',
				required: true,
			}),
			EmailInput: new EmailInput({
				label: 'Email',
				id: 'email',
				name: 'email',
				inputClass: 'mb-5',
				required: true,
			}),
			PhoneInput: new PhoneInput({
				label: 'Phone',
				id: 'phone',
				name: 'phone',
				inputClass: 'mb-5',
				required: true,
			}),
			ErrorMessage1: new ErrorMessage({
				addClass: 'form__error-text',
			}),
			FormButton1: new FormButton({
				type: 'submit',
				text: 'Change data',
				addClass: 'mt-30',
			}),
			PasswordInput1: new PasswordInput({
				label: 'Old password',
				id: 'oldPassword',
				name: 'oldPassword',
				inputContainerClass: 'mb-5',
				required: true,
			}),
			PasswordInput2: new PasswordInput({
				label: 'Password',
				id: 'password',
				name: 'password',
				inputContainerClass: 'mb-5',
				required: true,
			}),
			PasswordInput3: new PasswordInput({
				label: 'Password (again)',
				id: 'newPassword',
				name: 'newPassword',
				inputContainerClass: 'mb-5',
				required: true,
			}),
			ErrorMessage2: new ErrorMessage({
				addClass: 'form__error-text',
			}),
			FormButton2: new FormButton({
				type: 'submit',
				text: 'Change password',
				addClass: 'mt-30',
			}),
		},
		events: {
			focus: [
				{
					id: 'first_name',
					fn: event => handleFormService.handleFieldFocus(event),
				},
				{
					id: 'second_name',
					fn: event => handleFormService.handleFieldFocus(event),
				},
				{
					id: 'login',
					fn: event => handleFormService.handleFieldFocus(event),
				},
				{
					id: 'email',
					fn: event => handleFormService.handleFieldFocus(event),
				},
				{
					id: 'phone',
					fn: event => handleFormService.handleFieldFocus(event),
				},
				{
					id: 'oldPassword',
					fn: event => handleFormService.handleFieldFocus(event),
				},
				{
					id: 'password',
					fn: event => handleFormService.handleFieldFocus(event),
				},
				{
					id: 'newPassword',
					fn: event => handleFormService.handleFieldFocus(event),
				},
			],
			blur: [
				{
					id: 'first_name',
					fn: event => handleFormService.handleFieldBlur(event),
				},
				{
					id: 'second_name',
					fn: event => handleFormService.handleFieldBlur(event),
				},
				{
					id: 'login',
					fn: event => handleFormService.handleFieldBlur(event),
				},
				{
					id: 'email',
					fn: event => handleFormService.handleFieldBlur(event),
				},
				{
					id: 'phone',
					fn: event => handleFormService.handleFieldBlur(event),
				},
				{
					id: 'oldPassword',
					fn: event => handleFormService.handleFieldBlur(event),
				},
				{
					id: 'password',
					fn: event => handleFormService.handleFieldBlur(event),
				},
				{
					id: 'newPassword',
					fn: event => handleFormService.handleFieldBlur(event),
				},
			],
			submit: [
				{
					id: 'form-profile',
					fn: event => handleFormService.handleFormSubmit(event),
				},
				{
					id: 'form-password',
					fn: event => handleFormService.handleFormSubmit(event),
				},
			],
		},
	};
}

const settingsService = new SettingsService();

export const {props} = settingsService;
