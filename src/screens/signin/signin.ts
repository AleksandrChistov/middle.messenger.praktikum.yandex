import {Block} from '../../core/block';
import {compileTemplateToElement} from '../../core/utils';
import templatePug from './signin.pug';
import './signin.scss';
import {SignInPageProps, props} from './signin-service';

export class SignInPage extends Block<SignInPageProps> {
	constructor(propsObj: SignInPageProps = props, rootId) {
		super('main', propsObj, rootId);
	}

	render() {
		return compileTemplateToElement(templatePug, this.props);
	}

	componentDidMount() {
		const root = document.getElementById(this._meta.rootId);

		root?.appendChild(this.getContent());
	}
}
