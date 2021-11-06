import {Props} from './types';

export function compileTemplateToElement(
	templatePugFn: (locals: Props) => string,
	props: Props,
): DocumentFragment {
	const parser = new DOMParser();
	const template: string = templatePugFn(props);
	const {children = {}} = props;
	let elementBody: HTMLElement;

	try {
		elementBody = parser.parseFromString(template, 'text/html').body;

		Object.keys(children).forEach(tag => {
			const childElementTag = elementBody.querySelector(tag);

			if (!childElementTag) {
				console.error(`The ${tag} tag was not specified in the markup`);
				return;
			}

			const childElement = children[tag].getContent();
			const attributeNames = childElementTag.getAttributeNames();

			attributeNames.forEach(attrName => {
				const attrValue = childElementTag.getAttribute(attrName);

				childElement.setAttribute(attrName, attrValue ?? '');
			});

			childElementTag.replaceWith(childElement);
		});
	} catch (err: unknown) {
		throw new Error(`Template compilation failed due to ${String(err)}`);
	}

	const fragment = document.createDocumentFragment();

	Array.from(elementBody.children).forEach(elem => {
		fragment.appendChild(elem);
	});

	return fragment;
}
