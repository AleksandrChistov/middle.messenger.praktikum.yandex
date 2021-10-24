import {Block} from "./block";

export type Props = {
    [key: string]: string | number | {};
    events?: {
        [eventName: string]: {
            [elementID: string]: (event: Event) => void;
        };
    },
    children?: {
        [elementTag: string]: InstanceType<typeof Block>;
    }
}
