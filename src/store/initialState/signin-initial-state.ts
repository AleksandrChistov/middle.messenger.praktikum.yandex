import {FieldName} from "../../services/form-services/form-validation-service";
import welcomeImg from "../../../static/assets/img/welcome.png";
import {SignInPageProps} from "../../screens/signin/types";

export const SIGNIN_INITIAL_STATE: SignInPageProps = {
  welcomeImgSrc: welcomeImg as string,
  loginInput: {
    label: 'Login',
    id: 'login',
    name: FieldName.Login,
    inputClass: 'mb-5',
    required: true,
  },
  passwordInput: {
    label: 'Password',
    id: 'password',
    name: FieldName.Password,
    inputContainerClass: 'mb-5',
    required: true,
  },
  errorLogin: {
    addClass: '',
    textError: '',
  },
  errorPassword: {
    addClass: '',
    textError: '',
  },
  formButton: {
    type: 'submit',
    text: 'Sign in',
    addClass: 'mt-20 mb-20',
  }
}
