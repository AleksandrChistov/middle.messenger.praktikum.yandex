import {Block} from "../../../core/block";
import {Events, Props} from "../../../core/types";
import {compileTemplateToElement} from '../../../core/utils';
import templatePug from "./password-input.pug";
import './password-input.scss';

interface PasswordInputProps extends Props {
    id: string;
    name: string;
    label?: string;
    inputContainerClass?: string;
    inputClass?: string;
    labelClass?: string;
    placeholder?: string;
    events?: Events;
}

export class PasswordInput extends Block<PasswordInputProps> {
    constructor(propsObj: PasswordInputProps) {
        super("div", propsObj);
    }

    render() {
        const element = compileTemplateToElement(templatePug, this.props);
        console.log('Password template', element);
        return element;
    }
}
