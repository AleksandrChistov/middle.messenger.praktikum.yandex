import {Block} from '../../core/block';
import {compileTemplateToElement} from "../../core/utils/compile-template";
import templatePug from './settings.pug';
import './settings.scss';
import {SettingsPageProps} from "./types";
import {SETTINGS_INITIAL_STATE} from "../../store/initialState/settings-initial-state";
import {Events} from "../../core/types";
import {settingsEvents} from "./settings-service";


export const UPDATE_USER_PROFILE = 'Update User Profile';

export class SettingsPage extends Block<SettingsPageProps> {
	constructor(propsObj: SettingsPageProps = SETTINGS_INITIAL_STATE, events: Events = settingsEvents, rootId?: string) {
		super('main', 'settings-page-block', propsObj, events, rootId);
	}

	render() {
		return compileTemplateToElement(templatePug, this.props);
	}

	componentDidMount() {
		const root = document.getElementById(this._meta.rootId);

		root?.appendChild(this.getContent());
	}
}
