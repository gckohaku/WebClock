import type { ClockPartsParameters } from "./ClockPartsParameters";

// 初期化処理 存在するものが古いバージョンであればアップグレード処理
export const indexedDbPreparation = () => {
	return new Promise<void>((resolve, reject) => {
		const upgradeRequest = indexedDB.open("gckohaku-web-clock-db", 3);

		upgradeRequest.onupgradeneeded = (e) => {
			const db = upgradeRequest.result;

			if (e.oldVersion < 1) {
				db.createObjectStore("edit-data-properties");
			}
			if (e.oldVersion < 2) {
				db.createObjectStore("before-edit-data-id");
			}
			if (e.oldVersion < 3) {
				db.createObjectStore("edit-data-settings");
			}

			db.close();
		}

		upgradeRequest.onsuccess = () => {
			resolve();
		}
	});
}

export const storeParameters = async (key: string, storeData: ClockPartsParameters) => {
	return new Promise<void>((resolve, reject) => {
		const dbRequest = window.indexedDB.open("gckohaku-web-clock-db");

		dbRequest.onerror = () => {
			console.log("database request error", dbRequest);
		}

		dbRequest.onsuccess = () => {
			console.log(dbRequest);
			const db = dbRequest.result;
			const trans = db.transaction(["edit-data-properties"], "readwrite");

			const store = trans.objectStore("edit-data-properties");

			const storeRequest = store.put(storeData, key);

			storeRequest.onsuccess = () => {
				console.log("store success");
				resolve();
			}

			db.close();
		}
	});


}

export const getBeforeEditDataId = async () => {

	return new Promise<string>((resolve, reject) => {
		const dbRequest = indexedDB.open("gckohaku-web-clock-db");

		dbRequest.onsuccess = () => {
			const db = dbRequest.result;
			const trans = db.transaction("before-edit-data-id", "readonly");
			const store = trans.objectStore("before-edit-data-id");
			const dataRequest = store.get("beforeEditDataId");

			dataRequest.onsuccess = () => {
				resolve(dataRequest.result);
			}

			trans.oncomplete = () => {
				db.close();
			}
		}
	});
}

export const storeEditDataId = async (id: string) => {
	console.log("in store edit data id");
	return new Promise<void>((resolve, reject) => {
		const dbRequest = indexedDB.open("gckohaku-web-clock-db");

		dbRequest.onsuccess = () => {
			const db = dbRequest.result;
			const trans = db.transaction("before-edit-data-id", "readwrite");
			const store = trans.objectStore("before-edit-data-id");
			const dataRequest = store.put(id, "beforeEditDataId");

			dataRequest.onsuccess = () => {
				resolve();
			}

			trans.oncomplete = () => {
				db.close();
			}
		}
	});
}

export const getClockParameters = async (id: string) => {
	return new Promise<ClockPartsParameters>((resolve, reject) => {
		const dbRequest = indexedDB.open("gckohaku-web-clock-db");

		dbRequest.onsuccess = () => {
			const db = dbRequest.result;
			const trans = db.transaction("edit-data-properties", "readonly");
			const store = trans.objectStore("edit-data-properties");
			const dataRequest = store.get(id);

			dataRequest.onsuccess = () => {
				if (dataRequest.result) {
					resolve(dataRequest.result);
				}
				else {
					resolve([]);
				}
			}

			dataRequest.onerror = () => {
				console.log("error");
			}

			trans.oncomplete = () => {
				db.close();
			}
		}
	});
}

export const getKeysFromParameters = () => {
	return new Promise<string[]>((resolve, reject) => {
		const dbRequest = indexedDB.open("gckohaku-web-clock-db");

		dbRequest.onsuccess = () => {
			const db = dbRequest.result;
			const trans = db.transaction("edit-data-properties", "readonly");
			const store = trans.objectStore("edit-data-properties");
			const dataRequest = store.getAllKeys();

			dataRequest.onsuccess = () => {
				console.log(dataRequest.result);
				resolve(dataRequest.result as string[]);
			}

			dataRequest.onerror = () => {
				console.log("error");
			}

			trans.oncomplete = () => {
				db.close();
			}
		}

		dbRequest.onerror = () => {
			console.log("db request error");
		}

		dbRequest.onblocked = () => {
			console.log("db request is blocked");
		}
	});
}

export const deleteParametersData = (id: string) => {
	return new Promise<void>((resolve, reject) => {
		const dbRequest = indexedDB.open("gckohaku-web-clock-db");

		dbRequest.onsuccess = () => {
			const db = dbRequest.result;
			const trans = db.transaction("edit-data-properties", "readwrite");
			const store = trans.objectStore("edit-data-properties");
			const storeRequest = store.delete(id);

			storeRequest.onsuccess = () => {
				console.log(storeRequest.result);

				storeRequest.onsuccess = () => {
					resolve();
				}
			}

			storeRequest.onerror = () => {
				console.log("error");
			}

			trans.oncomplete = () => {
				db.close();
			}
		}
	});
}

export const getEditSettings = (id: string) => {
	console.log("in get edit settings");
	return new Promise<ClockSettingData>((resolve, reject) => {
		const dbRequest = indexedDB.open("gckohaku-web-clock-db");

		dbRequest.onsuccess = () => {
			const db = dbRequest.result;
			const trans = db.transaction("edit-data-settings", "readonly");
			const store = trans.objectStore("edit-data-settings");
			const storeRequest = store.get(id);

			storeRequest.onsuccess = () => {
				resolve(storeRequest.result);
			}

			storeRequest.onerror = () => {
				console.log("error");
			}

			trans.oncomplete = () => {
				db.close();
			}
		}
	});
}

export const storeEditSettings = (id: string, setting: ClockSettingData) => {
	return new Promise<void>((resolve, reject) => {
		console.log("in store edit settings");
		const dbRequest = indexedDB.open("gckohaku-web-clock-db");

		dbRequest.onsuccess = () => {
			const db = dbRequest.result;
			const trans = db.transaction("edit-data-settings", "readwrite");
			const store = trans.objectStore("edit-data-settings");
			const dataRequest = store.put(setting, id);

			dataRequest.onsuccess = () => {
				resolve();
			}

			trans.oncomplete = () => {
				db.close();
			}
		}
	});
}

export const deleteEditSettings = (id: string) => {
	return new Promise<void>((resolve, reject) => {
		const dbRequest = indexedDB.open("gckohaku-web-clock-db");

		dbRequest.onsuccess = () => {
			const db = dbRequest.result;
			const trans = db.transaction("edit-data-settings", "readwrite");
			const store = trans.objectStore("edit-data-settings");
			const storeRequest = store.delete(id);

			storeRequest.onsuccess = () => {
				console.log(storeRequest.result);

				storeRequest.onsuccess = () => {
					resolve();
				}
			}

			storeRequest.onerror = () => {
				console.log("error");
			}

			trans.oncomplete = () => {
				db.close();
			}
		}
	});
}