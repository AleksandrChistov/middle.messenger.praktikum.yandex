import {Block} from '../../../core/block';
import {Props} from '../../../core/types';
import {compileTemplateToElement} from '../../../core/utils';
import templatePug from './password-input.pug';
import './password-input.scss';

interface PasswordInputProps extends Props {
	id: string;
	name: string;
	label?: string;
	labelClass?: string;
	inputContainerClass?: string;
	inputClass?: string;
	placeholder?: string;
	required?: boolean;
}

export class PasswordInput extends Block<PasswordInputProps> {
	constructor(propsObj: PasswordInputProps) {
		super('div', 'password-input-block', propsObj);
	}

	render() {
		return compileTemplateToElement(templatePug, this.props);
	}
}
