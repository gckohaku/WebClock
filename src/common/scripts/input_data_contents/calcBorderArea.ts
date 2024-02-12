import type { SingleUnitParameters } from "../ClockPartsParameters";
import { Rectangle } from "../defines/Rectangle";
import type { DotsOnCircleParameters } from "./DotsOnCircleParameters";

const dotsOnCircleArea = (params: DotsOnCircleParameters): Rectangle => {
	const offsetX = Number(params.parameters.find((e) => { return e.propertyCode === "offsetX" })?.reactiveValue);
		const offsetY = Number(params.parameters.find((e) => { return e.propertyCode === "offsetY" })?.reactiveValue);
		const size = Number(params.parameters.find((e) => { return e.propertyCode === "size" })?.reactiveValue);
		const width = Number(params.parameters.find((e) => { return e.propertyCode === "width" })?.reactiveValue);
		const dotSize = Number(params.parameters.find((e) => { return e.propertyCode === "accessory1_size" })?.reactiveValue);

		const rectOneSideLength = size + width + dotSize;
		const half = rectOneSideLength / 2;

		let rectLeft = offsetX - half;
		let rectWidth = rectOneSideLength
		if (rectLeft % 1 === 0) {
			rectLeft += 0.5;
			rectWidth += 1;
		}

		let rectTop = offsetY - half;
		let rectHeight = rectOneSideLength
		if (rectTop % 1 === 0) {
			rectTop += 0.5;
			rectHeight += 1;
		}

		return new Rectangle(rectLeft, rectTop, rectWidth, rectHeight);
}

export const calcBorderArea: {[key: string]: (params: SingleUnitParameters) => Rectangle} = {
	"衛星": dotsOnCircleArea,
}