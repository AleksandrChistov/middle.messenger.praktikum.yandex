import {Block} from '../../../core/block';
import {Events, Props} from '../../../core/types';
import {compileTemplateToElement} from '../../../core/utils/compile-template';
import {mapStateToPropsCallBack} from '../../../store/utils';
const templatePug = require('./text-input.pug');
import './text-input.scss';
import {FieldName} from '../../../services/form-services/form-validation-service';

export interface TextInputProps extends Props {
	id: string;
	name: FieldName | string;
	value?: string;
	label?: string;
	labelClass?: string;
	inputClass?: string;
	placeholder?: string;
	required?: boolean;
}

export class TextInput extends Block<TextInputProps> {
	constructor(propsObj: TextInputProps, eventName: string, events?: Events) {
		super('div', 'text-input-block', propsObj, events);

    this.subscribeToStoreEvent(eventName, mapStateToPropsCallBack);
	}

	render() {
		return compileTemplateToElement(templatePug, this.props, '', this._meta.events);
	}
}
