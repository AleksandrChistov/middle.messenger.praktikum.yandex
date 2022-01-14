import {Block} from '../../core/block';
import {compileTemplateToElement} from '../../core/utils/compile-template';
import templatePug from './signup.pug';
import './signup.scss';
import {SIGNUP_INITIAL_STATE} from '../../store/initialState/signup-initial-state';
import {SignUpPageProps} from './types';
import {Events} from '../../core/types';
import {signupEvents} from './signup-service';
import {SIGNUP_PAGE_EVENT_NAME} from "./events";


export class SignUpPage extends Block<SignUpPageProps> {
	constructor(propsObj: SignUpPageProps = SIGNUP_INITIAL_STATE, events: Events = signupEvents, rootId?: string) {
		super('main', 'signup-page-block', propsObj, events, rootId);
  }

	render() {
		return compileTemplateToElement(templatePug, this.props, SIGNUP_PAGE_EVENT_NAME, this._meta.events);
	}

	componentDidMount() {
		const root = document.getElementById(this._meta.rootId || 'app');

		root?.appendChild(this.getContent());
	}
}
