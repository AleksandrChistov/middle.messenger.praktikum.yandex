type AnyFunc = (...args: any[]) => any | void;

export class EventBus {
    private listeners: {[key: string]: Array<AnyFunc>};

    constructor() {
        this.listeners = {};
    }

    on(event: string, callback: AnyFunc) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    off(event: string, callback: AnyFunc) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }
        this.listeners[event] = this.listeners[event].filter(fn => fn !== callback);
    }

    emit(event: string, ...args: any[]) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }
        this.listeners[event].forEach(fn => {
            fn(...args);
        })
    }
}
