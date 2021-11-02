import {Block} from '../../core/block';
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
		super('div', propsObj);
	}

	render() {
		const element = compileTemplateToElement(templatePug, this.props);
		console.log('Time template', element);
		return element;
	}

	makePropsProxy(props: TimeProps): TimeParsedProps {
		const newPropsObj = {
			type: props.type,
			date: getDateString(props.date),
		};

		return new Proxy<TimeParsedProps>(newPropsObj, {
			get: (target: TimeParsedProps, prop: string): (() => any) | string | Record<string, unknown> => {
				const value = target[prop];

				return (typeof value === 'function') ? value.bind(target) : value;
			},
			set: (target: TimeParsedProps, prop: string, value: string | Record<string, unknown>): boolean => {
				target[prop] = value instanceof Date ? getDateString(value) : value;

				this.eventBus.emit(Block.EVENTS.FLOW_CDU, {...target}, target);

				return true;
			},
			deleteProperty: (target: TimeParsedProps, prop: string): boolean => {
				delete target[prop];

				return true;
			},
		});
	}
}
