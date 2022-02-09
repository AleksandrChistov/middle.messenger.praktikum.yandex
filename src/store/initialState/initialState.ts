import {CHAT_INITIAL_STATE} from './chat-initial-state';
import {SIGNIN_INITIAL_STATE} from './signin-initial-state';
import {SIGNUP_INITIAL_STATE} from './signup-initial-state';
import {SETTINGS_INITIAL_STATE} from './settings-initial-state';
import {PAGE_500_INITIAL_STATE} from './500-initial-state';
import {PAGE_404_INITIAL_STATE} from './400-initial-state';
import {State} from '../types';

export const INITIAL_STATE: State = {
	chatPage: CHAT_INITIAL_STATE,
	signInPage: SIGNIN_INITIAL_STATE,
	signUpPage: SIGNUP_INITIAL_STATE,
	settingsPage: SETTINGS_INITIAL_STATE,
	page500: PAGE_500_INITIAL_STATE,
	page404: PAGE_404_INITIAL_STATE,
};
