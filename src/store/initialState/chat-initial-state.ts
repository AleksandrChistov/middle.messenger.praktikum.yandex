import {FieldName} from "../../services/form-services/form-validation-service";
import settingsImg from '../../../static/assets/icons/settings.svg';
import vertEllipsisImg from '../../../static/assets/icons/vert-ellipsis.svg';
import cartImg from '../../../static/assets/icons/cart.svg';
import {ChatPageProps} from "../../screens/chat/types";
import avatarImg from "../../../static/assets/icons/avatar.svg";

export const CHAT_INITIAL_STATE: ChatPageProps = {
  chatName: '',
  messageFieldName: FieldName.Message,
  settingsImgSrc: settingsImg as string,
  vertEllipsisImgSrc: vertEllipsisImg as string,
  cartImgSrc: cartImg as string,
  ellipsisMenuIsOpened: false,
  createChatPopupIsOpened: false,
  addUserToChatPopupIsOpened: false,
  selectedChat: null,
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
  time: null,
  messages: [],
  ellipsisMenu: {},
  popupCreateChat: {
    defaultChatAvatarSrc: avatarImg,
    chatAvatarSrc: null,
    nameChatInput: {
      label: 'Chat name',
      id: 'chat_name',
      name: 'chat_name',
      inputClass: 'mb-15',
      required: true,
    },
    createChatButton: {
      type: 'submit',
      text: 'Create new chat',
    },
  },
  popupAddUserToChat: {
    userIdInput: {
      label: 'User ids',
      id: 'user_ids',
      name: 'user-ids',
      placeholder: 'Type user IDs separated by commas',
      inputClass: 'mb-15',
      required: true,
    },
    addUserToChatButton: {
      type: 'submit',
      text: 'Add users',
    },
  }
}
