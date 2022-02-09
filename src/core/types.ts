import {Block} from './block';

type ElementEvent = {
	id: string;
	fn: (event: Event) => void;
};

export type Events = Record<string, ElementEvent[]>;

export type Props = Indexed;

export type Indexed<T = unknown> = {
	[key in string]: T;
};

export type RegisteredComponents = Record<string,
new (propsObj: Props, eventName: string, events?: Events) => InstanceType<typeof Block>
>;
