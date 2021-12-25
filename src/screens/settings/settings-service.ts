import {Children, Props} from '../../core/types';
import {HandleFormService} from '../../services/form-services/form-service';
import {FieldName} from "../../services/form-services/form-validation-service";
import {ShowErrorService} from "../../services/show-error-service";
import {getErrorMessageFieldName} from "../../utils";
import {TextInput} from '../../components/inputs/text/text-input';
import {PasswordInput} from '../../components/inputs/password/password-input';
import {FormButton} from '../../components/form-button/form-button';
import {EmailInput} from '../../components/inputs/email/email-input';
import {PhoneInput} from '../../components/inputs/phone/phone-input';
import {ErrorMessage} from '../../components/error-message/error-message';
import {router} from "../../index";
import {UserLogOutController} from "../../controllers/auth-controllers/logout-controller";

export interface SettingsPageProps extends Props {
  children: Children;
}

class SettingsService extends ShowErrorService {
	public props: SettingsPageProps;

	constructor() {
    super();
    this.props = getProps(this.handleFormService);
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
			formButtonComponent1: new FormButton({
				type: 'submit',
				text: 'Change data',
				addClass: 'mt-20',
			}),
			passwordInputComponent1: new PasswordInput({
				label: 'Old password',
				id: 'oldPassword',
				name: FieldName.OldPassword,
				inputContainerClass: 'mb-5',
				required: true,
			}),
      [getErrorMessageFieldName(FieldName.OldPassword)]: new ErrorMessage({
        addClass: 'form__error-text',
      }),
			passwordInputComponent2: new PasswordInput({
				label: 'Password',
				id: 'password',
				name: FieldName.Password,
				inputContainerClass: 'mb-5',
				required: true,
			}),
      [getErrorMessageFieldName(FieldName.Password)]: new ErrorMessage({
        addClass: 'form__error-text',
      }),
			passwordInputComponent3: new PasswordInput({
				label: 'Password (again)',
				id: 'newPassword',
				name: FieldName.NewPassword,
				inputContainerClass: 'mb-5',
				required: true,
			}),
      [getErrorMessageFieldName(FieldName.NewPassword)]: new ErrorMessage({
        addClass: 'form__error-text',
      }),
			formButtonComponent2: new FormButton({
				type: 'submit',
				text: 'Change password',
				addClass: 'mt-20',
			}),
		},
		events: {
      click: [
        {
          id: 'goToChat',
          fn: event => {
            event.preventDefault();
            router.go('/messenger');
          },
        },
        {
          id: 'logout',
          fn: event => {
            event.preventDefault();
            UserLogOutController.logOut();
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
