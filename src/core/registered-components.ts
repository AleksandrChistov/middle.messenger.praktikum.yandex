import {ChatCard} from '../components/chat-card/chat-card';
import {ChatsList} from '../components/chat-list/chats-list';
import {SearchInput} from '../components/inputs/search/search-input';
import {Avatar} from '../components/avatar/avatar';
import {Time} from '../components/time/time';
import {Message} from '../components/message/message';
import {MessagesList} from '../components/messages-list/messages-list';
import {ErrorMessage} from '../components/error-message/error-message';
import {TextInput} from '../components/inputs/text/text-input';
import {PasswordInput} from '../components/inputs/password/password-input';
import {FormButton} from '../components/form-button/form-button';
import {EmailInput} from '../components/inputs/email/email-input';
import {PhoneInput} from '../components/inputs/phone/phone-input';
import {PopupAvatar} from '../components/popups/popup-avatar/popup-avatar';
import {PopupCreateChat} from '../components/popups/popup-create-chat/popup-create-chat';
import {EllipsisMenu} from '../components/menus/ellipsis-menu/ellipsis-menu';
import {PopupAddUser} from '../components/popups/popup-add-user/popup-add-user';
import {FoundUser} from '../components/found-user/found-user';
import {UsersList} from '../components/found-users/users-list';
import {PopupDeleteUser} from '../components/popups/popup-delete-user/popup-delete-user';
import {RegisteredComponents} from './types';

export const REGISTERED_COMPONENTS: RegisteredComponents = {
	TextInputComponent: TextInput,
	EmailInputComponent: EmailInput,
	PasswordInputComponent: PasswordInput,
	PhoneInputComponent: PhoneInput,
	SearchInputComponent: SearchInput,
	FormButtonComponent: FormButton,
	ErrorMessageComponent: ErrorMessage,
	ChatCardComponent: ChatCard,
	ChatsListComponent: ChatsList,
	AvatarComponent: Avatar,
	TimeComponent: Time,
	MessageComponent: Message,
	MessagesListComponent: MessagesList,
	PopupAvatarComponent: PopupAvatar,
	EllipsisMenuComponent: EllipsisMenu,
	PopupCreateChatComponent: PopupCreateChat,
	PopupAddUserToChatComponent: PopupAddUser,
	PopupDeleteUserFromChatComponent: PopupDeleteUser,
	FoundUserComponent: FoundUser,
	UsersListComponent: UsersList,
};
