import {Block} from '../../core/block';
import {Props} from '../../core/types';
import {compileTemplateToElement} from '../../core/utils';
import templatePug from './404.pug';
import './404.scss';
import errorImg from '../../../static/assets/img/404.png';
import {router} from "../../index";

interface Page404Props extends Props {
	errorImgSrc: string;
}

const props: Page404Props = {
	errorImgSrc: errorImg as string,
  events: {
    click: [
      {
        id: 'goToChat',
        fn: event => {
          event.preventDefault();
          router.go('/messenger');
        },
      },
    ],
  }
};

export class Page404 extends Block<Page404Props> {
	constructor(propsObj: Page404Props = props, rootId) {
		super('main', 'page-404-block', propsObj, rootId);
	}

	render() {
		return compileTemplateToElement(templatePug, this.props);
	}

	componentDidMount() {
		const root = document.getElementById(this._meta.rootId);

		root?.appendChild(this.getContent());
	}
}
