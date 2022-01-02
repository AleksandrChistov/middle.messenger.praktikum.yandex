import {FieldName} from "../../services/form-services/form-validation-service";
import settingsImg from '../../../static/assets/icons/settings.svg';
import vertEllipsisImg from '../../../static/assets/icons/vert-ellipsis.svg';
import cartImg from '../../../static/assets/icons/cart.svg';
import {ChatPageProps} from "../../screens/chat/types";

export const CHAT_INITIAL_STATE: ChatPageProps = {
  authorName: '',
  messageFieldName: FieldName.Message,
  settingsImgSrc: settingsImg as string,
  vertEllipsisImgSrc: vertEllipsisImg as string,
  cartImgSrc: cartImg as string,
  chats: [],
  error: {
    addClass: '',
    textError: '',
  },
  search: {
    id: 'search',
    name: 'search',
    placeholder: 'Search',
  },
  chatAvatar: {
    avatarImgSrc: null,
    size: '36px',
  },
  time: {
    type: 'time-main',
    date: new Date(),
  },
  messages: [],
}
