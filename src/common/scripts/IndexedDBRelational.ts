import type { ClockPartsParameters } from "./ClockPartsParameters";

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

// ストアが存在するか　無ければ作成
export const indexedDbPreparation = () => {
	console.log("in function");
	
	const upgradeRequest = indexedDB.open("gckohaku-web-clock-db-test", 2);
	
	upgradeRequest.onupgradeneeded = (e) => {
		const db = upgradeRequest.result;

		if (e.oldVersion < 1) {
			db.createObjectStore("edit-data-properties");
		}
		if (e.oldVersion < 2 ) {
			db.createObjectStore("before-edit-data-id");
		}

		db.close();
	}

	upgradeRequest.onblocked = () => {
		console.log("blocked");
	}
}

export const storeParametersToIndexeddb = (key: string, storeData: ClockPartsParameters) => {
	const dbRequest = window.indexedDB.open("gckohaku-web-clock-db");

	dbRequest.onerror = () => {
		console.log("database request error", dbRequest);
	}

	dbRequest.onsuccess = () => {
		console.log(dbRequest);
		const db = dbRequest.result;
		const trans = db.transaction(["edit-data-properties"], "readwrite");

		trans.onabort = () => {
			if (trans.error) {
				console.log("transaction abort", trans.error.message);
			}
			else {
				console.log("onabort but not error message");
			}
		}

		trans.onerror = () => {
			if (trans.error) {
				console.log("transaction error", trans.error.message);
			}
			else {
				console.log("onerror but not error message");
			}
		}

		const store = trans.objectStore("edit-data-properties");

		const storeRequest = store.put(storeData, key);

		storeRequest.onerror = () => {
			if (storeRequest.error) {
				console.log("store request error", storeRequest.error.message);
			}
			else {
				console.log("onerror but not error message");
			}
		}

		storeRequest.onsuccess = () => {
			console.log("store success");
		}

		db.onclose = () => {
			console.log("closing database");
		};

		db.close();
	}
}

export const getBeforeEditDataId = async () => {
	console.log("in function");

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