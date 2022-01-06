import {Props} from "../../core/types";
import {FieldName} from "../../services/form-services/form-validation-service";
import {ErrorMessageProps} from "../../components/error-message/error-message";
import {SearchInputProps} from "../../components/inputs/search/search-input";
import {AvatarProps} from "../../components/avatar/avatar";
import {TimeProps} from "../../components/time/time";
import {MessageProps} from "../../components/message/message";
import {ChatCardProps} from "../../components/chat-card/chat-card";
import {PopupCreateChatProps} from "../../components/popups/popup-create-chat/popup-create-chat";

export interface ChatPageProps extends Props {
  authorName?: string | null;
  messageFieldName?: FieldName;
  settingsImgSrc?: string | null;
  vertEllipsisImgSrc?: string | null;
  cartImgSrc?: string | null;
  createChatPopupIsOpened: boolean,
  chats: ChatCardProps[] | [];
  error?: ErrorMessageProps,
  search?: SearchInputProps,
  chatAvatar?: AvatarProps,
  time?: TimeProps,
  messages: MessageProps[] | [],
  popupCreateChat: PopupCreateChatProps,
}
