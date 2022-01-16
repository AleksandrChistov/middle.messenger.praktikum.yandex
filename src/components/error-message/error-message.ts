import {Block} from '../../core/block';
import {Events, Props} from '../../core/types';
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
	constructor(propsObj: ErrorMessageProps, eventName: string, events?: Events) {
		super('div', 'error-message-block', propsObj, events);

    this.subscribeToStoreEvent(eventName, mapStateToPropsCallBack);
	}

	render() {
		return compileTemplateToElement(templatePug, this.props, '', this._meta.events);
	}
}
