import {Block} from '../../core/block';
import {compileTemplateToElement} from '../../core/utils';
import templatePug from './settings.pug';
import './settings.scss';
import {props, SettingsPageProps} from './settings-service';

export class SettingsPage extends Block<SettingsPageProps> {
	constructor(propsObj: SettingsPageProps = props, rootId) {
		super('main', propsObj, rootId);
	}

	render() {
		return compileTemplateToElement(templatePug, this.props);
	}

	componentDidMount() {
		const root = document.getElementById(this._meta.rootId);

		root?.appendChild(this.getContent());
	}
}
