import {isEqual} from "../utils";
import {Block} from "../block";
import {Props} from "../types";

type RouteProps = {
  rootQuery: string;
}

type BlockInheritor = new (propsObj: Props | undefined, rootId: string) => InstanceType<typeof Block>;

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
      this._block.hide();
    }
  }

  match(pathname) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass(undefined, this._props.rootQuery);
      return;
    }

    this._block.show();
  }
}
