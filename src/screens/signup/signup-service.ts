import {Children, Props} from '../../core/types';
import {HandleFormService} from '../../services/form-services/form-service';
import {FieldName} from "../../services/form-services/form-validation-service";
import {ShowErrorService} from "../../services/show-error-service";
import {getErrorMessageFieldName} from "../../utils";
import {TextInput} from '../../components/inputs/text/text-input';
import {EmailInput} from '../../components/inputs/email/email-input';
import {PhoneInput} from '../../components/inputs/phone/phone-input';
import {PasswordInput} from '../../components/inputs/password/password-input';
import {FormButton} from '../../components/form-button/form-button';
import {ErrorMessage} from '../../components/error-message/error-message';
import {router} from "../../index";
import {UserSignUpController} from "../../controllers/auth-controllers/signup-controller";

export interface SignUpPageProps extends Props {
  children: Children;
}

class SignUpService extends ShowErrorService {
  public props: SignUpPageProps;

	constructor() {
    super();
    this.props = getProps(this.handleFormService);
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
				required: true,
			}),
      [getErrorMessageFieldName(FieldName.Password)]: new ErrorMessage({
        addClass: 'form__error-text',
      }),
			passwordInputComponent2: new PasswordInput({
				label: 'Password (again)',
				id: 'passwordAgain',
				name: FieldName.PasswordAgain,
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
      click: [
        {
          id: 'goToSignIn',
          fn: event => {
            event.preventDefault();
            router.go('/');
          },
        },
      ],
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
						const formData = handleFormService.handleFormSubmit(event);

            if (!formData) {
              return;
            }

            UserSignUpController.signUp(formData);
					},
				},
			],
		},
	};
}

const signUpService = new SignUpService();

export const {props} = signUpService;
