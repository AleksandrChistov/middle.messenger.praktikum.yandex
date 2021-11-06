import {FieldNameValueType} from "./types";

export function getErrorMessageFieldName(fieldName: FieldNameValueType): string {
  return `${fieldName}ErrorMessage`;
}
