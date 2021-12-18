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
		super('div', 'avatar-block', propsObj);
	}

	render() {
		return compileTemplateToElement(templatePug, this.props);
	}
}
