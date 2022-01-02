import {FieldName} from "../../services/form-services/form-validation-service";
import {SettingsPageProps} from "../../screens/settings/types";

export const SETTINGS_INITIAL_STATE: SettingsPageProps = {
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
  displayNameInput: {
    label: 'Display name',
    id: 'display_name',
    name: 'display_name',
    inputClass: 'mb-5',
    required: true,
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
  changeDataButton: {
    type: 'submit',
    text: 'Change data',
    addClass: 'mt-20',
  },
  oldPasswordInput: {
    label: 'Old password',
    id: 'oldPassword',
    name: FieldName.OldPassword,
    inputContainerClass: 'mb-5',
    required: true,
  },
  errorOldPassword: {
    addClass: 'form__error-text',
  },
  passwordInput: {
    label: 'Password',
    id: 'password',
    name: FieldName.Password,
    inputContainerClass: 'mb-5',
    required: true,
  },
  errorPassword: {
    addClass: 'form__error-text',
  },
  passwordAgainInput: {
    label: 'Password (again)',
    id: 'newPassword',
    name: FieldName.NewPassword,
    inputContainerClass: 'mb-5',
    required: true,
  },
  errorPasswordAgain: {
    addClass: 'form__error-text',
  },
  changePasswordButton: {
    type: 'submit',
    text: 'Change password',
    addClass: 'mt-20',
  },
}
