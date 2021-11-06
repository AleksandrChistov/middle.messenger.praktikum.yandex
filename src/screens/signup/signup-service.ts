import {Children, Props} from '../../core/types';
import {HandleFormService, Invalid} from '../../services/form-service';
import {FieldName, FormValidationService} from "../../services/form-validation-service";
import {getErrorMessageFieldName} from "../../utils";
import {FIELD_ERROR_TEXT} from "../../constants";
import {FieldNameValueType} from "../../types";
import {TextInput} from '../../components/inputs/text/text-input';
import {EmailInput} from '../../components/inputs/email/email-input';
import {PhoneInput} from '../../components/inputs/phone/phone-input';
import {PasswordInput} from '../../components/inputs/password/password-input';
import {FormButton} from '../../components/form-button/form-button';
import {
  ERROR_ACTIVE_CLASS,
  ErrorMessage,
  ErrorMessageProps
} from '../../components/error-message/error-message';

export interface SignUpPageProps extends Props {
  children: Children;
}

class SignUpService {
  public props: SignUpPageProps;
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

function getProps(handleFormService: HandleFormService): SignUpPageProps {
	return {
		children: {
			textInputComponent1: new TextInput({
				label: 'Name',
				id: 'first_name',
				name: FieldName.FirstName,
				inputClass: 'mb-5',
				required: true,
			}),
      [getErrorMessageFieldName(FieldName.FirstName)]: new ErrorMessage({
        addClass: 'form__error-text',
      }),
			textInputComponent2: new TextInput({
				label: 'Surname',
				id: 'second_name',
				name: FieldName.SecondName,
				inputClass: 'mb-5',
				required: true,
			}),
      [getErrorMessageFieldName(FieldName.SecondName)]: new ErrorMessage({
        addClass: 'form__error-text',
      }),
			textInputComponent3: new TextInput({
				label: 'Login',
				id: 'login',
				name: FieldName.Login,
				inputClass: 'mb-5',
				required: true,
			}),
      [getErrorMessageFieldName(FieldName.Login)]: new ErrorMessage({
        addClass: 'form__error-text',
      }),
			emailInputComponent: new EmailInput({
				label: 'Email',
				id: 'email',
				name: FieldName.Email,
				inputClass: 'mb-5',
				required: true,
			}),
      [getErrorMessageFieldName(FieldName.Email)]: new ErrorMessage({
        addClass: 'form__error-text',
      }),
			phoneInputComponent: new PhoneInput({
				label: 'Phone',
				id: 'phone',
				name: FieldName.Phone,
				inputClass: 'mb-5',
				required: true,
			}),
      [getErrorMessageFieldName(FieldName.Phone)]: new ErrorMessage({
        addClass: 'form__error-text',
      }),
			passwordInputComponent1: new PasswordInput({
				label: 'Password',
				id: 'password',
				name: FieldName.Password,
				inputClass: 'mb-5',
				required: true,
			}),
      [getErrorMessageFieldName(FieldName.Password)]: new ErrorMessage({
        addClass: 'form__error-text',
      }),
			passwordInputComponent2: new PasswordInput({
				label: 'Password (again)',
				id: 'passwordAgain',
				name: FieldName.PasswordAgain,
				inputClass: 'mb-5',
				required: true,
			}),
      [getErrorMessageFieldName(FieldName.PasswordAgain)]: new ErrorMessage({
        addClass: 'form__error-text',
      }),
			formButtonComponent: new FormButton({
				type: 'submit',
				text: 'Sign up',
				addClass: 'mt-20',
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
