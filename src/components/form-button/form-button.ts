import {Block} from "../../core/block";
import {Events} from "../../core/types";
import {compileTemplate} from '../../core/utils';
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
        const template = compileTemplate(templatePug, this.props);
        console.log('FormButton template', template);
        return template;
    }
}
