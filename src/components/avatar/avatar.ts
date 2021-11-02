import {Block} from '../../core/block';
import {Props} from '../../core/types';
import {compileTemplateToElement} from '../../core/utils';
import templatePug from './avatar.pug';
import './avatar.scss';

interface AvatarProps extends Props {
	avatarImgSrc?: string;
	size?: string;
}

export class Avatar extends Block<AvatarProps> {
	constructor(propsObj: AvatarProps) {
		super('div', propsObj);
	}

	render() {
		const element = compileTemplateToElement(templatePug, this.props);
		console.log('Avatar template', element);
		return element;
	}
}
