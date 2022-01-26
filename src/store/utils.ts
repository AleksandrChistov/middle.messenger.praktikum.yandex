import store from './store';
import {State} from './types';
import {Props} from '../core/types';

export function mapStateToPropsCallBack(path: string): void {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	this.setProps(mapStateToProps(store.getState(), path));
}

function mapStateToProps(state: State, path: string): Props {
	const pathArray = path.split('.');
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return pathArray.reduce<Props>((acc: State, key: string) => acc[key], state);
}
