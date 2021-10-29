import {Block} from "./block";

type ElementEvent = {
    id: string,
    fn: (event: Event) => void;
}

export type Events = {
    [eventName: string]: ElementEvent[];
}

export type Children = {
    [elementTag: string]: InstanceType<typeof Block>;
}

export type Props = {
    [key: string]: string | number | {};
    events?: Events;
    children?: Children;
}
