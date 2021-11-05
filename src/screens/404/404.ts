import {Block} from '../../core/block';
import {Props} from '../../core/types';
import {compileTemplateToElement} from '../../core/utils';
import templatePug from './404.pug';
import errorImg from '../../../static/assets/img/404.png';

interface Page404Props extends Props {
	errorImgSrc: string;
}

const props: Page404Props = {
	errorImgSrc: errorImg as string,
};

class Page404 extends Block<Page404Props> {
	constructor(propsObj: Page404Props) {
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

new Page404(props);
