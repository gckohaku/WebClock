import { decodedTextSpanIntersectsWith } from "typescript";

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
		const decodeData: string = atob(str.replace(/\-/g, "+").replace(/_/g, "/"));
		const bytes = stringToBuffer(decodeData);
		const streamData = new Blob([bytes]).stream();
		const decompressed = streamData.pipeThrough(new DecompressionStream(format));

		const paramString: string = await new Response(decompressed).text();

		resolve(paramString);
	});
}

const bufferToString = (buf: Uint8Array): string => {
	return new TextDecoder().decode(buf);
}

const stringToBuffer = (str: string): Uint8Array => {
	return new TextEncoder().encode(str);
}