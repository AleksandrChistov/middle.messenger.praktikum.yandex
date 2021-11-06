import {Children, Props} from '../../core/types';
import {HandleFormService} from '../../services/form-service';
import {FieldName} from "../../services/form-validation-service";
import {ShowErrorService} from "../../services/show-error-service";
import {getErrorMessageFieldName} from "../../utils";
import {TextInput} from '../../components/inputs/text/text-input';
import {PasswordInput} from '../../components/inputs/password/password-input';
import {FormButton} from '../../components/form-button/form-button';
import {ErrorMessage} from '../../components/error-message/error-message';
import welcomeImg from '../../../static/assets/img/welcome.png';

export interface SignInPageProps extends Props {
	welcomeImgSrc: string;
  children: Children;
}

class SignInService extends ShowErrorService {
	public props: SignInPageProps;

	constructor() {
    super();
		this.props = getProps(this.handleFormService);
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
      [getErrorMessageFieldName(FieldName.Login)]: new ErrorMessage({
        addClass: 'form__error-text',
      }),
			passwordInputComponent: new PasswordInput({
				label: 'Password',
				id: 'password',
				name: FieldName.Password,
				inputContainerClass: 'mb-5',
				required: true,
			}),
      [getErrorMessageFieldName(FieldName.Password)]: new ErrorMessage({
        addClass: 'form__error-text',
      }),
			formButtonComponent: new FormButton({
				type: 'submit',
				text: 'Sign in',
				addClass: 'mt-20 mb-20',
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
