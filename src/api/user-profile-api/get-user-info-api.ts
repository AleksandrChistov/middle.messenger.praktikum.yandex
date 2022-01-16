import {BaseAPI} from "../base-api";
import {Http, Options} from "../../services/http-service";
import {host} from "../../constants";
import {ErrorResponse} from "../types";

export type UserInfoResponse = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

const userInfoAPIInstance = new Http(`${host}/api/v2/auth/user`);

export class GetUserInfoAPI extends BaseAPI {
  public get(options: Options): Promise<UserInfoResponse | ErrorResponse> {
    return userInfoAPIInstance.get<UserInfoResponse | ErrorResponse>('', options)
      .then((data) => data);
  }
}
