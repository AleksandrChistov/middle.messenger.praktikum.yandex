import {Block} from '../../core/block';
import {Props} from '../../core/types';
import {compileTemplateToElement} from '../../core/utils';
import templatePug from './chat-card.pug';
import {Avatar} from '../avatar/avatar';
import {Time} from '../time/time';
import './chat-card.scss';

interface ChatCardProps extends Props {
	authorName: string;
	textMessage?: string;
	messageCount?: string;
	children: {
		avatarComponent: InstanceType<typeof Avatar>;
		timeComponent: InstanceType<typeof Time>;
	};
}

export class ChatCard extends Block<ChatCardProps> {
	constructor(propsObj: ChatCardProps) {
		super('div', 'chat-card-block', propsObj);
	}

	render() {
		return compileTemplateToElement(templatePug, this.props);
	}
}
