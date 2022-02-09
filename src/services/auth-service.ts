class AuthService {
	private _isAuthorized: boolean;

	constructor() {
		const isAuthorized = localStorage.getItem('isAuthorized');

		this._isAuthorized = isAuthorized === 'true';
	}

	get isAuthorized(): boolean {
		return this._isAuthorized;
	}

	logIn(): void {
		localStorage.setItem('isAuthorized', 'true');
		this._isAuthorized = true;
	}

	logOut(): void {
		localStorage.setItem('isAuthorized', 'false');
		this._isAuthorized = false;
	}
}

export const authService = new AuthService();
