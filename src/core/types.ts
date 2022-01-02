import {Block} from './block';

type ElementEvent = {
	id: string;
	fn: (event: Event) => void;
};

export type Events = Record<string, ElementEvent[]>;

export type Children = Record<string, InstanceType<typeof Block>>;

export type Props = Indexed;

export type Indexed<T = unknown> = {
  [key in string]: T;
};
