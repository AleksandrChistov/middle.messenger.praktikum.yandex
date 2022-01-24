import {Block} from '../../core/block';
import {Events, Props} from '../../core/types';
import {compileTemplateToElement} from '../../core/utils/compile-template';
import {mapStateToPropsCallBack} from '../../store/utils';
const templatePug = require('./avatar.pug');
import './avatar.scss';

export interface AvatarProps extends Props {
	avatarImgSrc: string | null;
	size?: string;
}

export class Avatar extends Block<AvatarProps> {
	constructor(propsObj: AvatarProps, eventName: string, events?: Events) {
		super('div', 'avatar-block', propsObj, events);

    this.subscribeToStoreEvent(eventName, mapStateToPropsCallBack);
	}

	render() {
		return compileTemplateToElement(templatePug, this.props, '', this._meta.events);
	}
}
