import {Block} from '../../core/block';
import {compileTemplateToElement} from '../../core/utils/compile-template';
const templatePug = require('./signin.pug') as (locals: Props) => string;
import './signin.scss';
import {SIGNIN_INITIAL_STATE} from '../../store/initialState/signin-initial-state';
import {Events, Props} from '../../core/types';
import {SignInPageProps} from './types';
import {signinEvents} from './signin-service';
import {SIGNIN_PAGE_EVENT_NAME} from './events';

export class SignInPage extends Block<SignInPageProps> {
	constructor(propsObj: SignInPageProps = SIGNIN_INITIAL_STATE, events: Events = signinEvents, rootId?: string) {
		super('main', 'signin-page-block', propsObj, events, rootId);
	}

	render() {
		return compileTemplateToElement(templatePug, this.props, SIGNIN_PAGE_EVENT_NAME, this._meta.events);
	}

	componentDidMount() {
		const root = document.getElementById(this._meta.rootId || 'app');

		root?.appendChild(this.getContent());
	}
}
