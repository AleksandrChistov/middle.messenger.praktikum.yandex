import {Block} from "../../../core/block";
import {Events, Props} from "../../../core/types";
import {mapStateToPropsCallBack} from "../../../store/utils";
import {compileTemplateToElement} from "../../../core/utils/compile-template";
import templatePug from "./popup-add-user.pug";
import {FormButtonProps} from "../../form-button/form-button";
import {TextInputProps} from "../../inputs/text/text-input";
import './popup-add-user.scss';


export interface PopupAddUserProps extends Props {
  userIdInput: TextInputProps;
  addUserToChatButton: FormButtonProps;
}

export class PopupAddUser extends Block<PopupAddUserProps> {
  constructor(propsObj: PopupAddUserProps, eventName: string, events?: Events) {
    super('div', 'popup-add-user', propsObj, events);

    this.subscribeToStoreEvent(eventName, mapStateToPropsCallBack);
  }

  render() {
    return compileTemplateToElement(templatePug, this.props, 'popupAddUserToChat');
  }
}
