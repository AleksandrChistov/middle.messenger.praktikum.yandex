import {Props} from "./types";

export function compileTemplateToElement(templatePugFn: (locals) => string, props: Props): DocumentFragment {
    const parser = new DOMParser();
    const template: string = templatePugFn(props);
    const {children = {}} = props;
    let elementBody: HTMLElement = null;

    try {
        elementBody = parser.parseFromString(template, "text/html").body;

        Object.keys(children).forEach(tag => {
            console.log('childTag > ', tag);
            const childElementTag = elementBody.querySelector(tag);
            const childElement = children[tag].getContent();

            childElementTag.replaceWith(childElement);
        })
    } catch (err) {
        throw new Error(`Template compilation failed due to ${err}`)
    }

    const fragment = document.createDocumentFragment();

    Array.from(elementBody.children).forEach((elem) => {
        fragment.appendChild(elem);
    })

    return fragment;
}
