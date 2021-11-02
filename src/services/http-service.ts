export enum METHODS {
	GET = 'GET',
	PUT = 'PUT',
	POST = 'POST',
	DELETE = 'DELETE',
}

type Options = {
	data: Record<string, any>,
	headers: Record<string, string>,
	timeout: number;
};

/**
 * На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
 * На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
 */
function queryStringify(data: Record<string, any> = {}) {
	return Object.entries(data).reduce((result, [key, value]) => {
		const ampersand = (result === '') ? '?' : '&';

		return result += `${ampersand}${key}=${value}`;
	}, '');
}

export class HTTPTransport {
	get<T>(url: string, options: Options): Promise<T> {
		const stringData = queryStringify(options.data);
		const processedUrl = stringData ? url + stringData : url;

		return this.request<T>(processedUrl, {...options, method: METHODS.GET}, options.timeout);
	};

	put<T>(url: string, options: Options): Promise<T> {
		return this.request<T>(url, {...options, method: METHODS.PUT}, options.timeout);
	};

	post<T>(url: string, options: Options): Promise<T> {
		return this.request<T>(url, {...options, method: METHODS.POST}, options.timeout);
	};

	delete<T>(url: string, options: Options): Promise<T> {
		return this.request<T>(url, {...options, method: METHODS.DELETE}, options.timeout);
	};

	request<T>(url: string, {data, headers, method}: Options & {method: typeof METHODS[keyof typeof METHODS]}, timeout = 5000): Promise<T> {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open(method, url);

			for (const key in headers) {
				xhr.setRequestHeader(key, headers[key]);
			}

			xhr.onload = () => {
				resolve(xhr.response);
			};

			xhr.onerror = error => { reject(new Error(`Field due to ${error}`)); };
			xhr.ontimeout = () => { reject(new Error(`The timeout ${timeout} is out`)); };

			xhr.timeout = timeout;

			if (method === METHODS.GET && !data) {
				xhr.send();
			} else {
				xhr.send(JSON.stringify(data));
			}
		});
	};
}
