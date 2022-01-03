type AnyFunc = (...args: any[]) => any | void;

export class EventBus {
	private listeners: Record<string, {subscriber: unknown, callback: AnyFunc}[]>;

	constructor() {
		this.listeners = {};
	}

	on(event: string, callback: AnyFunc, subscriber: unknown) {
		if (!this.listeners[event]) {
			this.listeners[event] = [];
		}

    const isAlreadyRegistered = this.listeners[event]
      .some(listener => listener.subscriber === subscriber && listener.callback === callback);

    if (isAlreadyRegistered) {
      return;
    }

		this.listeners[event].push({
      subscriber,
      callback
    });
	}

	off(event: string, callback: AnyFunc, subscriber: unknown) {
		if (!this.listeners[event]) {
			throw new Error(`There is no event: ${event}`);
		}

		this.listeners[event] = this.listeners[event]
      .filter(listener => listener.subscriber !== subscriber || listener.callback !== callback);
	}

	emit(event: string, ...args: any[]) {
		if (!this.listeners[event]) {
			throw new Error(`There is no event: ${event}`);
		}

		this.listeners[event].forEach(listener => {
      listener.callback.call(listener.subscriber, ...args);
		});
	}
}
