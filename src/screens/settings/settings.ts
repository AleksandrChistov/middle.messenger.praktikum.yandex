import {Block} from '../../core/block';
import {compileTemplateToElement} from '../../core/utils';
import templatePug from './settings.pug';
import {props, SettingsPageProps} from './settings-service';

class SettingsPage extends Block<SettingsPageProps> {
	constructor(propsObj: SettingsPageProps) {
		super('main', propsObj);
	}

	render() {
		const element = compileTemplateToElement(templatePug, this.props);
		console.log('SettingsPage template', element);
		return element;
	}

	componentDidMount() {
		console.log('componentDidMount', this);
		const root = document.getElementById('app');

		root?.appendChild(this.getContent());
	}
}

new SettingsPage(props);
