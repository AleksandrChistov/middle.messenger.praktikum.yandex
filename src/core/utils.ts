import {Indexed, Props} from './types';
import {isObject} from "../utils";

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

        if (attrName === 'class') {
          childElement.classList.add(attrValue ?? '');
          return;
        }

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

export function isEqual(newPathname: string, currentPathname: string): boolean {
  return newPathname === currentPathname;
}

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (isObject(object)) {
    return object;
  }

  const pathArray = path.split('.');

  pathArray.reduce((acc: Indexed, key: string, idx: number) => {
    if (idx === pathArray.length - 1) {
      acc[key] = value;
    }

    if (!acc[key]) {
      acc[key] = {};
    }

    return acc[key] as Indexed;
  }, object as Indexed)

  return object;
}
