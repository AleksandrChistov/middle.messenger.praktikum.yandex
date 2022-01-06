import {Props} from "../../core/types";

export enum TimeType {
  Card = 'time-card',
  Main = 'time-main',
}

export interface TimeProps extends Props {
  type: TimeType;
  date: Date;
}

export interface TimeParsedProps extends Props {
  type: TimeType;
  date: string;
}
