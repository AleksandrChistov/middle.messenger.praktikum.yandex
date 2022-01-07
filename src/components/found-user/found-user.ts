import {Block} from '../../core/block';
import {compileTemplateToElement} from '../../core/utils/compile-template';
import {mapStateToPropsCallBack} from '../../store/utils';
import templatePug from './found-user.pug';
import './found-user.scss';
import {FoundUserProps} from "./types";


export class FoundUser extends Block<FoundUserProps> {
	constructor(propsObj: FoundUserProps, eventName: string) {
		super('div', 'found-user', propsObj);

    this.subscribeToStoreEvent(eventName, mapStateToPropsCallBack);
	}

	render() {
		return compileTemplateToElement(templatePug, this.props, 'usersList');
	}
}
