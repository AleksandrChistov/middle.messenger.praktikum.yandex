import {Block} from '../../core/block';
import {Props} from '../../core/types';
import {compileTemplateToElement} from '../../core/utils/compile-template';
import {mapStateToPropsCallBack} from '../../store/utils';
import templatePug from './avatar.pug';
import './avatar.scss';

export interface AvatarProps extends Props {
	avatarImgSrc: string | null;
	size?: string;
}

export class Avatar extends Block<AvatarProps> {
	constructor(propsObj: AvatarProps, eventName: string) {
		super('div', 'avatar-block', propsObj);

    this.subscribeToStoreEvent(eventName, mapStateToPropsCallBack);
	}

	render() {
		return compileTemplateToElement(templatePug, this.props, '');
	}
}
