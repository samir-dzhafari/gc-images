export class NavigationReadyError extends Error {
	constructor(cause: Error) {
		super(`Navigation is not ready: ${cause.message}`);
		this.name = 'NavigationReadyError';
	}
}
