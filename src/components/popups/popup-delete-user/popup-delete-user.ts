import {Block} from "../../../core/block";
import {Events, Props} from "../../../core/types";
import {mapStateToPropsCallBack} from "../../../store/utils";
import {compileTemplateToElement} from "../../../core/utils/compile-template";
import templatePug from "./popup-delete-user.pug";
import './popup-delete-user.scss';
import {UsersListProps} from "../../found-users/users-list";


export interface PopupDeleteUserProps extends Props {
  isOpened: boolean;
  usersList: UsersListProps
}

export class PopupDeleteUser extends Block<PopupDeleteUserProps> {
  constructor(propsObj: PopupDeleteUserProps, eventName: string, events?: Events) {
    super('div', 'popup-delete-user', propsObj, events);

    this.subscribeToStoreEvent(eventName, mapStateToPropsCallBack);
  }

  render() {
    return compileTemplateToElement(templatePug, this.props, 'popupDeleteUserFromChat', this._meta.events);
  }
}
