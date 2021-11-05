import {Block} from '../../../core/block';
import {Props} from '../../../core/types';
import {compileTemplateToElement} from '../../../core/utils';
import templatePug from './email-input.pug';
import './email-input.scss';

interface EmailInputProps extends Props {
	id: string;
	name: string;
	label?: string;
	labelClass?: string;
	inputClass?: string;
	placeholder?: string;
	required?: boolean;
}

export class EmailInput extends Block<EmailInputProps> {
	constructor(propsObj: EmailInputProps) {
		super('div', propsObj);
	}

	render() {
		return compileTemplateToElement(templatePug, this.props);
	}
}
