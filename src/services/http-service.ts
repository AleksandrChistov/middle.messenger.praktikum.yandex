import {queryStringify} from "../utils";
import {Indexed} from "../core/types";

export enum Methods {
	GET = 'GET',
	PUT = 'PUT',
	POST = 'POST',
	DELETE = 'DELETE',
}

export enum ResponseType {
  default = '',
  text = 'text',
  arraybuffer = 'arraybuffer',
  blob = 'blob',
  document = 'document',
  json = 'json',
}

export type Options = {
	data?: Indexed;
	headers?: Record<string, string>;
	timeout?: number;
  withCredentials?: boolean;
  responseType?: ResponseType;
};

export class Http {
  private _baseUrl: string;

  constructor(baseUrl: string) {
    this._baseUrl = baseUrl;
  }

	async get<T>(url: string, options: Options = {} as Options): Promise<T> {
		const stringData = options.data ? queryStringify(options.data) : null;
		const processedUrl = stringData ? url + stringData : url;

		return this.request<T>(processedUrl, {...options, method: Methods.GET}, options.timeout);
	}

	async put<T>(url: string, options: Options): Promise<T> {
		return this.request<T>(url, {...options, method: Methods.PUT}, options.timeout);
	}

	async post<T>(url: string, options: Options): Promise<T> {
		return this.request<T>(url, {...options, method: Methods.POST}, options.timeout);
	}

	async delete<T>(url: string, options: Options): Promise<T> {
		return this.request<T>(url, {...options, method: Methods.DELETE}, options.timeout);
	}

	async request<T>(
		url: string,
		{
      data,
      headers = {},
      method,
      withCredentials,
      responseType = ResponseType.default
    }: Options & {method: typeof Methods[keyof typeof Methods]},
		timeout = 5000,
	): Promise<T> {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open(method, `${this._baseUrl}${url}`);

      xhr.responseType = responseType;

			Object.keys(headers).forEach(key => {
				xhr.setRequestHeader(key, headers[key]);
			});

      if (withCredentials) {
        xhr.withCredentials = true;
      }

			xhr.onload = () => {
				resolve(xhr.response);
			};

			xhr.onerror = () => {
				reject(new Error(`An error occurred while sending: ${xhr.status}`));
			};

			xhr.ontimeout = () => {
				reject(new Error(`The timeout ${timeout} is out`));
			};

			xhr.timeout = timeout;

			if (method === Methods.GET && !data) {
				xhr.send();
			} else {
				xhr.send(JSON.stringify(data));
			}
		});
	}
}
