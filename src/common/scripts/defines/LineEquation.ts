// ax + by + c = 0 の形の方程式
export class LineEquation {
	a: number;
	b: number;
	c: number;

	constructor(a: number, b: number, c: number) {
		this.a = a;
		this.b = b;
		this.c = c;
	}

	toString(): string {
		return `${this.a}x + ${this.b}y + ${this.c} = 0`;
	}
}