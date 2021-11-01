import {Block} from "../../core/block";
import {Props} from "../../core/types";
import {compileTemplateToElement} from '../../core/utils';
import templatePug from "./message.pug";
import {Avatar} from "../avatar/avatar";
import {Time} from "../time/time";
import './message.scss';

interface MessageProps extends Props {
    you: boolean;
    text: string;
    children: {
        Avatar: InstanceType<typeof Avatar>;
        Time: InstanceType<typeof Time>;
    }
}

export class Message extends Block<MessageProps> {
    constructor(propsObj: MessageProps) {
        super("div", propsObj);
    }

    render() {
        const element = compileTemplateToElement(templatePug, this.props);
        console.log('Message template', element);
        return element;
    }
}
