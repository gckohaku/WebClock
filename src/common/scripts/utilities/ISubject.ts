import type { IObserver } from "./IObserver";

export interface ISubject {
	// private observers: IObserver[];

	addObserver: (observer: IObserver) => void;
	deleteObserver: (observer: IObserver) => void;
	notifyObservers: () => void;
	getState: () => any;
}