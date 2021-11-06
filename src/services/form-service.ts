export type Invalid = { text?: true; length?: true; } | null;

export interface IFormValidationService {
  validateInput: (element: HTMLInputElement) => Invalid;
  isFieldHasValidation: (fieldName: string) => boolean;
}

type ShowErrorFn = (fieldName: string, invalid: Invalid) => void;

export class HandleFormService {
	private readonly formValidationService: IFormValidationService;
	private readonly showErrorFn: ShowErrorFn;

	constructor(formValidationService: IFormValidationService, showErrorFn: ShowErrorFn) {
		this.formValidationService = formValidationService;
    this.showErrorFn = showErrorFn;
	}

	handleFormSubmit(event: Event): void {
		event.preventDefault();
		const form = event.target as HTMLFormElement;

		const formData = this.serializeForm(form);

    if (formData) {
		  console.log('formValue', formData);
    }
	}

	handleFieldFocus(event: Event): void {
		(event.target as HTMLInputElement).classList.remove('invalid');
	}

	handleFieldBlur(event: Event): void {
		const element = event.target as HTMLInputElement;

		const invalid = this.formValidationService.validateInput(element);

    this.showErrorFn(element.name, invalid);

		if (invalid) {
      element.classList.add('invalid');
    }
	}

	private serializeForm(formNode: HTMLFormElement): Record<string, string> | null {
		const {elements} = formNode;
		const elementsArray = Array.from(elements);

		const isFormValid = elementsArray
      .filter((element: HTMLInputElement) => Boolean(element.name))
			.every((element: HTMLInputElement) => {
        const isFieldHasValidation = this.formValidationService.isFieldHasValidation(element.name);

        if (!isFieldHasValidation) {
          return true;
        }

        const invalid = this.formValidationService.validateInput(element);

        this.showErrorFn(element.name, invalid);

        return !invalid;
      });

		if (!isFormValid) {
			return null;
		}

		return Array.from(elements)
			.filter((element: HTMLInputElement) => Boolean(element.name))
			.reduce<Record<string, string>>((obj, element: HTMLInputElement) => {
			const {name, value} = element;

			obj[name] = value;

			return obj;
		}, {});
	}
}
