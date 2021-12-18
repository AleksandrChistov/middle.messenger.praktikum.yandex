import {Block} from '../../core/block';
import {Props} from '../../core/types';
import {compileTemplateToElement} from '../../core/utils';
import templatePug from './500.pug';
import './500.scss';
import errorImg from '../../../static/assets/img/500.png';
import {router} from "../../index";

interface Page500Props extends Props {
	errorImgSrc: string;
}

const props: Page500Props = {
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

export class Page500 extends Block<Page500Props> {
	constructor(propsObj: Page500Props = props, rootId) {
		super('main', 'page-500-block', propsObj, rootId);
	}

	render() {
		return compileTemplateToElement(templatePug, this.props);
	}

	componentDidMount() {
		const root = document.getElementById(this._meta.rootId);

		root?.appendChild(this.getContent());
	}
}
