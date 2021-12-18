import {Block} from '../../core/block';
import {Props} from '../../core/types';
import {compileTemplateToElement} from '../../core/utils';
import templatePug from './error-message.pug';
import './error-message.scss';

export const ERROR_ACTIVE_CLASS = 'error-text--display';

export interface ErrorMessageProps extends Props {
	textError?: string;
	addClass?: string;
}

export class ErrorMessage extends Block<ErrorMessageProps> {
	constructor(propsObj: ErrorMessageProps) {
		super('div', 'error-message-block', propsObj);
	}

	render() {
		return compileTemplateToElement(templatePug, this.props);
	}
}
