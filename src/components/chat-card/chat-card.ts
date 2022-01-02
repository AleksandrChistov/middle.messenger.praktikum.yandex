import {Block} from '../../core/block';
import {Props} from '../../core/types';
import {compileTemplateToElement} from '../../core/utils/compile-template';
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
	constructor(propsObj: ChatCardProps) {
		super('div', 'chat-card-block', propsObj);
	}

	render() {
		return compileTemplateToElement(templatePug, this.props);
	}
}
