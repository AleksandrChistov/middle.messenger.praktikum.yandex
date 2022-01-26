import {Block} from '../../core/block';
import {Events, Props} from '../../core/types';
import {compileTemplateToElement} from '../../core/utils/compile-template';
import {mapStateToPropsCallBack} from '../../store/utils';
const templatePug = require('./form-button.pug') as (locals: Props) => string;
import './form-button.scss';

export interface FormButtonProps extends Props {
	type?: string;
	text?: string;
	addClass?: string;
	isDisabled?: boolean;
}

export class FormButton extends Block<FormButtonProps> {
	constructor(propsObj: FormButtonProps, eventName: string, events?: Events) {
		super('div', 'form-button-block', propsObj, events);

		this.subscribeToStoreEvent(eventName, mapStateToPropsCallBack);
	}

	render() {
		return compileTemplateToElement(templatePug, this.props, '', this._meta.events);
	}
}
