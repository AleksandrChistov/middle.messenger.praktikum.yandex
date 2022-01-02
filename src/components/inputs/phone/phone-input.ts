import {Block} from '../../../core/block';
import {Props} from '../../../core/types';
import {compileTemplateToElement} from '../../../core/utils/compile-template';
import templatePug from './phone-input.pug';
import './phone-input.scss';
import {FieldName} from '../../../services/form-services/form-validation-service';

export interface PhoneInputProps extends Props {
	id: string;
	name: FieldName;
	value?: string;
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
