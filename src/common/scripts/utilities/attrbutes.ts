// export type Attributes<T> = {[P in keyof T]: T[P] extends (...args: any[]) => any ? never : P}[keyof T];

export type Attributes<T> = Partial<T>;