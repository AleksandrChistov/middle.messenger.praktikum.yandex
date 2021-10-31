import {Block} from "../../core/block";
import {Events, Props} from "../../core/types";
import {compileTemplateToElement} from '../../core/utils';
import templatePug from "./error-message.pug";
import './error-message.scss';

interface ErrorMessageProps extends Props {
    textError?: string;
    addClass?: string;
    events?: Events;
}

export class ErrorMessage extends Block<ErrorMessageProps> {
    constructor(propsObj: ErrorMessageProps) {
        super("div", propsObj);
    }

    render() {
        const element = compileTemplateToElement(templatePug, this.props);
        console.log('ErrorMessage template', element);
        return element;
    }
}
