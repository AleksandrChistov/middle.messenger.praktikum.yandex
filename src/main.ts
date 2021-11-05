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
	children: {
		linkListComponent: new LinkList({
			items: [
				{
					href: '/src/screens/signin',
					value: 'Sign in',
				},
				{
					href: '/src/screens/signup',
					value: 'Sign up',
				},
				{
					href: '/src/screens/settings',
					value: 'User settings',
				},
				{
					href: '/src/screens/chat',
					value: 'Chat (stub)',
				},
				{
					href: '/src/screens/404',
					value: '404',
				},
				{
					href: '/src/screens/500',
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
		return compileTemplateToElement(templatePug, this.props);
	}

	componentDidMount() {
		const root = document.getElementById('app');

		root?.appendChild(this.getContent());
	}
}

new MainPage(props);
