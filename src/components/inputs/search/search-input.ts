import {Block} from '../../../core/block';
import {Props} from '../../../core/types';
import {compileTemplateToElement} from '../../../core/utils/compile-template';
import {mapStateToPropsCallBack} from '../../../store/utils';
import templatePug from './search-input.pug';
import './search-input.scss';

export interface SearchInputProps extends Props {
	id: string;
	name: string;
	label?: string;
	labelClass?: string;
	inputContainerClass?: string;
	inputClass?: string;
	placeholder?: string;
  autofocusOn?: boolean;
  value?: string;
}

export class SearchInput extends Block<SearchInputProps> {
	constructor(propsObj: SearchInputProps, eventName: string) {
		super('div', 'search-input-block', propsObj);

    this.subscribeToStoreEvent(eventName, mapStateToPropsCallBack);
	}

	render() {
		return compileTemplateToElement(templatePug, this.props, '');
	}
}
