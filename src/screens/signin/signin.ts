import {Block} from '../../core/block';
import {compileTemplateToElement} from '../../core/utils';
import templatePug from './signin.pug';
import {SignInPageProps, props} from "./signin-service";

class SignInPage extends Block<SignInPageProps> {
    constructor(propsObj: SignInPageProps) {
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

new SignInPage(props);
