export const isString = (data: unknown): data is string => {
	return typeof data === "string";
}

export const isNumber = (data: unknown): data is number => {
	return typeof data === "number";
}

export const isBoolean = (data: unknown): data is boolean => {
	return typeof data === "boolean";
}

export const isObject = (data: unknown): data is object => {
	return typeof data === "object" && data !== null;
}

export const isSymbol = (data: unknown): data is symbol => {
	return typeof data === "symbol";
}

export const isFunction = (data: unknown): data is Function => {
	return typeof data === "function";
}

export const isBigint = (data: unknown): data is bigint => {
	return typeof data === "bigint";
}

export const isUndefined = (data: unknown): data is undefined => {
	return typeof data === "undefined";
}

export const isArrayString = (data: unknown): data is Array<string> => {
	if (!Array.isArray(data)) {
		return false;
	}

	for (const unit of data) {
		if (!isString(unit)) {
			return false;
		}
	}

	return true;
}