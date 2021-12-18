import {Block, EventsEnum} from '../../core/block';
import {Props} from '../../core/types';
import {compileTemplateToElement} from '../../core/utils';
import templatePug from './time.pug';
import {getDateString} from './service';
import './time.scss';

interface TimeProps extends Props {
	type: 'time-card' | 'time-main';
	date: Date;
}

interface TimeParsedProps extends Props {
	type: 'time-card' | 'time-main';
	date: string;
}

export class Time extends Block<TimeProps> {
	constructor(propsObj: TimeProps) {
		super('div', 'time-block', propsObj);
	}

	render() {
		return compileTemplateToElement(templatePug, this.props);
	}

	makePropsProxy(props: TimeProps): TimeParsedProps {
		const newPropsObj = {
			type: props.type,
			date: getDateString(props.date),
		};

		return new Proxy<TimeParsedProps>(newPropsObj, {
			get: (target: TimeParsedProps, prop: string): unknown => {
				const value = target[prop] as unknown;

				return (typeof value === 'function') ? (value as () => void).bind(target) : value;
			},
			set: (
				target: TimeParsedProps,
				prop: string,
				value: string | Record<string, unknown>,
			): boolean => {
				target[prop] = value instanceof Date ? getDateString(value) : value;

				this.eventBus.emit(EventsEnum.FLOW_CDU, {...target}, target);

				return true;
			},
			deleteProperty: (target: TimeParsedProps, prop: string): boolean => {
				// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
				delete target[prop];

				return true;
			},
		});
	}
}
