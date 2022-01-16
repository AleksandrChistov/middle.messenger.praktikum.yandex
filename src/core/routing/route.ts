import {Block} from "../block";
import {isEqual} from "../utils/is-equal";
import {BlockInheritor, RouteProps} from "./types";


export class Route {
  private _pathname: string;
  private _blockClass: BlockInheritor;
  private _block: InstanceType<typeof Block> | null;
  private _props: RouteProps;

  constructor(pathname: string, view: BlockInheritor, props: RouteProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.destroy();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    this._block = new this._blockClass(undefined, undefined, this._props.rootQuery);
  }
}
