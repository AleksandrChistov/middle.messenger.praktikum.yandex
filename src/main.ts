import {Block} from './core/block';
import {Props} from './core/types';
import {compileTemplateToElement} from './core/utils';
import templatePug from './main.pug';
import {LinkList} from './components/link-list/link-list';

interface MainPageProps extends Props {
	title: string;
	classTitle: string;
}

const props: MainPageProps = {
	title: 'Chatly is saying hello!',
	classTitle: 'title',
	events: {
		click: [
			{
				id: 'title',
				fn: event => {
					console.log(event);
				},
			},
		],
	},
	children: {
		LinkList: new LinkList({
			items: [
				{
					href: '/src/screens/signin/signin.html',
					value: 'Sign in',
				},
				{
					href: '/src/screens/signup/signup.html',
					value: 'Sign up',
				},
				{
					href: '/src/screens/settings/settings.html',
					value: 'User settings',
				},
				{
					href: '/src/screens/chat/chat.html',
					value: 'Chat (stub)',
				},
				{
					href: '/src/screens/404/404.html',
					value: '404',
				},
				{
					href: '/src/screens/500/500.html',
					value: '500',
				},
			],
		}),
	},
};

class MainPage extends Block<MainPageProps> {
	constructor(propsObj: MainPageProps) {
		super('main', propsObj);
	}

	render() {
		const element = compileTemplateToElement(templatePug, this.props);
		console.log('Main template', element);
		return element;
	}

	componentDidMount() {
		console.log('componentDidMount', this);
		const root = document.getElementById('app');

		root?.appendChild(this.getContent());
	}
}

new MainPage(props);
