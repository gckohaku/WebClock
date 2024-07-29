export const stringCompression = async (str: string, format: string = "deflate-raw") => {
	return new Promise<string>(async (resolve, reject) => {
		const blobParams = new Blob([str]);
		const stream: ReadableStream<Uint8Array> = blobParams.stream();
		const compressed = stream.pipeThrough(new CompressionStream("deflate-raw"));

		const arrayBuffer = await (new  Response(compressed).arrayBuffer());
		const ret = bufferToString(new Uint8Array(arrayBuffer));

		const bytes = new Uint8Array(arrayBuffer);
		
		let forString = "";

		for (let i = 0; i < bytes.byteLength; i++) {
			forString += String.fromCharCode(bytes[i]);
		}

		resolve(ret);
	});
}

const bufferToString = (buf: Uint8Array): string => {
	return String.fromCharCode(...buf);
}