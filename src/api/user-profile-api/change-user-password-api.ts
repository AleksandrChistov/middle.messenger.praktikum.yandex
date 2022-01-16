import {BaseAPI} from "../base-api";
import {Http, Options} from "../../services/http-service";
import {host} from "../../constants";
import {ErrorResponse} from "../types";

const userPasswordAPIInstance = new Http(`${host}/api/v2/user/password`);

export class ChangeUserPasswordAPI extends BaseAPI {
  public put(options: Options): Promise<ErrorResponse | null> {
    return userPasswordAPIInstance.put<ErrorResponse | null>('', options)
      .then((data) => data);
  }
}
