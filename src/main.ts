import {Block} from './core/block';
import {Props} from "./core/types";
import {compileTemplate} from './core/utils';
import templatePug from './main.pug';
import {linkListComponent} from './components/link-list/link-list';

const props: Props = {
    title: 'Chatly is saying hello!',
    classTitle: 'title',
    events: {
        click: [
            {
                id: "title",
                fn: event => {
                    console.log(event);
                }
            }
        ],
    },
    children: {
        LinkList: linkListComponent,
    }
}

class Main extends Block {
    constructor(propsObj: Props) {
        // Создаём враппер DOM-элемент button
        super("main", propsObj);
    }

    render() {
        const template = compileTemplate(templatePug, this.props);
        console.log('Main template', template);
        return template;
    }

    componentDidMount() {
        console.log('componentDidMount', this);
        const root = document.getElementById('app');

        root.appendChild(this.getContent());
    }
}

const main = new Main(props);

setTimeout(() => {
    main.setProps({
        title: 'New Title!',
        classTitle: 'some other class'
    })
}, 4000);
