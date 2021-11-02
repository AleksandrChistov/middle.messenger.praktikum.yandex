import {Block} from '../../core/block';
import {Props} from '../../core/types';
import {compileTemplateToElement} from '../../core/utils';
import templatePug from './500.pug';
import errorImg from '../../../static/assets/img/500.png';

interface Page500Props extends Props {
	errorImgSrc: string;
}

const props: Page500Props = {
	errorImgSrc: errorImg,
};

class Page500 extends Block<Page500Props> {
	constructor(propsObj: Page500Props) {
		super('main', propsObj);
	}

	render() {
		const element = compileTemplateToElement(templatePug, this.props);
		console.log('500 template', element);
		return element;
	}

	componentDidMount() {
		console.log('componentDidMount', this);
		const root = document.getElementById('app');

		root?.appendChild(this.getContent());
	}
}

new Page500(props);