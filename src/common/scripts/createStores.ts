import { createStore } from "idb-keyval"

export const customStores = {
	analogDotsOnCircleClock: createStore("analog-dots-on-circle-clock-db", "analog-dots-on-circle-clock"),
}