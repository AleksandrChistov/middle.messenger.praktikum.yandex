import {Block} from '../../core/block';
import {compileTemplateToElement} from '../../core/utils/compile-template';
const templatePug = require('./settings.pug') as (locals: Props) => string;
import './settings.scss';
import {SettingsPageProps} from './types';
import {SETTINGS_INITIAL_STATE} from '../../store/initialState/settings-initial-state';
import {Events, Props} from '../../core/types';
import {settingsEvents} from './settings-service';
import {mapStateToPropsCallBack} from '../../store/utils';
import {UserInfoController} from '../../controllers/user-profile-controller/get-user-info-controller';
import {SETTINGS_PAGE_EVENT_NAME, UPDATE_USER_PROFILE_EVENT_NAME} from './events';

export class SettingsPage extends Block<SettingsPageProps> {
	constructor(
		propsObj: SettingsPageProps = SETTINGS_INITIAL_STATE,
		events: Events = settingsEvents,
		rootId?: string,
	) {
		super('main', 'settings-page-block', propsObj, events, rootId);

		this.subscribeToStoreEvent(UPDATE_USER_PROFILE_EVENT_NAME, mapStateToPropsCallBack);
		this.subscribeToStoreEvent(SETTINGS_PAGE_EVENT_NAME, mapStateToPropsCallBack);

		UserInfoController.getInfo()
			.catch(error => {
				console.error(error);
			});
	}

	render() {
		return compileTemplateToElement(templatePug, this.props, SETTINGS_PAGE_EVENT_NAME, this._meta.events);
	}

	componentDidMount() {
		const root = document.getElementById(this._meta.rootId || 'app');

		root?.appendChild(this.getContent());
	}
}
