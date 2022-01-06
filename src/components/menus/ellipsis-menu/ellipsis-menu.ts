import {Block} from "../../../core/block";
import {Events, Props} from "../../../core/types";
import {mapStateToPropsCallBack} from "../../../store/utils";
import {compileTemplateToElement} from "../../../core/utils/compile-template";
import templatePug from "./ellipsis-menu.pug";
import './ellipsis-menu.scss';


export interface EllipsisMenuProps extends Props {}

export class EllipsisMenu extends Block<EllipsisMenuProps> {
  constructor(propsObj: EllipsisMenuProps, eventName: string, events?: Events) {
    super('div', 'ellipsis-menu', propsObj, events);

    this.subscribeToStoreEvent(eventName, mapStateToPropsCallBack);
  }

  render() {
    return compileTemplateToElement(templatePug, this.props, 'ellipsisMenu');
  }
}
