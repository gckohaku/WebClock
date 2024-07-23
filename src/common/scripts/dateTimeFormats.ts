import { monthDays } from "@formkit/tempo";
import { DateTime } from "./DateTime";
import { monthNames } from "./monthNames";

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

export const replaceDateTimeFormats = (format: string, time: DateTime, lang: string): string => {
	console.log(monthNames.get(lang));

	let ret = format;

	ret = ret.replace(/\$yyyy/gi, time.year.toString());
	ret = ret.replace(/\$yy(?!y)/gi, time.year.toString().substring(2));
	ret = ret.replace(/\$Mth/g, monthNames.get(lang)!.months[time.month - 1].short);
	ret = ret.replace(/\$Month/g, monthNames.get(lang)!.months[time.month - 1].long);
	ret = ret.replace(/\$MM/g, time.month.toString().padStart(2, "0"));
	ret = ret.replace(/\$M(?!M)/g, time.month.toString());
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
	ret = ret.replace(/\$tt\((.+?):(.+)\)/gi, (m: string, ...args: any[]) => {
		const hour = time.hour;

		if (hour % 12 === 0 && time.minute === 0 && time.second === 0) {
			return "";
		}
		if (hour < 12) {
			return args[0];
		}
		return args[1];
	});

	return ret;
}