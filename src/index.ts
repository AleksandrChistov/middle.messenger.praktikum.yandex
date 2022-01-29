import {Router} from './core/routing/router';
import {SignInPage} from './screens/signin/signin';
import {SignUpPage} from './screens/signup/signup';
import {SettingsPage} from './screens/settings/settings';
import {ChatPage} from './screens/chat/chat';
import {Page404} from './screens/404/404';
import {Page500} from './screens/500/500';
import '../static/main.scss';

export const router = new Router('app');

router
	.use('/', SignInPage)
	.use('/sign-up', SignUpPage)
	.use('/settings', SettingsPage)
	.use('/messenger', ChatPage)
	.use('/500', Page500)
	.setAvailableUrl('/sign-up')
	.setFallBack('/404', Page404)
	.start();

