import {Block} from '../../core/block';
import {compileTemplateToElement} from "../../core/utils/compile-template";
import templatePug from './chat.pug';
import './chat.scss';
import {ChatPageProps} from "./types";
import {CHAT_INITIAL_STATE} from "../../store/initialState/chat-initial-state";
import {Events} from "../../core/types";
import {chatEvents} from "./chat-service";


export class ChatPage extends Block<ChatPageProps> {
	constructor(propsObj: ChatPageProps = CHAT_INITIAL_STATE, events: Events = chatEvents, rootId?: string) {
		super('main', 'chat-page-block', propsObj, events, rootId);
	}

	render() {
		return compileTemplateToElement(templatePug, this.props);
	}

	componentDidMount() {
		const root = document.getElementById(this._meta.rootId);

		root?.appendChild(this.getContent());
	}
}
