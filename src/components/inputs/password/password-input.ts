import {Block} from '../../../core/block';
import {Props} from '../../../core/types';
import {compileTemplateToElement} from '../../../core/utils/compile-template';
import {mapStateToPropsCallBack} from '../../../store/utils';
import templatePug from './password-input.pug';
import './password-input.scss';
import {FieldName} from '../../../services/form-services/form-validation-service';

export interface PasswordInputProps extends Props {
	id: string;
	name: FieldName;
	value?: string;
	label?: string;
	labelClass?: string;
	inputContainerClass?: string;
	inputClass?: string;
	placeholder?: string;
	required?: boolean;
}

export class PasswordInput extends Block<PasswordInputProps> {
	constructor(propsObj: PasswordInputProps, eventName: string) {
		super('div', 'password-input-block', propsObj);

    this.subscribeToStoreEvent(eventName, mapStateToPropsCallBack);
	}

	render() {
		return compileTemplateToElement(templatePug, this.props, '');
	}
}
