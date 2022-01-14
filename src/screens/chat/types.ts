import {Props} from "../../core/types";
import {FieldName} from "../../services/form-services/form-validation-service";
import {ErrorMessageProps} from "../../components/error-message/error-message";
import {SearchInputProps} from "../../components/inputs/search/search-input";
import {AvatarProps} from "../../components/avatar/avatar";
import {MessageProps} from "../../components/message/message";
import {ChatCardProps} from "../../components/chat-card/chat-card";
import {PopupCreateChatProps} from "../../components/popups/popup-create-chat/popup-create-chat";
import {TimeProps} from "../../components/time/types";
import {EllipsisMenuProps} from "../../components/menus/ellipsis-menu/ellipsis-menu";
import {PopupAddUserProps} from "../../components/popups/popup-add-user/popup-add-user";
import {PopupDeleteUserProps} from "../../components/popups/popup-delete-user/popup-delete-user";
import {ChatsListProps} from "../../components/chat-list/chats-list";

export interface ChatPageProps extends Props {
  chatName?: string | null;
  messageFieldName?: FieldName;
  settingsImgSrc?: string | null;
  vertEllipsisImgSrc?: string | null;
  cartImgSrc?: string | null;
  selectedChat: ChatCardProps | null;
  chatsList: ChatsListProps;
  error?: ErrorMessageProps,
  search?: SearchInputProps,
  chatAvatar?: AvatarProps,
  time: TimeProps | null,
  messages: MessageProps[] | [],
  ellipsisMenu: EllipsisMenuProps,
  popupCreateChat: PopupCreateChatProps,
  popupAddUserToChat: PopupAddUserProps,
  popupDeleteUserFromChat: PopupDeleteUserProps,
}
