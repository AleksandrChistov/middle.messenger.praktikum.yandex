import {Events, Props} from "../types";
import {Block} from "../block";

export type RouteProps = {
  rootQuery: string;
}

export type BlockInheritor = new (propsObj: Props | undefined, events: Events | undefined, rootId?: string) => InstanceType<typeof Block>;
