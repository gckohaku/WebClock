import { IObserver } from "../utilities/IObserver";
import { ISubject } from "../utilities/ISubject";

export class MenuClickEvent implements ISubject {
	private observers: IObserver[];

	addObserver: (observer: IObserver) => void;
	deleteObserver: (observer: IObserver) => void;
	notifyObservers: () => void;
	getState: () => any;
}