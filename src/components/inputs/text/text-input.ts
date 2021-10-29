import {Block} from "../../../core/block";
import {Events} from "../../../core/types";
import {compileTemplate} from '../../../core/utils';
import templatePug from "./text-input.pug";
import './text-input.scss';

type TextInputProps = {
    id: string;
    name: string;
    label?: string;
    labelClass?: string;
    inputClass?: string;
    placeholder?: string;
    events?: Events;
}

export class TextInput extends Block {
    constructor(propsObj: TextInputProps) {
        // Создаём враппер DOM-элемент
        super("div", propsObj);
    }

    render() {
        const template = compileTemplate(templatePug, this.props);
        console.log('TextInput template', template);
        return template;
    }
}
