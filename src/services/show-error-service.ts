import {HandleFormService} from "./form-services/form-service";
import {FormValidationService} from "./form-services/form-validation-service";
import {Props} from "../core/types";

export abstract class ShowErrorService {
  public props: Props;
  protected handleFormService: HandleFormService;

  constructor() {
    const formValidationService = new FormValidationService();
    this.handleFormService = new HandleFormService(formValidationService);
  }
}
