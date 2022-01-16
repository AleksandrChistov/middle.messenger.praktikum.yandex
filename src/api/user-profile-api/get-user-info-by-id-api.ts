import {BaseAPI} from "../base-api";
import {Http, Options} from "../../services/http-service";
import {host} from "../../constants";
import {ErrorResponse} from "../types";

export type UserInfoByIdResponse = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

const userInfoByIdAPIInstance = new Http(`${host}/api/v2/user/`);

export class GetUserInfoByIdAPI extends BaseAPI {
  public get(options: Options, userId: string): Promise<UserInfoByIdResponse | ErrorResponse> {
    return userInfoByIdAPIInstance.get<UserInfoByIdResponse | ErrorResponse>(userId, options)
      .then((data) => data);
  }
}
