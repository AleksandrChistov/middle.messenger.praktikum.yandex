import {EventBus} from "../core/event-bus";
import {State} from "./types";
import {INITIAL_STATE} from "./initialState/initialState";
import {set} from "../core/utils/set-values-to-object";


class Store extends EventBus {
  private state: State = INITIAL_STATE;

  public getState(): State {
    return this.state;
  }

  public set(path: string, value: unknown, eventName: string): void {
    set(this.state, path, value);

    this.emit(eventName, path);
  };
}

export default new Store();
