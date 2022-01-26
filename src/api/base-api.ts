import {Options} from '../services/http-service';

export class BaseApi {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async create(options: Options, ...rest: unknown[]): Promise<unknown> {
		throw new Error('Not implemented');
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async get(options: Options, ...rest: unknown[]): Promise<unknown> {
		throw new Error('Not implemented');
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async update(options: Options, ...rest: unknown[]): Promise<unknown> {
		throw new Error('Not implemented');
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async delete(options: Options, ...rest: unknown[]): Promise<unknown> {
		throw new Error('Not implemented');
	}
}
