import {Props} from '../../core/types';
import {FormServiceAbstract} from '../../services/form-service-abstract';
import {HandleFormService} from '../../services/form-service';
import {TextInput} from '../../components/inputs/text/text-input';
import {EmailInput} from '../../components/inputs/email/email-input';
import {PhoneInput} from '../../components/inputs/phone/phone-input';
import {PasswordInput} from '../../components/inputs/password/password-input';
import {ErrorMessage} from '../../components/error-message/error-message';
import {FormButton} from '../../components/form-button/form-button';

export interface SignUpPageProps extends Props {}

class SignUpService extends FormServiceAbstract {
	public props: SignUpPageProps;

	constructor() {
		super();
		this.props = getProps(this.handleFormService);
	}

	protected showError(errorMessage: string): void {
		this.props.children?.errorMessageComponent.setProps({
			textError: errorMessage,
			addClass: errorMessage ? 'error-text--display' : '',
		});
	}
}

function getProps(handleFormService: HandleFormService): SignUpPageProps {
	return {
		children: {
			textInputComponent1: new TextInput({
				label: 'Name',
				id: 'first_name',
				name: 'first_name',
				inputClass: 'mb-5',
				required: true,
			}),
			textInputComponent2: new TextInput({
				label: 'Surname',
				id: 'second_name',
				name: 'second_name',
				inputClass: 'mb-5',
				required: true,
			}),
			textInputComponent3: new TextInput({
				label: 'Login',
				id: 'login',
				name: 'login',
				inputClass: 'mb-5',
				required: true,
			}),
			emailInputComponent: new EmailInput({
				label: 'Email',
				id: 'email',
				name: 'email',
				inputClass: 'mb-5',
				required: true,
			}),
			phoneInputComponent: new PhoneInput({
				label: 'Phone',
				id: 'phone',
				name: 'phone',
				inputClass: 'mb-5',
				required: true,
			}),
			passwordInputComponent1: new PasswordInput({
				label: 'Password',
				id: 'password',
				name: 'password',
				inputClass: 'mb-5',
				required: true,
			}),
			passwordInputComponent2: new PasswordInput({
				label: 'Password (again)',
				id: 'passwordAgain',
				name: 'passwordAgain',
				inputClass: 'mb-5',
				required: true,
			}),
			errorMessageComponent: new ErrorMessage({
				addClass: 'form__error-text',
			}),
			formButtonComponent: new FormButton({
				type: 'submit',
				text: 'Sign up',
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
					id: 'password',
					fn: event => {
						handleFormService.handleFieldFocus(event);
					},
				},
				{
					id: 'passwordAgain',
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
					id: 'password',
					fn: event => {
						handleFormService.handleFieldBlur(event);
					},
				},
				{
					id: 'passwordAgain',
					fn: event => {
						handleFormService.handleFieldBlur(event);
					},
				},
			],
			submit: [
				{
					id: 'form',
					fn: event => {
						handleFormService.handleFormSubmit(event);
					},
				},
			],
		},
	};
}

const signUpService = new SignUpService();

export const {props} = signUpService;
