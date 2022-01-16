type ElementEvent = {
	id: string;
	fn: (event: Event) => void;
};

export type Events = Record<string, ElementEvent[]>;

export type Props = Indexed;

export type Indexed<T = unknown> = {
  [key in string]: T;
};
