import {Block} from '../../core/block';
import {Props} from "../../core/types";
import {compileTemplateToElement} from '../../core/utils';
import templatePug from './settings.pug';
import {TextInput} from '../../components/inputs/text/text-input';
import {PasswordInput} from "../../components/inputs/password/password-input";
import {ErrorMessage} from "../../components/error-message/error-message";
import {FormButton} from "../../components/form-button/form-button";
import {EmailInput} from "../../components/inputs/email/email-input";
import {PhoneInput} from "../../components/inputs/phone/phone-input";

interface SettingsPageProps extends Props {}

const props: SettingsPageProps = {
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
            label: 'Display name',
            id: 'display_name',
            name: 'display_name',
            inputClass: 'mb-5',
        }),
        TextInput4: new TextInput({
            label: 'Login',
            id: 'login',
            name: 'login',
            inputClass: 'mb-5',
        }),
        EmailInput: new EmailInput({
            label: 'Email',
            id: 'email',
            name: 'email',
            inputClass: 'mb-5'
        }),
        PhoneInput: new PhoneInput({
            label: 'Phone',
            id: 'phone',
            name: 'phone',
            inputClass: 'mb-5',
        }),
        ErrorMessage1: new ErrorMessage({
            addClass: 'form__error-text'
        }),
        FormButton1: new FormButton({
            type: 'submit',
            text: 'Change data',
            addClass: 'mt-30'
        }),
        PasswordInput1: new PasswordInput({
            label: 'Old password',
            id: 'oldPassword',
            name: 'oldPassword',
            inputContainerClass: 'mb-5'
        }),
        PasswordInput2: new PasswordInput({
            label: 'Password',
            id: 'password',
            name: 'password',
            inputContainerClass: 'mb-5'
        }),
        PasswordInput3: new PasswordInput({
            label: 'Password (again)',
            id: 'newPassword',
            name: 'newPassword',
            inputContainerClass: 'mb-5'
        }),
        ErrorMessage2: new ErrorMessage({
            addClass: 'form__error-text'
        }),
        FormButton2: new FormButton({
            type: 'submit',
            text: 'Change password',
            addClass: 'mt-30'
        }),
    }
}

class SettingsPage extends Block<SettingsPageProps> {
    constructor(propsObj: SettingsPageProps) {
        super("main", propsObj);
    }

    render() {
        const element = compileTemplateToElement(templatePug, this.props);
        console.log('SettingsPage template', element);
        return element;
    }

    componentDidMount() {
        console.log('componentDidMount', this);
        const root = document.getElementById('app');

        root.appendChild(this.getContent());
    }
}

const settingsPage = new SettingsPage(props);

setTimeout(() => {
    settingsPage.props.children.ErrorMessage2.setProps({
        addClass: 'form__error-text display-block'
    })
}, 4000);
