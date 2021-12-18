import {Block} from '../../core/block';
import {compileTemplateToElement} from '../../core/utils';
import templatePug from './signup.pug';
import {SignUpPageProps, props} from './signup-service';

export class SignUpPage extends Block<SignUpPageProps> {
	constructor(propsObj: SignUpPageProps = props, rootId) {
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
