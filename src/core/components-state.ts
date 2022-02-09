import {Block} from './block';

export type ComponentsState = Record<string, InstanceType<typeof Block> | string>;

export const componentsState: ComponentsState = {};
