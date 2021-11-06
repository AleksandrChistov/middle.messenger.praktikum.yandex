import {Block} from '../../core/block';
import {compileTemplateToElement} from '../../core/utils';
import templatePug from './signup.pug';
import {SignUpPageProps, props} from './signup-service';

class SignUpPage extends Block<SignUpPageProps> {
	constructor(propsObj: SignUpPageProps) {
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

new SignUpPage(props);
