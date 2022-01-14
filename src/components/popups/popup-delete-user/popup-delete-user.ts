import {Block} from "../../../core/block";
import {Events, Props} from "../../../core/types";
import {mapStateToPropsCallBack} from "../../../store/utils";
import {compileTemplateToElement} from "../../../core/utils/compile-template";
import {FoundUserProps} from "../../found-user/types";
import templatePug from "./popup-delete-user.pug";
import './popup-delete-user.scss';


export interface PopupDeleteUserProps extends Props {
  isOpened: boolean;
  usersList: FoundUserProps[] | []
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
