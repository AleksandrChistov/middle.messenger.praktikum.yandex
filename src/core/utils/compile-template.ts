import {Block} from "../block";
import {REGISTERED_COMPONENTS} from "../registered-components";
import {Props} from "../types";
import {isArray} from "../../utils";
import {mapStateToPropsCallBack} from "../../store/utils";

export function compileTemplateToElement(
  templatePugFn: (locals: Props) => string,
  props: Props,
): DocumentFragment {
  const parser = new DOMParser();
  const template: string = templatePugFn(props);
  let elementBody: HTMLElement;

  try {
    elementBody = parser.parseFromString(template, 'text/html').body;

    Object.keys(REGISTERED_COMPONENTS).forEach(componentName => {
      const childElementTags = elementBody.querySelectorAll(componentName);

      if (!childElementTags.length) {
        return;
      }

      childElementTags.forEach((element: Element) => {
        const dataName = element.getAttribute("data");

        if (!dataName) {
          console.error(`Attribute data was not specified in the markup for the ${element}`);
          return;
        }

        let data = props[dataName] as Props;

        if (!data) {
          console.error(`Property ${dataName} was not specified in the Props for the ${element}`);
          return;
        }

        data = (data.props || data) as Props;

        if (isArray(data)) {
          const childComponents = Object.values(data)
            .map((value) => {
              const component = getComponentInstance(componentName, value);

              component.subscribeToStoreEvent(dataName, mapStateToPropsCallBack.bind(component));

              return component;
            });

          setAttributes(element, childComponents);
        } else {
          const childComponent = getComponentInstance(componentName, data);

          childComponent.subscribeToStoreEvent(dataName, mapStateToPropsCallBack.bind(childComponent));

          setAttributes(element, [childComponent]);
        }
      })
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

function getComponentInstance(componentName: string, data: unknown): InstanceType<typeof Block> {
  return new REGISTERED_COMPONENTS[componentName](data);
}

function setAttributes(childElementTag: Element, childComponents: InstanceType<typeof Block>[]): void {
  const attributeNames = childElementTag.getAttributeNames();

  const childElements = childComponents.map(childComponent => {
    const childElement = childComponent.getContent();

    attributeNames.forEach(attrName => {
      const attrValue = childElementTag.getAttribute(attrName);

      if (attrName === 'class') {
        childElement.classList.add(attrValue ?? '');
        return;
      }

      childElement.setAttribute(attrName, attrValue ?? '');
    });

    return childElement as Node;
  });

  childElementTag.replaceWith(...childElements);
}
