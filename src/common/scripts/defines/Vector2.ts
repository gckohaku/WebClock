export class Vector2 {
	x: number = 0;
	y: number = 0;

	constructor(x: number, y: number);
	constructor(x: string, y: string);

	constructor(x: number | string, y: number | string) {
		if (typeof x === "string" && typeof y === "string") {
			this.x = Number(x);
			this.y = Number(y);
		}
		else if (typeof x === "number" && typeof y === "number") {
			this.x = x;
			this.y = y;
		}
		else {
			throw "vector2 construct error";
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