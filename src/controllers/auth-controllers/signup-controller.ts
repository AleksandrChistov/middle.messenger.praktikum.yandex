import {SignUpAPI, SignUpResponse} from "../../api/auth-api/signup-api";
import {Options, ResponseType} from "../../services/http-service";
import {router} from "../../index";
import {Indexed} from "../../core/types";
import {ErrorResponse} from "../../api/types";

const validationKeys = ['first_name', 'second_name', 'login', 'email', 'phone', 'password'];

type SignUpFormModel = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  password: string;
}

const signUpAPI = new SignUpAPI();

export class UserSignUpController {
  static async signUp(data: Indexed): Promise<void> {
    try {
      // Запускаем крутилку
      const isValid = userLoginValidator(data);

      if (!isValid) {
        throw new Error('SignUp form data  does not correspond to Sign Up Form Model type');
      }

      signUpAPI.create(prepareDataToRequest(data))
        .then((response: SignUpResponse | ErrorResponse) => {
          // Останавливаем крутилку
          if (isErrorResponse(response)) {
            throw new Error(response.reason);
          }
          // Сохранить данные в стор store.set('user', data)
          console.log('UserSignUpController: ', response);
          router.go('/messenger');
        })
        .catch((error) => {
          console.error(error, data);
          // Останавливаем крутилку
          // Логика обработки ошибок
        })
    } catch (error) {
      console.error(error, data);
      // Останавливаем крутилку
      // Логика обработки ошибок
    }
  }
}

function isErrorResponse(response: Indexed): response is ErrorResponse {
  return !!response?.reason;
}

function userLoginValidator(data: Indexed): data is SignUpFormModel {
  const keysArray = Object.keys(data);

  return validationKeys.every((key: string) => keysArray.includes(key));
}

function prepareDataToRequest(data: SignUpFormModel): Options {
  return {
    withCredentials: true,
    responseType: ResponseType.json,
    headers: {
      'content-type': 'application/json',
    },
    data: data,
  }
}
