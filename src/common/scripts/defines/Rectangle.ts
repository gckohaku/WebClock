import { Vector2 } from "./Vector2";

export class Rectangle {
	x: number;
	y: number;
	width: number;
	height: number;

	constructor(x: number, y: number, width: number, height: number) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	toVector2(): Vector2 {
		return new Vector2(this.width, this.height);
	}
}