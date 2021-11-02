type ShowErrorFn = (...args: any[]) => void;

export class HandleFormService {
	private readonly showErrorFn: ShowErrorFn;

	constructor(showErrorFn: ShowErrorFn) {
		this.showErrorFn = showErrorFn;
	}

	handleFormSubmit(event: Event): void {
		event.preventDefault();
		const form = event.target as HTMLFormElement;

		const formData = this.serializeForm(form);
		console.log('formValue', formData);
	}

	handleFieldFocus(event: Event): void {
		(event.target as HTMLInputElement).classList.remove('invalid');
		console.log('remove', event.target); // Remove red outline
	}

	handleFieldBlur(event: Event): void {
		const element = event.target as HTMLInputElement;

		const isValid = this.validateInput(element);
		console.log('isValid > ', isValid);

		if (isValid) {
			this.showErrorFn('', element.name);
			return;
		}

		element.classList.add('invalid');
	}

	private serializeForm(formNode: HTMLFormElement): Record<string, string> | null {
		const {elements} = formNode;
		const elementsArray = Array.from(elements);

		const isFormValid = elementsArray
			.every((element: HTMLInputElement) => this.validateInput(element));

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

	private validateInput(element: HTMLInputElement): boolean {
		const {name, value} = element;
		console.log('validateInput', name);

		if (name === 'first_name' || name === 'second_name') {
			const isValidValue = /^[A-ZА-Я][a-zA-Zа-яА-Я-]+$/.test(value);

			if (!isValidValue) {
				this.showErrorFn('Latin or Cyrillic letters are allowed, '
                    + 'the first letter must be uppercase, without spaces and without numbers, '
                    + 'there are no special characters (only a hyphen is allowed)',
				name,
				);
				return false;
			}

			return true;
		}

		if (name === 'login') {
			const isValidCharacters = /^([0-9]*[a-zA-Z\-_][0-9]*)+$/.test(value);
			const isValidLength = value.length >= 3 && value.length < 20;

			if (!isValidLength) {
				this.showErrorFn('The value must be from 3 to 20 characters', name);
				return false;
			}

			if (!isValidCharacters) {
				this.showErrorFn('Only the Latin alphabet is allowed, can contain numbers, '
                    + 'but not consist of them, without spaces, without special characters '
                    + '(hyphens and underscores are allowed)',
				name,
				);
				return false;
			}

			return true;
		}

		if (name === 'email') {
			const isValidValue = /^([\w-]+@[a-zA-Z]+.[a-z]+)$/.test(value);

			if (!isValidValue) {
				this.showErrorFn('The Latin alphabet is acceptable, '
                    + 'it can include numbers and special characters like a hyphen, '
                    + 'there must be a "dog" (@) and a dot after it, '
					+ 'but there must be letters before the dot',
				name,
				);
				return false;
			}

			return true;
		}

		if (
			name === 'password'
			|| name === 'passwordAgain'
			|| name === 'oldPassword'
			|| name === 'newPassword'
		) {
			console.log('value', value);
			const isValidCharacters = /^(.*([A-Z]+.*[0-9]+|[0-9]+.*[A-Z]+).*)+$/.test(value);
			const isValidLength = value.length >= 8 && value.length < 40;

			if (!isValidLength) {
				this.showErrorFn('The value must be from 8 to 40 characters', name);
				return false;
			}

			if (!isValidCharacters) {
				this.showErrorFn('At least one capital letter and a number are required', name);
				return false;
			}

			return true;
		}

		if (name === 'phone') {
			const isValidValue = /^\+*[\d]{10,15}$/.test(value);

			if (!isValidValue) {
				this.showErrorFn('The value must be from 10 to 15 characters, '
                    + 'consists of digits, can start with a plus',
				name,
				);
				return false;
			}

			return true;
		}

		if (name === 'message') {
			const isValidValue = value.length > 0;

			if (!isValidValue) {
				this.showErrorFn('The value must be greater than 0 characters', name);
				return false;
			}

			return true;
		}

		return true;
	}
}
