import {Block} from '../../core/block';
import {compileTemplateToElement} from '../../core/utils';
import templatePug from './signin.pug';
import {SignInPageProps, props} from './signin-service';

class SignInPage extends Block<SignInPageProps> {
	constructor(propsObj: SignInPageProps) {
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

new SignInPage(props);
