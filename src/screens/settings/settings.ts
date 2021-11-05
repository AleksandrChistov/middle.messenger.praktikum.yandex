import {Block} from '../../core/block';
import {compileTemplateToElement} from '../../core/utils';
import templatePug from './settings.pug';
import {props, SettingsPageProps} from './settings-service';

class SettingsPage extends Block<SettingsPageProps> {
	constructor(propsObj: SettingsPageProps) {
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

new SettingsPage(props);
