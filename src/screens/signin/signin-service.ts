import {Children, Props} from '../../core/types';
import {HandleFormService, Invalid} from '../../services/form-service';
import {FieldName, FormValidationService} from "../../services/form-validation-service";
import {getErrorMessageFieldName} from "../../utils";
import {FIELD_ERROR_TEXT} from "../../constants";
import {FieldNameValueType} from "../../types";
import {TextInput} from '../../components/inputs/text/text-input';
import {PasswordInput} from '../../components/inputs/password/password-input';
import {
  ERROR_ACTIVE_CLASS,
  ErrorMessage,
  ErrorMessageProps
} from '../../components/error-message/error-message';
import {FormButton} from '../../components/form-button/form-button';
import welcomeImg from '../../../static/assets/img/welcome.png';

export interface SignInPageProps extends Props {
	welcomeImgSrc: string;
  children: Children;
}

class SignInService {
	public props: SignInPageProps;
	public handleFormService: HandleFormService;

	constructor() {
    const formValidationService = new FormValidationService();
    this.handleFormService = new HandleFormService(formValidationService, this.showError.bind(this));
		this.props = getProps(this.handleFormService);
	}

	private showError(fieldName: FieldNameValueType, invalid: Invalid): void {
    const fieldErrorObj = FIELD_ERROR_TEXT[fieldName];

    if (!fieldErrorObj) {
      throw new Error(`Error text for field ${fieldName} not found`);
    }

    const errorMessageComponent = this.props.children[getErrorMessageFieldName(fieldName)];

    if (!errorMessageComponent) {
      throw new Error(`Component named ${getErrorMessageFieldName(fieldName)} not found`);
    }

    const textError = invalid?.length ? fieldErrorObj.length : fieldErrorObj.text;

    errorMessageComponent.setProps<ErrorMessageProps>({
      addClass: Boolean(invalid) ? ERROR_ACTIVE_CLASS : '',
      textError: textError || '',
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
