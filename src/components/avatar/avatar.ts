import {Block} from '../../core/block';
import {Props} from '../../core/types';
import {compileTemplateToElement} from '../../core/utils/compile-template';
import templatePug from './avatar.pug';
import './avatar.scss';

export interface AvatarProps extends Props {
	avatarImgSrc: string | null;
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
