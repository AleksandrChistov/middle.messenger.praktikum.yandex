import {Block} from '../../core/block';
import {compileTemplateToElement} from "../../core/utils/compile-template";
import templatePug from './chat.pug';
import './chat.scss';
import {ChatPageProps} from "./types";
import {CHAT_INITIAL_STATE} from "../../store/initialState/chat-initial-state";
import {Events} from "../../core/types";
import {chatEvents} from "./chat-service";
import {CHAT_PAGE_EVENT_NAME} from "./events";
import {mapStateToPropsCallBack} from "../../store/utils";
import {GetChatsController} from "../../controllers/chat-controllers/get-chats-controller";


export class ChatPage extends Block<ChatPageProps> {
	constructor(propsObj: ChatPageProps = CHAT_INITIAL_STATE, events: Events = chatEvents, rootId?: string) {
		super('main', 'chat-page-block', propsObj, events, rootId);

    this.subscribeToStoreEvent(CHAT_PAGE_EVENT_NAME, mapStateToPropsCallBack);

    GetChatsController.get();
  }

	render() {
		return compileTemplateToElement(templatePug, this.props, CHAT_PAGE_EVENT_NAME);
	}

	componentDidMount() {
		const root = document.getElementById(this._meta.rootId || 'app');

		root?.appendChild(this.getContent());
	}
}
