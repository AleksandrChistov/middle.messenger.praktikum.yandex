import {Options, ResponseType} from "../../services/http-service";
import {Indexed} from "../../core/types";
import {GetUserInfoAPI, UserInfoResponse} from "../../api/user-profile-api/get-user-info-api";
import {ErrorResponse} from "../../api/types";
import store from "../../store/store";
import {UPDATE_USER_PROFILE} from "../../screens/settings/settings";
import {UserProfileResponse} from "../../api/user-profile-api/change-user-profile-api";
import {SettingsPageProps} from "../../screens/settings/types";


const getUserInfoAPI = new GetUserInfoAPI();

export class UserInfoController {
  static async getInfo(): Promise<void> {
    try {
      // Запускаем крутилку
      getUserInfoAPI.get(getOptions())
        .then((response: UserInfoResponse | ErrorResponse) => {
          // Останавливаем крутилку
          if (isErrorResponse(response)) {
            throw new Error(response.reason);
          }

          store.set('settingsPage', prepareDataToStore(response), UPDATE_USER_PROFILE);
        })
        .catch((error) => {
          console.error(error);
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

function prepareDataToStore(data: UserProfileResponse): SettingsPageProps {
  const state = store.getState();

  return {
    ...state.settingsPage,
    nameInput: {
      ...state.settingsPage.nameInput,
      value: data.first_name
    },
    surnameInput: {
      ...state.settingsPage.surnameInput,
      value: data.second_name
    },
    displayNameInput: {
      ...state.settingsPage.displayNameInput,
      value: data.display_name
    },
    loginInput: {
      ...state.settingsPage.loginInput,
      value: data.login
    },
    emailInput: {
      ...state.settingsPage.emailInput,
      value: data.email
    },
    phoneInput: {
      ...state.settingsPage.phoneInput,
      value: data.phone
    },
  }
}