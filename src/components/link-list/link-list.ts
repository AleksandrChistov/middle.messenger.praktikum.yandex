import {Block} from '../../core/block';
import {Props} from '../../core/types';
import {compileTemplateToElement} from '../../core/utils';
import templatePug from './link-list.pug';
import './link-list.scss';

type Item = {
	href: string;
	value: string;
};

interface LinkListProps extends Props {
	items: Item[];
}

export class LinkList extends Block<LinkListProps> {
	constructor(propsObj: LinkListProps) {
		super('div', propsObj);
	}

	render() {
		return compileTemplateToElement(templatePug, this.props);
	}
}
