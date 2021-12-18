import {Block} from '../../core/block';
import {compileTemplateToElement} from '../../core/utils';
import templatePug from './chat.pug';
import './chat.scss';
import {ChatPageProps, props} from './chat-service';

export class ChatPage extends Block<ChatPageProps> {
	constructor(propsObj: ChatPageProps = props, rootId) {
		super('main', 'chat-page-block', propsObj, rootId);
	}

	render() {
		return compileTemplateToElement(templatePug, this.props);
	}

	componentDidMount() {
		const root = document.getElementById(this._meta.rootId);

		root?.appendChild(this.getContent());
	}
}
