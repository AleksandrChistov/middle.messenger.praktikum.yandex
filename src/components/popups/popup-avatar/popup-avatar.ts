import {Block} from "../../../core/block";
import {Events, Props} from "../../../core/types";
import {mapStateToPropsCallBack} from "../../../store/utils";
import {compileTemplateToElement} from "../../../core/utils/compile-template";
import templatePug from "./popup-avatar.pug";
import {FormButtonProps} from "../../form-button/form-button";
import './popup-avatar.scss';


export interface PopupAvatarProps extends Props {
  defaultImgSrc: string;
  avatarImgSrc: string | null;
  changeAvatarButton: FormButtonProps;
}

export class PopupAvatar extends Block<PopupAvatarProps> {
  constructor(propsObj: PopupAvatarProps, eventName: string, events?: Events) {
    super('div', 'popup-avatar', propsObj, events);

    this.subscribeToStoreEvent(eventName, mapStateToPropsCallBack);
  }

  render() {
    return compileTemplateToElement(templatePug, this.props, 'popupAvatar');
  }
}
