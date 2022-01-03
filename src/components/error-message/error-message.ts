import {Block} from '../../core/block';
import {Props} from '../../core/types';
import {compileTemplateToElement} from '../../core/utils/compile-template';
import {mapStateToPropsCallBack} from '../../store/utils';
import templatePug from './error-message.pug';
import './error-message.scss';

export const ERROR_ACTIVE_CLASS = 'error-text--display';

export interface ErrorMessageProps extends Props {
	textError?: string;
	addClass?: string;
}

export class ErrorMessage extends Block<ErrorMessageProps> {
	constructor(propsObj: ErrorMessageProps, eventName: string) {
		super('div', 'error-message-block', propsObj);

    this.subscribeToStoreEvent(eventName, mapStateToPropsCallBack);
	}

	render() {
		return compileTemplateToElement(templatePug, this.props, '');
	}
}
