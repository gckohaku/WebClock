import { createStore, get } from "idb-keyval"
import type { UseStore } from "idb-keyval";

export const customStores: { [key: string]: UseStore } = {
	analogDotsOnCircleClock: createStore("analog-dots-on-circle-clock-db", "analog-dots-on-circle-clock"),
}

export const getClockParameter = async (clock: string, key: string, defaultValue: any = ""): Promise<any> => {

	return new Promise((resolve, reject) => {
		let ret: any = "";
		get(key, customStores[clock]).then((val) => {
			if (val) {
				ret = val;
			}
			else {
				ret = defaultValue;
			}

			resolve(ret);
			console.log(ret);
			console.log("end promise");
		});
	});
}