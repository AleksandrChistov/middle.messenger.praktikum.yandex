import {Block} from '../../core/block';
import {Props} from "../../core/types";
import {compileTemplate} from '../../core/utils';
import templatePug from './signin.pug';
import './signin.scss';
import welcomeImg from '../../../static/assets/img/welcome.png';
import {TextInput} from '../../components/inputs/text/text-input';
import {PasswordInput} from "../../components/inputs/password/password-input";
import {ErrorMessage} from "../../components/error-message/error-message";
import {FormButton} from "../../components/form-button/form-button";

const props: Props = {
    welcomeImgSrc: welcomeImg,
    children: {
        TextInput: new TextInput({
            label: 'Login',
            id: 'login',
            name: 'login',
            inputClass: 'mb-5',
        }),
        PasswordInput: new PasswordInput({
            label: 'Password',
            id: 'password',
            name: 'password',
            inputContainerClass: 'mb-5'
        }),
        ErrorMessage: new ErrorMessage({
            addClass: 'form__error-text'
        }),
        FormButton: new FormButton({
            type: 'submit',
            text: 'Sign in',
            addClass: 'mt-30 mb-20'
        })
    }
}

class SignInPage extends Block {
    constructor(propsObj: Props) {
        // Создаём враппер DOM-элемент button
        super("main", propsObj);
    }

    render() {
        const template = compileTemplate(templatePug, this.props);
        console.log('SignIn template', template);
        return template;
    }

    componentDidMount() {
        console.log('componentDidMount', this);
        const root = document.getElementById('app');

        root.appendChild(this.getContent());
    }
}

const signInPage = new SignInPage(props);

setTimeout(() => {
    signInPage.props.children.TextInput.setProps({
        label: 'Test'
    })
}, 4000);
