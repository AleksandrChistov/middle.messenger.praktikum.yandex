import {FieldName} from '../../services/form-services/form-validation-service';
import settingsImg from '../../../static/assets/icons/settings.svg';
import vertEllipsisImg from '../../../static/assets/icons/vert-ellipsis.svg';
import cartImg from '../../../static/assets/icons/cart.svg';
import {ChatPageProps} from '../../screens/chat/types';
import avatarImg from '../../../static/assets/icons/avatar.svg';

export const CHAT_INITIAL_STATE: ChatPageProps = {
	chatName: '',
	messageFieldName: FieldName.Message,
	settingsImgSrc: settingsImg,
	vertEllipsisImgSrc: vertEllipsisImg,
	cartImgSrc: cartImg,
	selectedChat: null,
	chatsList: {
		chats: [],
	},
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
	messagesList: {
		messages: [],
	},
	ellipsisMenu: {
		isOpened: false,
	},
	popupCreateChat: {
		isOpened: false,
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
		isOpened: false,
		searchUserInput: {
			id: 'user_login',
			name: 'user_login',
			placeholder: 'Search by user login',
			autofocusOn: true,
		},
		usersList: {
			users: [],
		},
	},
	popupDeleteUserFromChat: {
		isOpened: false,
		usersList: {
			users: [],
		},
		spinner: {
			isLoading: false,
		},
	},
};
