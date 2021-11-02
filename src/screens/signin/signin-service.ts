import {Props} from "../../core/types";
import {FormServiceAbstract} from "../../services/form-service-abstract";
import welcomeImg from '../../../static/assets/img/welcome.png';
import {TextInput} from "../../components/inputs/text/text-input";
import {PasswordInput} from "../../components/inputs/password/password-input";
import {ErrorMessage} from "../../components/error-message/error-message";
import {FormButton} from "../../components/form-button/form-button";

export interface SignInPageProps extends Props {
    welcomeImgSrc: string;
}

class SignInService extends FormServiceAbstract {
    public props: SignInPageProps;

    constructor() {
        super();
        this.props = getProps(this.handleFormService);
    }

    protected showError(errorMessage: string): void {
        this.props.children.ErrorMessage.setProps({
            textError: errorMessage,
            addClass: errorMessage ? 'error-text--display' : '',
        })
    }
}

function getProps(handleFormService): SignInPageProps {
    return {
        welcomeImgSrc: welcomeImg,
        children: {
            TextInput: new TextInput({
                label: 'Login',
                id: 'login',
                name: 'login',
                inputClass: 'mb-5',
                required: true,
            }),
            PasswordInput: new PasswordInput({
                label: 'Password',
                id: 'password',
                name: 'password',
                inputContainerClass: 'mb-5',
                required: true,
            }),
            ErrorMessage: new ErrorMessage({
                addClass: 'form__error-text'
            }),
            FormButton: new FormButton({
                type: 'submit',
                text: 'Sign in',
                addClass: 'mt-30 mb-20'
            })
        },
        events: {
            focus: [
                {
                    id: "login",
                    fn: event => handleFormService.handleFieldFocus(event)
                },
                {
                    id: "password",
                    fn: event => handleFormService.handleFieldFocus(event)
                }
            ],
            blur: [
                {
                    id: "login",
                    fn: event => handleFormService.handleFieldBlur(event)
                },
                {
                    id: "password",
                    fn: event => handleFormService.handleFieldBlur(event)
                }
            ],
            submit: [
                {
                    id: "form",
                    fn: event => handleFormService.handleFormSubmit(event)
                }
            ],
        },
    }
}

const signInService = new SignInService();

export const props = signInService.props;
