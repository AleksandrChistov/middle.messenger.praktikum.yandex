import {Block} from '../../core/block';
import {Props} from '../../core/types';
import {compileTemplateToElement} from '../../core/utils/compile-template';
import templatePug from './form-button.pug';
import './form-button.scss';

export interface FormButtonProps extends Props {
	type?: string;
	text?: string;
	addClass?: string;
}

export class FormButton extends Block<FormButtonProps> {
	constructor(propsObj: FormButtonProps) {
		super('div', 'form-button-block', propsObj);
	}

	render() {
		return compileTemplateToElement(templatePug, this.props);
	}
}
