import {Block} from '../../core/block';
import {Props} from '../../core/types';
import {compileTemplateToElement} from '../../core/utils/compile-template';
import {mapStateToPropsCallBack} from '../../store/utils';
import templatePug from './message.pug';
import {AvatarProps} from '../avatar/avatar';
import {TimeProps} from '../time/types';
import './message.scss';

export interface MessageProps extends Props {
	you: boolean;
	text: string;
  avatar: AvatarProps;
  time: TimeProps;
}

export class Message extends Block<MessageProps> {
  readonly eventName: string;

	constructor(propsObj: MessageProps, eventName: string) {
		super('div', 'message-block', propsObj);

    this.subscribeToStoreEvent(eventName, mapStateToPropsCallBack);

    this.eventName = eventName;
	}

	render() {
		return compileTemplateToElement(templatePug, this.props, this.eventName);
	}
}
