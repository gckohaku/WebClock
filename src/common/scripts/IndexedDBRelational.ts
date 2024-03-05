import { dataNamesStore } from "@/stores/dataNames";
import type { ClockPartsParameters, SingleUnitParameters } from "./ClockPartsParameters";
import { DataStoredInputData } from "./DataStoredInputData";
import type { InputDataContents } from "./InputDataContents";

// 初期化処理 存在するものが古いバージョンであればアップグレード処理
export const indexedDbPreparation = () => {
	return new Promise<void>((resolve, reject) => {
		const upgradeRequest = indexedDB.open("gckohaku-web-clock-db", 4);

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
			if (e.oldVersion < 4) {
				// const trans = db.transaction("edit-data-properties", "readwrite");
				// const store = trans.objectStore("edit-data-properties");
				// const dataRequest = store.getAll();
				// const keyRequest = store.getAllKeys();

				// dataRequest.onsuccess = () => {
				// 	keyRequest.onsuccess = () => {
				// 		const properties = dataRequest.result;
				// 		const keys = keyRequest.result;

				// 		properties.forEach((data: [], index: number) => {
				// 			// console.log(properties[index], keys[index]);

				// 			const editDataRequest = store.get(keys[index]);

				// 			editDataRequest.onsuccess = () => {
				// 				const data: InputDataContents[] = editDataRequest.result;
				// 				const storeData: StoredEditData = [];

				// 				for (const datum of data) {
				// 					storeData.push(<DataStoredInputParameters>{
				// 						propertyCode: datum.propertyCode,
				// 						heading: datum.heading,
				// 						reactiveValue: datum.reactiveValue,
				// 					});
				// 				}

				// 				const storeRequest = store.put(storeData, keys[index]);
				// 			}
				// 		});
				// 	}
				// }
			}

			db.onversionchange = (e) => {
				if (e.oldVersion >= 4) {
					db.close();
					return;
				}


				db.close();
			}
		}

		upgradeRequest.onsuccess = () => {


			console.log("success");

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
			storeBySmallEditData(key, dbRequest, storeData);

			// const db = dbRequest.result;
			// const trans = db.transaction(["edit-data-properties"], "readwrite");

			// const store = trans.objectStore("edit-data-properties");

			// const storeRequest = store.put(storeData, key);

			// storeRequest.onsuccess = () => {
			// 	resolve();
			// }

			// db.close();
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

export const getFromSmallEditData = (key: string, list: typeof SingleUnitParameters[]) => {
	return new Promise<ClockPartsParameters>((resolve, reject) => {
		const dbRequest = indexedDB.open("gckohaku-web-clock-db");

		dbRequest.onsuccess = () => {
			const db = dbRequest.result;
			const trans = db.transaction("edit-data-properties", "readwrite");
			const store = trans.objectStore("edit-data-properties");
			const dataRequest = store.get(key);

			dataRequest.onsuccess = () => {
				const data: DataStoredInputData[] = dataRequest.result;
				const retParameters: ClockPartsParameters = [];
				for (const unit of data) {
					const heading: string = unit.heading;
					const objClass = list.find((e) => e.staticHeading === unit.heading);
					if (objClass) {
						const obj = new objClass();
						for (const param of obj.parameters) {
							const pick = unit.parameters.find((e) => e.propertyCode === param.propertyCode);
							if (pick) {
								param.propertyCode = pick.propertyCode;
								param.heading = pick.heading;
								param.reactiveValue = pick.reactiveValue;
							}
						}
						retParameters.push(obj);
					}
				}

				resolve(retParameters);
			}
		}
	});
}

export const storeBySmallEditData = (id: string, dbRequest: IDBOpenDBRequest, properties: ClockPartsParameters) => {
	return new Promise<void>((resolve, reject) => {
		const db = dbRequest.result;
		const trans = db.transaction("edit-data-properties", "readwrite");
		const store = trans.objectStore("edit-data-properties");

		const storeDataContainer: DataStoredInputData[] = [];

		console.log(properties);

		properties.forEach((data: SingleUnitParameters, index: number) => {
			const storeData: DataStoredInputData = new DataStoredInputData();
			storeData.heading = data.heading;

			for (const datum of data.parameters) {
				console.log(storeData);
				storeData.parameters.push({
					propertyCode: datum.propertyCode,
					heading: datum.heading ?? "",
					reactiveValue: datum.reactiveValue,
				});
			}

			storeDataContainer.push(storeData);
		});

		store.put(storeDataContainer, id);

		resolve();
	});
}