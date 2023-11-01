import { createStore, get } from "idb-keyval"
import type { UseStore } from "idb-keyval";

export const customStores: {[key: string]: UseStore} = {
	analogDotsOnCircleClock: createStore("analog-dots-on-circle-clock-db", "analog-dots-on-circle-clock"),
}

export const getClockParameter = (clock: string, key: string, defaultValue: any = ""): any => {
	let ret: any = "";
	get(key, customStores[clock]).then((val) => {ret = val; console.log(ret); return ret;}).catch((err) => {ret = defaultValue; console.log(err)});
}