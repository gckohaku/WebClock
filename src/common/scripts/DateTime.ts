import { arrayOfKindOfDateTime as timeKind, type kindOfDateTime, type timeAssociate } from "./timeAssociate";

// 現在の日時を取得して、そのデータをもとに処理を行うクラス
export class DateTime {
	// 月の日数の累積和 (うるう年を考慮しない)
	private _runningTotalOfEveryMonth: Array<number> = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];

	year: number;
	month: number;
	day: number;
	hour: number;
	minute: number;
	second: number;
	millisecond: number;

	private isLeapYear(): boolean {
		if (this.year % 4) {
			if (this.year % 100) {
				if (this.year % 400) {
					return true;
				}
				return false;
			}
			return true;
		}
		return false;
	}

	private getDaysOfMonth(): number {
		return this._runningTotalOfEveryMonth[this.month] - this._runningTotalOfEveryMonth[this.month - 1];
	}

	private getDaysSinceYearStart(): number {
		return this._runningTotalOfEveryMonth[this.month - 1] + this.day + (this.isLeapYear() ? 1 : 0);
	}

	constructor() {
		const now: Date = new Date();

		this.year = now.getFullYear();
		this.month = now.getMonth() + 1;
		this.day = now.getDay();
		this.hour = now.getHours();
		this.minute = now.getMinutes();
		this.second = now.getSeconds();
		this.millisecond = now.getMilliseconds();
	}

	update() {
		const now: Date = new Date();
		this.year = now.getFullYear();
		this.month = now.getMonth() + 1;
		this.day = now.getDay();
		this.hour = now.getHours();
		this.minute = now.getMinutes();
		this.second = now.getSeconds();
		this.millisecond = now.getMilliseconds();
	}

	getTime(associate: timeAssociate): number {
		let timeRet: number = 0;

		if (associate.end >= timeKind.millisecond) {
			timeRet += this.millisecond;
		}

		if (associate.begin === timeKind.millisecond) {
			return timeRet;
		}

		timeRet /= 1000;


		if (associate.end >= timeKind.second) {
			console.log("test");
			timeRet += this.second;
		}

		if (associate.begin === timeKind.second) {
			return timeRet;
		}

		timeRet /= 60;


		if (associate.end >= timeKind.minute) {
			timeRet += this.minute;
		}

		if (associate.begin === timeKind.minute) {
			return timeRet;
		}

		timeRet /= 60;


		if (associate.end >= timeKind.hour) {
			timeRet += this.hour;
		}

		if (associate.begin === timeKind.hour) {
			return timeRet;
		}

		timeRet /= 24;


		// if (associate.begin === "year") {
		// 	timeRet += this.year;

		// 	if (associate.end === "year") {
		// 		return timeRet;
		// 	}

		// 	if (associate.end === "month") {
		// 		timeRet += this.getDaysSinceYearStart(this.year, this.month, this.day) / (this.isLeapYear(this.year) ? 366 : 365);
		// 		return timeRet;
		// 	}

		// 	if (associate.end === "day") {
		// 		timeRet += this._runningTotalOfEveryMonth[this.month - 1] + this.day) / (this.isLeapYear(this.year) ? 366 : 365;
		// 		return timeRet;
		// 	}
		// }

		if (associate.end === timeKind.day) {
			timeRet += this.day;

			if (associate.begin === timeKind.day) {
				return timeRet;
			}
		}

		if (associate.end === timeKind.month) {

		}

		if (associate.end === timeKind.year) {
			return this.year;
		}

		return timeRet;
	}

	getFullValueTime(type: kindOfDateTime): number {
		switch (type) {
			case timeKind.millisecond:
				return 1000;

			case timeKind.second:
			case timeKind.minute:
				return 60;

			case timeKind.hour:
				return 24;

			case timeKind.day:
				this.getDaysOfMonth();

			case timeKind.month:
				return 12;

			default:
				return -1;
		}
	}
}