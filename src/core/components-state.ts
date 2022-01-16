import {Block} from "./block";

export type ComponentState = {
  string: InstanceType<typeof Block>;
}

export const componentsState = {} as ComponentState;
