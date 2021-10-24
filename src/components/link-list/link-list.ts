import {Block} from "../../core/block";
import {Props} from "../../core/types";
import {compileTemplate} from '../../core/utils';
import templatePug from "./link-list.pug";
import './link-list.scss';

const props: Props = {
    items: [
        {
            href: '/src/screens/signin/signin.pug',
            value: 'Sign in'
        },
        {
            href: '/src/screens/signup/signup.pug',
            value: 'Sign up'
        },
        {
            href: '/src/screens/settings/settings.pug',
            value: 'User settings'
        },
        {
            href: '/src/screens/chat/chat.pug',
            value: 'Chat (stub)'
        },
        {
            href: '/src/screens/404/404.pug',
            value: '404'
        },
        {
            href: '/src/screens/500/500.pug',
            value: '500'
        }
    ]
}

class LinkList extends Block {
    constructor(propsObj: Props) {
        // Создаём враппер DOM-элемент
        super("div", propsObj);
    }

    render() {
        const template = compileTemplate(templatePug, this.props);
        console.log('List template', template);
        return template;
    }
}

export const linkListComponent = new LinkList(props);
