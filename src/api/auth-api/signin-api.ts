import {BaseAPI} from "../base-api";
import {Http, Options} from "../../services/http-service";
import {host} from "../../constants";
import {ErrorResponse} from "../types";

const signInAPIInstance = new Http(`${host}/api/v2/auth/signin`);

export class SignInAPI extends BaseAPI {
  public create(options: Options): Promise<ErrorResponse | null> {
    return signInAPIInstance.post<ErrorResponse | null>('', options)
      .then((data) => data); // Обрабатываем получение данных из сервиса далее
  }
}
