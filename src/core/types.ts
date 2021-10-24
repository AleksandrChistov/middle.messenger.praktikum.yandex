export type Props = {
    [key: string]: string | number | {};
    events?: {
        [key: string]: (event: Event) => void;
    },
    children?: {
        [key: string]: any
    }
}
