type anyFunc = (...args: any[]) => any | void;

class EventBus {
    private listeners: {[key: string]: Array<anyFunc>};

    constructor() {
        this.listeners = {};
    }

    on(event: string, callback: anyFunc) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    off(event: string, callback: anyFunc) {
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

export const eventBus = new EventBus();
