import {HandleFormService, Invalid} from "./form-services/form-service";
import {FieldNameValueType, FormValidationService} from "./form-services/form-validation-service";
import {FIELD_ERROR_TEXT} from "./form-services/constants";
import {getErrorMessageFieldName} from "../utils";
import {ERROR_ACTIVE_CLASS, ErrorMessageProps} from "../components/error-message/error-message";
import {Props} from "../core/types";

export abstract class ShowErrorService {
  public props: Props;
  protected handleFormService: HandleFormService;

  protected constructor() {
    const formValidationService = new FormValidationService();
    this.handleFormService = new HandleFormService(formValidationService, this.showError.bind(this));
  }

  protected showError(fieldName: FieldNameValueType, invalid: Invalid): void {
    if (!this.props?.children) {
      throw new Error(`Object props.children was not specified`);
    }

    const fieldErrorObj = FIELD_ERROR_TEXT[fieldName];

    if (!fieldErrorObj) {
      throw new Error(`Error text for field ${fieldName} not found`);
    }

    const errorMessageComponent = this.props.children[getErrorMessageFieldName(fieldName)];

    if (!errorMessageComponent) {
      throw new Error(`Component named ${getErrorMessageFieldName(fieldName)} not found`);
    }

    const textError = invalid?.length ? fieldErrorObj.length : fieldErrorObj.text;

    errorMessageComponent.setProps<ErrorMessageProps>({
      addClass: Boolean(invalid) ? ERROR_ACTIVE_CLASS : '',
      textError: textError || '',
    });
  }
}
