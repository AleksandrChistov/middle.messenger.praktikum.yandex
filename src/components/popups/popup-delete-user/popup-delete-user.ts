import {Block} from '../../../core/block';
import {Events, Props} from '../../../core/types';
import {mapStateToPropsCallBack} from '../../../store/utils';
import {compileTemplateToElement} from '../../../core/utils/compile-template';
const templatePug = require('./popup-delete-user.pug') as (locals: Props) => string;
import './popup-delete-user.scss';
import {UsersListProps} from '../../found-users/users-list';
import {SpinnerProps} from '../../spinner/spinner';

export interface PopupDeleteUserProps extends Props {
	isOpened: boolean;
	usersList: UsersListProps;
	spinner: SpinnerProps;
}

export class PopupDeleteUser extends Block<PopupDeleteUserProps> {
	constructor(propsObj: PopupDeleteUserProps, eventName: string, events?: Events) {
		super('div', 'popup-delete-user', propsObj, events);

		this.subscribeToStoreEvent(eventName, mapStateToPropsCallBack);
	}

	render() {
		return compileTemplateToElement(
			templatePug,
			this.props,
			'popupDeleteUserFromChat',
			this._meta.events,
		);
	}
}
