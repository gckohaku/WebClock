export const stringCompression = async (str: string, format: CompressionFormat = "deflate-raw") => {
	return new Promise<string>(async (resolve, reject) => {
		const blobParams = new Blob([str]);
		const stream: ReadableStream<Uint8Array> = blobParams.stream();
		const compressed = stream.pipeThrough(new CompressionStream(format));

		const arrayBuffer = await (new Response(compressed).arrayBuffer());
		const rawCharData = bufferToString(new Uint8Array(arrayBuffer));

		const urlSafeBase64Data: string = btoa(rawCharData)
			.replace(/=/g, "")
			.replace(/\+/g, "-")
			.replace(/\//g, "_");

		resolve(urlSafeBase64Data);
	});
}

export const stringDecompression = async (str: string, format: CompressionFormat = "deflate-raw") => {
	return new Promise<string>(async (resolve, reject) => {
		try {
			if (typeof str !== "string") {
				throw `input string is not string (${typeof str})`;
			}

			const decodeData: string = atob(str.replace(/\-/g, "+").replace(/_/g, "/"));
			const bytes = stringToBuffer(decodeData);

			if (!("DecompressionStream" in window)) {
				throw new Error("DecompressionStream is not supported in this browser.");
			}

			const streamData = new Blob([bytes]).stream();
			const decompressed = streamData.pipeThrough(new DecompressionStream(format));

			const paramData = await streamDecodeProcess(decompressed);

			resolve(paramData);
		}
		catch (e) {
			reject(e);
		}
	});
}

const bufferToString = (buf: Uint8Array): string => {
	return String.fromCharCode(...buf);
}

const stringToBuffer = (str: string): Uint8Array => {
	const buf = new ArrayBuffer(str.length)
	const bufView = new Uint8Array(buf);
	for (let i = 0; i < str.length; i++) {
		bufView[i] = str.charCodeAt(i);
	}
	return bufView;
}

const streamDecodeProcess = async (stream: ReadableStream<any>): Promise<string> => {
	return new Promise<string>(async (resolve, reject) => {
		console.log(stream);

		const reader = stream.getReader();
		const decoder = new TextDecoder();

		let result = "";

		while (true) {
			const { done, value } = await reader.read();
			if (done) {
				break;
			}
			result += decoder.decode(value, { stream: true });
		}
		result += decoder.decode();

		resolve(result);
	});
}