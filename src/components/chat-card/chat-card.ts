import {Block} from '../../core/block';
import {Events, Props} from '../../core/types';
import {compileTemplateToElement} from '../../core/utils/compile-template';
import {mapStateToPropsCallBack} from '../../store/utils';
const templatePug =  require('./chat-card.pug');
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

	constructor(propsObj: ChatCardProps, eventName: string, events?: Events) {
		super('div', 'chat-card-block', propsObj, events);

    this.subscribeToStoreEvent(eventName, mapStateToPropsCallBack);

    this.eventName = eventName;
	}

	render() {
		return compileTemplateToElement(templatePug, this.props, this.eventName, this._meta.events);
	}
}
