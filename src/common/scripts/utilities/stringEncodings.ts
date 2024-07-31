export const stringCompression = async (str: string, format: string = "deflate-raw") => {
	return new Promise<string>(async (resolve, reject) => {
		const blobParams = new Blob([str]);
		const stream: ReadableStream<Uint8Array> = blobParams.stream();
		const compressed = stream.pipeThrough(new CompressionStream("deflate-raw"));

		const arrayBuffer = await (new Response(compressed).arrayBuffer());
		const rawCharData = bufferToString(new Uint8Array(arrayBuffer));

		// const bytes = new Uint8Array(arrayBuffer);

		// let forString = "";

		// for (let i = 0; i < bytes.byteLength; i++) {
		// 	forString += String.fromCharCode(bytes[i]);
		// }

		const urlSafeBase64Data: string = btoa(rawCharData)
			.replace(/=/g, "")
			.replace(/\+/g, "-")
			.replace(/\//g, "_");

		resolve(urlSafeBase64Data);
	});
}

export const stringDecompression = async (str: string, format: string = "deflate-raw") => {
	return new Promise<string>(async (resolve, reject) => {
		const decodeData: string = atob(str.replace(/\-/g, "+").replace(/_/g, "/"));
		// const bytes = new Uint8Array();
		const bytes = stringToBuffer(str);
	});
}

const bufferToString = (buf: Uint8Array): string => {
	return String.fromCharCode(...buf);
}

const stringToBuffer = (str: string): Uint8Array => {
	return new TextEncoder().encode(str);
}