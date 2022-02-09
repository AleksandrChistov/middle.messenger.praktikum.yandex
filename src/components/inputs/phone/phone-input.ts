import {Block} from '../../../core/block';
import {Events, Props} from '../../../core/types';
import {compileTemplateToElement} from '../../../core/utils/compile-template';
import {mapStateToPropsCallBack} from '../../../store/utils';
const templatePug = require('./phone-input.pug') as (locals: Props) => string;
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
	constructor(propsObj: PhoneInputProps, eventName: string, events?: Events) {
		super('div', 'phone-input-block', propsObj, events);

		this.subscribeToStoreEvent(eventName, mapStateToPropsCallBack);
	}

	render() {
		return compileTemplateToElement(templatePug, this.props, '', this._meta.events);
	}
}
