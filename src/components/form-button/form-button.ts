import {Block} from '../../core/block';
import {Events, Props} from '../../core/types';
import {compileTemplateToElement} from '../../core/utils';
import templatePug from './form-button.pug';
import './form-button.scss';

interface FormButtonProps extends Props {
	type?: string;
	text?: string;
	addClass?: string;
	events?: Events;
}

export class FormButton extends Block<FormButtonProps> {
	constructor(propsObj: FormButtonProps) {
		super('div', 'form-button-block', propsObj);
	}

	render() {
		return compileTemplateToElement(templatePug, this.props);
	}
}
