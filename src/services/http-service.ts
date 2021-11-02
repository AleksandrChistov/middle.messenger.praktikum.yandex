export enum Methods {
	GET = 'GET',
	PUT = 'PUT',
	POST = 'POST',
	DELETE = 'DELETE',
}

export type Options = {
	data: Record<string, any>;
	headers: Record<string, string>;
	timeout: number;
};

/**
 * На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
 * На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
 */
function queryStringify(data: Record<string, unknown> = {}) {
	return Object.entries(data).reduce((result, [key, value]) => {
		const ampersand = (result === '') ? '?' : '&';

		result += `${ampersand}${key}=${String(value)}`;

		return result;
	}, '');
}

export class HttpTransport {
	async get<T>(url: string, options: Options): Promise<T> {
		const stringData = queryStringify(options.data);
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
		{data, headers, method}: Options & {method: typeof Methods[keyof typeof Methods]},
		timeout = 5000,
	): Promise<T> {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open(method, url);

			Object.keys(headers).forEach(key => {
				xhr.setRequestHeader(key, headers[key]);
			});

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
