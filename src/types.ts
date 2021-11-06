import {FieldName} from "./services/form-validation-service";

export type FieldNameValueType = (typeof FieldName)[keyof typeof FieldName];
