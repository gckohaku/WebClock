export class DateTime {
	year: number;
	month: number;
	day: number;
	hour: number;
	minute: number;
	second: number;
	millisecond: number;

	constructor() {
		const now: Date = new Date();
		this.year = now.getFullYear();
		this.month = now.getMonth();
		this.day = now.getDay();
		this.hour = now.getHours();
		this.minute = now.getMinutes();
		this.second = now.getSeconds();
		this.millisecond = now.getMilliseconds();
	}

	update() {
		const now: Date = new Date();
		this.year = now.getFullYear();
		this.month = now.getMonth();
		this.day = now.getDay();
		this.hour = now.getHours();
		this.minute = now.getMinutes();
		this.second = now.getSeconds();
		this.millisecond = now.getMilliseconds();
	}
}