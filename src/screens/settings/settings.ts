import {Block} from '../../core/block';
import {compileTemplateToElement} from '../../core/utils/compile-template';
import templatePug from './settings.pug';
import './settings.scss';
import {SettingsPageProps} from './types';
import {SETTINGS_INITIAL_STATE} from '../../store/initialState/settings-initial-state';
import {Events} from '../../core/types';
import {settingsEvents} from './settings-service';
import {mapStateToPropsCallBack} from '../../store/utils';
import {UserInfoController} from '../../controllers/user-profile-controller/get-user-info-controller';


export const UPDATE_USER_PROFILE = 'Update User Profile';

export class SettingsPage extends Block<SettingsPageProps> {
	constructor(propsObj: SettingsPageProps = SETTINGS_INITIAL_STATE, events: Events = settingsEvents, rootId?: string) {
		super('main', 'settings-page-block', propsObj, events, rootId);

    this.subscribeToStoreEvent(UPDATE_USER_PROFILE, mapStateToPropsCallBack.bind(this));

    UserInfoController.getInfo();
	}

	render() {
		return compileTemplateToElement(templatePug, this.props);
	}

	componentDidMount() {
		const root = document.getElementById(this._meta.rootId);

		root?.appendChild(this.getContent());
	}
}
