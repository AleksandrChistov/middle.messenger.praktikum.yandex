import {Block} from '../../core/block';
import {Events, Props} from '../../core/types';
import {compileTemplateToElement} from '../../core/utils/compile-template';
import {mapStateToPropsCallBack} from '../../store/utils';
const templatePug = require('./message.pug');
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
	constructor(propsObj: MessageProps, eventName: string, events?: Events) {
		super('div', 'message-block', propsObj, events);

    this.subscribeToStoreEvent(eventName, mapStateToPropsCallBack);
	}

	render() {
		return compileTemplateToElement(templatePug, this.props, 'message', this._meta.events);
	}

  componentDidMount() {
    setTimeout(scrollBottom, 0);
  }
}

function scrollBottom(): void {
  const chatsContainerElement = document.querySelector('.chat') as HTMLElement;

  if (!chatsContainerElement) {
    return;
  }

  chatsContainerElement.scrollTop = chatsContainerElement.scrollHeight;
}
