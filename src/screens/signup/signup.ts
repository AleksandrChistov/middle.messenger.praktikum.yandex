import {Block} from '../../core/block';
import {Props} from "../../core/types";
import {compileTemplateToElement} from '../../core/utils';
import templatePug from './signup.pug';
import {TextInput} from '../../components/inputs/text/text-input';
import {EmailInput} from "../../components/inputs/email/email-input";
import {PhoneInput} from "../../components/inputs/phone/phone-input";
import {PasswordInput} from "../../components/inputs/password/password-input";
import {ErrorMessage} from "../../components/error-message/error-message";
import {FormButton} from "../../components/form-button/form-button";

const props: Props = {
    children: {
        TextInput1: new TextInput({
            label: 'Name',
            id: 'first_name',
            name: 'first_name',
            inputClass: 'mb-5',
        }),
        TextInput2: new TextInput({
            label: 'Surname',
            id: 'second_name',
            name: 'second_name',
            inputClass: 'mb-5',
        }),
        TextInput3: new TextInput({
            label: 'Login',
            id: 'login',
            name: 'login',
            inputClass: 'mb-5',
        }),
        EmailInput: new EmailInput({
            label: 'Email',
            id: 'email',
            name: 'email',
            inputClass: 'mb-5',
        }),
        PhoneInput: new PhoneInput({
            label: 'Phone',
            id: 'phone',
            name: 'phone',
            inputClass: 'mb-5',
        }),
        PasswordInput1: new PasswordInput({
            label: 'Password',
            id: 'password',
            name: 'password',
            inputClass: 'mb-5',
        }),
        PasswordInput2: new PasswordInput({
            label: 'Password (again)',
            id: 'newPassword',
            name: 'newPassword',
            inputClass: 'mb-5',
        }),
        ErrorMessage: new ErrorMessage({
            addClass: 'form__error-text'
        }),
        FormButton: new FormButton({
            type: 'submit',
            text: 'Sign up',
            addClass: 'mt-30'
        })
    }
}

class SignInPage extends Block {
    constructor(propsObj: Props) {
        super("main", propsObj);
    }

    render() {
        const element = compileTemplateToElement(templatePug, this.props);
        console.log('SignIn template', element);
        return element;
    }

    componentDidMount() {
        console.log('componentDidMount', this);
        const root = document.getElementById('app');

        root.appendChild(this.getContent());
    }
}

const signInPage = new SignInPage(props);

setTimeout(() => {
    signInPage.props.children.TextInput1.setProps({
        label: 'Test'
    })
}, 4000);
