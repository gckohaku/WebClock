import { resolveTypeElements } from "vue/compiler-sfc";
import type { ClockPartsParameters, SingleUnitParameters } from "./ClockPartsParameters";

const openDb = (dbName: string) => {
	console.log("open " + dbName);
	return new Promise<IDBDatabase>(resolve => {
		const dbRequest = indexedDB.open(dbName);
		dbRequest.onsuccess = () => {
			resolve(dbRequest.result);
		}
	});
}

const openDbWithUpgrade = (dbName: string, version: number) => {
	console.log("open " + dbName);

	return new Promise<IDBDatabase>(resolve => {
		const dbRequest = indexedDB.open(dbName, version);
		dbRequest.onsuccess = () => {
			resolve(dbRequest.result);
		}
	});
}

const closeDb = (db: IDBDatabase) => {
	console.log("close" + db.name);
	return new Promise<void>(resolve => {
		db.onclose = () => {
			resolve;
		};

		db.close();
	});
}

const checkExistsStores = (db: IDBDatabase) => {
	console.log("check exists");
	return new Promise<{ existsProperties: boolean, existsBeforeEditData: boolean, version: number }>(resolve => {
		let existsProperties: boolean = false;
		let existsBeforeEditData: boolean = false;
		let version: number = 0;

		existsProperties = db.objectStoreNames.contains("edit-data-properties");
		existsBeforeEditData = db.objectStoreNames.contains("before-edit-data-id");
		version = db.version;

		const data = {
			existsProperties: existsProperties,
			existsBeforeEditData: existsBeforeEditData,
			version: version,
		}

		db.onerror = () => {
			console.log("error");
		}

		db.close();

		setTimeout(() => {
			resolve(data);
		}, 1000);
	});
}

const createMissingStore = (data: { existsProperties: boolean, existsBeforeEditData: boolean, version: number }) => {
	console.log(data.existsProperties, data.existsBeforeEditData, data.version);

	return new Promise<void>((resolve, reject) => {
		if (!(data.existsProperties && data.existsBeforeEditData)) {
			console.log("create store");

			const upgradeRequest = indexedDB.open("gckohaku-web-clock-db", data.version + 1);

			upgradeRequest.onsuccess = () => {
				console.log("success");
			}

			upgradeRequest.onupgradeneeded = () => {
				const db = upgradeRequest.result;

				if (!data.existsProperties) {
					db.createObjectStore("edit-data-properties");
				}
				if (!data.existsBeforeEditData) {
					db.createObjectStore("before-edit-data-id");
				}

				db.close();
				console.log("close db");
				resolve();
			}

			upgradeRequest.onblocked = (e) => {
				console.log("why", e.currentTarget);
				reject("upgrade blocked");
			}
		}
	});
}

// 初期化処理 存在するものが古いバージョンであればアップグレード処理
export const indexedDbPreparation = () => {
	console.log("in function");

	const upgradeRequest = indexedDB.open("gckohaku-web-clock-db-test", 2);

	upgradeRequest.onupgradeneeded = (e) => {
		const db = upgradeRequest.result;

		if (e.oldVersion < 1) {
			db.createObjectStore("edit-data-properties");
		}
		if (e.oldVersion < 2) {
			db.createObjectStore("before-edit-data-id");
		}

		db.close();
	}

	upgradeRequest.onblocked = () => {
		console.log("blocked");
	}
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
		const dbRequest = indexedDB.open("gckohaku-before-edit-db");

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
	return new Promise<void>((resolve, reject) => {
		const dbRequest = indexedDB.open("gckohaku-before-edit-db");

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
				console.log(dataRequest.result);
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
	});
}

export const deleteParametersData = (id: string) => {
	return new Promise<boolean>((resolve, reject) => {
		const dbRequest = indexedDB.open("gckohaku-web-clock-db");

		dbRequest.onsuccess = () => {
			const db = dbRequest.result;
			const trans = db.transaction("edit-data-properties", "readwrite");
			const store = trans.objectStore("edit-data-properties");
			const storeRequest = store.delete(id);

			storeRequest.onsuccess = () => {
				console.log(storeRequest.result);

				storeRequest.onsuccess = () => {
					resolve(true);
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

// const request = window.indexedDB.open("gckohaku-web-clock-db-indexed");

// let db: IDBDatabase;
// request.onsuccess = (event: Event) => {
// 	console.log("success", event);
// 	db = (event.target as IDBRequest<IDBDatabase>).result;
// }

// let transaction = db!.transaction(["edit-data-properties"], "readonly");

// transaction.oncomplete = (event: Event) => {
// 	console.log("complete", event);
// }

// transaction.onerror = (event: Event) => {
// 	console.log("error", event);
// }

// const objectStore = transaction.objectStore("edit-data-properties");






/* JavaScript バージョン */
// const dbRequest = window.indexedDB.open("gckohaku-web-clock-db");

// let db;
// dbRequest.onsuccess = (event) => {
// 	console.log("success", event);
// 	db = event.target.result;
// }

// let transaction = db.transaction(["edit-data-properties"], "readonly");

// const objectStore = transaction.objectStore("edit-data-properties");

// const request = objectStore.get("2024-02-02 00:51:34");

// request.onerror = (event) => {
// 	console.log(event);
// };
// request.onsuccess = (event) => {
// 	// request.result に対して行う処理!
// 	console.log(`${request.result[0].parameters[0]}`);
// };


// // test 用データベースを作成して色々と試してみる
// const testData = [
// 	{ id: "testA", test: "test value A", alpha: "alpha" },
// 	{ id: "testB", test: "test value B", alpha: "beta" },
// ];

// let dbRequest = window.indexedDB.open("testDB", 1);

// dbRequest.onupgradeneeded = (e) => {
// 	const db = e.target.result;
// 	const objectStore = db.createObjectStore("testStore", { keyPath: "id" });
// 	objectStore.createIndex("test", "test", { unique: false });
// 	objectStore.createIndex("alpha", "alpha", { unique: false });

// 	db.close();
// }

// dbRequest = window.indexedDB.open("testDB");

// dbRequest.onsuccess = (e) => {
// 	let db = e.target.result;
// 	let trans = db.transaction("testStore", "readwrite");
// 	let store = trans.objectStore("testStore");

// 	for (const data of testData) {
// 		store.put(data).onsuccess = () => console.log("success");
// 	}
// }




// // 別の方法

// let dbRequest = window.indexedDB.open("testDB", 2);

// dbRequest.onupgradeneeded = (e) => {
// 	const db = e.target.result;
// 	const objectStore = db.createObjectStore("second");

// 	db.close();
// }

// dbRequest = window.indexedDB.open("testDB");

// dbRequest.onsuccess = (e) => {
// 	let db = e.target.result;
// 	let trans = db.transaction("second", "readwrite");
// 	let store = trans.objectStore("second");

// 	store.put("test", "key1").onsuccess = () => console.log("success");
// }