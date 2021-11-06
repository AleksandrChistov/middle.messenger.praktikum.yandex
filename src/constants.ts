import {FieldName} from "./services/form-validation-service";

const NAME_FIELD_ERROR_TEXT = 'Latin or Cyrillic letters are allowed, '
  + 'the first letter must be uppercase, without spaces and without numbers, '
  + 'there are no special characters (only a hyphen is allowed)';

const PASSWORD_FIELD_ERROR_TEXT = 'At least one capital letter and a number are required';
const PASSWORD_FIELD_ERROR_LENGTH = 'The value must be from 8 to 40 characters';

export const FIELD_ERROR_TEXT = {
  [FieldName.FirstName]: {
    text: NAME_FIELD_ERROR_TEXT,
    length: null
  },
  [FieldName.SecondName]: {
    text: NAME_FIELD_ERROR_TEXT,
    length: null
  },
  [FieldName.Login]: {
    text: 'Only the Latin alphabet is allowed, can contain numbers, '
      + 'but not consist of them, without spaces, without special characters '
      + '(hyphens and underscores are allowed)',
    length: 'The value must be from 3 to 20 characters'
  },
  [FieldName.Email]: {
    text: 'The Latin alphabet is acceptable, '
      + 'it can include numbers and special characters like a hyphen, '
      + 'there must be a "dog" (@) and a dot after it, '
      + 'but there must be letters before the dot',
    length: null
  },
  [FieldName.Password]: {
    text: PASSWORD_FIELD_ERROR_TEXT,
    length: PASSWORD_FIELD_ERROR_LENGTH
  },
  [FieldName.PasswordAgain]: {
    text: PASSWORD_FIELD_ERROR_TEXT,
    length: PASSWORD_FIELD_ERROR_LENGTH
  },
  [FieldName.OldPassword]: {
    text: PASSWORD_FIELD_ERROR_TEXT,
    length: PASSWORD_FIELD_ERROR_LENGTH
  },
  [FieldName.NewPassword]: {
    text: PASSWORD_FIELD_ERROR_TEXT,
    length: PASSWORD_FIELD_ERROR_LENGTH
  },
  [FieldName.Phone]: {
    text: 'The value must be from 10 to 15 characters, '
      + 'consists of digits, can start with a plus',
    length: null
  },
  [FieldName.Message]: {
    text: null,
    length: 'The message field cannot be empty'
  },
}
