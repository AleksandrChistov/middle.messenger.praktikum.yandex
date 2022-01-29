import {Block} from '../../core/block';
import {Events, Props} from '../../core/types';
import {compileTemplateToElement} from '../../core/utils/compile-template';
import {mapStateToPropsCallBack} from '../../store/utils';
import './spinner.scss';
import {SPINNER_EVENT_NAME, SPINNER_PATH} from './events';
import store from '../../store/store';
import {getPathFromArray} from '../../core/utils/get-path-from-array';

const templatePug = require('./spinner.pug') as (locals: Props) => string;

export interface SpinnerProps extends Props {
	isLoading: boolean;
}

export class Spinner extends Block<SpinnerProps> {
	constructor(propsObj: SpinnerProps, eventName: string, events?: Events) {
		super('div', 'spinner', propsObj, events);

		this.subscribeToStoreEvent(SPINNER_EVENT_NAME, mapStateToPropsCallBack);
	}

	render() {
		return compileTemplateToElement(templatePug, this.props, '', this._meta.events);
	}
}

export function showSpinner(parentName: string): void {
	store.set(
		getPathFromArray([parentName, SPINNER_PATH]),
		{isLoading: true} as SpinnerProps,
		SPINNER_EVENT_NAME,
	);
}

export function hideSpinner(parentName: string): void {
	store.set(
		getPathFromArray([parentName, SPINNER_PATH]),
		{isLoading: false} as SpinnerProps,
		SPINNER_EVENT_NAME,
	);
}
