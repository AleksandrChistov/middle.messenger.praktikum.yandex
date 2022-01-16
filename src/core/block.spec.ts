import {expect} from "chai";
import {JSDOM} from "jsdom";
import * as sinon from "sinon";
import * as util from "util";
import {Block} from "./block";
import {Events} from "./types";

type AttrType = {name: string, value: string};

describe("Block", () => {
  class TestBlock extends Block<{test: number}> {
    render() {
      return document.createDocumentFragment();
    }
  }

  beforeEach(() => {
    const dom = new JSDOM(
      '<!DOCTYPE html><body><div id="app"></div></body>',
      { url: 'http://localhost:3000' }
    );

    (global as any).window = {
      ...dom.window,
      ...global.window,
    };
    (global as any).document = dom.window.document;
  })

  describe('init', () => {
    it("should wrap props in Proxy", () => {
      const props = {
        test: 123
      }

      const testBlock = new TestBlock(undefined, '', props);

      expect(util.types.isProxy(testBlock.props)).to.be.true;
    })

    it("should create element with passed tag", () => {
      const testBlock = new TestBlock('section', '', {});

      expect(testBlock.getContent().tagName).to.eq('SECTION');
    })

    it("should add class with passed className", () => {
      const expectedClassName = 'test-class';

      const testBlock = new TestBlock(undefined, expectedClassName, {});

      expect(testBlock.getContent().className).to.eq(expectedClassName);
    })

    it("should insert element received from function render", () => {
      class TestBlock extends Block<{}> {
        render() {
          const fragment = document.createDocumentFragment();
          insertPElement(fragment);
          return fragment;
        }
      }

      const expectedElement = document.createElement('div');
      insertPElement(expectedElement);

      const testBlock = new TestBlock('div', '', {});

      expect(testBlock.getContent().innerHTML).to.eq(expectedElement.innerHTML);
    })

    it("should set events to element", () => {
      class TestBlock extends Block<{}> {
        render() {
          const fragment = document.createDocumentFragment();
          insertPElement(fragment, {name: 'id', value: 'test'});
          return fragment;
        }
      }
      const eventSpy = sinon.spy();
      const events: Events = {
        click: [{
          id: 'test',
          fn: eventSpy
        }]
      }

      const testBlock = new TestBlock(undefined, '', {}, events);
      const pElement = testBlock.getContent().querySelector('#test') as HTMLElement;
      pElement?.click();

      expect(eventSpy.called).to.be.true;
    })
  })

  describe('setProps', () => {
    it("should extend props object with passed object", () => {
      const initialProps = { test1: 1 };
      const newProps = { test2: 2 }
      const expectedProps = Object.assign(initialProps, newProps);

      const testBlock = new TestBlock(undefined, '', initialProps);
      testBlock.setProps(newProps);

      expect(JSON.stringify(testBlock.props)).to.eq(JSON.stringify(expectedProps));
    })
  })

  describe('hide', () => {
    it("should add class hidden to the element", () => {
      const testBlock = new TestBlock('div', '', {});
      testBlock.hide();

      expect(testBlock.getContent().className).to.eq('hidden');
    })
  })

  describe('show', () => {
    it("should remove class hidden from the element", () => {
      const testBlock = new TestBlock('div', '', {});
      testBlock.getContent().classList.add('hidden');

      testBlock.show();

      expect(testBlock.getContent().className).not.be.undefined;
    })
  })

  describe('destroy', () => {
    it("should clear root element", () => {
      class TestBlock extends Block<{}> {
        render() {
          const fragment = document.createDocumentFragment();
          insertPElement(fragment);
          return fragment;
        }
        componentDidMount() {
          const root = document.getElementById(this._meta.rootId);
          root?.appendChild(this.getContent());
        }
      }

      const testBlock = new TestBlock('div', '', {}, {}, 'app');

      testBlock.destroy();

      expect(document.querySelector('#app')?.innerHTML).to.eq('');
    })
  })
});

function insertPElement(container: HTMLElement | DocumentFragment, attr?: AttrType): void {
  const pElement = document.createElement('p');

  if (attr) {
    pElement.setAttribute(attr.name, attr.value);
  }

  container.appendChild(pElement);
}
