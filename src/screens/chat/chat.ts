import {Block} from '../../core/block';
import {Props} from "../../core/types";
import {compileTemplateToElement} from '../../core/utils';
import templatePug from './chat.pug';
import settingsImg from '../../../static/assets/icons/settings.svg';
import avatarImg1 from "../../../static/assets/img/avatar1.png";
import avatarImg2 from "../../../static/assets/img/avatar2.png";
import cartImg from "../../../static/assets/icons/cart.svg";
import vertEllipsisImg from "../../../static/assets/icons/vert-ellipsis.svg";
import {SearchInput} from "../../components/inputs/search/search-input";
import {ChatCard} from "../../components/chat-card/chat-card";
import {Avatar} from "../../components/avatar/avatar";
import {Time} from "../../components/time/time";
import {Message} from "../../components/message/message";

interface ChatPageProps extends Props {
    authorName: string;
    settingsImgSrc: string;
    vertEllipsisImgSrc: string;
    cartImgSrc: string;
}

const props: ChatPageProps = {
    authorName: 'Savannah Nguyen',
    settingsImgSrc: settingsImg,
    vertEllipsisImgSrc: vertEllipsisImg,
    cartImgSrc: cartImg,
    children: {
        SearchInput: new SearchInput({
            id: 'search',
            name: 'search',
            placeholder: 'Search'
        }),
        ChatCard1: new ChatCard({
            authorName: 'Savannah Nguyen',
            textMessage: "Yeah! You're right.",
            children: {
                Avatar: new Avatar({
                    avatarImgSrc: avatarImg1,
                }),
                Time: new Time({
                    type: 'time-card',
                    date: new Date(2021,9,27, 17, 31)
                })
            }
        }),
        ChatCard2: new ChatCard({
            authorName: 'Jane Cooper',
            textMessage: "I hope it goes well.",
            messageCount: '4',
            children: {
                Avatar: new Avatar({
                    avatarImgSrc: avatarImg2,
                }),
                Time: new Time({
                    type: 'time-card',
                    date: new Date(2021,9,3, 17, 31)
                })
            }
        }),
        Avatar: new Avatar({
            avatarImgSrc: avatarImg1,
            size: '36px'
        }),
        Time1: new Time({
            type: 'time-main',
            date: new Date(2021,1,2, 12, 31)
        }),
        Message1: new Message({
            you: false,
            text: 'Hey! Look, an interesting piece of lunar \n' +
                'space history surfaced here - NASA at some \n' +
                'point asked Hasselblad to adapt the SWC \n' +
                'model for flights to the moon.\n' +
                '\n' +
                'Hasselblad eventually adapted SWC for \n' +
                'space, but something went wrong and they \n' +
                'never hit the rocket.',
            children: {
                Avatar: new Avatar({
                    avatarImgSrc: avatarImg1,
                }),
                Time: new Time({
                    type: 'time-card',
                    date: new Date(2021,9,31, 20, 1)
                })
            }
        }),
        Message2: new Message({
            you: true,
            text: 'Hey! Look, an interesting piece of lunar',
            children: {
                Avatar: new Avatar({
                    avatarImgSrc: avatarImg2,
                }),
                Time: new Time({
                    type: 'time-card',
                    date: new Date(2021,9,31, 20, 1)
                })
            }
        })
    }
}

class ChatPage extends Block<ChatPageProps> {
    constructor(propsObj: ChatPageProps) {
        super("main", propsObj);
    }

    render() {
        const element = compileTemplateToElement(templatePug, this.props);
        console.log('Chat template', element);
        return element;
    }

    componentDidMount() {
        console.log('componentDidMount', this);
        const root = document.getElementById('app');

        root.appendChild(this.getContent());
    }
}

const chatPage = new ChatPage(props);

setTimeout(() => {
    chatPage.props.children.ChatCard1.props.children.Time.setProps({
        date: new Date(2021,9,31, 17, 31)
    })
}, 4000);
