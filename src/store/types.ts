import {ChatPageProps} from '../screens/chat/types';
import {SignInPageProps} from '../screens/signin/types';
import {SignUpPageProps} from '../screens/signup/types';
import {SettingsPageProps} from '../screens/settings/types';
import {Page500Props} from '../screens/500/types';
import {Page404Props} from '../screens/404/types';

export type State = {
	chatPage: ChatPageProps;
	signInPage: SignInPageProps;
	signUpPage: SignUpPageProps;
	settingsPage: SettingsPageProps;
	page500: Page500Props;
	page404: Page404Props;
};
