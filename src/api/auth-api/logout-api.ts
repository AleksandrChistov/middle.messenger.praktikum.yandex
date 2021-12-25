import {BaseAPI} from "../base-api";
import {Http, Options} from "../../services/http-service";
import {host} from "../../constants";
import {ErrorResponse} from "../types";

const logOutAPIInstance = new Http(`${host}/api/v2/auth/logout`);

export class LogoutAPI extends BaseAPI {
  public create(options: Options): Promise<ErrorResponse | null> {
    return logOutAPIInstance.post<ErrorResponse | null>('', options)
      .then((data) => data); // Обрабатываем получение данных из сервиса далее
  }
}
