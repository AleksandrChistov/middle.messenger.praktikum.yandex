import {Block} from '../../../core/block';
import {Props} from '../../../core/types';
import {compileTemplateToElement} from '../../../core/utils';
import templatePug from './phone-input.pug';
import './phone-input.scss';

interface PhoneInputProps extends Props {
	id: string;
	name: string;
	label?: string;
	labelClass?: string;
	inputClass?: string;
	placeholder?: string;
	required?: boolean;
}

export class PhoneInput extends Block<PhoneInputProps> {
	constructor(propsObj: PhoneInputProps) {
		super('div', 'phone-input-block', propsObj);
	}

	render() {
		return compileTemplateToElement(templatePug, this.props);
	}
}
