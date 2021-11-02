import {HandleFormService} from './form-service';

export abstract class FormServiceAbstract {
	public handleFormService: HandleFormService; // TODO: use abstract class SOLID

	protected constructor() {
		this.handleFormService = new HandleFormService(this.showError.bind(this));
	}

	protected abstract showError(errorMessage: string, inputName?: string): void;
}
