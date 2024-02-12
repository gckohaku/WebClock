export class Vector2 {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
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