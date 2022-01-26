import {Events, Props} from './types';

export type StoreEvent = {
	eventName: string;
	callback: (path: string) => void;
};

export type Meta = {
	tagName: string;
	props: Props;
	events: Events;
	rootId?: string;
	containerClassName: string;
};

export enum EventsEnum {
	INIT = 'init',
	FLOW_CDM = 'flow:component-did-mount',
	FLOW_CDU = 'flow:component-did-update',
	FLOW_RENDER = 'flow:render',
}
