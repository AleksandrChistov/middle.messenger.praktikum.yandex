import {Block} from '../../../core/block';
import {Props} from '../../../core/types';
import {compileTemplateToElement} from '../../../core/utils/compile-template';
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
}

export class SearchInput extends Block<SearchInputProps> {
	constructor(propsObj: SearchInputProps) {
		super('div', 'search-input-block', propsObj);
	}

	render() {
		return compileTemplateToElement(templatePug, this.props);
	}
}
