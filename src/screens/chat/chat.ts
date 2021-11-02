import {Block} from '../../core/block';
import {compileTemplateToElement} from '../../core/utils';
import templatePug from './chat.pug';
import {ChatPageProps, props} from "./chat-service";

class ChatPage extends Block<ChatPageProps> {
    constructor(propsObj: ChatPageProps) {
        super("main", propsObj);
    }

    render() {
        const element = compileTemplateToElement(templatePug, this.props);
        console.log('Chat template', element);
        return element;
    }

    componentDidMount() {
        console.log('componentDidMount', this);
        const root = document.getElementById('app');

        root.appendChild(this.getContent());
    }
}

new ChatPage(props);
