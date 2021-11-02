export enum METHODS {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE',
}

type Options = {
    data: {
        [key: string]: any
    },
    headers: {
        [key: string]: string
    },
    timeout: number
}

/**
 * На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
 * На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
 */
function queryStringify(data: { [key: string]: any } = {}) {
    return Object.entries(data).reduce((result, [key, value]) => {
        const ampersand = (result === '') ? '?' : '&';

        return result += `${ampersand}${key}=${value}`;
    }, '')
}

class HTTPTransport {
    get<T>(url, options: Options): Promise<T> {
        const stringData = queryStringify(options.data);
        const processedUrl = stringData ? url + stringData : url;

        return this.request<T>(processedUrl, {...options, method: METHODS.GET}, options.timeout);
    };

    put<T>(url, options: Options): Promise<T> {
        return this.request<T>(url, {...options, method: METHODS.PUT}, options.timeout);
    };

    post<T>(url, options: Options): Promise<T> {
        return this.request<T>(url, {...options, method: METHODS.POST}, options.timeout);
    };

    delete<T>(url, options: Options): Promise<T> {
        return this.request<T>(url, {...options, method: METHODS.DELETE}, options.timeout);
    };

    request<T>(url, {data, headers, method}, timeout = 5000): Promise<T> {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);

            for (let key in headers) {
                xhr.setRequestHeader(key, headers[key]);
            }

            xhr.onload = () => {
                resolve(xhr.response);
            }

            xhr.onerror = (error) => reject(new Error(`Field due to ${error}`));
            xhr.ontimeout = () => reject(new Error(`The timeout ${timeout} is out`));

            xhr.timeout = timeout;

            if (method === METHODS.GET && !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        })
    };
}
