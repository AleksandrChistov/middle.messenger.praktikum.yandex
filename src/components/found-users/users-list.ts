import {Block} from '../../core/block';
import {compileTemplateToElement} from '../../core/utils/compile-template';
import {mapStateToPropsCallBack} from '../../store/utils';
const templatePug = require('./users-list.pug') as (locals: Props) => string;
import {Events, Props} from '../../core/types';
import {FoundUserProps} from '../found-user/types';

export interface UsersListProps extends Props {
	users: FoundUserProps[];
}

export class UsersList extends Block<UsersListProps> {
	constructor(propsObj: UsersListProps, eventName: string, events?: Events) {
		super('div', 'users-list', propsObj, events);

		this.subscribeToStoreEvent(eventName, mapStateToPropsCallBack);
	}

	render() {
		return compileTemplateToElement(templatePug, this.props, 'usersList', this._meta.events);
	}
}
