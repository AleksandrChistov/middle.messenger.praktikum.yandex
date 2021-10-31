import {Block} from "../../../core/block";
import {Props} from "../../../core/types";
import {compileTemplateToElement} from '../../../core/utils';
import templatePug from "./search-input.pug";
import './search-input.scss';

interface SearchInputProps extends Props {
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
        super("div", propsObj);
    }

    render() {
        const element = compileTemplateToElement(templatePug, this.props);
        console.log('SearchInput template', element);
        return element;
    }
}
