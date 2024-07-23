/*
	それぞれの言語での月の呼び方が載っているサイト
	https://www.asahi-net.or.jp/~ax2s-kmtn/ref/date.html#month
*/

export const monthNames = new Map<string, {languageName: string, months: {short: string, long: string}[]}>();

monthNames.set("ja", {
	languageName: "日本語",
	months: [
		{short: "睦月", long: "睦月"},
		{short: "如月", long: "如月"},
		{short: "弥生", long: "弥生"},
		{short: "卯月", long: "卯月"},
		{short: "皐月", long: "皐月"},
		{short: "水無月", long: "水無月"},
		{short: "文月", long: "文月"},
		{short: "葉月", long: "葉月"},
		{short: "長月", long: "長月"},
		{short: "神無月", long: "神無月"},
		{short: "霜月", long: "霜月"},
		{short: "師走", long: "師走"},
	],
});
monthNames.set("en", {
	languageName: "English",
	months: [
		{short: "Jan.", long: "January"},
		{short: "Feb.", long: "February"},
		{short: "Mar.", long: "March"},
		{short: "Apr.", long: "April"},
		{short: "May", long: "May"},
		{short: "Jun.", long: "June"},
		{short: "Jul.", long: "July"},
		{short: "Aug.", long: "August"},
		{short: "Sep.", long: "September"},
		{short: "Oct.", long: "October"},
		{short: "Nov.", long: "November"},
		{short: "Dec.", long: "December"},
	],
});
monthNames.set("fr", {
	languageName: "Français",
	months: [
		{short: "janv.", long: "janvier"},
		{short: "févr.", long: "février"},
		{short: "mars", long: "mars"},
		{short: "avr.", long: "avril"},
		{short: "mai", long: "mai"},
		{short: "juin", long: "juin"},
		{short: "juill.", long: "juillet"},
		{short: "août", long: "août"},
		{short: "Sep.", long: "septembre"},
		{short: "Oct.", long: "October"},
		{short: "Nov.", long: "novembre"},
		{short: "Dec.", long: "décembre"},
	],
});
monthNames.set("ru", {
	languageName: "Русский",
	months: [
		{short: "Янв.", long: "Январь"},
		{short: "Февр.", long: "Февраль"},
		{short: "Март", long: "Март"},
		{short: "Апр.", long: "Апрель"},
		{short: "Май", long: "Май"},
		{short: "Июнь", long: "Июнь"},
		{short: "Июль", long: "Июль"},
		{short: "Авг.", long: "Август"},
		{short: "Сент.", long: "Сентябрь"},
		{short: "Окт.", long: "Октябрь"},
		{short: "Ноябрь", long: "Ноябрь"},
		{short: "Дек.", long: "Декабрь"},
	],
});