import {Block} from "../../../core/block";
import {Events, Props} from "../../../core/types";
import {mapStateToPropsCallBack} from "../../../store/utils";
import {compileTemplateToElement} from "../../../core/utils/compile-template";
import templatePug from "./popup-add-user.pug";
import './popup-add-user.scss';
import {SearchInputProps} from "../../inputs/search/search-input";
import {FoundUserProps} from "../../found-user/types";


export interface PopupAddUserProps extends Props {
  searchUserInput: SearchInputProps;
  usersList: FoundUserProps[] | []
}

export class PopupAddUser extends Block<PopupAddUserProps> {
  constructor(propsObj: PopupAddUserProps, eventName: string, events?: Events) {
    super('div', 'popup-add-user', propsObj, events);

    this.subscribeToStoreEvent(eventName, mapStateToPropsCallBack);
  }

  render() {
    return compileTemplateToElement(templatePug, this.props, 'popupAddUserToChat');
  }

  componentDidMount() {
    setTimeout(() => setFocusToElement(this.element, this.props as PopupAddUserProps), 0);
  }
}

function setFocusToElement(element: HTMLElement, props: PopupAddUserProps): void {
  const searchElement = element.querySelector('.input-container__search-field') as HTMLInputElement;

  if (!searchElement) {
    return;
  }

  if (props.searchUserInput.autofocusOn) {
    const textLength = searchElement.value.length;

    searchElement.focus();

    searchElement.setSelectionRange(textLength, textLength);
  }
}
