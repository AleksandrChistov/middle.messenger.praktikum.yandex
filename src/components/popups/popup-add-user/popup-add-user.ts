import {Block} from "../../../core/block";
import {Events, Props} from "../../../core/types";
import {mapStateToPropsCallBack} from "../../../store/utils";
import {compileTemplateToElement} from "../../../core/utils/compile-template";
import templatePug from "./popup-add-user.pug";
import './popup-add-user.scss';
import {SearchInputProps} from "../../inputs/search/search-input";
import {UsersListProps} from "../../found-users/users-list";


export interface PopupAddUserProps extends Props {
  isOpened: boolean;
  searchUserInput: SearchInputProps;
  usersList: UsersListProps
}

export class PopupAddUser extends Block<PopupAddUserProps> {
  constructor(propsObj: PopupAddUserProps, eventName: string, events?: Events) {
    super('div', 'popup-add-user', propsObj, events);

    this.subscribeToStoreEvent(eventName, mapStateToPropsCallBack);
  }

  render() {
    return compileTemplateToElement(templatePug, this.props, 'popupAddUserToChat', this._meta.events);
  }
}
