import {Route} from './route';
import {BlockInheritor} from './types';
import {authService} from '../../services/auth-service';

export class Router {
	private static __instance: Router;
	private _currentRoute: Route | null;
	private readonly _rootQuery: string;
	private _fallBackPathName: string;

	private readonly _routes: Route[];
	private readonly _availableUrls: string[] = [];
	private readonly _history: History;

	constructor(rootQuery: string) {
		if (Router.__instance) {
			// eslint-disable-next-line no-constructor-return
			return Router.__instance;
		}

		this._routes = [];
		this._history = window.history;
		this._currentRoute = null;
		this._rootQuery = rootQuery;

		Router.__instance = this;
	}

	use(pathname: string, block: BlockInheritor): this {
		const route = new Route(pathname, block, {rootQuery: this._rootQuery});
		this._routes.push(route);
		return this;
	}

	setAvailableUrl(pathname: string): this {
		this._availableUrls.push(pathname);
		return this;
	}

	setFallBack(pathname: string, block: BlockInheritor) {
		this.use(pathname, block);
		this._fallBackPathName = pathname;
		return this;
	}

	start() {
		window.onpopstate = event => {
			this._onRoute(event.currentTarget.location.pathname);
		};

		this._onRoute(window.location.pathname);
	}

	_onRoute(pathname: string) {
		let route: Route;

		if (authService.isAuthorized || this._availableUrls.includes(pathname)) {
			route = this.getRoute(pathname) || this.getRoute(this._fallBackPathName);
		} else {
			this._history.pushState({}, '', '/');
			route = this.getRoute('/');
		}

		if (!route) {
			return;
		}

		if (this._currentRoute) {
			this._currentRoute.leave();
		}

		this._currentRoute = route;

		route.render();
	}

	go(pathname: string) {
		this._history.pushState({}, '', pathname);
		this._onRoute(pathname);
	}

	back() {
		this._history.back();
	}

	forward() {
		this._history.forward();
	}

	getRoute(pathname: string): Route | undefined {
		return this._routes.find(route => route.match(pathname));
	}
}
