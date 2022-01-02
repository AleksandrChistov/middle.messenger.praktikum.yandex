import {FieldName} from "./constants";

export type Invalid = { text?: true; length?: true; } | null;

export type FormValidElements = ({ fieldName: FieldName, dataName: string, invalid: Invalid } | null)[];

export interface IFormValidationService {
  validateInput: (element: HTMLInputElement) => Invalid;
  isFieldHasValidation: (fieldName: string) => boolean;
}

export class HandleFormService {
	private readonly formValidationService: IFormValidationService;

	constructor(formValidationService: IFormValidationService) {
		this.formValidationService = formValidationService;
	}

	handleFormSubmit(event: Event): Record<string, unknown> | null {
		event.preventDefault();
		const form = event.target as HTMLFormElement;

		return this.serializeForm(form);
	}

	handleFieldFocus(event: Event): void {
		(event.target as HTMLInputElement).classList.remove('invalid');
	}

	handleFieldBlur(event: Event): Invalid {
		const element = event.target as HTMLInputElement;

		const invalid = this.formValidationService.validateInput(element);

		if (invalid) {
      element.classList.add('invalid');
    }

    return invalid;
	}

	private serializeForm({elements}: HTMLFormElement): Record<string, string> | null {
		return Array.from(elements)
			.filter((element: HTMLInputElement) => Boolean(element.name))
			.reduce<Record<string, string>>((obj, element: HTMLInputElement) => {
			const {name, value} = element;

			obj[name] = value;

			return obj;
		}, {});
	}

  validateForm(event: Event): FormValidElements {
    const {elements} = event.target as HTMLFormElement;

    return Array.from(elements)
      .filter((element: HTMLInputElement) => Boolean(element.name))
      .map((element: HTMLInputElement) => {
        const isFieldHasValidation = this.formValidationService.isFieldHasValidation(element.name);

        if (!isFieldHasValidation) {
          return null;
        }

        const invalid = this.formValidationService.validateInput(element);

        if (invalid) {
          element.classList.add('invalid');
        }

        const errorElement = document.querySelector(`[error-for=${element.id}]`);

        if (!errorElement) {
          throw new Error(`Please specify 'error-for' attribute for element with id ${element.id}`);
        }

        const dataName = errorElement.getAttribute("data");

        if (!dataName) {
          console.error(`Data attribute for the ${element.name} element has not been specified`);
          return null;
        }

        return {
          fieldName: element.name as FieldName,
          dataName: dataName,
          invalid: invalid
        };
      });
  }
}
