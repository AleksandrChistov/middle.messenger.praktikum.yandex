import {Block} from "../../core/block";
import {Props} from "../../core/types";
import {compileTemplate} from '../../core/utils';
import templatePug from "./link-list.pug";
import './link-list.scss';

export class LinkList extends Block {
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
