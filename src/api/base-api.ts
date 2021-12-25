import {Options} from "../services/http-service";

export class BaseAPI {
  create(options: Options): Promise<unknown> { throw new Error('Not implemented'); }
  get(options: Options): Promise<unknown> { throw new Error('Not implemented'); }
  update(options: Options): Promise<unknown> { throw new Error('Not implemented'); }
  delete(options: Options): Promise<unknown> { throw new Error('Not implemented'); }
}
