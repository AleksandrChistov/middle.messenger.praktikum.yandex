import {Props} from '../../core/types';
import {FormServiceAbstract} from '../../services/form-service-abstract';
import {FieldName, HandleFormService} from '../../services/form-service';
import {TextInput} from '../../components/inputs/text/text-input';
import {PasswordInput} from '../../components/inputs/password/password-input';
import {ERROR_ACTIVE_CLASS, ErrorMessage} from '../../components/error-message/error-message';
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
		const isFormPassword = inputName === FieldName.Password
			|| inputName === FieldName.OldPassword
			|| inputName === FieldName.NewPassword;
		const formComponent = isFormPassword ? 'errorMessageComponent2' : 'errorMessageComponent1';

		if (this.props.children) {
			this.props.children[formComponent].setProps({
				textError: errorMessage,
				addClass: errorMessage ? ERROR_ACTIVE_CLASS : '',
			});
		}
	}
}

function getProps(handleFormService: HandleFormService): SettingsPageProps {
	return {
		children: {
			textInputComponent1: new TextInput({
				label: 'Name',
				id: 'first_name',
				name: FieldName.FirstName,
				inputClass: 'mb-5',
				required: true,
			}),
			textInputComponent2: new TextInput({
				label: 'Surname',
				id: 'second_name',
				name: FieldName.SecondName,
				inputClass: 'mb-5',
				required: true,
			}),
			textInputComponent3: new TextInput({
				label: 'Display name',
				id: 'display_name',
				name: 'display_name',
				inputClass: 'mb-5',
				required: true,
			}),
			textInputComponent4: new TextInput({
				label: 'Login',
				id: 'login',
				name: FieldName.Login,
				inputClass: 'mb-5',
				required: true,
			}),
			emailInputComponent: new EmailInput({
				label: 'Email',
				id: 'email',
				name: FieldName.Email,
				inputClass: 'mb-5',
				required: true,
			}),
			phoneInputComponent: new PhoneInput({
				label: 'Phone',
				id: 'phone',
				name: FieldName.Phone,
				inputClass: 'mb-5',
				required: true,
			}),
			errorMessageComponent1: new ErrorMessage({
				addClass: 'form__error-text',
			}),
			formButtonComponent1: new FormButton({
				type: 'submit',
				text: 'Change data',
				addClass: 'mt-30',
			}),
			passwordInputComponent1: new PasswordInput({
				label: 'Old password',
				id: 'oldPassword',
				name: FieldName.OldPassword,
				inputContainerClass: 'mb-5',
				required: true,
			}),
			passwordInputComponent2: new PasswordInput({
				label: 'Password',
				id: 'password',
				name: FieldName.Password,
				inputContainerClass: 'mb-5',
				required: true,
			}),
			passwordInputComponent3: new PasswordInput({
				label: 'Password (again)',
				id: 'newPassword',
				name: FieldName.NewPassword,
				inputContainerClass: 'mb-5',
				required: true,
			}),
			errorMessageComponent2: new ErrorMessage({
				addClass: 'form__error-text',
			}),
			formButtonComponent2: new FormButton({
				type: 'submit',
				text: 'Change password',
				addClass: 'mt-30',
			}),
		},
		events: {
			focus: [
				{
					id: 'first_name',
					fn: event => {
						handleFormService.handleFieldFocus(event);
					},
				},
				{
					id: 'second_name',
					fn: event => {
						handleFormService.handleFieldFocus(event);
					},
				},
				{
					id: 'login',
					fn: event => {
						handleFormService.handleFieldFocus(event);
					},
				},
				{
					id: 'email',
					fn: event => {
						handleFormService.handleFieldFocus(event);
					},
				},
				{
					id: 'phone',
					fn: event => {
						handleFormService.handleFieldFocus(event);
					},
				},
				{
					id: 'oldPassword',
					fn: event => {
						handleFormService.handleFieldFocus(event);
					},
				},
				{
					id: 'password',
					fn: event => {
						handleFormService.handleFieldFocus(event);
					},
				},
				{
					id: 'newPassword',
					fn: event => {
						handleFormService.handleFieldFocus(event);
					},
				},
			],
			blur: [
				{
					id: 'first_name',
					fn: event => {
						handleFormService.handleFieldBlur(event);
					},
				},
				{
					id: 'second_name',
					fn: event => {
						handleFormService.handleFieldBlur(event);
					},
				},
				{
					id: 'login',
					fn: event => {
						handleFormService.handleFieldBlur(event);
					},
				},
				{
					id: 'email',
					fn: event => {
						handleFormService.handleFieldBlur(event);
					},
				},
				{
					id: 'phone',
					fn: event => {
						handleFormService.handleFieldBlur(event);
					},
				},
				{
					id: 'oldPassword',
					fn: event => {
						handleFormService.handleFieldBlur(event);
					},
				},
				{
					id: 'password',
					fn: event => {
						handleFormService.handleFieldBlur(event);
					},
				},
				{
					id: 'newPassword',
					fn: event => {
						handleFormService.handleFieldBlur(event);
					},
				},
			],
			submit: [
				{
					id: 'form-profile',
					fn: event => {
						handleFormService.handleFormSubmit(event);
					},
				},
				{
					id: 'form-password',
					fn: event => {
						handleFormService.handleFormSubmit(event);
					},
				},
			],
		},
	};
}

const settingsService = new SettingsService();

export const {props} = settingsService;
