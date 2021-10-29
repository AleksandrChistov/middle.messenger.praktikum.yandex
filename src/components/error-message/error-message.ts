import {Block} from "../../core/block";
import {Events} from "../../core/types";
import {compileTemplate} from '../../core/utils';
import templatePug from "./error-message.pug";
import './error-message.scss';

type ErrorMessageProps = {
    textError?: string;
    addClass?: string;
    events?: Events;
}

export class ErrorMessage extends Block {
    constructor(propsObj: ErrorMessageProps) {
        // Создаём враппер DOM-элемент
        super("div", propsObj);
    }

    render() {
        const template = compileTemplate(templatePug, this.props);
        console.log('ErrorMessage template', template);
        return template;
    }
}
