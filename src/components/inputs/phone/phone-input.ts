import {Block} from "../../../core/block";
import {Events} from "../../../core/types";
import {compileTemplateToElement} from '../../../core/utils';
import templatePug from "./phone-input.pug";
import './phone-input.scss';

type PhoneInputProps = {
    id: string;
    name: string;
    label?: string;
    labelClass?: string;
    inputClass?: string;
    placeholder?: string;
    events?: Events;
}

export class PhoneInput extends Block {
    constructor(propsObj: PhoneInputProps) {
        super("div", propsObj);
    }

    render() {
        const element = compileTemplateToElement(templatePug, this.props);
        console.log('PhoneInput template', element);
        return element;
    }
}
