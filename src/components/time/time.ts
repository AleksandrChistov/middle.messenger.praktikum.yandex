import {Block} from '../../core/block';
import {EventsEnum} from "../../core/block-types";
import {compileTemplateToElement} from '../../core/utils/compile-template';
import {mapStateToPropsCallBack} from '../../store/utils';
const templatePug = require('./time.pug');
import {getDateString} from './service';
import {TimeParsedProps, TimeProps} from './types';
import './time.scss';
import {Events} from "../../core/types";


export class Time extends Block<TimeProps> {
	constructor(propsObj: TimeProps, eventName: string, events?: Events) {
		super('div', 'time-block', propsObj, events);

    this.subscribeToStoreEvent(eventName, mapStateToPropsCallBack);
	}

	render() {
		return compileTemplateToElement(templatePug, this.props, '', this._meta.events);
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
