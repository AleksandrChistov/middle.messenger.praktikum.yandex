import {FieldNameValueType} from "./services/form-validation-service";

export function getErrorMessageFieldName(fieldName: FieldNameValueType): string {
  return `${fieldName}ErrorMessage`;
}
