import {Block} from "../../../core/block";
import {Events, Props} from "../../../core/types";
import {compileTemplateToElement} from '../../../core/utils';
import templatePug from "./phone-input.pug";
import './phone-input.scss';

interface PhoneInputProps extends Props {
    id: string;
    name: string;
    label?: string;
    labelClass?: string;
    inputClass?: string;
    placeholder?: string;
    events?: Events;
}

export class PhoneInput extends Block<PhoneInputProps> {
    constructor(propsObj: PhoneInputProps) {
        super("div", propsObj);
    }

    render() {
        const element = compileTemplateToElement(templatePug, this.props);
        console.log('PhoneInput template', element);
        return element;
    }
}
