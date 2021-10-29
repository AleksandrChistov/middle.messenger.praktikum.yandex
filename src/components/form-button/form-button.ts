import {Block} from "../../core/block";
import {Events} from "../../core/types";
import {compileTemplateToElement} from '../../core/utils';
import templatePug from "./form-button.pug";
import './form-button.scss';

type FormButtonProps = {
    type?: string;
    text?: string;
    addClass?: string;
    events?: Events;
}

export class FormButton extends Block {
    constructor(propsObj: FormButtonProps) {
        // Создаём враппер DOM-элемент
        super("div", propsObj);
    }

    render() {
        const element = compileTemplateToElement(templatePug, this.props);
        console.log('FormButton template', element);
        return element;
    }
}
