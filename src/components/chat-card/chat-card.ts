import {Block} from '../../core/block';
import {Props} from '../../core/types';
import {compileTemplateToElement} from '../../core/utils/compile-template';
import {mapStateToPropsCallBack} from '../../store/utils';
import templatePug from './chat-card.pug';
import {AvatarProps} from '../avatar/avatar';
import {TimeProps} from '../time/types';
import './chat-card.scss';

export interface ChatCardProps extends Props {
  chatName: string;
	textMessage?: string;
  unreadMessageCount?: number;
  avatar: AvatarProps;
  time: TimeProps | null;
  active: boolean;
  id: number;
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
