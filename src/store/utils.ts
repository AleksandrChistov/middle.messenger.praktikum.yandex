import store from "./store";
import {State} from "./types";
import {Indexed} from "../core/types";

export function mapStateToPropsCallBack(path: string): void {
  this.setProps(mapStateToProps(store.getState(), path));
}

function mapStateToProps(state: State, path: string) {
  const pathArray = path.split('.');

  return pathArray.reduce((acc: Indexed, key: string) => acc[key], state);
}
