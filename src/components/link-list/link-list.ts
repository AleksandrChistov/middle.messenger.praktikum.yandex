import {Block} from "../../core/block";
import {Events, Props} from "../../core/types";
import {compileTemplateToElement} from '../../core/utils';
import templatePug from "./link-list.pug";
import './link-list.scss';

type Item = {
    href: string;
    value: string;
}

interface LinkListProps extends Props {
    items: Item[];
    events?: Events;
}

export class LinkList extends Block<LinkListProps> {
    constructor(propsObj: LinkListProps) {
        // Создаём враппер DOM-элемент
        super("div", propsObj);
    }

    render() {
        const element = compileTemplateToElement(templatePug, this.props);
        console.log('List template', element);
        return element;
    }
}
