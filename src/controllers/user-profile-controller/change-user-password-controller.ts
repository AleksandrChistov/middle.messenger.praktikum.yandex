import {Options, ResponseType} from "../../services/http-service";
import {ErrorResponse} from "../../api/types";
import {ChangeUserPasswordAPI} from "../../api/user-profile-api/change-user-password-api";

type UserPasswordFormModel = {
  oldPassword: string;
  newPassword: string;
}

const changeUserPasswordAPI = new ChangeUserPasswordAPI();

export class ChangeUserPasswordController {
  static async change(data: UserPasswordFormModel): Promise<void> {
    try {
      changeUserPasswordAPI.put(prepareDataToRequest(data))
        .then((response: ErrorResponse | null) => {
          // Останавливаем крутилку
          if (response) {
            throw new Error(response.reason);
          }
          // notify user that the password has been changed successfully
        })
        .catch((error) => {
          console.error(error, data);
          // Останавливаем крутилку
        })
    } catch (error) {
      console.error(error, data);
      // Останавливаем крутилку
    }
  }
}

function prepareDataToRequest(data: UserPasswordFormModel): Options {
  return {
    withCredentials: true,
    responseType: ResponseType.json,
    headers: {
      'content-type': 'application/json',
    },
    data: data,
  }
}
