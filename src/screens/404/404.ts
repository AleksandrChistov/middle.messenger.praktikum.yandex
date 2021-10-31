import {Block} from '../../core/block';
import {Props} from "../../core/types";
import {compileTemplateToElement} from '../../core/utils';
import templatePug from './404.pug';
import errorImg from '../../../static/assets/img/404.png';

interface Page404Props extends Props {
    errorImgSrc: string;
}

const props: Page404Props = {
    errorImgSrc: errorImg,
}

class Page404 extends Block<Page404Props> {
    constructor(propsObj: Page404Props) {
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

new Page404(props);
