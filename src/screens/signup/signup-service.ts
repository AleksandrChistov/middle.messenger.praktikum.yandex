import {Events} from '../../core/types';
import {FieldName} from '../../services/form-services/form-validation-service';
import {ShowErrorService} from '../../services/show-error-service';
import {router} from '../../index';
import {UserSignUpController} from '../../controllers/auth-controllers/signup-controller';
import {getEventName} from '../../core/utils/get-event-name';
import {SIGNUP_PAGE_EVENT_NAME} from './events';

class SignUpService extends ShowErrorService {
	public signupEvents: Events = {
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
					this.handleFormService.handleFieldFocus(event);
				},
			},
			{
				id: 'second_name',
				fn: event => {
					this.handleFormService.handleFieldFocus(event);
				},
			},
			{
				id: 'login',
				fn: event => {
					this.handleFormService.handleFieldFocus(event);
				},
			},
			{
				id: 'email',
				fn: event => {
					this.handleFormService.handleFieldFocus(event);
				},
			},
			{
				id: 'phone',
				fn: event => {
					this.handleFormService.handleFieldFocus(event);
				},
			},
			{
				id: 'password',
				fn: event => {
					this.handleFormService.handleFieldFocus(event);
				},
			},
			{
				id: 'passwordAgain',
				fn: event => {
					this.handleFormService.handleFieldFocus(event);
				},
			},
		],
		blur: [
			{
				id: 'first_name',
				fn: event => {
					const error = this.handleFormService.handleFieldBlur(event);

					if (error) {
						this.showError(
							'signUpPage.errorName',
							getEventName(SIGNUP_PAGE_EVENT_NAME, 'errorName'),
							error,
							FieldName.FirstName,
						);
					} else {
						this.hideError('signUpPage.errorName', getEventName(SIGNUP_PAGE_EVENT_NAME, 'errorName'));
					}
				},
			},
			{
				id: 'second_name',
				fn: event => {
					const error = this.handleFormService.handleFieldBlur(event);

					if (error) {
						this.showError(
							'signUpPage.errorSurname',
							getEventName(SIGNUP_PAGE_EVENT_NAME,
								'errorSurname',
							),
							error,
							FieldName.SecondName,
						);
					} else {
						this.hideError('signUpPage.errorSurname', getEventName(SIGNUP_PAGE_EVENT_NAME, 'errorSurname'));
					}
				},
			},
			{
				id: 'login',
				fn: event => {
					const error = this.handleFormService.handleFieldBlur(event);

					if (error) {
						this.showError(
							'signUpPage.errorLogin',
							getEventName(SIGNUP_PAGE_EVENT_NAME, 'errorLogin'),
							error,
							FieldName.Login,
						);
					} else {
						this.hideError('signUpPage.errorLogin', getEventName(SIGNUP_PAGE_EVENT_NAME, 'errorLogin'));
					}
				},
			},
			{
				id: 'email',
				fn: event => {
					const error = this.handleFormService.handleFieldBlur(event);

					if (error) {
						this.showError(
							'signUpPage.errorEmail',
							getEventName(SIGNUP_PAGE_EVENT_NAME, 'errorEmail'),
							error,
							FieldName.Email,
						);
					} else {
						this.hideError('signUpPage.errorEmail', getEventName(SIGNUP_PAGE_EVENT_NAME, 'errorEmail'));
					}
				},
			},
			{
				id: 'phone',
				fn: event => {
					const error = this.handleFormService.handleFieldBlur(event);

					if (error) {
						this.showError(
							'signUpPage.errorPhone',
							getEventName(SIGNUP_PAGE_EVENT_NAME, 'errorPhone'),
							error,
							FieldName.Phone,
						);
					} else {
						this.hideError('signUpPage.errorPhone', getEventName(SIGNUP_PAGE_EVENT_NAME, 'errorPhone'));
					}
				},
			},
			{
				id: 'password',
				fn: event => {
					const error = this.handleFormService.handleFieldBlur(event);

					if (error) {
						this.showError(
							'signUpPage.errorPassword',
							getEventName(SIGNUP_PAGE_EVENT_NAME, 'errorPassword'),
							error,
							FieldName.Password,
						);
					} else {
						this.hideError(
							'signUpPage.errorPassword',
							getEventName(SIGNUP_PAGE_EVENT_NAME, 'errorPassword'),
						);
					}
				},
			},
			{
				id: 'passwordAgain',
				fn: event => {
					const error = this.handleFormService.handleFieldBlur(event);

					if (error) {
						this.showError(
							'signUpPage.errorPasswordAgain',
							getEventName(SIGNUP_PAGE_EVENT_NAME, 'errorPasswordAgain'),
							error,
							FieldName.PasswordAgain,
						);
					} else {
						this.hideError(
							'signUpPage.errorPasswordAgain',
							getEventName(SIGNUP_PAGE_EVENT_NAME, 'errorPasswordAgain'),
						);
					}
				},
			},
		],
		submit: [
			{
				id: 'form',
				fn: event => {
					event.preventDefault();
					const isFormValid = this.validateFormItems(event, 'signUpPage', SIGNUP_PAGE_EVENT_NAME);

					if (!isFormValid) {
						return;
					}

					const formData = this.handleFormService.handleFormSubmit(event);

					if (!formData) {
						return;
					}

					UserSignUpController.signUp(formData)
						.catch(error => {
							console.error(error);
						});
				},
			},
		],
	};
}

export const {signupEvents} = new SignUpService();
