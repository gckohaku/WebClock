export class EditPageEvent {
	private callbacks: ((arg: unknown) => void)[] = [];

	addAction(callback: (...args: any[]) => void): void {
		this.callbacks.push(callback);
	}

	fire(...args: any[]): void {
		for(const callback of this.callbacks) {
			callback(args);
		}
	}
}