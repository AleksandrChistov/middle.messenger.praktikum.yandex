import {Block} from '../../core/block';
import {Props} from '../../core/types';
import {compileTemplateToElement} from '../../core/utils/compile-template';
import {mapStateToPropsCallBack} from '../../store/utils';
import templatePug from './chat-card.pug';
import {AvatarProps} from '../avatar/avatar';
import {TimeProps} from '../time/time';
import './chat-card.scss';

export interface ChatCardProps extends Props {
	authorName: string;
	textMessage?: string;
	messageCount?: string;
  avatar: AvatarProps;
  time: TimeProps;
}

export class ChatCard extends Block<ChatCardProps> {
  readonly eventName: string;

	constructor(propsObj: ChatCardProps, eventName: string) {
		super('div', 'chat-card-block', propsObj);

    this.subscribeToStoreEvent(eventName, mapStateToPropsCallBack);

    this.eventName = eventName;
	}

	render() {
		return compileTemplateToElement(templatePug, this.props, this.eventName);
	}
}
