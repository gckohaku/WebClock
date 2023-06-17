export class WithUnit {
	val: number;
	unit: string;
	constructor(val: number, unit: string) {
		this.val = val;
		this.unit = unit;
	}

	use = (): string => {
		return this.val.toString() + this.unit;
	}
}