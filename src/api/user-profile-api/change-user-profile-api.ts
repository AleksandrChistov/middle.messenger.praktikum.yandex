import {BaseAPI} from "../base-api";
import {Http, Options} from "../../services/http-service";
import {host} from "../../constants";
import {ErrorResponse} from "../types";

export type UserProfileResponse = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

const userProfileAPIInstance = new Http(`${host}/api/v2/user/profile`);

export class ChangeUserProfileAPI extends BaseAPI {
  public put(options: Options): Promise<UserProfileResponse | ErrorResponse> {
    return userProfileAPIInstance.put<UserProfileResponse | ErrorResponse>('', options)
      .then((data) => data);
  }
}
