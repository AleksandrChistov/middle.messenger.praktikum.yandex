import {Block} from "../../../core/block";
import {Props} from "../../../core/types";
import {compileTemplateToElement} from '../../../core/utils';
import templatePug from "./text-input.pug";
import './text-input.scss';

interface TextInputProps extends Props {
    id: string;
    name: string;
    label?: string;
    labelClass?: string;
    inputClass?: string;
    placeholder?: string;
    required?: boolean;
}

export class TextInput extends Block<TextInputProps> {
    constructor(propsObj: TextInputProps) {
        super("div", propsObj);
    }

    render() {
        const element = compileTemplateToElement(templatePug, this.props);
        console.log('TextInput template', element);
        return element;
    }
}
