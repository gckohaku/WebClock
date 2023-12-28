import { type IObserver } from "../utilities/IObserver";
import { type ISubject } from "../utilities/ISubject";

export class MenuClickEvent implements ISubject {
	private observers: IObserver[] = [];

	addObserver(observer: IObserver): void {
		this.observers.push(observer);
	}

	deleteObserver(observer: IObserver): void {
		const index = this.observers.indexOf(observer);
		this.observers.splice(index, 1);
	}

	notifyObservers(): void {
		for (const observer of this.observers) {
			observer.update(this);
		}
	}

	getState(): any {

	}
}