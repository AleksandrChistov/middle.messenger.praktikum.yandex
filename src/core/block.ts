import {EventBus} from './event-bus';
import {Props} from "./types";

type Meta = {
    tagName: string,
    props: Props
}

export class Block {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render",
    };

    private _element: HTMLElement = null;
    private _meta: Meta = null;
    private eventBus: EventBus;
    props: Props;

    constructor(tagName: string = "div", props: Props = {}) {
        this.eventBus = new EventBus();
        this._meta = {
            tagName,
            props
        };

        this.props = this._makePropsProxy(props);

        this._registerEvents(this.eventBus);
        this.eventBus.emit(Block.EVENTS.INIT);
    }

    init() {
        this._createResources();
        this.eventBus.emit(Block.EVENTS.FLOW_CDM);
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidMount(): void {}

    // Может переопределять пользователь, необязательно трогать
    componentDidUpdate(oldProps: Props, newProps: Props): boolean {
        return oldProps !== newProps;
    }

    setProps = (nextProps: Props) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    // Может переопределять пользователь, необязательно трогать
    render(): string {
        return '';
    }

    getContent(): HTMLElement {
        return this.element;
    }

    show(): void {
        this.getContent().style.display = "block";
    }

    hide(): void {
        this.getContent().style.display = "none";
    }

    get element(): HTMLElement {
        return this._element;
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    _createResources() {
        const { tagName } = this._meta;
        this._element = this._createDocumentElement(tagName);
    }

    _componentDidMount() {
        this.componentDidMount();
        this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }

    _componentDidUpdate(oldProps: Props, newProps: Props): void {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    _render(): void {
        // Этот небезопасный метод для упрощения логики
        // Используйте шаблонизатор из npm или напишите свой безопасный
        // Нужно не в строку компилировать (или делать это правильно),
        // либо сразу в DOM-элементы возвращать из compile DOM-ноду
        this._removeEvents();
        this._element.innerHTML = this.render();
        this._addEvents();
    }

    _makePropsProxy(props: Props): Props {
        const self = this;

        return new Proxy<Props>(props, {
            get(target: Props, prop: string): (() => any) | string | {} {
                const value = target[prop];
                console.log('get', value);
                return (typeof value === 'function') ? value.bind(target) : value;
            },
            set(target: Props, prop: string, value: string | {}): boolean {
                target[prop] = value;
                console.log('set', value);
                self.eventBus.emit(Block.EVENTS.FLOW_CDU, {...target}, target);
                return true;
            },
            deleteProperty(target: Props, prop: string): boolean {
                delete target[prop];
                return true;
            }
        })
    }

    _createDocumentElement(tagName: string): HTMLElement {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }

    _addEvents() {
        const {events = {}} = this.props;

        Object.entries(events).forEach(([eventName, eventArray = []]) => {
            eventArray.forEach(({id, fn}) => {
                const nodeElement = this.element.querySelector(`#${id}`);
                if (!nodeElement) {
                    throw new Error(`AddEvents function failed with the element id ${id}`);
                }
                nodeElement.addEventListener(eventName, fn);
            })
        });
    }

    _removeEvents() {
        const {events = {}} = this.props;

        Object.entries(events).forEach(([eventName, eventArray = []]) => {
            eventArray.forEach(({id, fn}) => {
                const nodeElement = this.element.querySelector(`#${id}`);
                if (nodeElement) {
                    nodeElement.removeEventListener(eventName, fn);
                }
            })
        });
    }
}
