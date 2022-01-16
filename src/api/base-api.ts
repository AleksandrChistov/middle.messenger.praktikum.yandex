import {Options} from "../services/http-service";

export class BaseAPI {
  create(options: Options, ...rest: unknown[]): Promise<unknown> { throw new Error('Not implemented'); }
  get(options: Options, ...rest: unknown[]): Promise<unknown> { throw new Error('Not implemented'); }
  update(options: Options, ...rest: unknown[]): Promise<unknown> { throw new Error('Not implemented'); }
  delete(options: Options, ...rest: unknown[]): Promise<unknown> { throw new Error('Not implemented'); }
}
