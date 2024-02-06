import type { ClockPartsParameters } from "./ClockPartsParameters";

export const storeParametersToIndexeddb = (key: string, storeData: ClockPartsParameters) => {
	const dbRequest = window.indexedDB.open("gckohaku-web-clock-db-indexed");

	dbRequest.onerror = function(e: Event) {
		console.log("database request error", e.target);
	}

	dbRequest.onsuccess = function(e: Event) {
		console.log(e.target);
		const db = (e.target as IDBRequest<IDBDatabase>).result;
		const trans = db.transaction(["edit-data-properties"], "readwrite");

		trans.onabort = function(e: Event) {
			console.log("transaction abort", e.target);
		}

		trans.onerror = function(e: Event) {
			console.log("transaction error", e.target);
		}

		trans.onabort = function(e: Event) {
			console.log("transaction abort", e.target);
		}

		const store = trans.objectStore("edit-data-properties");

		const storeRequest = store.put(storeData, key);

		storeRequest.onerror = function(e: Event) {
			console.log("store request error", e.target);
		}

		storeRequest.onsuccess = function(e: Event) {
			console.log("store success");
		}
		
		db.onclose = (e: Event) => {
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