import {Props} from '../../core/types';
import {FormServiceAbstract} from '../../services/form-service-abstract';
import {FieldName, HandleFormService} from '../../services/form-service';
import settingsImg from '../../../static/assets/icons/settings.svg';
import vertEllipsisImg from '../../../static/assets/icons/vert-ellipsis.svg';
import cartImg from '../../../static/assets/icons/cart.svg';
import avatarImg1 from '../../../static/assets/img/avatar1.png';
import avatarImg2 from '../../../static/assets/img/avatar2.png';
import {ErrorMessage} from '../../components/error-message/error-message';
import {SearchInput} from '../../components/inputs/search/search-input';
import {ChatCard} from '../../components/chat-card/chat-card';
import {Avatar} from '../../components/avatar/avatar';
import {Time} from '../../components/time/time';
import {Message} from '../../components/message/message';

export interface ChatPageProps extends Props {
	authorName: string;
  messageFieldName: string;
	settingsImgSrc: string;
	vertEllipsisImgSrc: string;
	cartImgSrc: string;
}

class ChatService extends FormServiceAbstract {
	public props: ChatPageProps;

	constructor() {
		super();
		this.props = getProps(this.handleFormService);
	}

	protected showError(errorMessage: string): void {
		this.props.children?.errorMessageComponent.setProps({
			textError: errorMessage,
			addClass: errorMessage ? 'error-text--display' : '',
		});
	}
}

function getProps(handleFormService: HandleFormService): ChatPageProps {
	return {
		authorName: 'Savannah Nguyen',
    messageFieldName: FieldName.Message,
		settingsImgSrc: settingsImg as string,
		vertEllipsisImgSrc: vertEllipsisImg as string,
		cartImgSrc: cartImg as string,
		children: {
			searchInputComponent: new SearchInput({
				id: 'search',
				name: 'search',
				placeholder: 'Search',
			}),
			chatCardComponent1: new ChatCard({
				authorName: 'Savannah Nguyen',
				textMessage: 'Yeah! You\'re right.',
				children: {
					avatarComponent: new Avatar({
						avatarImgSrc: avatarImg1 as string,
					}),
					timeComponent: new Time({
						type: 'time-card',
						date: new Date(2021, 9, 27, 17, 31),
					}),
				},
			}),
			chatCardComponent2: new ChatCard({
				authorName: 'Jane Cooper',
				textMessage: 'I hope it goes well.',
				messageCount: '4',
				children: {
					avatarComponent: new Avatar({
						avatarImgSrc: avatarImg2 as string,
					}),
					timeComponent: new Time({
						type: 'time-card',
						date: new Date(2021, 9, 3, 17, 31),
					}),
				},
			}),
			avatarComponent: new Avatar({
				avatarImgSrc: avatarImg1 as string,
				size: '36px',
			}),
			timeComponent1: new Time({
				type: 'time-main',
				date: new Date(2021, 1, 2, 12, 31),
			}),
			messageComponent1: new Message({
				you: false,
				text: 'Hey! Look, an interesting piece of lunar \n'
                    + 'space history surfaced here - NASA at some \n'
                    + 'point asked Hasselblad to adapt the SWC \n'
                    + 'model for flights to the moon.\n'
                    + '\n'
                    + 'Hasselblad eventually adapted SWC for \n'
                    + 'space, but something went wrong and they \n'
                    + 'never hit the rocket.',
				children: {
					avatarComponent: new Avatar({
						avatarImgSrc: avatarImg1 as string,
					}),
					timeComponent: new Time({
						type: 'time-card',
						date: new Date(2021, 9, 31, 20, 1),
					}),
				},
			}),
			messageComponent2: new Message({
				you: true,
				text: 'Hey! Look, an interesting piece of lunar',
				children: {
					avatarComponent: new Avatar({
						avatarImgSrc: avatarImg2 as string,
					}),
					timeComponent: new Time({
						type: 'time-card',
						date: new Date(2021, 9, 31, 20, 1),
					}),
				},
			}),
			errorMessageComponent: new ErrorMessage({
				addClass: 'form__error-text',
			}),
		},
		events: {
			focus: [
				{
					id: 'message',
					fn: event => {
						handleFormService.handleFieldFocus(event);
					},
				},
			],
			blur: [
				{
					id: 'message',
					fn: event => {
						handleFormService.handleFieldBlur(event);
					},
				},
			],
			submit: [
				{
					id: 'form',
					fn: event => {
						handleFormService.handleFormSubmit(event);
					},
				},
			],
		},
	};
}

const chatService = new ChatService();

export const {props} = chatService;
