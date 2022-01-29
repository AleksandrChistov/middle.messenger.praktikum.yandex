import {Block} from '../../core/block';
import {Events, Props} from '../../core/types';
import {compileTemplateToElement} from '../../core/utils/compile-template';
import {mapStateToPropsCallBack} from '../../store/utils';
import './spinner.scss';
import {SPINNER_EVENT_NAME} from './events';
import store from '../../store/store';
import {getPathFromArray} from '../../core/utils/get-path-from-array';
import {getEventName} from '../../core/utils/get-event-name';

const templatePug = require('./spinner.pug') as (locals: Props) => string;

export interface SpinnerProps extends Props {
	isLoading: boolean;
}

export class Spinner extends Block<SpinnerProps> {
	constructor(propsObj: SpinnerProps, eventName: string, events?: Events) {
		super('div', 'spinner', propsObj, events);

		this.subscribeToStoreEvent(eventName, mapStateToPropsCallBack);
	}

	render() {
		return compileTemplateToElement(templatePug, this.props, SPINNER_EVENT_NAME, this._meta.events);
	}
}

export function showSpinner(parentName: string): void {
	store.set(
		getPathFromArray([parentName, SPINNER_EVENT_NAME]),
		{isLoading: true} as SpinnerProps,
		getEventName(parentName, SPINNER_EVENT_NAME),
	);
}

export function hideSpinner(parentName: string): void {
	store.set(
		getPathFromArray([parentName, SPINNER_EVENT_NAME]),
		{isLoading: false} as SpinnerProps,
		getEventName(parentName, SPINNER_EVENT_NAME),
	);
}
