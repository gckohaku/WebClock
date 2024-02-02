// @ts-nocheck





// const request = window.indexedDB.open("gckohaku-web-clock-db");

// let db: IDBDatabase;
// request.onsuccess = (event: Event) => {
//   console.log("success", event);
//   db = (event.target as IDBRequest<IDBDatabase>).result;
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
const request = window.indexedDB.open("gckohaku-web-clock-db");

let db;
request.onsuccess = (event) => {
	console.log("success", event);
	db = event.target.result;
}

let transaction = db.transaction(["edit-data-properties"], "readonly");

const objectStore = transaction.objectStore("edit-data-properties");

const request = objectStore.get("2024-02-02 14:16:47");

request.onerror = (event) => {
	console.log(event);
};
request.onsuccess = (event) => {
	// request.result に対して行う処理!
	console.log(`${request.result[0].parameters}`); // => [object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]
};