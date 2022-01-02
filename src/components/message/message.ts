import {Block} from '../../core/block';
import {Props} from '../../core/types';
import {compileTemplateToElement} from '../../core/utils/compile-template';
import templatePug from './message.pug';
import {AvatarProps} from '../avatar/avatar';
import {TimeProps} from '../time/time';
import './message.scss';

export interface MessageProps extends Props {
	you: boolean;
	text: string;
  avatar: AvatarProps;
  time: TimeProps;
}

export class Message extends Block<MessageProps> {
	constructor(propsObj: MessageProps) {
		super('div', 'message-block', propsObj);
	}

	render() {
		return compileTemplateToElement(templatePug, this.props);
	}
}
