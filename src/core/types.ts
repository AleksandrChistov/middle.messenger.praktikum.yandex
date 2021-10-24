import {Block} from "./block";

type ElementEvent = {
    id: string,
    fn: (event: Event) => void;
}

export type Props = {
    [key: string]: string | number | {};
    events?: {
        [eventName: string]: ElementEvent[]
    },
    children?: {
        [elementTag: string]: InstanceType<typeof Block>;
    }
}
