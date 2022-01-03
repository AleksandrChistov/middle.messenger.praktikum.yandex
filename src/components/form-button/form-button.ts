import {Block} from '../../core/block';
import {Props} from '../../core/types';
import {compileTemplateToElement} from '../../core/utils/compile-template';
import {mapStateToPropsCallBack} from '../../store/utils';
import templatePug from './form-button.pug';
import './form-button.scss';

export interface FormButtonProps extends Props {
	type?: string;
	text?: string;
	addClass?: string;
}

export class FormButton extends Block<FormButtonProps> {
	constructor(propsObj: FormButtonProps, eventName: string) {
		super('div', 'form-button-block', propsObj);

    this.subscribeToStoreEvent(eventName, mapStateToPropsCallBack);
	}

	render() {
		return compileTemplateToElement(templatePug, this.props, '');
	}
}
