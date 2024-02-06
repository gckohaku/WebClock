import type { ClockPartsParameters } from "./ClockPartsParameters";

// ストアが存在するか　無ければ作成
export const checkExistsStores = () => {
	console.log("in function");
	const dbRequest = indexedDB.open("gckohaku-web-clock-db-indexed");
	let existsPropertiesStore: boolean = false;
	let existsBeforeEditDataStore: boolean = false;
	let dbVersion: number = 0;

	dbRequest.onsuccess = () => {
		const db = dbRequest.result;
		existsPropertiesStore = db.objectStoreNames.contains("edit-data-properties");
		existsBeforeEditDataStore = db.objectStoreNames.contains("before-edit-data-id");
		dbVersion = db.version;

		console.log(existsPropertiesStore, existsBeforeEditDataStore, dbVersion);

		db.close();

		if (!(existsPropertiesStore && existsBeforeEditDataStore)) {
			console.log("create store");

			const upgradeRequest = indexedDB.open("gckohaku-web-clock-db-indexed", dbVersion + 1);
			upgradeRequest.onupgradeneeded = () => {
				const db = upgradeRequest.result;

				if (!existsPropertiesStore) {
					db.createObjectStore("edit-data-properties");
				}
				if (!existsBeforeEditDataStore) {
					db.createObjectStore("before-edit-data-id");
				}

				db.close();
				console.log("close db");
			}

			upgradeRequest.onerror = () => {
				console.log("accept error");
			}
		}
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

		const storeRequest = store.add(storeData, key);

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