import {BaseAPI} from "../base-api";
import {Http, Options} from "../../services/http-service";
import {host} from "../../constants";
import {ErrorResponse} from "../types";

const deleteUsersFromChatAPIInstance = new Http(`${host}/api/v2/chats/users`);

export class DeleteUsersFromChatAPI extends BaseAPI {
  public delete(options: Options): Promise<ErrorResponse | null> {
    return deleteUsersFromChatAPIInstance.delete<ErrorResponse | null>('', options)
      .then((data) => data);
  }
}
