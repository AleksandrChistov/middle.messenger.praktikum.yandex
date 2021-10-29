import {Block} from "../../../core/block";
import {Events} from "../../../core/types";
import {compileTemplateToElement} from '../../../core/utils';
import templatePug from "./password-input.pug";
import './password-input.scss';

type PasswordInputProps = {
    id: string;
    name: string;
    label?: string;
    inputContainerClass?: string;
    inputClass?: string;
    labelClass?: string;
    placeholder?: string;
    events?: Events;
}

export class PasswordInput extends Block {
    constructor(propsObj: PasswordInputProps) {
        // Создаём враппер DOM-элемент
        super("div", propsObj);
    }

    render() {
        const element = compileTemplateToElement(templatePug, this.props);
        console.log('Password template', element);
        return element;
    }
}
