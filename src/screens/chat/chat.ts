import {Block} from '../../core/block';
import {compileTemplateToElement} from '../../core/utils';
import templatePug from './chat.pug';
import {ChatPageProps, props} from './chat-service';

class ChatPage extends Block<ChatPageProps> {
	constructor(propsObj: ChatPageProps) {
		super('main', propsObj);
	}

	render() {
		return compileTemplateToElement(templatePug, this.props);
	}

	componentDidMount() {
		const root = document.getElementById('app');

		root?.appendChild(this.getContent());
	}
}

new ChatPage(props);
