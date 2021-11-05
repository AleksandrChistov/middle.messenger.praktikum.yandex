import {Props} from '../../core/types';
import {FormServiceAbstract} from '../../services/form-service-abstract';
import {FieldName, HandleFormService} from '../../services/form-service';
import welcomeImg from '../../../static/assets/img/welcome.png';
import {TextInput} from '../../components/inputs/text/text-input';
import {PasswordInput} from '../../components/inputs/password/password-input';
import {ErrorMessage} from '../../components/error-message/error-message';
import {FormButton} from '../../components/form-button/form-button';

export interface SignInPageProps extends Props {
	welcomeImgSrc: string;
}

class SignInService extends FormServiceAbstract {
	public props: SignInPageProps;

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

function getProps(handleFormService: HandleFormService): SignInPageProps {
	return {
		welcomeImgSrc: welcomeImg as string,
		children: {
			textInputComponent: new TextInput({
				label: 'Login',
				id: 'login',
				name: FieldName.Login,
				inputClass: 'mb-5',
				required: true,
			}),
			passwordInputComponent: new PasswordInput({
				label: 'Password',
				id: 'password',
				name: FieldName.Password,
				inputContainerClass: 'mb-5',
				required: true,
			}),
			errorMessageComponent: new ErrorMessage({
				addClass: 'form__error-text',
			}),
			formButtonComponent: new FormButton({
				type: 'submit',
				text: 'Sign in',
				addClass: 'mt-30 mb-20',
			}),
		},
		events: {
			focus: [
				{
					id: 'login',
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
			],
			blur: [
				{
					id: 'login',
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

const signInService = new SignInService();

export const {props} = signInService;
