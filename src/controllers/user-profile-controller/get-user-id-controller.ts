import {Options, ResponseType} from "../../services/http-service";
import {Indexed} from "../../core/types";
import {GetUserInfoAPI, UserInfoResponse} from "../../api/user-profile-api/get-user-info-api";
import {ErrorResponse} from "../../api/types";


export type UserIdAndAvatarRequest = {
  id: number;
  avatar: string;
}

const getUserInfoAPI = new GetUserInfoAPI();

export class UserIdAndAvatarController {
  static async getIdAndAvatar(): Promise<UserIdAndAvatarRequest | void> {
    try {
      // Запускаем крутилку
      return getUserInfoAPI.get(getOptions())
        .then((response: UserInfoResponse | ErrorResponse) => {
          // Останавливаем крутилку
          if (isErrorResponse(response)) {
            throw new Error(response.reason);
          }

          return {
            id: response.id,
            avatar: response.avatar,
          };
        })
        .catch((error) => {
          throw new Error(error);
          // Останавливаем крутилку
        })
    } catch (error) {
      console.error(error);
      // Останавливаем крутилку
    }
  }
}

function isErrorResponse(response: Indexed): response is ErrorResponse {
  return !!response?.reason;
}

function getOptions(): Options {
  return {
    withCredentials: true,
    responseType: ResponseType.json,
  }
}
