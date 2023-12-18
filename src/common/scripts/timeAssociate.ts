export const arrayOfKindOfDateTime: {[key: string]: number} = {
	year: 1,
	month: 2,
	day: 3,
	hour: 4,
	minute: 5,
	second: 6,
	millisecond: 7,
} as const;

export type kindOfDateTime = typeof arrayOfKindOfDateTime[keyof typeof arrayOfKindOfDateTime]

export type timeAssociate = {begin: kindOfDateTime, end: kindOfDateTime}