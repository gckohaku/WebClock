export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const withDefault = <T>(init: Partial<T>, dfl: T) => 
    <K extends keyof T>(key: K, deepCopy: boolean = true): T[K] => 
        (init[key] === undefined
            ? dfl[key]
            : (deepCopy
                ? deepCopyValues( init[key] as T[K] )
                : init[key] as T[K]));

export const isPrimitive = (value: any): boolean => {
    switch (typeof value) {
        case "bigint":
        case "boolean":
        case "number":
        case "string":
        case "symbol":
        case "undefined":
            return true;
        default:
            return false;
    }
}

export const deepCopyValues = (source: any): any => {
    if (isPrimitive(source)) {
        return source;
    }
    if (Array.isArray(source)) {
        return source.map(deepCopyValues);
    }
    return JSON.parse(JSON.stringify(source));
}