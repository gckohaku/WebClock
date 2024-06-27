export class Vector2 {
	x: number = 0;
	y: number = 0;

	constructor(x: number, y: number);
	constructor(x: string, y: string);
	constructor(v: Vector2);

	constructor(arg1: number | string | Vector2, arg2?: number | string) {
		if (arg1 instanceof Vector2) {
			const v: Vector2 = arg1;
			this.x = v.x;
			this.y = v.y;
		}
		else if (arg2) {
			const x: number | string = arg1;
			const y: number | string = arg2;

			if (typeof x === "string" && typeof y === "string") {
				this.x = Number(x);
				this.y = Number(y);
			}
			else if (typeof x === "number" && typeof y === "number") {
				this.x = x;
				this.y = y;
			}
		}
	}

	add(opp: Vector2): Vector2 {
		return new Vector2(this.x + opp.x, this.y + opp.y);
	}

	sub(opp: Vector2): Vector2 {
		return new Vector2(this.x - opp.x, this.y - opp.y);
	}

	abs(): number {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
}