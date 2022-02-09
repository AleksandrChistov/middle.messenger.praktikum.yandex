import {Events} from '../../core/types';
import {ShowErrorService} from '../../services/show-error-service';
import {router} from '../../index';
import {UserSignInController} from '../../controllers/auth-controllers/signin-controller';
import {FieldName} from '../../services/form-services/constants';
import {getEventName} from '../../core/utils/get-event-name';
import {SIGNIN_PAGE_EVENT_NAME} from './events';

class SignInService extends ShowErrorService {
	public signinEvents: Events = {
		click: [
			{
				id: 'goToSignUp',
				fn: event => {
					event.preventDefault();
					router.go('/sign-up');
				},
			},
		],
		focus: [
			{
				id: 'login',
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
		],
		blur: [
			{
				id: 'login',
				fn: event => {
					const error = this.handleFormService.handleFieldBlur(event);

					if (error) {
						this.showError(
							'signInPage.errorLogin',
							getEventName(SIGNIN_PAGE_EVENT_NAME, 'errorLogin'),
							error,
							FieldName.Login,
						);
					} else {
						this.hideError('signInPage.errorLogin', getEventName(SIGNIN_PAGE_EVENT_NAME, 'errorLogin'));
					}
				},
			},
			{
				id: 'password',
				fn: event => {
					const error = this.handleFormService.handleFieldBlur(event);

					if (error) {
						this.showError(
							'signInPage.errorPassword',
							getEventName(SIGNIN_PAGE_EVENT_NAME,
								'errorPassword',
							),
							error,
							FieldName.Password,
						);
					} else {
						this.hideError(
							'signInPage.errorPassword',
							getEventName(SIGNIN_PAGE_EVENT_NAME, 'errorPassword'),
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
					const isFormValid = this.validateFormItems(event, 'signInPage', SIGNIN_PAGE_EVENT_NAME);

					if (!isFormValid) {
						return;
					}

					const formData = this.handleFormService.handleFormSubmit(event);

					if (!formData) {
						return;
					}

					UserSignInController.signIn(formData)
						.catch(error => {
							console.error(error);
						});
				},
			},
		],
	};
}

export const {signinEvents} = new SignInService();
