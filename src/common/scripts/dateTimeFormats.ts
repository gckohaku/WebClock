import { DateTime } from "./DateTime";

export const dateTimeFormatsArray: RegExp[] = [
	/\$yyyy(?!y)/g,
	/\$yy(?!y)/g,
	/\$MM(?!M)/g,
	/\$M(?!M)/g,
	/\$Mth/g,
	/\$Month/g,
	/\$dd(?!d)/g,
	/\$d(?!d)/g,
	/\$hh(?!h)/g,
	/\$h(?!h)/g,
	/\$HH(?!H)/g,
	/\$H(?!H)/g,
	/\$mm(?!m)/g,
	/\$ss(?!s)/g,
	/\$f{1,3}/g,
	/\$F{1,3}/g,
	/\$tt\((?<am>.+?):(?<pm>.+)\)/g,
];

export const replaceDateTimeFormats = (format: string, time: DateTime): string => {
	let ret = format;

	ret = ret.replace(/\$yyyy/gi, time.year.toString());
	ret = ret.replace(/\$yy(?!y)/gi, time.year.toString().substring(2));
	ret = ret.replace(/\$MM/g, time.month.toString().padStart(2, "0"));
	ret = ret.replace(/\$M(?!M)/g, time.month.toString());
	// $Mth
	// $Month
	ret = ret.replace(/\$dd/g, time.day.toString().padStart(2, "0"));
	ret = ret.replace(/\$d(?!d)/g, time.day.toString());
	ret = ret.replace(/\$hh/g, time.hour.toString().padStart(2, "0"));
	ret = ret.replace(/\$h(?!h)/g, time.hour.toString());
	ret = ret.replace(/\$HH/g, (time.hour % 12).toString().padStart(2, "0"));
	ret = ret.replace(/\$H(?!H)/g, (time.hour % 12).toString());
	ret = ret.replace(/\$mm/g, time.minute.toString().padStart(2, "0"));
	ret = ret.replace(/\$m(?!m)/g, time.minute.toString());
	ret = ret.replace(/\$ss/g, time.second.toString().padStart(2, "0"));
	ret = ret.replace(/\$s(?!s)/g, time.second.toString());
	ret = ret.replace(/\$fff/gi, time.millisecond.toString().padStart(3, "0"));
	ret = ret.replace(/\$ff(?!f)/gi, time.millisecond.toString().padStart(3, "0").substring(0, 2));
	ret = ret.replace(/\$f(?!f)/gi, time.millisecond.toString().padStart(3, "0")[0]);
	// $tt(am:pm)

	return ret;
}