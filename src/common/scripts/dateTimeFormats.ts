import { DateTime } from "./DateTime";

export const dateTimeFormatsArray: RegExp[] = [
	/\$yyyy(?!y)/g,
	/(?<!(\$|y))yy(?!y)/g,
	/(?<!(\$|M))MM(?!M)/g,
	/(?<!(\$|M))M(?!M)/g,
	/(?<!\$)Mth/g,
	/(?<!\$)Month/g,
	/(?<!(\$|d))dd(?!d)/g,
	/(?<!(\$|d))d(?!d)/g,
	/(?<!(\$|h))hh(?!h)/g,
	/(?<!(\$|h))h(?!h)/g,
	/(?<!(\$|H))HH(?!H)/g,
	/(?<!(\$|H))H(?!H)/g,
	/(?<!(\$|m))mm(?!m)/g,
	/(?<!(\$|s))ss(?!s)/g,
	/(?<!\$)f{1,3}/g,
	/(?<!\$)F{1,3}/g,
	/(?<!(\$|t))tt\((?<am>.+?):(?<pm>.+)\)/g,
];

export const replaceDateTimeFormats: ((format: string, time: DateTime) => string)[] = [
	(format: string, time: DateTime): string => {
		const replaceString = time.year;
		
		return "";
	}
]