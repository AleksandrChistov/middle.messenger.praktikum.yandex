import {FieldName} from '../../services/form-services/form-validation-service';
import {SignUpPageProps} from '../../screens/signup/types';

export const SIGNUP_INITIAL_STATE: SignUpPageProps = {
	nameInput: {
		label: 'Name',
		id: 'first_name',
		name: FieldName.FirstName,
		inputClass: 'mb-5',
		required: true,
	},
	errorName: {
		addClass: 'form__error-text',
	},
	surnameInput: {
		label: 'Surname',
		id: 'second_name',
		name: FieldName.SecondName,
		inputClass: 'mb-5',
		required: true,
	},
	errorSurname: {
		addClass: 'form__error-text',
	},
	loginInput: {
		label: 'Login',
		id: 'login',
		name: FieldName.Login,
		inputClass: 'mb-5',
		required: true,
	},
	errorLogin: {
		addClass: 'form__error-text',
	},
	emailInput: {
		label: 'Email',
		id: 'email',
		name: FieldName.Email,
		inputClass: 'mb-5',
		required: true,
	},
	errorEmail: {
		addClass: 'form__error-text',
	},
	phoneInput: {
		label: 'Phone',
		id: 'phone',
		name: FieldName.Phone,
		inputClass: 'mb-5',
		required: true,
	},
	errorPhone: {
		addClass: 'form__error-text',
	},
	passwordInput: {
		label: 'Password',
		id: 'password',
		name: FieldName.Password,
		required: true,
	},
	errorPassword: {
		addClass: 'form__error-text',
	},
	passwordAgainInput: {
		label: 'Password (again)',
		id: 'passwordAgain',
		name: FieldName.PasswordAgain,
		required: true,
	},
	errorPasswordAgain: {
		addClass: 'form__error-text',
	},
	formButton: {
		type: 'submit',
		text: 'Sign up',
		addClass: 'mt-20',
	},
};
