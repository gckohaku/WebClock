import { getLineAndCharacterOfPosition, resolveProjectReferencePath } from "typescript";
import type { SingleUnitParameters } from "../ClockPartsParameters";
import { Rectangle } from "../defines/Rectangle";
import type { ParametersProperties } from "../object_parameters/ParametersProperties";
import type { AnalogRoundedAlignedHandParameters } from "./AnalogRoundedAlignedHandParameters";
import type { AnalogRoundedIrregularityHandParameters } from "./AnalogRoundedIrregularityHandParameters";
import type { DotsOnCircleParameters } from "./DotsOnCircleParameters";
import { clockPartsNames } from "./clockPartsNames";
import type { DigitalVariableFontNumberParameters } from "./DigitalVariableFontNumberParameters";

const dotsOnCircleArea = (params: DotsOnCircleParameters): Rectangle => {
	const offsetX = Number(params.getParameterValue("offsetX"));
	const offsetY = Number(params.getParameterValue("offsetY"));
	const size = Number(params.getParameterValue("size"));
	const width = Number(params.getParameterValue("width"));
	const dotSize = Number(params.getParameterValue("accessory1_size"));

	const rectOneSideLength = size + width + dotSize;
	const half = rectOneSideLength / 2;

	let rectLeft = offsetX - half;
	let rectTop = offsetY - half;
	let rectSize = rectOneSideLength;

	if (half % 1 === 0) {
		rectLeft -= 0.5;
		rectTop -= 0.5;
		rectSize += 1;
	}
	return new Rectangle(rectLeft, rectTop, rectSize, rectSize);
}

const AnalogRoundedIrregularityHandArea = (params: AnalogRoundedIrregularityHandParameters): Rectangle => {
	const offsetX = Number(params.getParameterValue("offsetX"));
	const offsetY = Number(params.getParameterValue("offsetY"));

	const length = Number(params.getParameterValue("length"));
	const tipRadius = Number(params.getParameterValue("accessory1_size")) / 2;

	let size = 2 * (length + tipRadius);

	const fullHandLength = length + tipRadius
	let rectLeft = offsetX - fullHandLength;
	let rectTop = offsetY - fullHandLength;

	if (tipRadius % 1 === 0) {
		rectLeft -= 0.5;
		rectTop -= 0.5;
		size++;
	}

	return new Rectangle(
		rectLeft,
		rectTop,
		size,
		size,
	);
}

const AnalogRoundedAlignedHandArea = (params: AnalogRoundedAlignedHandParameters): Rectangle => {
	const offsetX = Number(params.getParameterValue("offsetX"));
	const offsetY = Number(params.getParameterValue("offsetY"));

	const length = Number(params.getParameterValue("length"));
	const tipRadius = Number(params.getParameterValue("size")) / 2;

	let size = 2 * (length + tipRadius) + 1;


	let rectLeft = offsetX - length - tipRadius;
	let rectTop = offsetY - length - tipRadius;

	if (tipRadius % 1 === 0) {
		rectLeft -= 0.5;
		rectTop -= 0.5;
		size++;
	}

	return new Rectangle(
		rectLeft,
		rectTop,
		size,
		size,
	);
}

const DigitalVariableFontNumberArea = (params: DigitalVariableFontNumberParameters, elem?: SVGGElement, index?: number): Rectangle => {
	if (elem) {
		const elemRect = elem.getBoundingClientRect();
		
		const offsetX = Number(params.getParameterValue("offsetX"));
		const offsetY = Number(params.getParameterValue("offsetY"));
		// const size = Number(params.getParameterValue("size"));
		// const length = Number(params.getParameterValue("length"));

		let rectWidth = elemRect.width;
		let rectHeight = elemRect.height;
		let rectLeft = offsetX - rectWidth / 2;
		let rectTop = offsetY - rectHeight / 2;

		return new Rectangle(rectLeft - 4, rectTop , rectWidth + 8, rectHeight);
	}

	return new Rectangle(0, 0, 50, 50);
}

const analog = clockPartsNames.analog;
const digital = clockPartsNames.digital;

export const calcBorderArea: { [key: string]: <T extends SingleUnitParameters>(params: T, e?: SVGGElement, index?: number) => Rectangle } = {
	[analog.dotsOnCircle]: dotsOnCircleArea,
	[analog.roundedIrregularityHand]: AnalogRoundedIrregularityHandArea,
	[analog.roundedAlignedHand]: AnalogRoundedAlignedHandArea,
	[digital.digitalVariableFontNumber]: DigitalVariableFontNumberArea,
}

// オブジェクトのキーに変数の値を適用したい時は、変数を [ ] で囲う
// https://www.typescriptlang.org/play/?jsx=0&module=1#code/MYewdgzgLgBGCGBbAphGBeGBvAsAKBkJgHMAnEAVwAcBBALm3yOZngEYGAiKVKGtzgBomLQvABMXHtBrihIwgF9hBImUpUAQg1yrRAIw4xuvTQJWjC+ycelRNci0UX4XefKEiwAZhTDB+DBgACgBKDAA+Rj0YUmQoClIwW14YX38Yfk4Abld8D3BoNL9gByCwyOjmOISklKL04BgHHLz3PE8iuwAxEogdAG0Aa2QATwZoUgBLMGIAXQYK9CjJmeJFIN1mAYQUCAA6dWoaffYF4v9+J0IdpFRD8mpNfetzxocVRSA