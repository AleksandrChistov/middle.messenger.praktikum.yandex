import {IFormValidationService, Invalid} from "./form-service";

export enum FieldName {
  FirstName = 'first_name',
  SecondName = 'second_name',
  Login = 'login',
  Email = 'email',
  Password = 'password',
  PasswordAgain = 'passwordAgain',
  OldPassword = 'oldPassword',
  NewPassword = 'newPassword',
  Phone = 'phone',
  Message = 'message',
}

export type FieldNameValueType = (typeof FieldName)[keyof typeof FieldName];

export class FormValidationService implements IFormValidationService {
  isFieldHasValidation(fieldName: string): fieldName is FieldName {
    return Object.values<string>(FieldName).includes(fieldName);
  }

  validateInput(element: HTMLInputElement): Invalid {
    const {name, value} = element;

    if (!name) {
      throw new Error(`This element does not have a name attribute ${element}`);
    }

    if (name === FieldName.FirstName || name === FieldName.SecondName) {
      const isValidValue = /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/.test(value);

      if (!isValidValue) {
        return {
          text: true
        }
      }

      return null;
    }

    if (name === FieldName.Login) {
      const isValidText = /^([0-9]*[a-zA-Z\-_][0-9]*)+$/.test(value);
      const isValidLength = value.length >= 3 && value.length < 20;

      if (!isValidLength) {
        return {
          length: true
        }
      }

      if (!isValidText) {
        return {
          text: true
        }
      }

      return null;
    }

    if (name === FieldName.Email) {
      const isValidValue = /^([\w-.]+@[a-zA-Z]+.[a-z]+)$/.test(value);

      if (!isValidValue) {
        return {
          text: true
        }
      }

      return null;
    }

    if (
      name === FieldName.Password
      || name === FieldName.PasswordAgain
      || name === FieldName.OldPassword
      || name === FieldName.NewPassword
    ) {
      const isValidText = /^(.*([A-Z]+.*[0-9]+|[0-9]+.*[A-Z]+).*)+$/.test(value);
      const isValidLength = value.length >= 8 && value.length < 40;

      if (!isValidLength) {
        return {
          length: true
        }
      }

      if (!isValidText) {
        return {
          text: true
        }
      }

      return null;
    }

    if (name === FieldName.Phone) {
      const isValidValue = /^\+*[\d]{10,15}$/.test(value);

      if (!isValidValue) {
        return {
          text: true
        }
      }

      return null;
    }

    if (name === FieldName.Message) {
      const isValidLength = value.length > 0;

      if (!isValidLength) {
        return {
          length: true
        }
      }

      return null;
    }

    throw new Error(`Field name ${name} is not supported`);
  }
}
