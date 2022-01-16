import {BaseAPI} from "../base-api";
import {Http, Options} from "../../services/http-service";
import {host} from "../../constants";
import {ErrorResponse} from "../types";

const addUsersToChatAPIInstance = new Http(`${host}/api/v2/chats/users`);

export class AddUsersToChatAPI extends BaseAPI {
  public add(options: Options): Promise<ErrorResponse | null> {
    return addUsersToChatAPIInstance.put<ErrorResponse | null>('', options)
      .then((data) => data);
  }
}
