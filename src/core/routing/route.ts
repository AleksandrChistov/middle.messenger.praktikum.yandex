import {Block} from "../block";
import {Props} from "../types";
import {isEqual} from "../utils/is-equal";

type RouteProps = {
  rootQuery: string;
}

type BlockInheritor = new (propsObj: Props | undefined, events: Event | undefined, rootId?: string) => InstanceType<typeof Block>;

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

  navigate(pathname) {
    if (this.match(pathname)) {
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.destroy();
    }
  }

  match(pathname) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    this._block = new this._blockClass(undefined, undefined, this._props.rootQuery);
  }
}
