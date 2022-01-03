var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) =>
	__defProp(target, '__esModule', { value: true });
var __esm = (fn, res) =>
	function __init() {
		return fn && (res = (0, fn[Object.keys(fn)[0]])((fn = 0))), res;
	};
var __commonJS = (cb, mod) =>
	function __require() {
		return (
			mod ||
				(0, cb[Object.keys(cb)[0]])(
					(mod = { exports: {} }).exports,
					mod
				),
			mod.exports
		);
	};
var __export = (target, all) => {
	__markAsModule(target);
	for (var name in all)
		__defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
	if (
		(module2 && typeof module2 === 'object') ||
		typeof module2 === 'function'
	) {
		for (let key of __getOwnPropNames(module2))
			if (!__hasOwnProp.call(target, key) && key !== 'default')
				__defProp(target, key, {
					get: () => module2[key],
					enumerable:
						!(desc = __getOwnPropDesc(module2, key)) ||
						desc.enumerable,
				});
	}
	return target;
};
var __toModule = (module2) => {
	return __reExport(
		__markAsModule(
			__defProp(
				module2 != null ? __create(__getProtoOf(module2)) : {},
				'default',
				module2 && module2.__esModule && 'default' in module2
					? { get: () => module2.default, enumerable: true }
					: { value: module2, enumerable: true }
			)
		),
		module2
	);
};

// node_modules/@sveltejs/kit/dist/install-fetch.js
function dataUriToBuffer(uri) {
	if (!/^data:/i.test(uri)) {
		throw new TypeError(
			'`uri` does not appear to be a Data URI (must begin with "data:")'
		);
	}
	uri = uri.replace(/\r?\n/g, '');
	const firstComma = uri.indexOf(',');
	if (firstComma === -1 || firstComma <= 4) {
		throw new TypeError('malformed data: URI');
	}
	const meta = uri.substring(5, firstComma).split(';');
	let charset = '';
	let base64 = false;
	const type = meta[0] || 'text/plain';
	let typeFull = type;
	for (let i = 1; i < meta.length; i++) {
		if (meta[i] === 'base64') {
			base64 = true;
		} else {
			typeFull += `;${meta[i]}`;
			if (meta[i].indexOf('charset=') === 0) {
				charset = meta[i].substring(8);
			}
		}
	}
	if (!meta[0] && !charset.length) {
		typeFull += ';charset=US-ASCII';
		charset = 'US-ASCII';
	}
	const encoding = base64 ? 'base64' : 'ascii';
	const data = unescape(uri.substring(firstComma + 1));
	const buffer = Buffer.from(data, encoding);
	buffer.type = type;
	buffer.typeFull = typeFull;
	buffer.charset = charset;
	return buffer;
}
async function* toIterator(parts, clone2 = true) {
	for (let part of parts) {
		if ('stream' in part) {
			yield* part.stream();
		} else if (ArrayBuffer.isView(part)) {
			if (clone2) {
				let position = part.byteOffset;
				let end = part.byteOffset + part.byteLength;
				while (position !== end) {
					const size = Math.min(end - position, POOL_SIZE);
					const chunk = part.buffer.slice(position, position + size);
					position += chunk.byteLength;
					yield new Uint8Array(chunk);
				}
			} else {
				yield part;
			}
		} else {
			let position = 0;
			while (position !== part.size) {
				const chunk = part.slice(
					position,
					Math.min(part.size, position + POOL_SIZE)
				);
				const buffer = await chunk.arrayBuffer();
				position += buffer.byteLength;
				yield new Uint8Array(buffer);
			}
		}
	}
}
function isFormData(object) {
	return (
		typeof object === 'object' &&
		typeof object.append === 'function' &&
		typeof object.set === 'function' &&
		typeof object.get === 'function' &&
		typeof object.getAll === 'function' &&
		typeof object.delete === 'function' &&
		typeof object.keys === 'function' &&
		typeof object.values === 'function' &&
		typeof object.entries === 'function' &&
		typeof object.constructor === 'function' &&
		object[NAME] === 'FormData'
	);
}
function getHeader(boundary, name, field) {
	let header = '';
	header += `${dashes}${boundary}${carriage}`;
	header += `Content-Disposition: form-data; name="${name}"`;
	if (isBlob(field)) {
		header += `; filename="${field.name}"${carriage}`;
		header += `Content-Type: ${field.type || 'application/octet-stream'}`;
	}
	return `${header}${carriage.repeat(2)}`;
}
async function* formDataIterator(form, boundary) {
	for (const [name, value] of form) {
		yield getHeader(boundary, name, value);
		if (isBlob(value)) {
			yield* value.stream();
		} else {
			yield value;
		}
		yield carriage;
	}
	yield getFooter(boundary);
}
function getFormDataLength(form, boundary) {
	let length = 0;
	for (const [name, value] of form) {
		length += Buffer.byteLength(getHeader(boundary, name, value));
		length += isBlob(value) ? value.size : Buffer.byteLength(String(value));
		length += carriageLength;
	}
	length += Buffer.byteLength(getFooter(boundary));
	return length;
}
async function consumeBody(data) {
	if (data[INTERNALS$2].disturbed) {
		throw new TypeError(`body used already for: ${data.url}`);
	}
	data[INTERNALS$2].disturbed = true;
	if (data[INTERNALS$2].error) {
		throw data[INTERNALS$2].error;
	}
	let { body } = data;
	if (body === null) {
		return Buffer.alloc(0);
	}
	if (isBlob(body)) {
		body = import_stream.default.Readable.from(body.stream());
	}
	if (Buffer.isBuffer(body)) {
		return body;
	}
	if (!(body instanceof import_stream.default)) {
		return Buffer.alloc(0);
	}
	const accum = [];
	let accumBytes = 0;
	try {
		for await (const chunk of body) {
			if (data.size > 0 && accumBytes + chunk.length > data.size) {
				const error2 = new FetchError(
					`content size at ${data.url} over limit: ${data.size}`,
					'max-size'
				);
				body.destroy(error2);
				throw error2;
			}
			accumBytes += chunk.length;
			accum.push(chunk);
		}
	} catch (error2) {
		const error_ =
			error2 instanceof FetchBaseError
				? error2
				: new FetchError(
						`Invalid response body while trying to fetch ${data.url}: ${error2.message}`,
						'system',
						error2
				  );
		throw error_;
	}
	if (body.readableEnded === true || body._readableState.ended === true) {
		try {
			if (accum.every((c) => typeof c === 'string')) {
				return Buffer.from(accum.join(''));
			}
			return Buffer.concat(accum, accumBytes);
		} catch (error2) {
			throw new FetchError(
				`Could not create Buffer from response body for ${data.url}: ${error2.message}`,
				'system',
				error2
			);
		}
	} else {
		throw new FetchError(
			`Premature close of server response while trying to fetch ${data.url}`
		);
	}
}
function fromRawHeaders(headers = []) {
	return new Headers(
		headers
			.reduce((result, value, index2, array) => {
				if (index2 % 2 === 0) {
					result.push(array.slice(index2, index2 + 2));
				}
				return result;
			}, [])
			.filter(([name, value]) => {
				try {
					validateHeaderName(name);
					validateHeaderValue(name, String(value));
					return true;
				} catch {
					return false;
				}
			})
	);
}
async function fetch(url, options_) {
	return new Promise((resolve2, reject) => {
		const request = new Request(url, options_);
		const options2 = getNodeRequestOptions(request);
		if (!supportedSchemas.has(options2.protocol)) {
			throw new TypeError(
				`node-fetch cannot load ${url}. URL scheme "${options2.protocol.replace(
					/:$/,
					''
				)}" is not supported.`
			);
		}
		if (options2.protocol === 'data:') {
			const data = dataUriToBuffer$1(request.url);
			const response2 = new Response(data, {
				headers: { 'Content-Type': data.typeFull },
			});
			resolve2(response2);
			return;
		}
		const send = (
			options2.protocol === 'https:'
				? import_https.default
				: import_http.default
		).request;
		const { signal } = request;
		let response = null;
		const abort = () => {
			const error2 = new AbortError('The operation was aborted.');
			reject(error2);
			if (
				request.body &&
				request.body instanceof import_stream.default.Readable
			) {
				request.body.destroy(error2);
			}
			if (!response || !response.body) {
				return;
			}
			response.body.emit('error', error2);
		};
		if (signal && signal.aborted) {
			abort();
			return;
		}
		const abortAndFinalize = () => {
			abort();
			finalize();
		};
		const request_ = send(options2);
		if (signal) {
			signal.addEventListener('abort', abortAndFinalize);
		}
		const finalize = () => {
			request_.abort();
			if (signal) {
				signal.removeEventListener('abort', abortAndFinalize);
			}
		};
		request_.on('error', (error2) => {
			reject(
				new FetchError(
					`request to ${request.url} failed, reason: ${error2.message}`,
					'system',
					error2
				)
			);
			finalize();
		});
		fixResponseChunkedTransferBadEnding(request_, (error2) => {
			response.body.destroy(error2);
		});
		if (process.version < 'v14') {
			request_.on('socket', (s2) => {
				let endedWithEventsCount;
				s2.prependListener('end', () => {
					endedWithEventsCount = s2._eventsCount;
				});
				s2.prependListener('close', (hadError) => {
					if (
						response &&
						endedWithEventsCount < s2._eventsCount &&
						!hadError
					) {
						const error2 = new Error('Premature close');
						error2.code = 'ERR_STREAM_PREMATURE_CLOSE';
						response.body.emit('error', error2);
					}
				});
			});
		}
		request_.on('response', (response_) => {
			request_.setTimeout(0);
			const headers = fromRawHeaders(response_.rawHeaders);
			if (isRedirect(response_.statusCode)) {
				const location2 = headers.get('Location');
				const locationURL =
					location2 === null ? null : new URL(location2, request.url);
				switch (request.redirect) {
					case 'error':
						reject(
							new FetchError(
								`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`,
								'no-redirect'
							)
						);
						finalize();
						return;
					case 'manual':
						if (locationURL !== null) {
							headers.set('Location', locationURL);
						}
						break;
					case 'follow': {
						if (locationURL === null) {
							break;
						}
						if (request.counter >= request.follow) {
							reject(
								new FetchError(
									`maximum redirect reached at: ${request.url}`,
									'max-redirect'
								)
							);
							finalize();
							return;
						}
						const requestOptions = {
							headers: new Headers(request.headers),
							follow: request.follow,
							counter: request.counter + 1,
							agent: request.agent,
							compress: request.compress,
							method: request.method,
							body: request.body,
							signal: request.signal,
							size: request.size,
						};
						if (
							response_.statusCode !== 303 &&
							request.body &&
							options_.body instanceof
								import_stream.default.Readable
						) {
							reject(
								new FetchError(
									'Cannot follow redirect with body being a readable stream',
									'unsupported-redirect'
								)
							);
							finalize();
							return;
						}
						if (
							response_.statusCode === 303 ||
							((response_.statusCode === 301 ||
								response_.statusCode === 302) &&
								request.method === 'POST')
						) {
							requestOptions.method = 'GET';
							requestOptions.body = void 0;
							requestOptions.headers.delete('content-length');
						}
						resolve2(
							fetch(new Request(locationURL, requestOptions))
						);
						finalize();
						return;
					}
					default:
						return reject(
							new TypeError(
								`Redirect option '${request.redirect}' is not a valid value of RequestRedirect`
							)
						);
				}
			}
			if (signal) {
				response_.once('end', () => {
					signal.removeEventListener('abort', abortAndFinalize);
				});
			}
			let body = (0, import_stream.pipeline)(
				response_,
				new import_stream.PassThrough(),
				reject
			);
			if (process.version < 'v12.10') {
				response_.on('aborted', abortAndFinalize);
			}
			const responseOptions = {
				url: request.url,
				status: response_.statusCode,
				statusText: response_.statusMessage,
				headers,
				size: request.size,
				counter: request.counter,
				highWaterMark: request.highWaterMark,
			};
			const codings = headers.get('Content-Encoding');
			if (
				!request.compress ||
				request.method === 'HEAD' ||
				codings === null ||
				response_.statusCode === 204 ||
				response_.statusCode === 304
			) {
				response = new Response(body, responseOptions);
				resolve2(response);
				return;
			}
			const zlibOptions = {
				flush: import_zlib.default.Z_SYNC_FLUSH,
				finishFlush: import_zlib.default.Z_SYNC_FLUSH,
			};
			if (codings === 'gzip' || codings === 'x-gzip') {
				body = (0, import_stream.pipeline)(
					body,
					import_zlib.default.createGunzip(zlibOptions),
					reject
				);
				response = new Response(body, responseOptions);
				resolve2(response);
				return;
			}
			if (codings === 'deflate' || codings === 'x-deflate') {
				const raw = (0, import_stream.pipeline)(
					response_,
					new import_stream.PassThrough(),
					reject
				);
				raw.once('data', (chunk) => {
					body =
						(chunk[0] & 15) === 8
							? (0, import_stream.pipeline)(
									body,
									import_zlib.default.createInflate(),
									reject
							  )
							: (0, import_stream.pipeline)(
									body,
									import_zlib.default.createInflateRaw(),
									reject
							  );
					response = new Response(body, responseOptions);
					resolve2(response);
				});
				return;
			}
			if (codings === 'br') {
				body = (0, import_stream.pipeline)(
					body,
					import_zlib.default.createBrotliDecompress(),
					reject
				);
				response = new Response(body, responseOptions);
				resolve2(response);
				return;
			}
			response = new Response(body, responseOptions);
			resolve2(response);
		});
		writeToStream(request_, request);
	});
}
function fixResponseChunkedTransferBadEnding(request, errorCallback) {
	const LAST_CHUNK = Buffer.from('0\r\n\r\n');
	let isChunkedTransfer = false;
	let properLastChunkReceived = false;
	let previousChunk;
	request.on('response', (response) => {
		const { headers } = response;
		isChunkedTransfer =
			headers['transfer-encoding'] === 'chunked' &&
			!headers['content-length'];
	});
	request.on('socket', (socket) => {
		const onSocketClose = () => {
			if (isChunkedTransfer && !properLastChunkReceived) {
				const error2 = new Error('Premature close');
				error2.code = 'ERR_STREAM_PREMATURE_CLOSE';
				errorCallback(error2);
			}
		};
		socket.prependListener('close', onSocketClose);
		request.on('abort', () => {
			socket.removeListener('close', onSocketClose);
		});
		socket.on('data', (buf) => {
			properLastChunkReceived =
				Buffer.compare(buf.slice(-5), LAST_CHUNK) === 0;
			if (!properLastChunkReceived && previousChunk) {
				properLastChunkReceived =
					Buffer.compare(
						previousChunk.slice(-3),
						LAST_CHUNK.slice(0, 3)
					) === 0 &&
					Buffer.compare(buf.slice(-2), LAST_CHUNK.slice(3)) === 0;
			}
			previousChunk = buf;
		});
	});
}
var import_http,
	import_https,
	import_zlib,
	import_stream,
	import_util,
	import_crypto,
	import_url,
	commonjsGlobal,
	src,
	dataUriToBuffer$1,
	ponyfill_es2018,
	POOL_SIZE$1,
	POOL_SIZE,
	_Blob,
	Blob2,
	Blob$1,
	FetchBaseError,
	FetchError,
	NAME,
	isURLSearchParameters,
	isBlob,
	isAbortSignal,
	carriage,
	dashes,
	carriageLength,
	getFooter,
	getBoundary,
	INTERNALS$2,
	Body,
	clone,
	extractContentType,
	getTotalBytes,
	writeToStream,
	validateHeaderName,
	validateHeaderValue,
	Headers,
	redirectStatus,
	isRedirect,
	INTERNALS$1,
	Response,
	getSearch,
	INTERNALS,
	isRequest,
	Request,
	getNodeRequestOptions,
	AbortError,
	supportedSchemas;
var init_install_fetch = __esm({
	'node_modules/@sveltejs/kit/dist/install-fetch.js'() {
		init_shims();
		import_http = __toModule(require('http'));
		import_https = __toModule(require('https'));
		import_zlib = __toModule(require('zlib'));
		import_stream = __toModule(require('stream'));
		import_util = __toModule(require('util'));
		import_crypto = __toModule(require('crypto'));
		import_url = __toModule(require('url'));
		commonjsGlobal =
			typeof globalThis !== 'undefined'
				? globalThis
				: typeof window !== 'undefined'
				? window
				: typeof global !== 'undefined'
				? global
				: typeof self !== 'undefined'
				? self
				: {};
		src = dataUriToBuffer;
		dataUriToBuffer$1 = src;
		ponyfill_es2018 = { exports: {} };
		(function (module2, exports) {
			(function (global2, factory) {
				factory(exports);
			})(commonjsGlobal, function (exports2) {
				const SymbolPolyfill =
					typeof Symbol === 'function' &&
					typeof Symbol.iterator === 'symbol'
						? Symbol
						: (description) => `Symbol(${description})`;
				function noop2() {
					return void 0;
				}
				function getGlobals() {
					if (typeof self !== 'undefined') {
						return self;
					} else if (typeof window !== 'undefined') {
						return window;
					} else if (typeof commonjsGlobal !== 'undefined') {
						return commonjsGlobal;
					}
					return void 0;
				}
				const globals = getGlobals();
				function typeIsObject(x) {
					return (
						(typeof x === 'object' && x !== null) ||
						typeof x === 'function'
					);
				}
				const rethrowAssertionErrorRejection = noop2;
				const originalPromise = Promise;
				const originalPromiseThen = Promise.prototype.then;
				const originalPromiseResolve =
					Promise.resolve.bind(originalPromise);
				const originalPromiseReject =
					Promise.reject.bind(originalPromise);
				function newPromise(executor) {
					return new originalPromise(executor);
				}
				function promiseResolvedWith(value) {
					return originalPromiseResolve(value);
				}
				function promiseRejectedWith(reason) {
					return originalPromiseReject(reason);
				}
				function PerformPromiseThen(promise, onFulfilled, onRejected) {
					return originalPromiseThen.call(
						promise,
						onFulfilled,
						onRejected
					);
				}
				function uponPromise(promise, onFulfilled, onRejected) {
					PerformPromiseThen(
						PerformPromiseThen(promise, onFulfilled, onRejected),
						void 0,
						rethrowAssertionErrorRejection
					);
				}
				function uponFulfillment(promise, onFulfilled) {
					uponPromise(promise, onFulfilled);
				}
				function uponRejection(promise, onRejected) {
					uponPromise(promise, void 0, onRejected);
				}
				function transformPromiseWith(
					promise,
					fulfillmentHandler,
					rejectionHandler
				) {
					return PerformPromiseThen(
						promise,
						fulfillmentHandler,
						rejectionHandler
					);
				}
				function setPromiseIsHandledToTrue(promise) {
					PerformPromiseThen(
						promise,
						void 0,
						rethrowAssertionErrorRejection
					);
				}
				const queueMicrotask = (() => {
					const globalQueueMicrotask =
						globals && globals.queueMicrotask;
					if (typeof globalQueueMicrotask === 'function') {
						return globalQueueMicrotask;
					}
					const resolvedPromise = promiseResolvedWith(void 0);
					return (fn) => PerformPromiseThen(resolvedPromise, fn);
				})();
				function reflectCall(F, V, args) {
					if (typeof F !== 'function') {
						throw new TypeError('Argument is not a function');
					}
					return Function.prototype.apply.call(F, V, args);
				}
				function promiseCall(F, V, args) {
					try {
						return promiseResolvedWith(reflectCall(F, V, args));
					} catch (value) {
						return promiseRejectedWith(value);
					}
				}
				const QUEUE_MAX_ARRAY_SIZE = 16384;
				class SimpleQueue {
					constructor() {
						this._cursor = 0;
						this._size = 0;
						this._front = {
							_elements: [],
							_next: void 0,
						};
						this._back = this._front;
						this._cursor = 0;
						this._size = 0;
					}
					get length() {
						return this._size;
					}
					push(element) {
						const oldBack = this._back;
						let newBack = oldBack;
						if (
							oldBack._elements.length ===
							QUEUE_MAX_ARRAY_SIZE - 1
						) {
							newBack = {
								_elements: [],
								_next: void 0,
							};
						}
						oldBack._elements.push(element);
						if (newBack !== oldBack) {
							this._back = newBack;
							oldBack._next = newBack;
						}
						++this._size;
					}
					shift() {
						const oldFront = this._front;
						let newFront = oldFront;
						const oldCursor = this._cursor;
						let newCursor = oldCursor + 1;
						const elements = oldFront._elements;
						const element = elements[oldCursor];
						if (newCursor === QUEUE_MAX_ARRAY_SIZE) {
							newFront = oldFront._next;
							newCursor = 0;
						}
						--this._size;
						this._cursor = newCursor;
						if (oldFront !== newFront) {
							this._front = newFront;
						}
						elements[oldCursor] = void 0;
						return element;
					}
					forEach(callback) {
						let i = this._cursor;
						let node = this._front;
						let elements = node._elements;
						while (i !== elements.length || node._next !== void 0) {
							if (i === elements.length) {
								node = node._next;
								elements = node._elements;
								i = 0;
								if (elements.length === 0) {
									break;
								}
							}
							callback(elements[i]);
							++i;
						}
					}
					peek() {
						const front = this._front;
						const cursor = this._cursor;
						return front._elements[cursor];
					}
				}
				function ReadableStreamReaderGenericInitialize(reader, stream) {
					reader._ownerReadableStream = stream;
					stream._reader = reader;
					if (stream._state === 'readable') {
						defaultReaderClosedPromiseInitialize(reader);
					} else if (stream._state === 'closed') {
						defaultReaderClosedPromiseInitializeAsResolved(reader);
					} else {
						defaultReaderClosedPromiseInitializeAsRejected(
							reader,
							stream._storedError
						);
					}
				}
				function ReadableStreamReaderGenericCancel(reader, reason) {
					const stream = reader._ownerReadableStream;
					return ReadableStreamCancel(stream, reason);
				}
				function ReadableStreamReaderGenericRelease(reader) {
					if (reader._ownerReadableStream._state === 'readable') {
						defaultReaderClosedPromiseReject(
							reader,
							new TypeError(
								`Reader was released and can no longer be used to monitor the stream's closedness`
							)
						);
					} else {
						defaultReaderClosedPromiseResetToRejected(
							reader,
							new TypeError(
								`Reader was released and can no longer be used to monitor the stream's closedness`
							)
						);
					}
					reader._ownerReadableStream._reader = void 0;
					reader._ownerReadableStream = void 0;
				}
				function readerLockException(name) {
					return new TypeError(
						'Cannot ' + name + ' a stream using a released reader'
					);
				}
				function defaultReaderClosedPromiseInitialize(reader) {
					reader._closedPromise = newPromise((resolve2, reject) => {
						reader._closedPromise_resolve = resolve2;
						reader._closedPromise_reject = reject;
					});
				}
				function defaultReaderClosedPromiseInitializeAsRejected(
					reader,
					reason
				) {
					defaultReaderClosedPromiseInitialize(reader);
					defaultReaderClosedPromiseReject(reader, reason);
				}
				function defaultReaderClosedPromiseInitializeAsResolved(
					reader
				) {
					defaultReaderClosedPromiseInitialize(reader);
					defaultReaderClosedPromiseResolve(reader);
				}
				function defaultReaderClosedPromiseReject(reader, reason) {
					if (reader._closedPromise_reject === void 0) {
						return;
					}
					setPromiseIsHandledToTrue(reader._closedPromise);
					reader._closedPromise_reject(reason);
					reader._closedPromise_resolve = void 0;
					reader._closedPromise_reject = void 0;
				}
				function defaultReaderClosedPromiseResetToRejected(
					reader,
					reason
				) {
					defaultReaderClosedPromiseInitializeAsRejected(
						reader,
						reason
					);
				}
				function defaultReaderClosedPromiseResolve(reader) {
					if (reader._closedPromise_resolve === void 0) {
						return;
					}
					reader._closedPromise_resolve(void 0);
					reader._closedPromise_resolve = void 0;
					reader._closedPromise_reject = void 0;
				}
				const AbortSteps = SymbolPolyfill('[[AbortSteps]]');
				const ErrorSteps = SymbolPolyfill('[[ErrorSteps]]');
				const CancelSteps = SymbolPolyfill('[[CancelSteps]]');
				const PullSteps = SymbolPolyfill('[[PullSteps]]');
				const NumberIsFinite =
					Number.isFinite ||
					function (x) {
						return typeof x === 'number' && isFinite(x);
					};
				const MathTrunc =
					Math.trunc ||
					function (v) {
						return v < 0 ? Math.ceil(v) : Math.floor(v);
					};
				function isDictionary(x) {
					return typeof x === 'object' || typeof x === 'function';
				}
				function assertDictionary(obj, context) {
					if (obj !== void 0 && !isDictionary(obj)) {
						throw new TypeError(`${context} is not an object.`);
					}
				}
				function assertFunction(x, context) {
					if (typeof x !== 'function') {
						throw new TypeError(`${context} is not a function.`);
					}
				}
				function isObject(x) {
					return (
						(typeof x === 'object' && x !== null) ||
						typeof x === 'function'
					);
				}
				function assertObject(x, context) {
					if (!isObject(x)) {
						throw new TypeError(`${context} is not an object.`);
					}
				}
				function assertRequiredArgument(x, position, context) {
					if (x === void 0) {
						throw new TypeError(
							`Parameter ${position} is required in '${context}'.`
						);
					}
				}
				function assertRequiredField(x, field, context) {
					if (x === void 0) {
						throw new TypeError(
							`${field} is required in '${context}'.`
						);
					}
				}
				function convertUnrestrictedDouble(value) {
					return Number(value);
				}
				function censorNegativeZero(x) {
					return x === 0 ? 0 : x;
				}
				function integerPart(x) {
					return censorNegativeZero(MathTrunc(x));
				}
				function convertUnsignedLongLongWithEnforceRange(
					value,
					context
				) {
					const lowerBound = 0;
					const upperBound = Number.MAX_SAFE_INTEGER;
					let x = Number(value);
					x = censorNegativeZero(x);
					if (!NumberIsFinite(x)) {
						throw new TypeError(
							`${context} is not a finite number`
						);
					}
					x = integerPart(x);
					if (x < lowerBound || x > upperBound) {
						throw new TypeError(
							`${context} is outside the accepted range of ${lowerBound} to ${upperBound}, inclusive`
						);
					}
					if (!NumberIsFinite(x) || x === 0) {
						return 0;
					}
					return x;
				}
				function assertReadableStream(x, context) {
					if (!IsReadableStream(x)) {
						throw new TypeError(
							`${context} is not a ReadableStream.`
						);
					}
				}
				function AcquireReadableStreamDefaultReader(stream) {
					return new ReadableStreamDefaultReader(stream);
				}
				function ReadableStreamAddReadRequest(stream, readRequest) {
					stream._reader._readRequests.push(readRequest);
				}
				function ReadableStreamFulfillReadRequest(stream, chunk, done) {
					const reader = stream._reader;
					const readRequest = reader._readRequests.shift();
					if (done) {
						readRequest._closeSteps();
					} else {
						readRequest._chunkSteps(chunk);
					}
				}
				function ReadableStreamGetNumReadRequests(stream) {
					return stream._reader._readRequests.length;
				}
				function ReadableStreamHasDefaultReader(stream) {
					const reader = stream._reader;
					if (reader === void 0) {
						return false;
					}
					if (!IsReadableStreamDefaultReader(reader)) {
						return false;
					}
					return true;
				}
				class ReadableStreamDefaultReader {
					constructor(stream) {
						assertRequiredArgument(
							stream,
							1,
							'ReadableStreamDefaultReader'
						);
						assertReadableStream(stream, 'First parameter');
						if (IsReadableStreamLocked(stream)) {
							throw new TypeError(
								'This stream has already been locked for exclusive reading by another reader'
							);
						}
						ReadableStreamReaderGenericInitialize(this, stream);
						this._readRequests = new SimpleQueue();
					}
					get closed() {
						if (!IsReadableStreamDefaultReader(this)) {
							return promiseRejectedWith(
								defaultReaderBrandCheckException('closed')
							);
						}
						return this._closedPromise;
					}
					cancel(reason = void 0) {
						if (!IsReadableStreamDefaultReader(this)) {
							return promiseRejectedWith(
								defaultReaderBrandCheckException('cancel')
							);
						}
						if (this._ownerReadableStream === void 0) {
							return promiseRejectedWith(
								readerLockException('cancel')
							);
						}
						return ReadableStreamReaderGenericCancel(this, reason);
					}
					read() {
						if (!IsReadableStreamDefaultReader(this)) {
							return promiseRejectedWith(
								defaultReaderBrandCheckException('read')
							);
						}
						if (this._ownerReadableStream === void 0) {
							return promiseRejectedWith(
								readerLockException('read from')
							);
						}
						let resolvePromise;
						let rejectPromise;
						const promise = newPromise((resolve2, reject) => {
							resolvePromise = resolve2;
							rejectPromise = reject;
						});
						const readRequest = {
							_chunkSteps: (chunk) =>
								resolvePromise({ value: chunk, done: false }),
							_closeSteps: () =>
								resolvePromise({ value: void 0, done: true }),
							_errorSteps: (e) => rejectPromise(e),
						};
						ReadableStreamDefaultReaderRead(this, readRequest);
						return promise;
					}
					releaseLock() {
						if (!IsReadableStreamDefaultReader(this)) {
							throw defaultReaderBrandCheckException(
								'releaseLock'
							);
						}
						if (this._ownerReadableStream === void 0) {
							return;
						}
						if (this._readRequests.length > 0) {
							throw new TypeError(
								'Tried to release a reader lock when that reader has pending read() calls un-settled'
							);
						}
						ReadableStreamReaderGenericRelease(this);
					}
				}
				Object.defineProperties(ReadableStreamDefaultReader.prototype, {
					cancel: { enumerable: true },
					read: { enumerable: true },
					releaseLock: { enumerable: true },
					closed: { enumerable: true },
				});
				if (typeof SymbolPolyfill.toStringTag === 'symbol') {
					Object.defineProperty(
						ReadableStreamDefaultReader.prototype,
						SymbolPolyfill.toStringTag,
						{
							value: 'ReadableStreamDefaultReader',
							configurable: true,
						}
					);
				}
				function IsReadableStreamDefaultReader(x) {
					if (!typeIsObject(x)) {
						return false;
					}
					if (
						!Object.prototype.hasOwnProperty.call(
							x,
							'_readRequests'
						)
					) {
						return false;
					}
					return x instanceof ReadableStreamDefaultReader;
				}
				function ReadableStreamDefaultReaderRead(reader, readRequest) {
					const stream = reader._ownerReadableStream;
					stream._disturbed = true;
					if (stream._state === 'closed') {
						readRequest._closeSteps();
					} else if (stream._state === 'errored') {
						readRequest._errorSteps(stream._storedError);
					} else {
						stream._readableStreamController[PullSteps](
							readRequest
						);
					}
				}
				function defaultReaderBrandCheckException(name) {
					return new TypeError(
						`ReadableStreamDefaultReader.prototype.${name} can only be used on a ReadableStreamDefaultReader`
					);
				}
				const AsyncIteratorPrototype = Object.getPrototypeOf(
					Object.getPrototypeOf(async function* () {}).prototype
				);
				class ReadableStreamAsyncIteratorImpl {
					constructor(reader, preventCancel) {
						this._ongoingPromise = void 0;
						this._isFinished = false;
						this._reader = reader;
						this._preventCancel = preventCancel;
					}
					next() {
						const nextSteps = () => this._nextSteps();
						this._ongoingPromise = this._ongoingPromise
							? transformPromiseWith(
									this._ongoingPromise,
									nextSteps,
									nextSteps
							  )
							: nextSteps();
						return this._ongoingPromise;
					}
					return(value) {
						const returnSteps = () => this._returnSteps(value);
						return this._ongoingPromise
							? transformPromiseWith(
									this._ongoingPromise,
									returnSteps,
									returnSteps
							  )
							: returnSteps();
					}
					_nextSteps() {
						if (this._isFinished) {
							return Promise.resolve({
								value: void 0,
								done: true,
							});
						}
						const reader = this._reader;
						if (reader._ownerReadableStream === void 0) {
							return promiseRejectedWith(
								readerLockException('iterate')
							);
						}
						let resolvePromise;
						let rejectPromise;
						const promise = newPromise((resolve2, reject) => {
							resolvePromise = resolve2;
							rejectPromise = reject;
						});
						const readRequest = {
							_chunkSteps: (chunk) => {
								this._ongoingPromise = void 0;
								queueMicrotask(() =>
									resolvePromise({
										value: chunk,
										done: false,
									})
								);
							},
							_closeSteps: () => {
								this._ongoingPromise = void 0;
								this._isFinished = true;
								ReadableStreamReaderGenericRelease(reader);
								resolvePromise({ value: void 0, done: true });
							},
							_errorSteps: (reason) => {
								this._ongoingPromise = void 0;
								this._isFinished = true;
								ReadableStreamReaderGenericRelease(reader);
								rejectPromise(reason);
							},
						};
						ReadableStreamDefaultReaderRead(reader, readRequest);
						return promise;
					}
					_returnSteps(value) {
						if (this._isFinished) {
							return Promise.resolve({ value, done: true });
						}
						this._isFinished = true;
						const reader = this._reader;
						if (reader._ownerReadableStream === void 0) {
							return promiseRejectedWith(
								readerLockException('finish iterating')
							);
						}
						if (!this._preventCancel) {
							const result = ReadableStreamReaderGenericCancel(
								reader,
								value
							);
							ReadableStreamReaderGenericRelease(reader);
							return transformPromiseWith(result, () => ({
								value,
								done: true,
							}));
						}
						ReadableStreamReaderGenericRelease(reader);
						return promiseResolvedWith({ value, done: true });
					}
				}
				const ReadableStreamAsyncIteratorPrototype = {
					next() {
						if (!IsReadableStreamAsyncIterator(this)) {
							return promiseRejectedWith(
								streamAsyncIteratorBrandCheckException('next')
							);
						}
						return this._asyncIteratorImpl.next();
					},
					return(value) {
						if (!IsReadableStreamAsyncIterator(this)) {
							return promiseRejectedWith(
								streamAsyncIteratorBrandCheckException('return')
							);
						}
						return this._asyncIteratorImpl.return(value);
					},
				};
				if (AsyncIteratorPrototype !== void 0) {
					Object.setPrototypeOf(
						ReadableStreamAsyncIteratorPrototype,
						AsyncIteratorPrototype
					);
				}
				function AcquireReadableStreamAsyncIterator(
					stream,
					preventCancel
				) {
					const reader = AcquireReadableStreamDefaultReader(stream);
					const impl = new ReadableStreamAsyncIteratorImpl(
						reader,
						preventCancel
					);
					const iterator = Object.create(
						ReadableStreamAsyncIteratorPrototype
					);
					iterator._asyncIteratorImpl = impl;
					return iterator;
				}
				function IsReadableStreamAsyncIterator(x) {
					if (!typeIsObject(x)) {
						return false;
					}
					if (
						!Object.prototype.hasOwnProperty.call(
							x,
							'_asyncIteratorImpl'
						)
					) {
						return false;
					}
					try {
						return (
							x._asyncIteratorImpl instanceof
							ReadableStreamAsyncIteratorImpl
						);
					} catch (_a) {
						return false;
					}
				}
				function streamAsyncIteratorBrandCheckException(name) {
					return new TypeError(
						`ReadableStreamAsyncIterator.${name} can only be used on a ReadableSteamAsyncIterator`
					);
				}
				const NumberIsNaN =
					Number.isNaN ||
					function (x) {
						return x !== x;
					};
				function CreateArrayFromList(elements) {
					return elements.slice();
				}
				function CopyDataBlockBytes(
					dest,
					destOffset,
					src2,
					srcOffset,
					n
				) {
					new Uint8Array(dest).set(
						new Uint8Array(src2, srcOffset, n),
						destOffset
					);
				}
				function TransferArrayBuffer(O) {
					return O;
				}
				function IsDetachedBuffer(O) {
					return false;
				}
				function ArrayBufferSlice(buffer, begin, end) {
					if (buffer.slice) {
						return buffer.slice(begin, end);
					}
					const length = end - begin;
					const slice = new ArrayBuffer(length);
					CopyDataBlockBytes(slice, 0, buffer, begin, length);
					return slice;
				}
				function IsNonNegativeNumber(v) {
					if (typeof v !== 'number') {
						return false;
					}
					if (NumberIsNaN(v)) {
						return false;
					}
					if (v < 0) {
						return false;
					}
					return true;
				}
				function CloneAsUint8Array(O) {
					const buffer = ArrayBufferSlice(
						O.buffer,
						O.byteOffset,
						O.byteOffset + O.byteLength
					);
					return new Uint8Array(buffer);
				}
				function DequeueValue(container) {
					const pair = container._queue.shift();
					container._queueTotalSize -= pair.size;
					if (container._queueTotalSize < 0) {
						container._queueTotalSize = 0;
					}
					return pair.value;
				}
				function EnqueueValueWithSize(container, value, size) {
					if (!IsNonNegativeNumber(size) || size === Infinity) {
						throw new RangeError(
							'Size must be a finite, non-NaN, non-negative number.'
						);
					}
					container._queue.push({ value, size });
					container._queueTotalSize += size;
				}
				function PeekQueueValue(container) {
					const pair = container._queue.peek();
					return pair.value;
				}
				function ResetQueue(container) {
					container._queue = new SimpleQueue();
					container._queueTotalSize = 0;
				}
				class ReadableStreamBYOBRequest {
					constructor() {
						throw new TypeError('Illegal constructor');
					}
					get view() {
						if (!IsReadableStreamBYOBRequest(this)) {
							throw byobRequestBrandCheckException('view');
						}
						return this._view;
					}
					respond(bytesWritten) {
						if (!IsReadableStreamBYOBRequest(this)) {
							throw byobRequestBrandCheckException('respond');
						}
						assertRequiredArgument(bytesWritten, 1, 'respond');
						bytesWritten = convertUnsignedLongLongWithEnforceRange(
							bytesWritten,
							'First parameter'
						);
						if (
							this._associatedReadableByteStreamController ===
							void 0
						) {
							throw new TypeError(
								'This BYOB request has been invalidated'
							);
						}
						if (IsDetachedBuffer(this._view.buffer));
						ReadableByteStreamControllerRespond(
							this._associatedReadableByteStreamController,
							bytesWritten
						);
					}
					respondWithNewView(view) {
						if (!IsReadableStreamBYOBRequest(this)) {
							throw byobRequestBrandCheckException(
								'respondWithNewView'
							);
						}
						assertRequiredArgument(view, 1, 'respondWithNewView');
						if (!ArrayBuffer.isView(view)) {
							throw new TypeError(
								'You can only respond with array buffer views'
							);
						}
						if (
							this._associatedReadableByteStreamController ===
							void 0
						) {
							throw new TypeError(
								'This BYOB request has been invalidated'
							);
						}
						if (IsDetachedBuffer(view.buffer));
						ReadableByteStreamControllerRespondWithNewView(
							this._associatedReadableByteStreamController,
							view
						);
					}
				}
				Object.defineProperties(ReadableStreamBYOBRequest.prototype, {
					respond: { enumerable: true },
					respondWithNewView: { enumerable: true },
					view: { enumerable: true },
				});
				if (typeof SymbolPolyfill.toStringTag === 'symbol') {
					Object.defineProperty(
						ReadableStreamBYOBRequest.prototype,
						SymbolPolyfill.toStringTag,
						{
							value: 'ReadableStreamBYOBRequest',
							configurable: true,
						}
					);
				}
				class ReadableByteStreamController {
					constructor() {
						throw new TypeError('Illegal constructor');
					}
					get byobRequest() {
						if (!IsReadableByteStreamController(this)) {
							throw byteStreamControllerBrandCheckException(
								'byobRequest'
							);
						}
						return ReadableByteStreamControllerGetBYOBRequest(this);
					}
					get desiredSize() {
						if (!IsReadableByteStreamController(this)) {
							throw byteStreamControllerBrandCheckException(
								'desiredSize'
							);
						}
						return ReadableByteStreamControllerGetDesiredSize(this);
					}
					close() {
						if (!IsReadableByteStreamController(this)) {
							throw byteStreamControllerBrandCheckException(
								'close'
							);
						}
						if (this._closeRequested) {
							throw new TypeError(
								'The stream has already been closed; do not close it again!'
							);
						}
						const state = this._controlledReadableByteStream._state;
						if (state !== 'readable') {
							throw new TypeError(
								`The stream (in ${state} state) is not in the readable state and cannot be closed`
							);
						}
						ReadableByteStreamControllerClose(this);
					}
					enqueue(chunk) {
						if (!IsReadableByteStreamController(this)) {
							throw byteStreamControllerBrandCheckException(
								'enqueue'
							);
						}
						assertRequiredArgument(chunk, 1, 'enqueue');
						if (!ArrayBuffer.isView(chunk)) {
							throw new TypeError(
								'chunk must be an array buffer view'
							);
						}
						if (chunk.byteLength === 0) {
							throw new TypeError(
								'chunk must have non-zero byteLength'
							);
						}
						if (chunk.buffer.byteLength === 0) {
							throw new TypeError(
								`chunk's buffer must have non-zero byteLength`
							);
						}
						if (this._closeRequested) {
							throw new TypeError('stream is closed or draining');
						}
						const state = this._controlledReadableByteStream._state;
						if (state !== 'readable') {
							throw new TypeError(
								`The stream (in ${state} state) is not in the readable state and cannot be enqueued to`
							);
						}
						ReadableByteStreamControllerEnqueue(this, chunk);
					}
					error(e = void 0) {
						if (!IsReadableByteStreamController(this)) {
							throw byteStreamControllerBrandCheckException(
								'error'
							);
						}
						ReadableByteStreamControllerError(this, e);
					}
					[CancelSteps](reason) {
						ReadableByteStreamControllerClearPendingPullIntos(this);
						ResetQueue(this);
						const result = this._cancelAlgorithm(reason);
						ReadableByteStreamControllerClearAlgorithms(this);
						return result;
					}
					[PullSteps](readRequest) {
						const stream = this._controlledReadableByteStream;
						if (this._queueTotalSize > 0) {
							const entry = this._queue.shift();
							this._queueTotalSize -= entry.byteLength;
							ReadableByteStreamControllerHandleQueueDrain(this);
							const view = new Uint8Array(
								entry.buffer,
								entry.byteOffset,
								entry.byteLength
							);
							readRequest._chunkSteps(view);
							return;
						}
						const autoAllocateChunkSize =
							this._autoAllocateChunkSize;
						if (autoAllocateChunkSize !== void 0) {
							let buffer;
							try {
								buffer = new ArrayBuffer(autoAllocateChunkSize);
							} catch (bufferE) {
								readRequest._errorSteps(bufferE);
								return;
							}
							const pullIntoDescriptor = {
								buffer,
								bufferByteLength: autoAllocateChunkSize,
								byteOffset: 0,
								byteLength: autoAllocateChunkSize,
								bytesFilled: 0,
								elementSize: 1,
								viewConstructor: Uint8Array,
								readerType: 'default',
							};
							this._pendingPullIntos.push(pullIntoDescriptor);
						}
						ReadableStreamAddReadRequest(stream, readRequest);
						ReadableByteStreamControllerCallPullIfNeeded(this);
					}
				}
				Object.defineProperties(
					ReadableByteStreamController.prototype,
					{
						close: { enumerable: true },
						enqueue: { enumerable: true },
						error: { enumerable: true },
						byobRequest: { enumerable: true },
						desiredSize: { enumerable: true },
					}
				);
				if (typeof SymbolPolyfill.toStringTag === 'symbol') {
					Object.defineProperty(
						ReadableByteStreamController.prototype,
						SymbolPolyfill.toStringTag,
						{
							value: 'ReadableByteStreamController',
							configurable: true,
						}
					);
				}
				function IsReadableByteStreamController(x) {
					if (!typeIsObject(x)) {
						return false;
					}
					if (
						!Object.prototype.hasOwnProperty.call(
							x,
							'_controlledReadableByteStream'
						)
					) {
						return false;
					}
					return x instanceof ReadableByteStreamController;
				}
				function IsReadableStreamBYOBRequest(x) {
					if (!typeIsObject(x)) {
						return false;
					}
					if (
						!Object.prototype.hasOwnProperty.call(
							x,
							'_associatedReadableByteStreamController'
						)
					) {
						return false;
					}
					return x instanceof ReadableStreamBYOBRequest;
				}
				function ReadableByteStreamControllerCallPullIfNeeded(
					controller
				) {
					const shouldPull =
						ReadableByteStreamControllerShouldCallPull(controller);
					if (!shouldPull) {
						return;
					}
					if (controller._pulling) {
						controller._pullAgain = true;
						return;
					}
					controller._pulling = true;
					const pullPromise = controller._pullAlgorithm();
					uponPromise(
						pullPromise,
						() => {
							controller._pulling = false;
							if (controller._pullAgain) {
								controller._pullAgain = false;
								ReadableByteStreamControllerCallPullIfNeeded(
									controller
								);
							}
						},
						(e) => {
							ReadableByteStreamControllerError(controller, e);
						}
					);
				}
				function ReadableByteStreamControllerClearPendingPullIntos(
					controller
				) {
					ReadableByteStreamControllerInvalidateBYOBRequest(
						controller
					);
					controller._pendingPullIntos = new SimpleQueue();
				}
				function ReadableByteStreamControllerCommitPullIntoDescriptor(
					stream,
					pullIntoDescriptor
				) {
					let done = false;
					if (stream._state === 'closed') {
						done = true;
					}
					const filledView =
						ReadableByteStreamControllerConvertPullIntoDescriptor(
							pullIntoDescriptor
						);
					if (pullIntoDescriptor.readerType === 'default') {
						ReadableStreamFulfillReadRequest(
							stream,
							filledView,
							done
						);
					} else {
						ReadableStreamFulfillReadIntoRequest(
							stream,
							filledView,
							done
						);
					}
				}
				function ReadableByteStreamControllerConvertPullIntoDescriptor(
					pullIntoDescriptor
				) {
					const bytesFilled = pullIntoDescriptor.bytesFilled;
					const elementSize = pullIntoDescriptor.elementSize;
					return new pullIntoDescriptor.viewConstructor(
						pullIntoDescriptor.buffer,
						pullIntoDescriptor.byteOffset,
						bytesFilled / elementSize
					);
				}
				function ReadableByteStreamControllerEnqueueChunkToQueue(
					controller,
					buffer,
					byteOffset,
					byteLength
				) {
					controller._queue.push({ buffer, byteOffset, byteLength });
					controller._queueTotalSize += byteLength;
				}
				function ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(
					controller,
					pullIntoDescriptor
				) {
					const elementSize = pullIntoDescriptor.elementSize;
					const currentAlignedBytes =
						pullIntoDescriptor.bytesFilled -
						(pullIntoDescriptor.bytesFilled % elementSize);
					const maxBytesToCopy = Math.min(
						controller._queueTotalSize,
						pullIntoDescriptor.byteLength -
							pullIntoDescriptor.bytesFilled
					);
					const maxBytesFilled =
						pullIntoDescriptor.bytesFilled + maxBytesToCopy;
					const maxAlignedBytes =
						maxBytesFilled - (maxBytesFilled % elementSize);
					let totalBytesToCopyRemaining = maxBytesToCopy;
					let ready = false;
					if (maxAlignedBytes > currentAlignedBytes) {
						totalBytesToCopyRemaining =
							maxAlignedBytes - pullIntoDescriptor.bytesFilled;
						ready = true;
					}
					const queue = controller._queue;
					while (totalBytesToCopyRemaining > 0) {
						const headOfQueue = queue.peek();
						const bytesToCopy = Math.min(
							totalBytesToCopyRemaining,
							headOfQueue.byteLength
						);
						const destStart =
							pullIntoDescriptor.byteOffset +
							pullIntoDescriptor.bytesFilled;
						CopyDataBlockBytes(
							pullIntoDescriptor.buffer,
							destStart,
							headOfQueue.buffer,
							headOfQueue.byteOffset,
							bytesToCopy
						);
						if (headOfQueue.byteLength === bytesToCopy) {
							queue.shift();
						} else {
							headOfQueue.byteOffset += bytesToCopy;
							headOfQueue.byteLength -= bytesToCopy;
						}
						controller._queueTotalSize -= bytesToCopy;
						ReadableByteStreamControllerFillHeadPullIntoDescriptor(
							controller,
							bytesToCopy,
							pullIntoDescriptor
						);
						totalBytesToCopyRemaining -= bytesToCopy;
					}
					return ready;
				}
				function ReadableByteStreamControllerFillHeadPullIntoDescriptor(
					controller,
					size,
					pullIntoDescriptor
				) {
					pullIntoDescriptor.bytesFilled += size;
				}
				function ReadableByteStreamControllerHandleQueueDrain(
					controller
				) {
					if (
						controller._queueTotalSize === 0 &&
						controller._closeRequested
					) {
						ReadableByteStreamControllerClearAlgorithms(controller);
						ReadableStreamClose(
							controller._controlledReadableByteStream
						);
					} else {
						ReadableByteStreamControllerCallPullIfNeeded(
							controller
						);
					}
				}
				function ReadableByteStreamControllerInvalidateBYOBRequest(
					controller
				) {
					if (controller._byobRequest === null) {
						return;
					}
					controller._byobRequest._associatedReadableByteStreamController =
						void 0;
					controller._byobRequest._view = null;
					controller._byobRequest = null;
				}
				function ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(
					controller
				) {
					while (controller._pendingPullIntos.length > 0) {
						if (controller._queueTotalSize === 0) {
							return;
						}
						const pullIntoDescriptor =
							controller._pendingPullIntos.peek();
						if (
							ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(
								controller,
								pullIntoDescriptor
							)
						) {
							ReadableByteStreamControllerShiftPendingPullInto(
								controller
							);
							ReadableByteStreamControllerCommitPullIntoDescriptor(
								controller._controlledReadableByteStream,
								pullIntoDescriptor
							);
						}
					}
				}
				function ReadableByteStreamControllerPullInto(
					controller,
					view,
					readIntoRequest
				) {
					const stream = controller._controlledReadableByteStream;
					let elementSize = 1;
					if (view.constructor !== DataView) {
						elementSize = view.constructor.BYTES_PER_ELEMENT;
					}
					const ctor = view.constructor;
					const buffer = TransferArrayBuffer(view.buffer);
					const pullIntoDescriptor = {
						buffer,
						bufferByteLength: buffer.byteLength,
						byteOffset: view.byteOffset,
						byteLength: view.byteLength,
						bytesFilled: 0,
						elementSize,
						viewConstructor: ctor,
						readerType: 'byob',
					};
					if (controller._pendingPullIntos.length > 0) {
						controller._pendingPullIntos.push(pullIntoDescriptor);
						ReadableStreamAddReadIntoRequest(
							stream,
							readIntoRequest
						);
						return;
					}
					if (stream._state === 'closed') {
						const emptyView = new ctor(
							pullIntoDescriptor.buffer,
							pullIntoDescriptor.byteOffset,
							0
						);
						readIntoRequest._closeSteps(emptyView);
						return;
					}
					if (controller._queueTotalSize > 0) {
						if (
							ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(
								controller,
								pullIntoDescriptor
							)
						) {
							const filledView =
								ReadableByteStreamControllerConvertPullIntoDescriptor(
									pullIntoDescriptor
								);
							ReadableByteStreamControllerHandleQueueDrain(
								controller
							);
							readIntoRequest._chunkSteps(filledView);
							return;
						}
						if (controller._closeRequested) {
							const e = new TypeError(
								'Insufficient bytes to fill elements in the given buffer'
							);
							ReadableByteStreamControllerError(controller, e);
							readIntoRequest._errorSteps(e);
							return;
						}
					}
					controller._pendingPullIntos.push(pullIntoDescriptor);
					ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
					ReadableByteStreamControllerCallPullIfNeeded(controller);
				}
				function ReadableByteStreamControllerRespondInClosedState(
					controller,
					firstDescriptor
				) {
					const stream = controller._controlledReadableByteStream;
					if (ReadableStreamHasBYOBReader(stream)) {
						while (
							ReadableStreamGetNumReadIntoRequests(stream) > 0
						) {
							const pullIntoDescriptor =
								ReadableByteStreamControllerShiftPendingPullInto(
									controller
								);
							ReadableByteStreamControllerCommitPullIntoDescriptor(
								stream,
								pullIntoDescriptor
							);
						}
					}
				}
				function ReadableByteStreamControllerRespondInReadableState(
					controller,
					bytesWritten,
					pullIntoDescriptor
				) {
					ReadableByteStreamControllerFillHeadPullIntoDescriptor(
						controller,
						bytesWritten,
						pullIntoDescriptor
					);
					if (
						pullIntoDescriptor.bytesFilled <
						pullIntoDescriptor.elementSize
					) {
						return;
					}
					ReadableByteStreamControllerShiftPendingPullInto(
						controller
					);
					const remainderSize =
						pullIntoDescriptor.bytesFilled %
						pullIntoDescriptor.elementSize;
					if (remainderSize > 0) {
						const end =
							pullIntoDescriptor.byteOffset +
							pullIntoDescriptor.bytesFilled;
						const remainder = ArrayBufferSlice(
							pullIntoDescriptor.buffer,
							end - remainderSize,
							end
						);
						ReadableByteStreamControllerEnqueueChunkToQueue(
							controller,
							remainder,
							0,
							remainder.byteLength
						);
					}
					pullIntoDescriptor.bytesFilled -= remainderSize;
					ReadableByteStreamControllerCommitPullIntoDescriptor(
						controller._controlledReadableByteStream,
						pullIntoDescriptor
					);
					ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(
						controller
					);
				}
				function ReadableByteStreamControllerRespondInternal(
					controller,
					bytesWritten
				) {
					const firstDescriptor = controller._pendingPullIntos.peek();
					ReadableByteStreamControllerInvalidateBYOBRequest(
						controller
					);
					const state =
						controller._controlledReadableByteStream._state;
					if (state === 'closed') {
						ReadableByteStreamControllerRespondInClosedState(
							controller
						);
					} else {
						ReadableByteStreamControllerRespondInReadableState(
							controller,
							bytesWritten,
							firstDescriptor
						);
					}
					ReadableByteStreamControllerCallPullIfNeeded(controller);
				}
				function ReadableByteStreamControllerShiftPendingPullInto(
					controller
				) {
					const descriptor = controller._pendingPullIntos.shift();
					return descriptor;
				}
				function ReadableByteStreamControllerShouldCallPull(
					controller
				) {
					const stream = controller._controlledReadableByteStream;
					if (stream._state !== 'readable') {
						return false;
					}
					if (controller._closeRequested) {
						return false;
					}
					if (!controller._started) {
						return false;
					}
					if (
						ReadableStreamHasDefaultReader(stream) &&
						ReadableStreamGetNumReadRequests(stream) > 0
					) {
						return true;
					}
					if (
						ReadableStreamHasBYOBReader(stream) &&
						ReadableStreamGetNumReadIntoRequests(stream) > 0
					) {
						return true;
					}
					const desiredSize =
						ReadableByteStreamControllerGetDesiredSize(controller);
					if (desiredSize > 0) {
						return true;
					}
					return false;
				}
				function ReadableByteStreamControllerClearAlgorithms(
					controller
				) {
					controller._pullAlgorithm = void 0;
					controller._cancelAlgorithm = void 0;
				}
				function ReadableByteStreamControllerClose(controller) {
					const stream = controller._controlledReadableByteStream;
					if (
						controller._closeRequested ||
						stream._state !== 'readable'
					) {
						return;
					}
					if (controller._queueTotalSize > 0) {
						controller._closeRequested = true;
						return;
					}
					if (controller._pendingPullIntos.length > 0) {
						const firstPendingPullInto =
							controller._pendingPullIntos.peek();
						if (firstPendingPullInto.bytesFilled > 0) {
							const e = new TypeError(
								'Insufficient bytes to fill elements in the given buffer'
							);
							ReadableByteStreamControllerError(controller, e);
							throw e;
						}
					}
					ReadableByteStreamControllerClearAlgorithms(controller);
					ReadableStreamClose(stream);
				}
				function ReadableByteStreamControllerEnqueue(
					controller,
					chunk
				) {
					const stream = controller._controlledReadableByteStream;
					if (
						controller._closeRequested ||
						stream._state !== 'readable'
					) {
						return;
					}
					const buffer = chunk.buffer;
					const byteOffset = chunk.byteOffset;
					const byteLength = chunk.byteLength;
					const transferredBuffer = TransferArrayBuffer(buffer);
					if (controller._pendingPullIntos.length > 0) {
						const firstPendingPullInto =
							controller._pendingPullIntos.peek();
						if (IsDetachedBuffer(firstPendingPullInto.buffer));
						firstPendingPullInto.buffer = TransferArrayBuffer(
							firstPendingPullInto.buffer
						);
					}
					ReadableByteStreamControllerInvalidateBYOBRequest(
						controller
					);
					if (ReadableStreamHasDefaultReader(stream)) {
						if (ReadableStreamGetNumReadRequests(stream) === 0) {
							ReadableByteStreamControllerEnqueueChunkToQueue(
								controller,
								transferredBuffer,
								byteOffset,
								byteLength
							);
						} else {
							const transferredView = new Uint8Array(
								transferredBuffer,
								byteOffset,
								byteLength
							);
							ReadableStreamFulfillReadRequest(
								stream,
								transferredView,
								false
							);
						}
					} else if (ReadableStreamHasBYOBReader(stream)) {
						ReadableByteStreamControllerEnqueueChunkToQueue(
							controller,
							transferredBuffer,
							byteOffset,
							byteLength
						);
						ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(
							controller
						);
					} else {
						ReadableByteStreamControllerEnqueueChunkToQueue(
							controller,
							transferredBuffer,
							byteOffset,
							byteLength
						);
					}
					ReadableByteStreamControllerCallPullIfNeeded(controller);
				}
				function ReadableByteStreamControllerError(controller, e) {
					const stream = controller._controlledReadableByteStream;
					if (stream._state !== 'readable') {
						return;
					}
					ReadableByteStreamControllerClearPendingPullIntos(
						controller
					);
					ResetQueue(controller);
					ReadableByteStreamControllerClearAlgorithms(controller);
					ReadableStreamError(stream, e);
				}
				function ReadableByteStreamControllerGetBYOBRequest(
					controller
				) {
					if (
						controller._byobRequest === null &&
						controller._pendingPullIntos.length > 0
					) {
						const firstDescriptor =
							controller._pendingPullIntos.peek();
						const view = new Uint8Array(
							firstDescriptor.buffer,
							firstDescriptor.byteOffset +
								firstDescriptor.bytesFilled,
							firstDescriptor.byteLength -
								firstDescriptor.bytesFilled
						);
						const byobRequest = Object.create(
							ReadableStreamBYOBRequest.prototype
						);
						SetUpReadableStreamBYOBRequest(
							byobRequest,
							controller,
							view
						);
						controller._byobRequest = byobRequest;
					}
					return controller._byobRequest;
				}
				function ReadableByteStreamControllerGetDesiredSize(
					controller
				) {
					const state =
						controller._controlledReadableByteStream._state;
					if (state === 'errored') {
						return null;
					}
					if (state === 'closed') {
						return 0;
					}
					return controller._strategyHWM - controller._queueTotalSize;
				}
				function ReadableByteStreamControllerRespond(
					controller,
					bytesWritten
				) {
					const firstDescriptor = controller._pendingPullIntos.peek();
					const state =
						controller._controlledReadableByteStream._state;
					if (state === 'closed') {
						if (bytesWritten !== 0) {
							throw new TypeError(
								'bytesWritten must be 0 when calling respond() on a closed stream'
							);
						}
					} else {
						if (bytesWritten === 0) {
							throw new TypeError(
								'bytesWritten must be greater than 0 when calling respond() on a readable stream'
							);
						}
						if (
							firstDescriptor.bytesFilled + bytesWritten >
							firstDescriptor.byteLength
						) {
							throw new RangeError('bytesWritten out of range');
						}
					}
					firstDescriptor.buffer = TransferArrayBuffer(
						firstDescriptor.buffer
					);
					ReadableByteStreamControllerRespondInternal(
						controller,
						bytesWritten
					);
				}
				function ReadableByteStreamControllerRespondWithNewView(
					controller,
					view
				) {
					const firstDescriptor = controller._pendingPullIntos.peek();
					const state =
						controller._controlledReadableByteStream._state;
					if (state === 'closed') {
						if (view.byteLength !== 0) {
							throw new TypeError(
								"The view's length must be 0 when calling respondWithNewView() on a closed stream"
							);
						}
					} else {
						if (view.byteLength === 0) {
							throw new TypeError(
								"The view's length must be greater than 0 when calling respondWithNewView() on a readable stream"
							);
						}
					}
					if (
						firstDescriptor.byteOffset +
							firstDescriptor.bytesFilled !==
						view.byteOffset
					) {
						throw new RangeError(
							'The region specified by view does not match byobRequest'
						);
					}
					if (
						firstDescriptor.bufferByteLength !==
						view.buffer.byteLength
					) {
						throw new RangeError(
							'The buffer of view has different capacity than byobRequest'
						);
					}
					if (
						firstDescriptor.bytesFilled + view.byteLength >
						firstDescriptor.byteLength
					) {
						throw new RangeError(
							'The region specified by view is larger than byobRequest'
						);
					}
					firstDescriptor.buffer = TransferArrayBuffer(view.buffer);
					ReadableByteStreamControllerRespondInternal(
						controller,
						view.byteLength
					);
				}
				function SetUpReadableByteStreamController(
					stream,
					controller,
					startAlgorithm,
					pullAlgorithm,
					cancelAlgorithm,
					highWaterMark,
					autoAllocateChunkSize
				) {
					controller._controlledReadableByteStream = stream;
					controller._pullAgain = false;
					controller._pulling = false;
					controller._byobRequest = null;
					controller._queue = controller._queueTotalSize = void 0;
					ResetQueue(controller);
					controller._closeRequested = false;
					controller._started = false;
					controller._strategyHWM = highWaterMark;
					controller._pullAlgorithm = pullAlgorithm;
					controller._cancelAlgorithm = cancelAlgorithm;
					controller._autoAllocateChunkSize = autoAllocateChunkSize;
					controller._pendingPullIntos = new SimpleQueue();
					stream._readableStreamController = controller;
					const startResult = startAlgorithm();
					uponPromise(
						promiseResolvedWith(startResult),
						() => {
							controller._started = true;
							ReadableByteStreamControllerCallPullIfNeeded(
								controller
							);
						},
						(r) => {
							ReadableByteStreamControllerError(controller, r);
						}
					);
				}
				function SetUpReadableByteStreamControllerFromUnderlyingSource(
					stream,
					underlyingByteSource,
					highWaterMark
				) {
					const controller = Object.create(
						ReadableByteStreamController.prototype
					);
					let startAlgorithm = () => void 0;
					let pullAlgorithm = () => promiseResolvedWith(void 0);
					let cancelAlgorithm = () => promiseResolvedWith(void 0);
					if (underlyingByteSource.start !== void 0) {
						startAlgorithm = () =>
							underlyingByteSource.start(controller);
					}
					if (underlyingByteSource.pull !== void 0) {
						pullAlgorithm = () =>
							underlyingByteSource.pull(controller);
					}
					if (underlyingByteSource.cancel !== void 0) {
						cancelAlgorithm = (reason) =>
							underlyingByteSource.cancel(reason);
					}
					const autoAllocateChunkSize =
						underlyingByteSource.autoAllocateChunkSize;
					if (autoAllocateChunkSize === 0) {
						throw new TypeError(
							'autoAllocateChunkSize must be greater than 0'
						);
					}
					SetUpReadableByteStreamController(
						stream,
						controller,
						startAlgorithm,
						pullAlgorithm,
						cancelAlgorithm,
						highWaterMark,
						autoAllocateChunkSize
					);
				}
				function SetUpReadableStreamBYOBRequest(
					request,
					controller,
					view
				) {
					request._associatedReadableByteStreamController =
						controller;
					request._view = view;
				}
				function byobRequestBrandCheckException(name) {
					return new TypeError(
						`ReadableStreamBYOBRequest.prototype.${name} can only be used on a ReadableStreamBYOBRequest`
					);
				}
				function byteStreamControllerBrandCheckException(name) {
					return new TypeError(
						`ReadableByteStreamController.prototype.${name} can only be used on a ReadableByteStreamController`
					);
				}
				function AcquireReadableStreamBYOBReader(stream) {
					return new ReadableStreamBYOBReader(stream);
				}
				function ReadableStreamAddReadIntoRequest(
					stream,
					readIntoRequest
				) {
					stream._reader._readIntoRequests.push(readIntoRequest);
				}
				function ReadableStreamFulfillReadIntoRequest(
					stream,
					chunk,
					done
				) {
					const reader = stream._reader;
					const readIntoRequest = reader._readIntoRequests.shift();
					if (done) {
						readIntoRequest._closeSteps(chunk);
					} else {
						readIntoRequest._chunkSteps(chunk);
					}
				}
				function ReadableStreamGetNumReadIntoRequests(stream) {
					return stream._reader._readIntoRequests.length;
				}
				function ReadableStreamHasBYOBReader(stream) {
					const reader = stream._reader;
					if (reader === void 0) {
						return false;
					}
					if (!IsReadableStreamBYOBReader(reader)) {
						return false;
					}
					return true;
				}
				class ReadableStreamBYOBReader {
					constructor(stream) {
						assertRequiredArgument(
							stream,
							1,
							'ReadableStreamBYOBReader'
						);
						assertReadableStream(stream, 'First parameter');
						if (IsReadableStreamLocked(stream)) {
							throw new TypeError(
								'This stream has already been locked for exclusive reading by another reader'
							);
						}
						if (
							!IsReadableByteStreamController(
								stream._readableStreamController
							)
						) {
							throw new TypeError(
								'Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source'
							);
						}
						ReadableStreamReaderGenericInitialize(this, stream);
						this._readIntoRequests = new SimpleQueue();
					}
					get closed() {
						if (!IsReadableStreamBYOBReader(this)) {
							return promiseRejectedWith(
								byobReaderBrandCheckException('closed')
							);
						}
						return this._closedPromise;
					}
					cancel(reason = void 0) {
						if (!IsReadableStreamBYOBReader(this)) {
							return promiseRejectedWith(
								byobReaderBrandCheckException('cancel')
							);
						}
						if (this._ownerReadableStream === void 0) {
							return promiseRejectedWith(
								readerLockException('cancel')
							);
						}
						return ReadableStreamReaderGenericCancel(this, reason);
					}
					read(view) {
						if (!IsReadableStreamBYOBReader(this)) {
							return promiseRejectedWith(
								byobReaderBrandCheckException('read')
							);
						}
						if (!ArrayBuffer.isView(view)) {
							return promiseRejectedWith(
								new TypeError(
									'view must be an array buffer view'
								)
							);
						}
						if (view.byteLength === 0) {
							return promiseRejectedWith(
								new TypeError(
									'view must have non-zero byteLength'
								)
							);
						}
						if (view.buffer.byteLength === 0) {
							return promiseRejectedWith(
								new TypeError(
									`view's buffer must have non-zero byteLength`
								)
							);
						}
						if (IsDetachedBuffer(view.buffer));
						if (this._ownerReadableStream === void 0) {
							return promiseRejectedWith(
								readerLockException('read from')
							);
						}
						let resolvePromise;
						let rejectPromise;
						const promise = newPromise((resolve2, reject) => {
							resolvePromise = resolve2;
							rejectPromise = reject;
						});
						const readIntoRequest = {
							_chunkSteps: (chunk) =>
								resolvePromise({ value: chunk, done: false }),
							_closeSteps: (chunk) =>
								resolvePromise({ value: chunk, done: true }),
							_errorSteps: (e) => rejectPromise(e),
						};
						ReadableStreamBYOBReaderRead(
							this,
							view,
							readIntoRequest
						);
						return promise;
					}
					releaseLock() {
						if (!IsReadableStreamBYOBReader(this)) {
							throw byobReaderBrandCheckException('releaseLock');
						}
						if (this._ownerReadableStream === void 0) {
							return;
						}
						if (this._readIntoRequests.length > 0) {
							throw new TypeError(
								'Tried to release a reader lock when that reader has pending read() calls un-settled'
							);
						}
						ReadableStreamReaderGenericRelease(this);
					}
				}
				Object.defineProperties(ReadableStreamBYOBReader.prototype, {
					cancel: { enumerable: true },
					read: { enumerable: true },
					releaseLock: { enumerable: true },
					closed: { enumerable: true },
				});
				if (typeof SymbolPolyfill.toStringTag === 'symbol') {
					Object.defineProperty(
						ReadableStreamBYOBReader.prototype,
						SymbolPolyfill.toStringTag,
						{
							value: 'ReadableStreamBYOBReader',
							configurable: true,
						}
					);
				}
				function IsReadableStreamBYOBReader(x) {
					if (!typeIsObject(x)) {
						return false;
					}
					if (
						!Object.prototype.hasOwnProperty.call(
							x,
							'_readIntoRequests'
						)
					) {
						return false;
					}
					return x instanceof ReadableStreamBYOBReader;
				}
				function ReadableStreamBYOBReaderRead(
					reader,
					view,
					readIntoRequest
				) {
					const stream = reader._ownerReadableStream;
					stream._disturbed = true;
					if (stream._state === 'errored') {
						readIntoRequest._errorSteps(stream._storedError);
					} else {
						ReadableByteStreamControllerPullInto(
							stream._readableStreamController,
							view,
							readIntoRequest
						);
					}
				}
				function byobReaderBrandCheckException(name) {
					return new TypeError(
						`ReadableStreamBYOBReader.prototype.${name} can only be used on a ReadableStreamBYOBReader`
					);
				}
				function ExtractHighWaterMark(strategy, defaultHWM) {
					const { highWaterMark } = strategy;
					if (highWaterMark === void 0) {
						return defaultHWM;
					}
					if (NumberIsNaN(highWaterMark) || highWaterMark < 0) {
						throw new RangeError('Invalid highWaterMark');
					}
					return highWaterMark;
				}
				function ExtractSizeAlgorithm(strategy) {
					const { size } = strategy;
					if (!size) {
						return () => 1;
					}
					return size;
				}
				function convertQueuingStrategy(init2, context) {
					assertDictionary(init2, context);
					const highWaterMark =
						init2 === null || init2 === void 0
							? void 0
							: init2.highWaterMark;
					const size =
						init2 === null || init2 === void 0
							? void 0
							: init2.size;
					return {
						highWaterMark:
							highWaterMark === void 0
								? void 0
								: convertUnrestrictedDouble(highWaterMark),
						size:
							size === void 0
								? void 0
								: convertQueuingStrategySize(
										size,
										`${context} has member 'size' that`
								  ),
					};
				}
				function convertQueuingStrategySize(fn, context) {
					assertFunction(fn, context);
					return (chunk) => convertUnrestrictedDouble(fn(chunk));
				}
				function convertUnderlyingSink(original, context) {
					assertDictionary(original, context);
					const abort =
						original === null || original === void 0
							? void 0
							: original.abort;
					const close =
						original === null || original === void 0
							? void 0
							: original.close;
					const start =
						original === null || original === void 0
							? void 0
							: original.start;
					const type =
						original === null || original === void 0
							? void 0
							: original.type;
					const write =
						original === null || original === void 0
							? void 0
							: original.write;
					return {
						abort:
							abort === void 0
								? void 0
								: convertUnderlyingSinkAbortCallback(
										abort,
										original,
										`${context} has member 'abort' that`
								  ),
						close:
							close === void 0
								? void 0
								: convertUnderlyingSinkCloseCallback(
										close,
										original,
										`${context} has member 'close' that`
								  ),
						start:
							start === void 0
								? void 0
								: convertUnderlyingSinkStartCallback(
										start,
										original,
										`${context} has member 'start' that`
								  ),
						write:
							write === void 0
								? void 0
								: convertUnderlyingSinkWriteCallback(
										write,
										original,
										`${context} has member 'write' that`
								  ),
						type,
					};
				}
				function convertUnderlyingSinkAbortCallback(
					fn,
					original,
					context
				) {
					assertFunction(fn, context);
					return (reason) => promiseCall(fn, original, [reason]);
				}
				function convertUnderlyingSinkCloseCallback(
					fn,
					original,
					context
				) {
					assertFunction(fn, context);
					return () => promiseCall(fn, original, []);
				}
				function convertUnderlyingSinkStartCallback(
					fn,
					original,
					context
				) {
					assertFunction(fn, context);
					return (controller) =>
						reflectCall(fn, original, [controller]);
				}
				function convertUnderlyingSinkWriteCallback(
					fn,
					original,
					context
				) {
					assertFunction(fn, context);
					return (chunk, controller) =>
						promiseCall(fn, original, [chunk, controller]);
				}
				function assertWritableStream(x, context) {
					if (!IsWritableStream(x)) {
						throw new TypeError(
							`${context} is not a WritableStream.`
						);
					}
				}
				function isAbortSignal2(value) {
					if (typeof value !== 'object' || value === null) {
						return false;
					}
					try {
						return typeof value.aborted === 'boolean';
					} catch (_a) {
						return false;
					}
				}
				const supportsAbortController =
					typeof AbortController === 'function';
				function createAbortController() {
					if (supportsAbortController) {
						return new AbortController();
					}
					return void 0;
				}
				class WritableStream {
					constructor(rawUnderlyingSink = {}, rawStrategy = {}) {
						if (rawUnderlyingSink === void 0) {
							rawUnderlyingSink = null;
						} else {
							assertObject(rawUnderlyingSink, 'First parameter');
						}
						const strategy = convertQueuingStrategy(
							rawStrategy,
							'Second parameter'
						);
						const underlyingSink = convertUnderlyingSink(
							rawUnderlyingSink,
							'First parameter'
						);
						InitializeWritableStream(this);
						const type = underlyingSink.type;
						if (type !== void 0) {
							throw new RangeError('Invalid type is specified');
						}
						const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
						const highWaterMark = ExtractHighWaterMark(strategy, 1);
						SetUpWritableStreamDefaultControllerFromUnderlyingSink(
							this,
							underlyingSink,
							highWaterMark,
							sizeAlgorithm
						);
					}
					get locked() {
						if (!IsWritableStream(this)) {
							throw streamBrandCheckException$2('locked');
						}
						return IsWritableStreamLocked(this);
					}
					abort(reason = void 0) {
						if (!IsWritableStream(this)) {
							return promiseRejectedWith(
								streamBrandCheckException$2('abort')
							);
						}
						if (IsWritableStreamLocked(this)) {
							return promiseRejectedWith(
								new TypeError(
									'Cannot abort a stream that already has a writer'
								)
							);
						}
						return WritableStreamAbort(this, reason);
					}
					close() {
						if (!IsWritableStream(this)) {
							return promiseRejectedWith(
								streamBrandCheckException$2('close')
							);
						}
						if (IsWritableStreamLocked(this)) {
							return promiseRejectedWith(
								new TypeError(
									'Cannot close a stream that already has a writer'
								)
							);
						}
						if (WritableStreamCloseQueuedOrInFlight(this)) {
							return promiseRejectedWith(
								new TypeError(
									'Cannot close an already-closing stream'
								)
							);
						}
						return WritableStreamClose(this);
					}
					getWriter() {
						if (!IsWritableStream(this)) {
							throw streamBrandCheckException$2('getWriter');
						}
						return AcquireWritableStreamDefaultWriter(this);
					}
				}
				Object.defineProperties(WritableStream.prototype, {
					abort: { enumerable: true },
					close: { enumerable: true },
					getWriter: { enumerable: true },
					locked: { enumerable: true },
				});
				if (typeof SymbolPolyfill.toStringTag === 'symbol') {
					Object.defineProperty(
						WritableStream.prototype,
						SymbolPolyfill.toStringTag,
						{
							value: 'WritableStream',
							configurable: true,
						}
					);
				}
				function AcquireWritableStreamDefaultWriter(stream) {
					return new WritableStreamDefaultWriter(stream);
				}
				function CreateWritableStream(
					startAlgorithm,
					writeAlgorithm,
					closeAlgorithm,
					abortAlgorithm,
					highWaterMark = 1,
					sizeAlgorithm = () => 1
				) {
					const stream = Object.create(WritableStream.prototype);
					InitializeWritableStream(stream);
					const controller = Object.create(
						WritableStreamDefaultController.prototype
					);
					SetUpWritableStreamDefaultController(
						stream,
						controller,
						startAlgorithm,
						writeAlgorithm,
						closeAlgorithm,
						abortAlgorithm,
						highWaterMark,
						sizeAlgorithm
					);
					return stream;
				}
				function InitializeWritableStream(stream) {
					stream._state = 'writable';
					stream._storedError = void 0;
					stream._writer = void 0;
					stream._writableStreamController = void 0;
					stream._writeRequests = new SimpleQueue();
					stream._inFlightWriteRequest = void 0;
					stream._closeRequest = void 0;
					stream._inFlightCloseRequest = void 0;
					stream._pendingAbortRequest = void 0;
					stream._backpressure = false;
				}
				function IsWritableStream(x) {
					if (!typeIsObject(x)) {
						return false;
					}
					if (
						!Object.prototype.hasOwnProperty.call(
							x,
							'_writableStreamController'
						)
					) {
						return false;
					}
					return x instanceof WritableStream;
				}
				function IsWritableStreamLocked(stream) {
					if (stream._writer === void 0) {
						return false;
					}
					return true;
				}
				function WritableStreamAbort(stream, reason) {
					var _a;
					if (
						stream._state === 'closed' ||
						stream._state === 'errored'
					) {
						return promiseResolvedWith(void 0);
					}
					stream._writableStreamController._abortReason = reason;
					(_a = stream._writableStreamController._abortController) ===
						null || _a === void 0
						? void 0
						: _a.abort();
					const state = stream._state;
					if (state === 'closed' || state === 'errored') {
						return promiseResolvedWith(void 0);
					}
					if (stream._pendingAbortRequest !== void 0) {
						return stream._pendingAbortRequest._promise;
					}
					let wasAlreadyErroring = false;
					if (state === 'erroring') {
						wasAlreadyErroring = true;
						reason = void 0;
					}
					const promise = newPromise((resolve2, reject) => {
						stream._pendingAbortRequest = {
							_promise: void 0,
							_resolve: resolve2,
							_reject: reject,
							_reason: reason,
							_wasAlreadyErroring: wasAlreadyErroring,
						};
					});
					stream._pendingAbortRequest._promise = promise;
					if (!wasAlreadyErroring) {
						WritableStreamStartErroring(stream, reason);
					}
					return promise;
				}
				function WritableStreamClose(stream) {
					const state = stream._state;
					if (state === 'closed' || state === 'errored') {
						return promiseRejectedWith(
							new TypeError(
								`The stream (in ${state} state) is not in the writable state and cannot be closed`
							)
						);
					}
					const promise = newPromise((resolve2, reject) => {
						const closeRequest = {
							_resolve: resolve2,
							_reject: reject,
						};
						stream._closeRequest = closeRequest;
					});
					const writer = stream._writer;
					if (
						writer !== void 0 &&
						stream._backpressure &&
						state === 'writable'
					) {
						defaultWriterReadyPromiseResolve(writer);
					}
					WritableStreamDefaultControllerClose(
						stream._writableStreamController
					);
					return promise;
				}
				function WritableStreamAddWriteRequest(stream) {
					const promise = newPromise((resolve2, reject) => {
						const writeRequest = {
							_resolve: resolve2,
							_reject: reject,
						};
						stream._writeRequests.push(writeRequest);
					});
					return promise;
				}
				function WritableStreamDealWithRejection(stream, error2) {
					const state = stream._state;
					if (state === 'writable') {
						WritableStreamStartErroring(stream, error2);
						return;
					}
					WritableStreamFinishErroring(stream);
				}
				function WritableStreamStartErroring(stream, reason) {
					const controller = stream._writableStreamController;
					stream._state = 'erroring';
					stream._storedError = reason;
					const writer = stream._writer;
					if (writer !== void 0) {
						WritableStreamDefaultWriterEnsureReadyPromiseRejected(
							writer,
							reason
						);
					}
					if (
						!WritableStreamHasOperationMarkedInFlight(stream) &&
						controller._started
					) {
						WritableStreamFinishErroring(stream);
					}
				}
				function WritableStreamFinishErroring(stream) {
					stream._state = 'errored';
					stream._writableStreamController[ErrorSteps]();
					const storedError = stream._storedError;
					stream._writeRequests.forEach((writeRequest) => {
						writeRequest._reject(storedError);
					});
					stream._writeRequests = new SimpleQueue();
					if (stream._pendingAbortRequest === void 0) {
						WritableStreamRejectCloseAndClosedPromiseIfNeeded(
							stream
						);
						return;
					}
					const abortRequest = stream._pendingAbortRequest;
					stream._pendingAbortRequest = void 0;
					if (abortRequest._wasAlreadyErroring) {
						abortRequest._reject(storedError);
						WritableStreamRejectCloseAndClosedPromiseIfNeeded(
							stream
						);
						return;
					}
					const promise = stream._writableStreamController[
						AbortSteps
					](abortRequest._reason);
					uponPromise(
						promise,
						() => {
							abortRequest._resolve();
							WritableStreamRejectCloseAndClosedPromiseIfNeeded(
								stream
							);
						},
						(reason) => {
							abortRequest._reject(reason);
							WritableStreamRejectCloseAndClosedPromiseIfNeeded(
								stream
							);
						}
					);
				}
				function WritableStreamFinishInFlightWrite(stream) {
					stream._inFlightWriteRequest._resolve(void 0);
					stream._inFlightWriteRequest = void 0;
				}
				function WritableStreamFinishInFlightWriteWithError(
					stream,
					error2
				) {
					stream._inFlightWriteRequest._reject(error2);
					stream._inFlightWriteRequest = void 0;
					WritableStreamDealWithRejection(stream, error2);
				}
				function WritableStreamFinishInFlightClose(stream) {
					stream._inFlightCloseRequest._resolve(void 0);
					stream._inFlightCloseRequest = void 0;
					const state = stream._state;
					if (state === 'erroring') {
						stream._storedError = void 0;
						if (stream._pendingAbortRequest !== void 0) {
							stream._pendingAbortRequest._resolve();
							stream._pendingAbortRequest = void 0;
						}
					}
					stream._state = 'closed';
					const writer = stream._writer;
					if (writer !== void 0) {
						defaultWriterClosedPromiseResolve(writer);
					}
				}
				function WritableStreamFinishInFlightCloseWithError(
					stream,
					error2
				) {
					stream._inFlightCloseRequest._reject(error2);
					stream._inFlightCloseRequest = void 0;
					if (stream._pendingAbortRequest !== void 0) {
						stream._pendingAbortRequest._reject(error2);
						stream._pendingAbortRequest = void 0;
					}
					WritableStreamDealWithRejection(stream, error2);
				}
				function WritableStreamCloseQueuedOrInFlight(stream) {
					if (
						stream._closeRequest === void 0 &&
						stream._inFlightCloseRequest === void 0
					) {
						return false;
					}
					return true;
				}
				function WritableStreamHasOperationMarkedInFlight(stream) {
					if (
						stream._inFlightWriteRequest === void 0 &&
						stream._inFlightCloseRequest === void 0
					) {
						return false;
					}
					return true;
				}
				function WritableStreamMarkCloseRequestInFlight(stream) {
					stream._inFlightCloseRequest = stream._closeRequest;
					stream._closeRequest = void 0;
				}
				function WritableStreamMarkFirstWriteRequestInFlight(stream) {
					stream._inFlightWriteRequest =
						stream._writeRequests.shift();
				}
				function WritableStreamRejectCloseAndClosedPromiseIfNeeded(
					stream
				) {
					if (stream._closeRequest !== void 0) {
						stream._closeRequest._reject(stream._storedError);
						stream._closeRequest = void 0;
					}
					const writer = stream._writer;
					if (writer !== void 0) {
						defaultWriterClosedPromiseReject(
							writer,
							stream._storedError
						);
					}
				}
				function WritableStreamUpdateBackpressure(
					stream,
					backpressure
				) {
					const writer = stream._writer;
					if (
						writer !== void 0 &&
						backpressure !== stream._backpressure
					) {
						if (backpressure) {
							defaultWriterReadyPromiseReset(writer);
						} else {
							defaultWriterReadyPromiseResolve(writer);
						}
					}
					stream._backpressure = backpressure;
				}
				class WritableStreamDefaultWriter {
					constructor(stream) {
						assertRequiredArgument(
							stream,
							1,
							'WritableStreamDefaultWriter'
						);
						assertWritableStream(stream, 'First parameter');
						if (IsWritableStreamLocked(stream)) {
							throw new TypeError(
								'This stream has already been locked for exclusive writing by another writer'
							);
						}
						this._ownerWritableStream = stream;
						stream._writer = this;
						const state = stream._state;
						if (state === 'writable') {
							if (
								!WritableStreamCloseQueuedOrInFlight(stream) &&
								stream._backpressure
							) {
								defaultWriterReadyPromiseInitialize(this);
							} else {
								defaultWriterReadyPromiseInitializeAsResolved(
									this
								);
							}
							defaultWriterClosedPromiseInitialize(this);
						} else if (state === 'erroring') {
							defaultWriterReadyPromiseInitializeAsRejected(
								this,
								stream._storedError
							);
							defaultWriterClosedPromiseInitialize(this);
						} else if (state === 'closed') {
							defaultWriterReadyPromiseInitializeAsResolved(this);
							defaultWriterClosedPromiseInitializeAsResolved(
								this
							);
						} else {
							const storedError = stream._storedError;
							defaultWriterReadyPromiseInitializeAsRejected(
								this,
								storedError
							);
							defaultWriterClosedPromiseInitializeAsRejected(
								this,
								storedError
							);
						}
					}
					get closed() {
						if (!IsWritableStreamDefaultWriter(this)) {
							return promiseRejectedWith(
								defaultWriterBrandCheckException('closed')
							);
						}
						return this._closedPromise;
					}
					get desiredSize() {
						if (!IsWritableStreamDefaultWriter(this)) {
							throw defaultWriterBrandCheckException(
								'desiredSize'
							);
						}
						if (this._ownerWritableStream === void 0) {
							throw defaultWriterLockException('desiredSize');
						}
						return WritableStreamDefaultWriterGetDesiredSize(this);
					}
					get ready() {
						if (!IsWritableStreamDefaultWriter(this)) {
							return promiseRejectedWith(
								defaultWriterBrandCheckException('ready')
							);
						}
						return this._readyPromise;
					}
					abort(reason = void 0) {
						if (!IsWritableStreamDefaultWriter(this)) {
							return promiseRejectedWith(
								defaultWriterBrandCheckException('abort')
							);
						}
						if (this._ownerWritableStream === void 0) {
							return promiseRejectedWith(
								defaultWriterLockException('abort')
							);
						}
						return WritableStreamDefaultWriterAbort(this, reason);
					}
					close() {
						if (!IsWritableStreamDefaultWriter(this)) {
							return promiseRejectedWith(
								defaultWriterBrandCheckException('close')
							);
						}
						const stream = this._ownerWritableStream;
						if (stream === void 0) {
							return promiseRejectedWith(
								defaultWriterLockException('close')
							);
						}
						if (WritableStreamCloseQueuedOrInFlight(stream)) {
							return promiseRejectedWith(
								new TypeError(
									'Cannot close an already-closing stream'
								)
							);
						}
						return WritableStreamDefaultWriterClose(this);
					}
					releaseLock() {
						if (!IsWritableStreamDefaultWriter(this)) {
							throw defaultWriterBrandCheckException(
								'releaseLock'
							);
						}
						const stream = this._ownerWritableStream;
						if (stream === void 0) {
							return;
						}
						WritableStreamDefaultWriterRelease(this);
					}
					write(chunk = void 0) {
						if (!IsWritableStreamDefaultWriter(this)) {
							return promiseRejectedWith(
								defaultWriterBrandCheckException('write')
							);
						}
						if (this._ownerWritableStream === void 0) {
							return promiseRejectedWith(
								defaultWriterLockException('write to')
							);
						}
						return WritableStreamDefaultWriterWrite(this, chunk);
					}
				}
				Object.defineProperties(WritableStreamDefaultWriter.prototype, {
					abort: { enumerable: true },
					close: { enumerable: true },
					releaseLock: { enumerable: true },
					write: { enumerable: true },
					closed: { enumerable: true },
					desiredSize: { enumerable: true },
					ready: { enumerable: true },
				});
				if (typeof SymbolPolyfill.toStringTag === 'symbol') {
					Object.defineProperty(
						WritableStreamDefaultWriter.prototype,
						SymbolPolyfill.toStringTag,
						{
							value: 'WritableStreamDefaultWriter',
							configurable: true,
						}
					);
				}
				function IsWritableStreamDefaultWriter(x) {
					if (!typeIsObject(x)) {
						return false;
					}
					if (
						!Object.prototype.hasOwnProperty.call(
							x,
							'_ownerWritableStream'
						)
					) {
						return false;
					}
					return x instanceof WritableStreamDefaultWriter;
				}
				function WritableStreamDefaultWriterAbort(writer, reason) {
					const stream = writer._ownerWritableStream;
					return WritableStreamAbort(stream, reason);
				}
				function WritableStreamDefaultWriterClose(writer) {
					const stream = writer._ownerWritableStream;
					return WritableStreamClose(stream);
				}
				function WritableStreamDefaultWriterCloseWithErrorPropagation(
					writer
				) {
					const stream = writer._ownerWritableStream;
					const state = stream._state;
					if (
						WritableStreamCloseQueuedOrInFlight(stream) ||
						state === 'closed'
					) {
						return promiseResolvedWith(void 0);
					}
					if (state === 'errored') {
						return promiseRejectedWith(stream._storedError);
					}
					return WritableStreamDefaultWriterClose(writer);
				}
				function WritableStreamDefaultWriterEnsureClosedPromiseRejected(
					writer,
					error2
				) {
					if (writer._closedPromiseState === 'pending') {
						defaultWriterClosedPromiseReject(writer, error2);
					} else {
						defaultWriterClosedPromiseResetToRejected(
							writer,
							error2
						);
					}
				}
				function WritableStreamDefaultWriterEnsureReadyPromiseRejected(
					writer,
					error2
				) {
					if (writer._readyPromiseState === 'pending') {
						defaultWriterReadyPromiseReject(writer, error2);
					} else {
						defaultWriterReadyPromiseResetToRejected(
							writer,
							error2
						);
					}
				}
				function WritableStreamDefaultWriterGetDesiredSize(writer) {
					const stream = writer._ownerWritableStream;
					const state = stream._state;
					if (state === 'errored' || state === 'erroring') {
						return null;
					}
					if (state === 'closed') {
						return 0;
					}
					return WritableStreamDefaultControllerGetDesiredSize(
						stream._writableStreamController
					);
				}
				function WritableStreamDefaultWriterRelease(writer) {
					const stream = writer._ownerWritableStream;
					const releasedError = new TypeError(
						`Writer was released and can no longer be used to monitor the stream's closedness`
					);
					WritableStreamDefaultWriterEnsureReadyPromiseRejected(
						writer,
						releasedError
					);
					WritableStreamDefaultWriterEnsureClosedPromiseRejected(
						writer,
						releasedError
					);
					stream._writer = void 0;
					writer._ownerWritableStream = void 0;
				}
				function WritableStreamDefaultWriterWrite(writer, chunk) {
					const stream = writer._ownerWritableStream;
					const controller = stream._writableStreamController;
					const chunkSize =
						WritableStreamDefaultControllerGetChunkSize(
							controller,
							chunk
						);
					if (stream !== writer._ownerWritableStream) {
						return promiseRejectedWith(
							defaultWriterLockException('write to')
						);
					}
					const state = stream._state;
					if (state === 'errored') {
						return promiseRejectedWith(stream._storedError);
					}
					if (
						WritableStreamCloseQueuedOrInFlight(stream) ||
						state === 'closed'
					) {
						return promiseRejectedWith(
							new TypeError(
								'The stream is closing or closed and cannot be written to'
							)
						);
					}
					if (state === 'erroring') {
						return promiseRejectedWith(stream._storedError);
					}
					const promise = WritableStreamAddWriteRequest(stream);
					WritableStreamDefaultControllerWrite(
						controller,
						chunk,
						chunkSize
					);
					return promise;
				}
				const closeSentinel = {};
				class WritableStreamDefaultController {
					constructor() {
						throw new TypeError('Illegal constructor');
					}
					get abortReason() {
						if (!IsWritableStreamDefaultController(this)) {
							throw defaultControllerBrandCheckException$2(
								'abortReason'
							);
						}
						return this._abortReason;
					}
					get signal() {
						if (!IsWritableStreamDefaultController(this)) {
							throw defaultControllerBrandCheckException$2(
								'signal'
							);
						}
						if (this._abortController === void 0) {
							throw new TypeError(
								'WritableStreamDefaultController.prototype.signal is not supported'
							);
						}
						return this._abortController.signal;
					}
					error(e = void 0) {
						if (!IsWritableStreamDefaultController(this)) {
							throw defaultControllerBrandCheckException$2(
								'error'
							);
						}
						const state = this._controlledWritableStream._state;
						if (state !== 'writable') {
							return;
						}
						WritableStreamDefaultControllerError(this, e);
					}
					[AbortSteps](reason) {
						const result = this._abortAlgorithm(reason);
						WritableStreamDefaultControllerClearAlgorithms(this);
						return result;
					}
					[ErrorSteps]() {
						ResetQueue(this);
					}
				}
				Object.defineProperties(
					WritableStreamDefaultController.prototype,
					{
						error: { enumerable: true },
					}
				);
				if (typeof SymbolPolyfill.toStringTag === 'symbol') {
					Object.defineProperty(
						WritableStreamDefaultController.prototype,
						SymbolPolyfill.toStringTag,
						{
							value: 'WritableStreamDefaultController',
							configurable: true,
						}
					);
				}
				function IsWritableStreamDefaultController(x) {
					if (!typeIsObject(x)) {
						return false;
					}
					if (
						!Object.prototype.hasOwnProperty.call(
							x,
							'_controlledWritableStream'
						)
					) {
						return false;
					}
					return x instanceof WritableStreamDefaultController;
				}
				function SetUpWritableStreamDefaultController(
					stream,
					controller,
					startAlgorithm,
					writeAlgorithm,
					closeAlgorithm,
					abortAlgorithm,
					highWaterMark,
					sizeAlgorithm
				) {
					controller._controlledWritableStream = stream;
					stream._writableStreamController = controller;
					controller._queue = void 0;
					controller._queueTotalSize = void 0;
					ResetQueue(controller);
					controller._abortReason = void 0;
					controller._abortController = createAbortController();
					controller._started = false;
					controller._strategySizeAlgorithm = sizeAlgorithm;
					controller._strategyHWM = highWaterMark;
					controller._writeAlgorithm = writeAlgorithm;
					controller._closeAlgorithm = closeAlgorithm;
					controller._abortAlgorithm = abortAlgorithm;
					const backpressure =
						WritableStreamDefaultControllerGetBackpressure(
							controller
						);
					WritableStreamUpdateBackpressure(stream, backpressure);
					const startResult = startAlgorithm();
					const startPromise = promiseResolvedWith(startResult);
					uponPromise(
						startPromise,
						() => {
							controller._started = true;
							WritableStreamDefaultControllerAdvanceQueueIfNeeded(
								controller
							);
						},
						(r) => {
							controller._started = true;
							WritableStreamDealWithRejection(stream, r);
						}
					);
				}
				function SetUpWritableStreamDefaultControllerFromUnderlyingSink(
					stream,
					underlyingSink,
					highWaterMark,
					sizeAlgorithm
				) {
					const controller = Object.create(
						WritableStreamDefaultController.prototype
					);
					let startAlgorithm = () => void 0;
					let writeAlgorithm = () => promiseResolvedWith(void 0);
					let closeAlgorithm = () => promiseResolvedWith(void 0);
					let abortAlgorithm = () => promiseResolvedWith(void 0);
					if (underlyingSink.start !== void 0) {
						startAlgorithm = () => underlyingSink.start(controller);
					}
					if (underlyingSink.write !== void 0) {
						writeAlgorithm = (chunk) =>
							underlyingSink.write(chunk, controller);
					}
					if (underlyingSink.close !== void 0) {
						closeAlgorithm = () => underlyingSink.close();
					}
					if (underlyingSink.abort !== void 0) {
						abortAlgorithm = (reason) =>
							underlyingSink.abort(reason);
					}
					SetUpWritableStreamDefaultController(
						stream,
						controller,
						startAlgorithm,
						writeAlgorithm,
						closeAlgorithm,
						abortAlgorithm,
						highWaterMark,
						sizeAlgorithm
					);
				}
				function WritableStreamDefaultControllerClearAlgorithms(
					controller
				) {
					controller._writeAlgorithm = void 0;
					controller._closeAlgorithm = void 0;
					controller._abortAlgorithm = void 0;
					controller._strategySizeAlgorithm = void 0;
				}
				function WritableStreamDefaultControllerClose(controller) {
					EnqueueValueWithSize(controller, closeSentinel, 0);
					WritableStreamDefaultControllerAdvanceQueueIfNeeded(
						controller
					);
				}
				function WritableStreamDefaultControllerGetChunkSize(
					controller,
					chunk
				) {
					try {
						return controller._strategySizeAlgorithm(chunk);
					} catch (chunkSizeE) {
						WritableStreamDefaultControllerErrorIfNeeded(
							controller,
							chunkSizeE
						);
						return 1;
					}
				}
				function WritableStreamDefaultControllerGetDesiredSize(
					controller
				) {
					return controller._strategyHWM - controller._queueTotalSize;
				}
				function WritableStreamDefaultControllerWrite(
					controller,
					chunk,
					chunkSize
				) {
					try {
						EnqueueValueWithSize(controller, chunk, chunkSize);
					} catch (enqueueE) {
						WritableStreamDefaultControllerErrorIfNeeded(
							controller,
							enqueueE
						);
						return;
					}
					const stream = controller._controlledWritableStream;
					if (
						!WritableStreamCloseQueuedOrInFlight(stream) &&
						stream._state === 'writable'
					) {
						const backpressure =
							WritableStreamDefaultControllerGetBackpressure(
								controller
							);
						WritableStreamUpdateBackpressure(stream, backpressure);
					}
					WritableStreamDefaultControllerAdvanceQueueIfNeeded(
						controller
					);
				}
				function WritableStreamDefaultControllerAdvanceQueueIfNeeded(
					controller
				) {
					const stream = controller._controlledWritableStream;
					if (!controller._started) {
						return;
					}
					if (stream._inFlightWriteRequest !== void 0) {
						return;
					}
					const state = stream._state;
					if (state === 'erroring') {
						WritableStreamFinishErroring(stream);
						return;
					}
					if (controller._queue.length === 0) {
						return;
					}
					const value = PeekQueueValue(controller);
					if (value === closeSentinel) {
						WritableStreamDefaultControllerProcessClose(controller);
					} else {
						WritableStreamDefaultControllerProcessWrite(
							controller,
							value
						);
					}
				}
				function WritableStreamDefaultControllerErrorIfNeeded(
					controller,
					error2
				) {
					if (
						controller._controlledWritableStream._state ===
						'writable'
					) {
						WritableStreamDefaultControllerError(
							controller,
							error2
						);
					}
				}
				function WritableStreamDefaultControllerProcessClose(
					controller
				) {
					const stream = controller._controlledWritableStream;
					WritableStreamMarkCloseRequestInFlight(stream);
					DequeueValue(controller);
					const sinkClosePromise = controller._closeAlgorithm();
					WritableStreamDefaultControllerClearAlgorithms(controller);
					uponPromise(
						sinkClosePromise,
						() => {
							WritableStreamFinishInFlightClose(stream);
						},
						(reason) => {
							WritableStreamFinishInFlightCloseWithError(
								stream,
								reason
							);
						}
					);
				}
				function WritableStreamDefaultControllerProcessWrite(
					controller,
					chunk
				) {
					const stream = controller._controlledWritableStream;
					WritableStreamMarkFirstWriteRequestInFlight(stream);
					const sinkWritePromise = controller._writeAlgorithm(chunk);
					uponPromise(
						sinkWritePromise,
						() => {
							WritableStreamFinishInFlightWrite(stream);
							const state = stream._state;
							DequeueValue(controller);
							if (
								!WritableStreamCloseQueuedOrInFlight(stream) &&
								state === 'writable'
							) {
								const backpressure =
									WritableStreamDefaultControllerGetBackpressure(
										controller
									);
								WritableStreamUpdateBackpressure(
									stream,
									backpressure
								);
							}
							WritableStreamDefaultControllerAdvanceQueueIfNeeded(
								controller
							);
						},
						(reason) => {
							if (stream._state === 'writable') {
								WritableStreamDefaultControllerClearAlgorithms(
									controller
								);
							}
							WritableStreamFinishInFlightWriteWithError(
								stream,
								reason
							);
						}
					);
				}
				function WritableStreamDefaultControllerGetBackpressure(
					controller
				) {
					const desiredSize =
						WritableStreamDefaultControllerGetDesiredSize(
							controller
						);
					return desiredSize <= 0;
				}
				function WritableStreamDefaultControllerError(
					controller,
					error2
				) {
					const stream = controller._controlledWritableStream;
					WritableStreamDefaultControllerClearAlgorithms(controller);
					WritableStreamStartErroring(stream, error2);
				}
				function streamBrandCheckException$2(name) {
					return new TypeError(
						`WritableStream.prototype.${name} can only be used on a WritableStream`
					);
				}
				function defaultControllerBrandCheckException$2(name) {
					return new TypeError(
						`WritableStreamDefaultController.prototype.${name} can only be used on a WritableStreamDefaultController`
					);
				}
				function defaultWriterBrandCheckException(name) {
					return new TypeError(
						`WritableStreamDefaultWriter.prototype.${name} can only be used on a WritableStreamDefaultWriter`
					);
				}
				function defaultWriterLockException(name) {
					return new TypeError(
						'Cannot ' + name + ' a stream using a released writer'
					);
				}
				function defaultWriterClosedPromiseInitialize(writer) {
					writer._closedPromise = newPromise((resolve2, reject) => {
						writer._closedPromise_resolve = resolve2;
						writer._closedPromise_reject = reject;
						writer._closedPromiseState = 'pending';
					});
				}
				function defaultWriterClosedPromiseInitializeAsRejected(
					writer,
					reason
				) {
					defaultWriterClosedPromiseInitialize(writer);
					defaultWriterClosedPromiseReject(writer, reason);
				}
				function defaultWriterClosedPromiseInitializeAsResolved(
					writer
				) {
					defaultWriterClosedPromiseInitialize(writer);
					defaultWriterClosedPromiseResolve(writer);
				}
				function defaultWriterClosedPromiseReject(writer, reason) {
					if (writer._closedPromise_reject === void 0) {
						return;
					}
					setPromiseIsHandledToTrue(writer._closedPromise);
					writer._closedPromise_reject(reason);
					writer._closedPromise_resolve = void 0;
					writer._closedPromise_reject = void 0;
					writer._closedPromiseState = 'rejected';
				}
				function defaultWriterClosedPromiseResetToRejected(
					writer,
					reason
				) {
					defaultWriterClosedPromiseInitializeAsRejected(
						writer,
						reason
					);
				}
				function defaultWriterClosedPromiseResolve(writer) {
					if (writer._closedPromise_resolve === void 0) {
						return;
					}
					writer._closedPromise_resolve(void 0);
					writer._closedPromise_resolve = void 0;
					writer._closedPromise_reject = void 0;
					writer._closedPromiseState = 'resolved';
				}
				function defaultWriterReadyPromiseInitialize(writer) {
					writer._readyPromise = newPromise((resolve2, reject) => {
						writer._readyPromise_resolve = resolve2;
						writer._readyPromise_reject = reject;
					});
					writer._readyPromiseState = 'pending';
				}
				function defaultWriterReadyPromiseInitializeAsRejected(
					writer,
					reason
				) {
					defaultWriterReadyPromiseInitialize(writer);
					defaultWriterReadyPromiseReject(writer, reason);
				}
				function defaultWriterReadyPromiseInitializeAsResolved(writer) {
					defaultWriterReadyPromiseInitialize(writer);
					defaultWriterReadyPromiseResolve(writer);
				}
				function defaultWriterReadyPromiseReject(writer, reason) {
					if (writer._readyPromise_reject === void 0) {
						return;
					}
					setPromiseIsHandledToTrue(writer._readyPromise);
					writer._readyPromise_reject(reason);
					writer._readyPromise_resolve = void 0;
					writer._readyPromise_reject = void 0;
					writer._readyPromiseState = 'rejected';
				}
				function defaultWriterReadyPromiseReset(writer) {
					defaultWriterReadyPromiseInitialize(writer);
				}
				function defaultWriterReadyPromiseResetToRejected(
					writer,
					reason
				) {
					defaultWriterReadyPromiseInitializeAsRejected(
						writer,
						reason
					);
				}
				function defaultWriterReadyPromiseResolve(writer) {
					if (writer._readyPromise_resolve === void 0) {
						return;
					}
					writer._readyPromise_resolve(void 0);
					writer._readyPromise_resolve = void 0;
					writer._readyPromise_reject = void 0;
					writer._readyPromiseState = 'fulfilled';
				}
				const NativeDOMException =
					typeof DOMException !== 'undefined' ? DOMException : void 0;
				function isDOMExceptionConstructor(ctor) {
					if (
						!(
							typeof ctor === 'function' ||
							typeof ctor === 'object'
						)
					) {
						return false;
					}
					try {
						new ctor();
						return true;
					} catch (_a) {
						return false;
					}
				}
				function createDOMExceptionPolyfill() {
					const ctor = function DOMException2(message, name) {
						this.message = message || '';
						this.name = name || 'Error';
						if (Error.captureStackTrace) {
							Error.captureStackTrace(this, this.constructor);
						}
					};
					ctor.prototype = Object.create(Error.prototype);
					Object.defineProperty(ctor.prototype, 'constructor', {
						value: ctor,
						writable: true,
						configurable: true,
					});
					return ctor;
				}
				const DOMException$1 = isDOMExceptionConstructor(
					NativeDOMException
				)
					? NativeDOMException
					: createDOMExceptionPolyfill();
				function ReadableStreamPipeTo(
					source,
					dest,
					preventClose,
					preventAbort,
					preventCancel,
					signal
				) {
					const reader = AcquireReadableStreamDefaultReader(source);
					const writer = AcquireWritableStreamDefaultWriter(dest);
					source._disturbed = true;
					let shuttingDown = false;
					let currentWrite = promiseResolvedWith(void 0);
					return newPromise((resolve2, reject) => {
						let abortAlgorithm;
						if (signal !== void 0) {
							abortAlgorithm = () => {
								const error2 = new DOMException$1(
									'Aborted',
									'AbortError'
								);
								const actions = [];
								if (!preventAbort) {
									actions.push(() => {
										if (dest._state === 'writable') {
											return WritableStreamAbort(
												dest,
												error2
											);
										}
										return promiseResolvedWith(void 0);
									});
								}
								if (!preventCancel) {
									actions.push(() => {
										if (source._state === 'readable') {
											return ReadableStreamCancel(
												source,
												error2
											);
										}
										return promiseResolvedWith(void 0);
									});
								}
								shutdownWithAction(
									() =>
										Promise.all(
											actions.map((action) => action())
										),
									true,
									error2
								);
							};
							if (signal.aborted) {
								abortAlgorithm();
								return;
							}
							signal.addEventListener('abort', abortAlgorithm);
						}
						function pipeLoop() {
							return newPromise((resolveLoop, rejectLoop) => {
								function next(done) {
									if (done) {
										resolveLoop();
									} else {
										PerformPromiseThen(
											pipeStep(),
											next,
											rejectLoop
										);
									}
								}
								next(false);
							});
						}
						function pipeStep() {
							if (shuttingDown) {
								return promiseResolvedWith(true);
							}
							return PerformPromiseThen(
								writer._readyPromise,
								() => {
									return newPromise(
										(resolveRead, rejectRead) => {
											ReadableStreamDefaultReaderRead(
												reader,
												{
													_chunkSteps: (chunk) => {
														currentWrite =
															PerformPromiseThen(
																WritableStreamDefaultWriterWrite(
																	writer,
																	chunk
																),
																void 0,
																noop2
															);
														resolveRead(false);
													},
													_closeSteps: () =>
														resolveRead(true),
													_errorSteps: rejectRead,
												}
											);
										}
									);
								}
							);
						}
						isOrBecomesErrored(
							source,
							reader._closedPromise,
							(storedError) => {
								if (!preventAbort) {
									shutdownWithAction(
										() =>
											WritableStreamAbort(
												dest,
												storedError
											),
										true,
										storedError
									);
								} else {
									shutdown(true, storedError);
								}
							}
						);
						isOrBecomesErrored(
							dest,
							writer._closedPromise,
							(storedError) => {
								if (!preventCancel) {
									shutdownWithAction(
										() =>
											ReadableStreamCancel(
												source,
												storedError
											),
										true,
										storedError
									);
								} else {
									shutdown(true, storedError);
								}
							}
						);
						isOrBecomesClosed(source, reader._closedPromise, () => {
							if (!preventClose) {
								shutdownWithAction(() =>
									WritableStreamDefaultWriterCloseWithErrorPropagation(
										writer
									)
								);
							} else {
								shutdown();
							}
						});
						if (
							WritableStreamCloseQueuedOrInFlight(dest) ||
							dest._state === 'closed'
						) {
							const destClosed = new TypeError(
								'the destination writable stream closed before all data could be piped to it'
							);
							if (!preventCancel) {
								shutdownWithAction(
									() =>
										ReadableStreamCancel(
											source,
											destClosed
										),
									true,
									destClosed
								);
							} else {
								shutdown(true, destClosed);
							}
						}
						setPromiseIsHandledToTrue(pipeLoop());
						function waitForWritesToFinish() {
							const oldCurrentWrite = currentWrite;
							return PerformPromiseThen(currentWrite, () =>
								oldCurrentWrite !== currentWrite
									? waitForWritesToFinish()
									: void 0
							);
						}
						function isOrBecomesErrored(stream, promise, action) {
							if (stream._state === 'errored') {
								action(stream._storedError);
							} else {
								uponRejection(promise, action);
							}
						}
						function isOrBecomesClosed(stream, promise, action) {
							if (stream._state === 'closed') {
								action();
							} else {
								uponFulfillment(promise, action);
							}
						}
						function shutdownWithAction(
							action,
							originalIsError,
							originalError
						) {
							if (shuttingDown) {
								return;
							}
							shuttingDown = true;
							if (
								dest._state === 'writable' &&
								!WritableStreamCloseQueuedOrInFlight(dest)
							) {
								uponFulfillment(
									waitForWritesToFinish(),
									doTheRest
								);
							} else {
								doTheRest();
							}
							function doTheRest() {
								uponPromise(
									action(),
									() =>
										finalize(
											originalIsError,
											originalError
										),
									(newError) => finalize(true, newError)
								);
							}
						}
						function shutdown(isError, error2) {
							if (shuttingDown) {
								return;
							}
							shuttingDown = true;
							if (
								dest._state === 'writable' &&
								!WritableStreamCloseQueuedOrInFlight(dest)
							) {
								uponFulfillment(waitForWritesToFinish(), () =>
									finalize(isError, error2)
								);
							} else {
								finalize(isError, error2);
							}
						}
						function finalize(isError, error2) {
							WritableStreamDefaultWriterRelease(writer);
							ReadableStreamReaderGenericRelease(reader);
							if (signal !== void 0) {
								signal.removeEventListener(
									'abort',
									abortAlgorithm
								);
							}
							if (isError) {
								reject(error2);
							} else {
								resolve2(void 0);
							}
						}
					});
				}
				class ReadableStreamDefaultController {
					constructor() {
						throw new TypeError('Illegal constructor');
					}
					get desiredSize() {
						if (!IsReadableStreamDefaultController(this)) {
							throw defaultControllerBrandCheckException$1(
								'desiredSize'
							);
						}
						return ReadableStreamDefaultControllerGetDesiredSize(
							this
						);
					}
					close() {
						if (!IsReadableStreamDefaultController(this)) {
							throw defaultControllerBrandCheckException$1(
								'close'
							);
						}
						if (
							!ReadableStreamDefaultControllerCanCloseOrEnqueue(
								this
							)
						) {
							throw new TypeError(
								'The stream is not in a state that permits close'
							);
						}
						ReadableStreamDefaultControllerClose(this);
					}
					enqueue(chunk = void 0) {
						if (!IsReadableStreamDefaultController(this)) {
							throw defaultControllerBrandCheckException$1(
								'enqueue'
							);
						}
						if (
							!ReadableStreamDefaultControllerCanCloseOrEnqueue(
								this
							)
						) {
							throw new TypeError(
								'The stream is not in a state that permits enqueue'
							);
						}
						return ReadableStreamDefaultControllerEnqueue(
							this,
							chunk
						);
					}
					error(e = void 0) {
						if (!IsReadableStreamDefaultController(this)) {
							throw defaultControllerBrandCheckException$1(
								'error'
							);
						}
						ReadableStreamDefaultControllerError(this, e);
					}
					[CancelSteps](reason) {
						ResetQueue(this);
						const result = this._cancelAlgorithm(reason);
						ReadableStreamDefaultControllerClearAlgorithms(this);
						return result;
					}
					[PullSteps](readRequest) {
						const stream = this._controlledReadableStream;
						if (this._queue.length > 0) {
							const chunk = DequeueValue(this);
							if (
								this._closeRequested &&
								this._queue.length === 0
							) {
								ReadableStreamDefaultControllerClearAlgorithms(
									this
								);
								ReadableStreamClose(stream);
							} else {
								ReadableStreamDefaultControllerCallPullIfNeeded(
									this
								);
							}
							readRequest._chunkSteps(chunk);
						} else {
							ReadableStreamAddReadRequest(stream, readRequest);
							ReadableStreamDefaultControllerCallPullIfNeeded(
								this
							);
						}
					}
				}
				Object.defineProperties(
					ReadableStreamDefaultController.prototype,
					{
						close: { enumerable: true },
						enqueue: { enumerable: true },
						error: { enumerable: true },
						desiredSize: { enumerable: true },
					}
				);
				if (typeof SymbolPolyfill.toStringTag === 'symbol') {
					Object.defineProperty(
						ReadableStreamDefaultController.prototype,
						SymbolPolyfill.toStringTag,
						{
							value: 'ReadableStreamDefaultController',
							configurable: true,
						}
					);
				}
				function IsReadableStreamDefaultController(x) {
					if (!typeIsObject(x)) {
						return false;
					}
					if (
						!Object.prototype.hasOwnProperty.call(
							x,
							'_controlledReadableStream'
						)
					) {
						return false;
					}
					return x instanceof ReadableStreamDefaultController;
				}
				function ReadableStreamDefaultControllerCallPullIfNeeded(
					controller
				) {
					const shouldPull =
						ReadableStreamDefaultControllerShouldCallPull(
							controller
						);
					if (!shouldPull) {
						return;
					}
					if (controller._pulling) {
						controller._pullAgain = true;
						return;
					}
					controller._pulling = true;
					const pullPromise = controller._pullAlgorithm();
					uponPromise(
						pullPromise,
						() => {
							controller._pulling = false;
							if (controller._pullAgain) {
								controller._pullAgain = false;
								ReadableStreamDefaultControllerCallPullIfNeeded(
									controller
								);
							}
						},
						(e) => {
							ReadableStreamDefaultControllerError(controller, e);
						}
					);
				}
				function ReadableStreamDefaultControllerShouldCallPull(
					controller
				) {
					const stream = controller._controlledReadableStream;
					if (
						!ReadableStreamDefaultControllerCanCloseOrEnqueue(
							controller
						)
					) {
						return false;
					}
					if (!controller._started) {
						return false;
					}
					if (
						IsReadableStreamLocked(stream) &&
						ReadableStreamGetNumReadRequests(stream) > 0
					) {
						return true;
					}
					const desiredSize =
						ReadableStreamDefaultControllerGetDesiredSize(
							controller
						);
					if (desiredSize > 0) {
						return true;
					}
					return false;
				}
				function ReadableStreamDefaultControllerClearAlgorithms(
					controller
				) {
					controller._pullAlgorithm = void 0;
					controller._cancelAlgorithm = void 0;
					controller._strategySizeAlgorithm = void 0;
				}
				function ReadableStreamDefaultControllerClose(controller) {
					if (
						!ReadableStreamDefaultControllerCanCloseOrEnqueue(
							controller
						)
					) {
						return;
					}
					const stream = controller._controlledReadableStream;
					controller._closeRequested = true;
					if (controller._queue.length === 0) {
						ReadableStreamDefaultControllerClearAlgorithms(
							controller
						);
						ReadableStreamClose(stream);
					}
				}
				function ReadableStreamDefaultControllerEnqueue(
					controller,
					chunk
				) {
					if (
						!ReadableStreamDefaultControllerCanCloseOrEnqueue(
							controller
						)
					) {
						return;
					}
					const stream = controller._controlledReadableStream;
					if (
						IsReadableStreamLocked(stream) &&
						ReadableStreamGetNumReadRequests(stream) > 0
					) {
						ReadableStreamFulfillReadRequest(stream, chunk, false);
					} else {
						let chunkSize;
						try {
							chunkSize =
								controller._strategySizeAlgorithm(chunk);
						} catch (chunkSizeE) {
							ReadableStreamDefaultControllerError(
								controller,
								chunkSizeE
							);
							throw chunkSizeE;
						}
						try {
							EnqueueValueWithSize(controller, chunk, chunkSize);
						} catch (enqueueE) {
							ReadableStreamDefaultControllerError(
								controller,
								enqueueE
							);
							throw enqueueE;
						}
					}
					ReadableStreamDefaultControllerCallPullIfNeeded(controller);
				}
				function ReadableStreamDefaultControllerError(controller, e) {
					const stream = controller._controlledReadableStream;
					if (stream._state !== 'readable') {
						return;
					}
					ResetQueue(controller);
					ReadableStreamDefaultControllerClearAlgorithms(controller);
					ReadableStreamError(stream, e);
				}
				function ReadableStreamDefaultControllerGetDesiredSize(
					controller
				) {
					const state = controller._controlledReadableStream._state;
					if (state === 'errored') {
						return null;
					}
					if (state === 'closed') {
						return 0;
					}
					return controller._strategyHWM - controller._queueTotalSize;
				}
				function ReadableStreamDefaultControllerHasBackpressure(
					controller
				) {
					if (
						ReadableStreamDefaultControllerShouldCallPull(
							controller
						)
					) {
						return false;
					}
					return true;
				}
				function ReadableStreamDefaultControllerCanCloseOrEnqueue(
					controller
				) {
					const state = controller._controlledReadableStream._state;
					if (!controller._closeRequested && state === 'readable') {
						return true;
					}
					return false;
				}
				function SetUpReadableStreamDefaultController(
					stream,
					controller,
					startAlgorithm,
					pullAlgorithm,
					cancelAlgorithm,
					highWaterMark,
					sizeAlgorithm
				) {
					controller._controlledReadableStream = stream;
					controller._queue = void 0;
					controller._queueTotalSize = void 0;
					ResetQueue(controller);
					controller._started = false;
					controller._closeRequested = false;
					controller._pullAgain = false;
					controller._pulling = false;
					controller._strategySizeAlgorithm = sizeAlgorithm;
					controller._strategyHWM = highWaterMark;
					controller._pullAlgorithm = pullAlgorithm;
					controller._cancelAlgorithm = cancelAlgorithm;
					stream._readableStreamController = controller;
					const startResult = startAlgorithm();
					uponPromise(
						promiseResolvedWith(startResult),
						() => {
							controller._started = true;
							ReadableStreamDefaultControllerCallPullIfNeeded(
								controller
							);
						},
						(r) => {
							ReadableStreamDefaultControllerError(controller, r);
						}
					);
				}
				function SetUpReadableStreamDefaultControllerFromUnderlyingSource(
					stream,
					underlyingSource,
					highWaterMark,
					sizeAlgorithm
				) {
					const controller = Object.create(
						ReadableStreamDefaultController.prototype
					);
					let startAlgorithm = () => void 0;
					let pullAlgorithm = () => promiseResolvedWith(void 0);
					let cancelAlgorithm = () => promiseResolvedWith(void 0);
					if (underlyingSource.start !== void 0) {
						startAlgorithm = () =>
							underlyingSource.start(controller);
					}
					if (underlyingSource.pull !== void 0) {
						pullAlgorithm = () => underlyingSource.pull(controller);
					}
					if (underlyingSource.cancel !== void 0) {
						cancelAlgorithm = (reason) =>
							underlyingSource.cancel(reason);
					}
					SetUpReadableStreamDefaultController(
						stream,
						controller,
						startAlgorithm,
						pullAlgorithm,
						cancelAlgorithm,
						highWaterMark,
						sizeAlgorithm
					);
				}
				function defaultControllerBrandCheckException$1(name) {
					return new TypeError(
						`ReadableStreamDefaultController.prototype.${name} can only be used on a ReadableStreamDefaultController`
					);
				}
				function ReadableStreamTee(stream, cloneForBranch2) {
					if (
						IsReadableByteStreamController(
							stream._readableStreamController
						)
					) {
						return ReadableByteStreamTee(stream);
					}
					return ReadableStreamDefaultTee(stream);
				}
				function ReadableStreamDefaultTee(stream, cloneForBranch2) {
					const reader = AcquireReadableStreamDefaultReader(stream);
					let reading = false;
					let canceled1 = false;
					let canceled2 = false;
					let reason1;
					let reason2;
					let branch1;
					let branch2;
					let resolveCancelPromise;
					const cancelPromise = newPromise((resolve2) => {
						resolveCancelPromise = resolve2;
					});
					function pullAlgorithm() {
						if (reading) {
							return promiseResolvedWith(void 0);
						}
						reading = true;
						const readRequest = {
							_chunkSteps: (chunk) => {
								queueMicrotask(() => {
									reading = false;
									const chunk1 = chunk;
									const chunk2 = chunk;
									if (!canceled1) {
										ReadableStreamDefaultControllerEnqueue(
											branch1._readableStreamController,
											chunk1
										);
									}
									if (!canceled2) {
										ReadableStreamDefaultControllerEnqueue(
											branch2._readableStreamController,
											chunk2
										);
									}
								});
							},
							_closeSteps: () => {
								reading = false;
								if (!canceled1) {
									ReadableStreamDefaultControllerClose(
										branch1._readableStreamController
									);
								}
								if (!canceled2) {
									ReadableStreamDefaultControllerClose(
										branch2._readableStreamController
									);
								}
								if (!canceled1 || !canceled2) {
									resolveCancelPromise(void 0);
								}
							},
							_errorSteps: () => {
								reading = false;
							},
						};
						ReadableStreamDefaultReaderRead(reader, readRequest);
						return promiseResolvedWith(void 0);
					}
					function cancel1Algorithm(reason) {
						canceled1 = true;
						reason1 = reason;
						if (canceled2) {
							const compositeReason = CreateArrayFromList([
								reason1,
								reason2,
							]);
							const cancelResult = ReadableStreamCancel(
								stream,
								compositeReason
							);
							resolveCancelPromise(cancelResult);
						}
						return cancelPromise;
					}
					function cancel2Algorithm(reason) {
						canceled2 = true;
						reason2 = reason;
						if (canceled1) {
							const compositeReason = CreateArrayFromList([
								reason1,
								reason2,
							]);
							const cancelResult = ReadableStreamCancel(
								stream,
								compositeReason
							);
							resolveCancelPromise(cancelResult);
						}
						return cancelPromise;
					}
					function startAlgorithm() {}
					branch1 = CreateReadableStream(
						startAlgorithm,
						pullAlgorithm,
						cancel1Algorithm
					);
					branch2 = CreateReadableStream(
						startAlgorithm,
						pullAlgorithm,
						cancel2Algorithm
					);
					uponRejection(reader._closedPromise, (r) => {
						ReadableStreamDefaultControllerError(
							branch1._readableStreamController,
							r
						);
						ReadableStreamDefaultControllerError(
							branch2._readableStreamController,
							r
						);
						if (!canceled1 || !canceled2) {
							resolveCancelPromise(void 0);
						}
					});
					return [branch1, branch2];
				}
				function ReadableByteStreamTee(stream) {
					let reader = AcquireReadableStreamDefaultReader(stream);
					let reading = false;
					let canceled1 = false;
					let canceled2 = false;
					let reason1;
					let reason2;
					let branch1;
					let branch2;
					let resolveCancelPromise;
					const cancelPromise = newPromise((resolve2) => {
						resolveCancelPromise = resolve2;
					});
					function forwardReaderError(thisReader) {
						uponRejection(thisReader._closedPromise, (r) => {
							if (thisReader !== reader) {
								return;
							}
							ReadableByteStreamControllerError(
								branch1._readableStreamController,
								r
							);
							ReadableByteStreamControllerError(
								branch2._readableStreamController,
								r
							);
							if (!canceled1 || !canceled2) {
								resolveCancelPromise(void 0);
							}
						});
					}
					function pullWithDefaultReader() {
						if (IsReadableStreamBYOBReader(reader)) {
							ReadableStreamReaderGenericRelease(reader);
							reader = AcquireReadableStreamDefaultReader(stream);
							forwardReaderError(reader);
						}
						const readRequest = {
							_chunkSteps: (chunk) => {
								queueMicrotask(() => {
									reading = false;
									const chunk1 = chunk;
									let chunk2 = chunk;
									if (!canceled1 && !canceled2) {
										try {
											chunk2 = CloneAsUint8Array(chunk);
										} catch (cloneE) {
											ReadableByteStreamControllerError(
												branch1._readableStreamController,
												cloneE
											);
											ReadableByteStreamControllerError(
												branch2._readableStreamController,
												cloneE
											);
											resolveCancelPromise(
												ReadableStreamCancel(
													stream,
													cloneE
												)
											);
											return;
										}
									}
									if (!canceled1) {
										ReadableByteStreamControllerEnqueue(
											branch1._readableStreamController,
											chunk1
										);
									}
									if (!canceled2) {
										ReadableByteStreamControllerEnqueue(
											branch2._readableStreamController,
											chunk2
										);
									}
								});
							},
							_closeSteps: () => {
								reading = false;
								if (!canceled1) {
									ReadableByteStreamControllerClose(
										branch1._readableStreamController
									);
								}
								if (!canceled2) {
									ReadableByteStreamControllerClose(
										branch2._readableStreamController
									);
								}
								if (
									branch1._readableStreamController
										._pendingPullIntos.length > 0
								) {
									ReadableByteStreamControllerRespond(
										branch1._readableStreamController,
										0
									);
								}
								if (
									branch2._readableStreamController
										._pendingPullIntos.length > 0
								) {
									ReadableByteStreamControllerRespond(
										branch2._readableStreamController,
										0
									);
								}
								if (!canceled1 || !canceled2) {
									resolveCancelPromise(void 0);
								}
							},
							_errorSteps: () => {
								reading = false;
							},
						};
						ReadableStreamDefaultReaderRead(reader, readRequest);
					}
					function pullWithBYOBReader(view, forBranch2) {
						if (IsReadableStreamDefaultReader(reader)) {
							ReadableStreamReaderGenericRelease(reader);
							reader = AcquireReadableStreamBYOBReader(stream);
							forwardReaderError(reader);
						}
						const byobBranch = forBranch2 ? branch2 : branch1;
						const otherBranch = forBranch2 ? branch1 : branch2;
						const readIntoRequest = {
							_chunkSteps: (chunk) => {
								queueMicrotask(() => {
									reading = false;
									const byobCanceled = forBranch2
										? canceled2
										: canceled1;
									const otherCanceled = forBranch2
										? canceled1
										: canceled2;
									if (!otherCanceled) {
										let clonedChunk;
										try {
											clonedChunk =
												CloneAsUint8Array(chunk);
										} catch (cloneE) {
											ReadableByteStreamControllerError(
												byobBranch._readableStreamController,
												cloneE
											);
											ReadableByteStreamControllerError(
												otherBranch._readableStreamController,
												cloneE
											);
											resolveCancelPromise(
												ReadableStreamCancel(
													stream,
													cloneE
												)
											);
											return;
										}
										if (!byobCanceled) {
											ReadableByteStreamControllerRespondWithNewView(
												byobBranch._readableStreamController,
												chunk
											);
										}
										ReadableByteStreamControllerEnqueue(
											otherBranch._readableStreamController,
											clonedChunk
										);
									} else if (!byobCanceled) {
										ReadableByteStreamControllerRespondWithNewView(
											byobBranch._readableStreamController,
											chunk
										);
									}
								});
							},
							_closeSteps: (chunk) => {
								reading = false;
								const byobCanceled = forBranch2
									? canceled2
									: canceled1;
								const otherCanceled = forBranch2
									? canceled1
									: canceled2;
								if (!byobCanceled) {
									ReadableByteStreamControllerClose(
										byobBranch._readableStreamController
									);
								}
								if (!otherCanceled) {
									ReadableByteStreamControllerClose(
										otherBranch._readableStreamController
									);
								}
								if (chunk !== void 0) {
									if (!byobCanceled) {
										ReadableByteStreamControllerRespondWithNewView(
											byobBranch._readableStreamController,
											chunk
										);
									}
									if (
										!otherCanceled &&
										otherBranch._readableStreamController
											._pendingPullIntos.length > 0
									) {
										ReadableByteStreamControllerRespond(
											otherBranch._readableStreamController,
											0
										);
									}
								}
								if (!byobCanceled || !otherCanceled) {
									resolveCancelPromise(void 0);
								}
							},
							_errorSteps: () => {
								reading = false;
							},
						};
						ReadableStreamBYOBReaderRead(
							reader,
							view,
							readIntoRequest
						);
					}
					function pull1Algorithm() {
						if (reading) {
							return promiseResolvedWith(void 0);
						}
						reading = true;
						const byobRequest =
							ReadableByteStreamControllerGetBYOBRequest(
								branch1._readableStreamController
							);
						if (byobRequest === null) {
							pullWithDefaultReader();
						} else {
							pullWithBYOBReader(byobRequest._view, false);
						}
						return promiseResolvedWith(void 0);
					}
					function pull2Algorithm() {
						if (reading) {
							return promiseResolvedWith(void 0);
						}
						reading = true;
						const byobRequest =
							ReadableByteStreamControllerGetBYOBRequest(
								branch2._readableStreamController
							);
						if (byobRequest === null) {
							pullWithDefaultReader();
						} else {
							pullWithBYOBReader(byobRequest._view, true);
						}
						return promiseResolvedWith(void 0);
					}
					function cancel1Algorithm(reason) {
						canceled1 = true;
						reason1 = reason;
						if (canceled2) {
							const compositeReason = CreateArrayFromList([
								reason1,
								reason2,
							]);
							const cancelResult = ReadableStreamCancel(
								stream,
								compositeReason
							);
							resolveCancelPromise(cancelResult);
						}
						return cancelPromise;
					}
					function cancel2Algorithm(reason) {
						canceled2 = true;
						reason2 = reason;
						if (canceled1) {
							const compositeReason = CreateArrayFromList([
								reason1,
								reason2,
							]);
							const cancelResult = ReadableStreamCancel(
								stream,
								compositeReason
							);
							resolveCancelPromise(cancelResult);
						}
						return cancelPromise;
					}
					function startAlgorithm() {
						return;
					}
					branch1 = CreateReadableByteStream(
						startAlgorithm,
						pull1Algorithm,
						cancel1Algorithm
					);
					branch2 = CreateReadableByteStream(
						startAlgorithm,
						pull2Algorithm,
						cancel2Algorithm
					);
					forwardReaderError(reader);
					return [branch1, branch2];
				}
				function convertUnderlyingDefaultOrByteSource(source, context) {
					assertDictionary(source, context);
					const original = source;
					const autoAllocateChunkSize =
						original === null || original === void 0
							? void 0
							: original.autoAllocateChunkSize;
					const cancel =
						original === null || original === void 0
							? void 0
							: original.cancel;
					const pull =
						original === null || original === void 0
							? void 0
							: original.pull;
					const start =
						original === null || original === void 0
							? void 0
							: original.start;
					const type =
						original === null || original === void 0
							? void 0
							: original.type;
					return {
						autoAllocateChunkSize:
							autoAllocateChunkSize === void 0
								? void 0
								: convertUnsignedLongLongWithEnforceRange(
										autoAllocateChunkSize,
										`${context} has member 'autoAllocateChunkSize' that`
								  ),
						cancel:
							cancel === void 0
								? void 0
								: convertUnderlyingSourceCancelCallback(
										cancel,
										original,
										`${context} has member 'cancel' that`
								  ),
						pull:
							pull === void 0
								? void 0
								: convertUnderlyingSourcePullCallback(
										pull,
										original,
										`${context} has member 'pull' that`
								  ),
						start:
							start === void 0
								? void 0
								: convertUnderlyingSourceStartCallback(
										start,
										original,
										`${context} has member 'start' that`
								  ),
						type:
							type === void 0
								? void 0
								: convertReadableStreamType(
										type,
										`${context} has member 'type' that`
								  ),
					};
				}
				function convertUnderlyingSourceCancelCallback(
					fn,
					original,
					context
				) {
					assertFunction(fn, context);
					return (reason) => promiseCall(fn, original, [reason]);
				}
				function convertUnderlyingSourcePullCallback(
					fn,
					original,
					context
				) {
					assertFunction(fn, context);
					return (controller) =>
						promiseCall(fn, original, [controller]);
				}
				function convertUnderlyingSourceStartCallback(
					fn,
					original,
					context
				) {
					assertFunction(fn, context);
					return (controller) =>
						reflectCall(fn, original, [controller]);
				}
				function convertReadableStreamType(type, context) {
					type = `${type}`;
					if (type !== 'bytes') {
						throw new TypeError(
							`${context} '${type}' is not a valid enumeration value for ReadableStreamType`
						);
					}
					return type;
				}
				function convertReaderOptions(options2, context) {
					assertDictionary(options2, context);
					const mode =
						options2 === null || options2 === void 0
							? void 0
							: options2.mode;
					return {
						mode:
							mode === void 0
								? void 0
								: convertReadableStreamReaderMode(
										mode,
										`${context} has member 'mode' that`
								  ),
					};
				}
				function convertReadableStreamReaderMode(mode, context) {
					mode = `${mode}`;
					if (mode !== 'byob') {
						throw new TypeError(
							`${context} '${mode}' is not a valid enumeration value for ReadableStreamReaderMode`
						);
					}
					return mode;
				}
				function convertIteratorOptions(options2, context) {
					assertDictionary(options2, context);
					const preventCancel =
						options2 === null || options2 === void 0
							? void 0
							: options2.preventCancel;
					return { preventCancel: Boolean(preventCancel) };
				}
				function convertPipeOptions(options2, context) {
					assertDictionary(options2, context);
					const preventAbort =
						options2 === null || options2 === void 0
							? void 0
							: options2.preventAbort;
					const preventCancel =
						options2 === null || options2 === void 0
							? void 0
							: options2.preventCancel;
					const preventClose =
						options2 === null || options2 === void 0
							? void 0
							: options2.preventClose;
					const signal =
						options2 === null || options2 === void 0
							? void 0
							: options2.signal;
					if (signal !== void 0) {
						assertAbortSignal(
							signal,
							`${context} has member 'signal' that`
						);
					}
					return {
						preventAbort: Boolean(preventAbort),
						preventCancel: Boolean(preventCancel),
						preventClose: Boolean(preventClose),
						signal,
					};
				}
				function assertAbortSignal(signal, context) {
					if (!isAbortSignal2(signal)) {
						throw new TypeError(
							`${context} is not an AbortSignal.`
						);
					}
				}
				function convertReadableWritablePair(pair, context) {
					assertDictionary(pair, context);
					const readable =
						pair === null || pair === void 0
							? void 0
							: pair.readable;
					assertRequiredField(
						readable,
						'readable',
						'ReadableWritablePair'
					);
					assertReadableStream(
						readable,
						`${context} has member 'readable' that`
					);
					const writable2 =
						pair === null || pair === void 0
							? void 0
							: pair.writable;
					assertRequiredField(
						writable2,
						'writable',
						'ReadableWritablePair'
					);
					assertWritableStream(
						writable2,
						`${context} has member 'writable' that`
					);
					return { readable, writable: writable2 };
				}
				class ReadableStream2 {
					constructor(rawUnderlyingSource = {}, rawStrategy = {}) {
						if (rawUnderlyingSource === void 0) {
							rawUnderlyingSource = null;
						} else {
							assertObject(
								rawUnderlyingSource,
								'First parameter'
							);
						}
						const strategy = convertQueuingStrategy(
							rawStrategy,
							'Second parameter'
						);
						const underlyingSource =
							convertUnderlyingDefaultOrByteSource(
								rawUnderlyingSource,
								'First parameter'
							);
						InitializeReadableStream(this);
						if (underlyingSource.type === 'bytes') {
							if (strategy.size !== void 0) {
								throw new RangeError(
									'The strategy for a byte stream cannot have a size function'
								);
							}
							const highWaterMark = ExtractHighWaterMark(
								strategy,
								0
							);
							SetUpReadableByteStreamControllerFromUnderlyingSource(
								this,
								underlyingSource,
								highWaterMark
							);
						} else {
							const sizeAlgorithm =
								ExtractSizeAlgorithm(strategy);
							const highWaterMark = ExtractHighWaterMark(
								strategy,
								1
							);
							SetUpReadableStreamDefaultControllerFromUnderlyingSource(
								this,
								underlyingSource,
								highWaterMark,
								sizeAlgorithm
							);
						}
					}
					get locked() {
						if (!IsReadableStream(this)) {
							throw streamBrandCheckException$1('locked');
						}
						return IsReadableStreamLocked(this);
					}
					cancel(reason = void 0) {
						if (!IsReadableStream(this)) {
							return promiseRejectedWith(
								streamBrandCheckException$1('cancel')
							);
						}
						if (IsReadableStreamLocked(this)) {
							return promiseRejectedWith(
								new TypeError(
									'Cannot cancel a stream that already has a reader'
								)
							);
						}
						return ReadableStreamCancel(this, reason);
					}
					getReader(rawOptions = void 0) {
						if (!IsReadableStream(this)) {
							throw streamBrandCheckException$1('getReader');
						}
						const options2 = convertReaderOptions(
							rawOptions,
							'First parameter'
						);
						if (options2.mode === void 0) {
							return AcquireReadableStreamDefaultReader(this);
						}
						return AcquireReadableStreamBYOBReader(this);
					}
					pipeThrough(rawTransform, rawOptions = {}) {
						if (!IsReadableStream(this)) {
							throw streamBrandCheckException$1('pipeThrough');
						}
						assertRequiredArgument(rawTransform, 1, 'pipeThrough');
						const transform = convertReadableWritablePair(
							rawTransform,
							'First parameter'
						);
						const options2 = convertPipeOptions(
							rawOptions,
							'Second parameter'
						);
						if (IsReadableStreamLocked(this)) {
							throw new TypeError(
								'ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream'
							);
						}
						if (IsWritableStreamLocked(transform.writable)) {
							throw new TypeError(
								'ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream'
							);
						}
						const promise = ReadableStreamPipeTo(
							this,
							transform.writable,
							options2.preventClose,
							options2.preventAbort,
							options2.preventCancel,
							options2.signal
						);
						setPromiseIsHandledToTrue(promise);
						return transform.readable;
					}
					pipeTo(destination, rawOptions = {}) {
						if (!IsReadableStream(this)) {
							return promiseRejectedWith(
								streamBrandCheckException$1('pipeTo')
							);
						}
						if (destination === void 0) {
							return promiseRejectedWith(
								`Parameter 1 is required in 'pipeTo'.`
							);
						}
						if (!IsWritableStream(destination)) {
							return promiseRejectedWith(
								new TypeError(
									`ReadableStream.prototype.pipeTo's first argument must be a WritableStream`
								)
							);
						}
						let options2;
						try {
							options2 = convertPipeOptions(
								rawOptions,
								'Second parameter'
							);
						} catch (e) {
							return promiseRejectedWith(e);
						}
						if (IsReadableStreamLocked(this)) {
							return promiseRejectedWith(
								new TypeError(
									'ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream'
								)
							);
						}
						if (IsWritableStreamLocked(destination)) {
							return promiseRejectedWith(
								new TypeError(
									'ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream'
								)
							);
						}
						return ReadableStreamPipeTo(
							this,
							destination,
							options2.preventClose,
							options2.preventAbort,
							options2.preventCancel,
							options2.signal
						);
					}
					tee() {
						if (!IsReadableStream(this)) {
							throw streamBrandCheckException$1('tee');
						}
						const branches = ReadableStreamTee(this);
						return CreateArrayFromList(branches);
					}
					values(rawOptions = void 0) {
						if (!IsReadableStream(this)) {
							throw streamBrandCheckException$1('values');
						}
						const options2 = convertIteratorOptions(
							rawOptions,
							'First parameter'
						);
						return AcquireReadableStreamAsyncIterator(
							this,
							options2.preventCancel
						);
					}
				}
				Object.defineProperties(ReadableStream2.prototype, {
					cancel: { enumerable: true },
					getReader: { enumerable: true },
					pipeThrough: { enumerable: true },
					pipeTo: { enumerable: true },
					tee: { enumerable: true },
					values: { enumerable: true },
					locked: { enumerable: true },
				});
				if (typeof SymbolPolyfill.toStringTag === 'symbol') {
					Object.defineProperty(
						ReadableStream2.prototype,
						SymbolPolyfill.toStringTag,
						{
							value: 'ReadableStream',
							configurable: true,
						}
					);
				}
				if (typeof SymbolPolyfill.asyncIterator === 'symbol') {
					Object.defineProperty(
						ReadableStream2.prototype,
						SymbolPolyfill.asyncIterator,
						{
							value: ReadableStream2.prototype.values,
							writable: true,
							configurable: true,
						}
					);
				}
				function CreateReadableStream(
					startAlgorithm,
					pullAlgorithm,
					cancelAlgorithm,
					highWaterMark = 1,
					sizeAlgorithm = () => 1
				) {
					const stream = Object.create(ReadableStream2.prototype);
					InitializeReadableStream(stream);
					const controller = Object.create(
						ReadableStreamDefaultController.prototype
					);
					SetUpReadableStreamDefaultController(
						stream,
						controller,
						startAlgorithm,
						pullAlgorithm,
						cancelAlgorithm,
						highWaterMark,
						sizeAlgorithm
					);
					return stream;
				}
				function CreateReadableByteStream(
					startAlgorithm,
					pullAlgorithm,
					cancelAlgorithm
				) {
					const stream = Object.create(ReadableStream2.prototype);
					InitializeReadableStream(stream);
					const controller = Object.create(
						ReadableByteStreamController.prototype
					);
					SetUpReadableByteStreamController(
						stream,
						controller,
						startAlgorithm,
						pullAlgorithm,
						cancelAlgorithm,
						0,
						void 0
					);
					return stream;
				}
				function InitializeReadableStream(stream) {
					stream._state = 'readable';
					stream._reader = void 0;
					stream._storedError = void 0;
					stream._disturbed = false;
				}
				function IsReadableStream(x) {
					if (!typeIsObject(x)) {
						return false;
					}
					if (
						!Object.prototype.hasOwnProperty.call(
							x,
							'_readableStreamController'
						)
					) {
						return false;
					}
					return x instanceof ReadableStream2;
				}
				function IsReadableStreamLocked(stream) {
					if (stream._reader === void 0) {
						return false;
					}
					return true;
				}
				function ReadableStreamCancel(stream, reason) {
					stream._disturbed = true;
					if (stream._state === 'closed') {
						return promiseResolvedWith(void 0);
					}
					if (stream._state === 'errored') {
						return promiseRejectedWith(stream._storedError);
					}
					ReadableStreamClose(stream);
					const reader = stream._reader;
					if (
						reader !== void 0 &&
						IsReadableStreamBYOBReader(reader)
					) {
						reader._readIntoRequests.forEach((readIntoRequest) => {
							readIntoRequest._closeSteps(void 0);
						});
						reader._readIntoRequests = new SimpleQueue();
					}
					const sourceCancelPromise =
						stream._readableStreamController[CancelSteps](reason);
					return transformPromiseWith(sourceCancelPromise, noop2);
				}
				function ReadableStreamClose(stream) {
					stream._state = 'closed';
					const reader = stream._reader;
					if (reader === void 0) {
						return;
					}
					defaultReaderClosedPromiseResolve(reader);
					if (IsReadableStreamDefaultReader(reader)) {
						reader._readRequests.forEach((readRequest) => {
							readRequest._closeSteps();
						});
						reader._readRequests = new SimpleQueue();
					}
				}
				function ReadableStreamError(stream, e) {
					stream._state = 'errored';
					stream._storedError = e;
					const reader = stream._reader;
					if (reader === void 0) {
						return;
					}
					defaultReaderClosedPromiseReject(reader, e);
					if (IsReadableStreamDefaultReader(reader)) {
						reader._readRequests.forEach((readRequest) => {
							readRequest._errorSteps(e);
						});
						reader._readRequests = new SimpleQueue();
					} else {
						reader._readIntoRequests.forEach((readIntoRequest) => {
							readIntoRequest._errorSteps(e);
						});
						reader._readIntoRequests = new SimpleQueue();
					}
				}
				function streamBrandCheckException$1(name) {
					return new TypeError(
						`ReadableStream.prototype.${name} can only be used on a ReadableStream`
					);
				}
				function convertQueuingStrategyInit(init2, context) {
					assertDictionary(init2, context);
					const highWaterMark =
						init2 === null || init2 === void 0
							? void 0
							: init2.highWaterMark;
					assertRequiredField(
						highWaterMark,
						'highWaterMark',
						'QueuingStrategyInit'
					);
					return {
						highWaterMark: convertUnrestrictedDouble(highWaterMark),
					};
				}
				const byteLengthSizeFunction = (chunk) => {
					return chunk.byteLength;
				};
				Object.defineProperty(byteLengthSizeFunction, 'name', {
					value: 'size',
					configurable: true,
				});
				class ByteLengthQueuingStrategy {
					constructor(options2) {
						assertRequiredArgument(
							options2,
							1,
							'ByteLengthQueuingStrategy'
						);
						options2 = convertQueuingStrategyInit(
							options2,
							'First parameter'
						);
						this._byteLengthQueuingStrategyHighWaterMark =
							options2.highWaterMark;
					}
					get highWaterMark() {
						if (!IsByteLengthQueuingStrategy(this)) {
							throw byteLengthBrandCheckException(
								'highWaterMark'
							);
						}
						return this._byteLengthQueuingStrategyHighWaterMark;
					}
					get size() {
						if (!IsByteLengthQueuingStrategy(this)) {
							throw byteLengthBrandCheckException('size');
						}
						return byteLengthSizeFunction;
					}
				}
				Object.defineProperties(ByteLengthQueuingStrategy.prototype, {
					highWaterMark: { enumerable: true },
					size: { enumerable: true },
				});
				if (typeof SymbolPolyfill.toStringTag === 'symbol') {
					Object.defineProperty(
						ByteLengthQueuingStrategy.prototype,
						SymbolPolyfill.toStringTag,
						{
							value: 'ByteLengthQueuingStrategy',
							configurable: true,
						}
					);
				}
				function byteLengthBrandCheckException(name) {
					return new TypeError(
						`ByteLengthQueuingStrategy.prototype.${name} can only be used on a ByteLengthQueuingStrategy`
					);
				}
				function IsByteLengthQueuingStrategy(x) {
					if (!typeIsObject(x)) {
						return false;
					}
					if (
						!Object.prototype.hasOwnProperty.call(
							x,
							'_byteLengthQueuingStrategyHighWaterMark'
						)
					) {
						return false;
					}
					return x instanceof ByteLengthQueuingStrategy;
				}
				const countSizeFunction = () => {
					return 1;
				};
				Object.defineProperty(countSizeFunction, 'name', {
					value: 'size',
					configurable: true,
				});
				class CountQueuingStrategy {
					constructor(options2) {
						assertRequiredArgument(
							options2,
							1,
							'CountQueuingStrategy'
						);
						options2 = convertQueuingStrategyInit(
							options2,
							'First parameter'
						);
						this._countQueuingStrategyHighWaterMark =
							options2.highWaterMark;
					}
					get highWaterMark() {
						if (!IsCountQueuingStrategy(this)) {
							throw countBrandCheckException('highWaterMark');
						}
						return this._countQueuingStrategyHighWaterMark;
					}
					get size() {
						if (!IsCountQueuingStrategy(this)) {
							throw countBrandCheckException('size');
						}
						return countSizeFunction;
					}
				}
				Object.defineProperties(CountQueuingStrategy.prototype, {
					highWaterMark: { enumerable: true },
					size: { enumerable: true },
				});
				if (typeof SymbolPolyfill.toStringTag === 'symbol') {
					Object.defineProperty(
						CountQueuingStrategy.prototype,
						SymbolPolyfill.toStringTag,
						{
							value: 'CountQueuingStrategy',
							configurable: true,
						}
					);
				}
				function countBrandCheckException(name) {
					return new TypeError(
						`CountQueuingStrategy.prototype.${name} can only be used on a CountQueuingStrategy`
					);
				}
				function IsCountQueuingStrategy(x) {
					if (!typeIsObject(x)) {
						return false;
					}
					if (
						!Object.prototype.hasOwnProperty.call(
							x,
							'_countQueuingStrategyHighWaterMark'
						)
					) {
						return false;
					}
					return x instanceof CountQueuingStrategy;
				}
				function convertTransformer(original, context) {
					assertDictionary(original, context);
					const flush =
						original === null || original === void 0
							? void 0
							: original.flush;
					const readableType =
						original === null || original === void 0
							? void 0
							: original.readableType;
					const start =
						original === null || original === void 0
							? void 0
							: original.start;
					const transform =
						original === null || original === void 0
							? void 0
							: original.transform;
					const writableType =
						original === null || original === void 0
							? void 0
							: original.writableType;
					return {
						flush:
							flush === void 0
								? void 0
								: convertTransformerFlushCallback(
										flush,
										original,
										`${context} has member 'flush' that`
								  ),
						readableType,
						start:
							start === void 0
								? void 0
								: convertTransformerStartCallback(
										start,
										original,
										`${context} has member 'start' that`
								  ),
						transform:
							transform === void 0
								? void 0
								: convertTransformerTransformCallback(
										transform,
										original,
										`${context} has member 'transform' that`
								  ),
						writableType,
					};
				}
				function convertTransformerFlushCallback(
					fn,
					original,
					context
				) {
					assertFunction(fn, context);
					return (controller) =>
						promiseCall(fn, original, [controller]);
				}
				function convertTransformerStartCallback(
					fn,
					original,
					context
				) {
					assertFunction(fn, context);
					return (controller) =>
						reflectCall(fn, original, [controller]);
				}
				function convertTransformerTransformCallback(
					fn,
					original,
					context
				) {
					assertFunction(fn, context);
					return (chunk, controller) =>
						promiseCall(fn, original, [chunk, controller]);
				}
				class TransformStream {
					constructor(
						rawTransformer = {},
						rawWritableStrategy = {},
						rawReadableStrategy = {}
					) {
						if (rawTransformer === void 0) {
							rawTransformer = null;
						}
						const writableStrategy = convertQueuingStrategy(
							rawWritableStrategy,
							'Second parameter'
						);
						const readableStrategy = convertQueuingStrategy(
							rawReadableStrategy,
							'Third parameter'
						);
						const transformer = convertTransformer(
							rawTransformer,
							'First parameter'
						);
						if (transformer.readableType !== void 0) {
							throw new RangeError(
								'Invalid readableType specified'
							);
						}
						if (transformer.writableType !== void 0) {
							throw new RangeError(
								'Invalid writableType specified'
							);
						}
						const readableHighWaterMark = ExtractHighWaterMark(
							readableStrategy,
							0
						);
						const readableSizeAlgorithm =
							ExtractSizeAlgorithm(readableStrategy);
						const writableHighWaterMark = ExtractHighWaterMark(
							writableStrategy,
							1
						);
						const writableSizeAlgorithm =
							ExtractSizeAlgorithm(writableStrategy);
						let startPromise_resolve;
						const startPromise = newPromise((resolve2) => {
							startPromise_resolve = resolve2;
						});
						InitializeTransformStream(
							this,
							startPromise,
							writableHighWaterMark,
							writableSizeAlgorithm,
							readableHighWaterMark,
							readableSizeAlgorithm
						);
						SetUpTransformStreamDefaultControllerFromTransformer(
							this,
							transformer
						);
						if (transformer.start !== void 0) {
							startPromise_resolve(
								transformer.start(
									this._transformStreamController
								)
							);
						} else {
							startPromise_resolve(void 0);
						}
					}
					get readable() {
						if (!IsTransformStream(this)) {
							throw streamBrandCheckException('readable');
						}
						return this._readable;
					}
					get writable() {
						if (!IsTransformStream(this)) {
							throw streamBrandCheckException('writable');
						}
						return this._writable;
					}
				}
				Object.defineProperties(TransformStream.prototype, {
					readable: { enumerable: true },
					writable: { enumerable: true },
				});
				if (typeof SymbolPolyfill.toStringTag === 'symbol') {
					Object.defineProperty(
						TransformStream.prototype,
						SymbolPolyfill.toStringTag,
						{
							value: 'TransformStream',
							configurable: true,
						}
					);
				}
				function InitializeTransformStream(
					stream,
					startPromise,
					writableHighWaterMark,
					writableSizeAlgorithm,
					readableHighWaterMark,
					readableSizeAlgorithm
				) {
					function startAlgorithm() {
						return startPromise;
					}
					function writeAlgorithm(chunk) {
						return TransformStreamDefaultSinkWriteAlgorithm(
							stream,
							chunk
						);
					}
					function abortAlgorithm(reason) {
						return TransformStreamDefaultSinkAbortAlgorithm(
							stream,
							reason
						);
					}
					function closeAlgorithm() {
						return TransformStreamDefaultSinkCloseAlgorithm(stream);
					}
					stream._writable = CreateWritableStream(
						startAlgorithm,
						writeAlgorithm,
						closeAlgorithm,
						abortAlgorithm,
						writableHighWaterMark,
						writableSizeAlgorithm
					);
					function pullAlgorithm() {
						return TransformStreamDefaultSourcePullAlgorithm(
							stream
						);
					}
					function cancelAlgorithm(reason) {
						TransformStreamErrorWritableAndUnblockWrite(
							stream,
							reason
						);
						return promiseResolvedWith(void 0);
					}
					stream._readable = CreateReadableStream(
						startAlgorithm,
						pullAlgorithm,
						cancelAlgorithm,
						readableHighWaterMark,
						readableSizeAlgorithm
					);
					stream._backpressure = void 0;
					stream._backpressureChangePromise = void 0;
					stream._backpressureChangePromise_resolve = void 0;
					TransformStreamSetBackpressure(stream, true);
					stream._transformStreamController = void 0;
				}
				function IsTransformStream(x) {
					if (!typeIsObject(x)) {
						return false;
					}
					if (
						!Object.prototype.hasOwnProperty.call(
							x,
							'_transformStreamController'
						)
					) {
						return false;
					}
					return x instanceof TransformStream;
				}
				function TransformStreamError(stream, e) {
					ReadableStreamDefaultControllerError(
						stream._readable._readableStreamController,
						e
					);
					TransformStreamErrorWritableAndUnblockWrite(stream, e);
				}
				function TransformStreamErrorWritableAndUnblockWrite(
					stream,
					e
				) {
					TransformStreamDefaultControllerClearAlgorithms(
						stream._transformStreamController
					);
					WritableStreamDefaultControllerErrorIfNeeded(
						stream._writable._writableStreamController,
						e
					);
					if (stream._backpressure) {
						TransformStreamSetBackpressure(stream, false);
					}
				}
				function TransformStreamSetBackpressure(stream, backpressure) {
					if (stream._backpressureChangePromise !== void 0) {
						stream._backpressureChangePromise_resolve();
					}
					stream._backpressureChangePromise = newPromise(
						(resolve2) => {
							stream._backpressureChangePromise_resolve =
								resolve2;
						}
					);
					stream._backpressure = backpressure;
				}
				class TransformStreamDefaultController {
					constructor() {
						throw new TypeError('Illegal constructor');
					}
					get desiredSize() {
						if (!IsTransformStreamDefaultController(this)) {
							throw defaultControllerBrandCheckException(
								'desiredSize'
							);
						}
						const readableController =
							this._controlledTransformStream._readable
								._readableStreamController;
						return ReadableStreamDefaultControllerGetDesiredSize(
							readableController
						);
					}
					enqueue(chunk = void 0) {
						if (!IsTransformStreamDefaultController(this)) {
							throw defaultControllerBrandCheckException(
								'enqueue'
							);
						}
						TransformStreamDefaultControllerEnqueue(this, chunk);
					}
					error(reason = void 0) {
						if (!IsTransformStreamDefaultController(this)) {
							throw defaultControllerBrandCheckException('error');
						}
						TransformStreamDefaultControllerError(this, reason);
					}
					terminate() {
						if (!IsTransformStreamDefaultController(this)) {
							throw defaultControllerBrandCheckException(
								'terminate'
							);
						}
						TransformStreamDefaultControllerTerminate(this);
					}
				}
				Object.defineProperties(
					TransformStreamDefaultController.prototype,
					{
						enqueue: { enumerable: true },
						error: { enumerable: true },
						terminate: { enumerable: true },
						desiredSize: { enumerable: true },
					}
				);
				if (typeof SymbolPolyfill.toStringTag === 'symbol') {
					Object.defineProperty(
						TransformStreamDefaultController.prototype,
						SymbolPolyfill.toStringTag,
						{
							value: 'TransformStreamDefaultController',
							configurable: true,
						}
					);
				}
				function IsTransformStreamDefaultController(x) {
					if (!typeIsObject(x)) {
						return false;
					}
					if (
						!Object.prototype.hasOwnProperty.call(
							x,
							'_controlledTransformStream'
						)
					) {
						return false;
					}
					return x instanceof TransformStreamDefaultController;
				}
				function SetUpTransformStreamDefaultController(
					stream,
					controller,
					transformAlgorithm,
					flushAlgorithm
				) {
					controller._controlledTransformStream = stream;
					stream._transformStreamController = controller;
					controller._transformAlgorithm = transformAlgorithm;
					controller._flushAlgorithm = flushAlgorithm;
				}
				function SetUpTransformStreamDefaultControllerFromTransformer(
					stream,
					transformer
				) {
					const controller = Object.create(
						TransformStreamDefaultController.prototype
					);
					let transformAlgorithm = (chunk) => {
						try {
							TransformStreamDefaultControllerEnqueue(
								controller,
								chunk
							);
							return promiseResolvedWith(void 0);
						} catch (transformResultE) {
							return promiseRejectedWith(transformResultE);
						}
					};
					let flushAlgorithm = () => promiseResolvedWith(void 0);
					if (transformer.transform !== void 0) {
						transformAlgorithm = (chunk) =>
							transformer.transform(chunk, controller);
					}
					if (transformer.flush !== void 0) {
						flushAlgorithm = () => transformer.flush(controller);
					}
					SetUpTransformStreamDefaultController(
						stream,
						controller,
						transformAlgorithm,
						flushAlgorithm
					);
				}
				function TransformStreamDefaultControllerClearAlgorithms(
					controller
				) {
					controller._transformAlgorithm = void 0;
					controller._flushAlgorithm = void 0;
				}
				function TransformStreamDefaultControllerEnqueue(
					controller,
					chunk
				) {
					const stream = controller._controlledTransformStream;
					const readableController =
						stream._readable._readableStreamController;
					if (
						!ReadableStreamDefaultControllerCanCloseOrEnqueue(
							readableController
						)
					) {
						throw new TypeError(
							'Readable side is not in a state that permits enqueue'
						);
					}
					try {
						ReadableStreamDefaultControllerEnqueue(
							readableController,
							chunk
						);
					} catch (e) {
						TransformStreamErrorWritableAndUnblockWrite(stream, e);
						throw stream._readable._storedError;
					}
					const backpressure =
						ReadableStreamDefaultControllerHasBackpressure(
							readableController
						);
					if (backpressure !== stream._backpressure) {
						TransformStreamSetBackpressure(stream, true);
					}
				}
				function TransformStreamDefaultControllerError(controller, e) {
					TransformStreamError(
						controller._controlledTransformStream,
						e
					);
				}
				function TransformStreamDefaultControllerPerformTransform(
					controller,
					chunk
				) {
					const transformPromise =
						controller._transformAlgorithm(chunk);
					return transformPromiseWith(
						transformPromise,
						void 0,
						(r) => {
							TransformStreamError(
								controller._controlledTransformStream,
								r
							);
							throw r;
						}
					);
				}
				function TransformStreamDefaultControllerTerminate(controller) {
					const stream = controller._controlledTransformStream;
					const readableController =
						stream._readable._readableStreamController;
					ReadableStreamDefaultControllerClose(readableController);
					const error2 = new TypeError('TransformStream terminated');
					TransformStreamErrorWritableAndUnblockWrite(stream, error2);
				}
				function TransformStreamDefaultSinkWriteAlgorithm(
					stream,
					chunk
				) {
					const controller = stream._transformStreamController;
					if (stream._backpressure) {
						const backpressureChangePromise =
							stream._backpressureChangePromise;
						return transformPromiseWith(
							backpressureChangePromise,
							() => {
								const writable2 = stream._writable;
								const state = writable2._state;
								if (state === 'erroring') {
									throw writable2._storedError;
								}
								return TransformStreamDefaultControllerPerformTransform(
									controller,
									chunk
								);
							}
						);
					}
					return TransformStreamDefaultControllerPerformTransform(
						controller,
						chunk
					);
				}
				function TransformStreamDefaultSinkAbortAlgorithm(
					stream,
					reason
				) {
					TransformStreamError(stream, reason);
					return promiseResolvedWith(void 0);
				}
				function TransformStreamDefaultSinkCloseAlgorithm(stream) {
					const readable = stream._readable;
					const controller = stream._transformStreamController;
					const flushPromise = controller._flushAlgorithm();
					TransformStreamDefaultControllerClearAlgorithms(controller);
					return transformPromiseWith(
						flushPromise,
						() => {
							if (readable._state === 'errored') {
								throw readable._storedError;
							}
							ReadableStreamDefaultControllerClose(
								readable._readableStreamController
							);
						},
						(r) => {
							TransformStreamError(stream, r);
							throw readable._storedError;
						}
					);
				}
				function TransformStreamDefaultSourcePullAlgorithm(stream) {
					TransformStreamSetBackpressure(stream, false);
					return stream._backpressureChangePromise;
				}
				function defaultControllerBrandCheckException(name) {
					return new TypeError(
						`TransformStreamDefaultController.prototype.${name} can only be used on a TransformStreamDefaultController`
					);
				}
				function streamBrandCheckException(name) {
					return new TypeError(
						`TransformStream.prototype.${name} can only be used on a TransformStream`
					);
				}
				exports2.ByteLengthQueuingStrategy = ByteLengthQueuingStrategy;
				exports2.CountQueuingStrategy = CountQueuingStrategy;
				exports2.ReadableByteStreamController =
					ReadableByteStreamController;
				exports2.ReadableStream = ReadableStream2;
				exports2.ReadableStreamBYOBReader = ReadableStreamBYOBReader;
				exports2.ReadableStreamBYOBRequest = ReadableStreamBYOBRequest;
				exports2.ReadableStreamDefaultController =
					ReadableStreamDefaultController;
				exports2.ReadableStreamDefaultReader =
					ReadableStreamDefaultReader;
				exports2.TransformStream = TransformStream;
				exports2.TransformStreamDefaultController =
					TransformStreamDefaultController;
				exports2.WritableStream = WritableStream;
				exports2.WritableStreamDefaultController =
					WritableStreamDefaultController;
				exports2.WritableStreamDefaultWriter =
					WritableStreamDefaultWriter;
				Object.defineProperty(exports2, '__esModule', { value: true });
			});
		})(ponyfill_es2018, ponyfill_es2018.exports);
		POOL_SIZE$1 = 65536;
		if (!globalThis.ReadableStream) {
			try {
				Object.assign(globalThis, require('stream/web'));
			} catch (error2) {
				Object.assign(globalThis, ponyfill_es2018.exports);
			}
		}
		try {
			const { Blob: Blob3 } = require('buffer');
			if (Blob3 && !Blob3.prototype.stream) {
				Blob3.prototype.stream = function name(params) {
					let position = 0;
					const blob = this;
					return new ReadableStream({
						type: 'bytes',
						async pull(ctrl) {
							const chunk = blob.slice(
								position,
								Math.min(blob.size, position + POOL_SIZE$1)
							);
							const buffer = await chunk.arrayBuffer();
							position += buffer.byteLength;
							ctrl.enqueue(new Uint8Array(buffer));
							if (position === blob.size) {
								ctrl.close();
							}
						},
					});
				};
			}
		} catch (error2) {}
		POOL_SIZE = 65536;
		_Blob = class Blob {
			#parts = [];
			#type = '';
			#size = 0;
			constructor(blobParts = [], options2 = {}) {
				let size = 0;
				const parts = blobParts.map((element) => {
					let part;
					if (ArrayBuffer.isView(element)) {
						part = new Uint8Array(
							element.buffer.slice(
								element.byteOffset,
								element.byteOffset + element.byteLength
							)
						);
					} else if (element instanceof ArrayBuffer) {
						part = new Uint8Array(element.slice(0));
					} else if (element instanceof Blob) {
						part = element;
					} else {
						part = new TextEncoder().encode(element);
					}
					size += ArrayBuffer.isView(part)
						? part.byteLength
						: part.size;
					return part;
				});
				const type =
					options2.type === void 0 ? '' : String(options2.type);
				this.#type = /[^\u0020-\u007E]/.test(type) ? '' : type;
				this.#size = size;
				this.#parts = parts;
			}
			get size() {
				return this.#size;
			}
			get type() {
				return this.#type;
			}
			async text() {
				const decoder = new TextDecoder();
				let str = '';
				for await (let part of toIterator(this.#parts, false)) {
					str += decoder.decode(part, { stream: true });
				}
				str += decoder.decode();
				return str;
			}
			async arrayBuffer() {
				const data = new Uint8Array(this.size);
				let offset = 0;
				for await (const chunk of toIterator(this.#parts, false)) {
					data.set(chunk, offset);
					offset += chunk.length;
				}
				return data.buffer;
			}
			stream() {
				const it = toIterator(this.#parts, true);
				return new ReadableStream({
					type: 'bytes',
					async pull(ctrl) {
						const chunk = await it.next();
						chunk.done ? ctrl.close() : ctrl.enqueue(chunk.value);
					},
				});
			}
			slice(start = 0, end = this.size, type = '') {
				const { size } = this;
				let relativeStart =
					start < 0
						? Math.max(size + start, 0)
						: Math.min(start, size);
				let relativeEnd =
					end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
				const span = Math.max(relativeEnd - relativeStart, 0);
				const parts = this.#parts;
				const blobParts = [];
				let added = 0;
				for (const part of parts) {
					if (added >= span) {
						break;
					}
					const size2 = ArrayBuffer.isView(part)
						? part.byteLength
						: part.size;
					if (relativeStart && size2 <= relativeStart) {
						relativeStart -= size2;
						relativeEnd -= size2;
					} else {
						let chunk;
						if (ArrayBuffer.isView(part)) {
							chunk = part.subarray(
								relativeStart,
								Math.min(size2, relativeEnd)
							);
							added += chunk.byteLength;
						} else {
							chunk = part.slice(
								relativeStart,
								Math.min(size2, relativeEnd)
							);
							added += chunk.size;
						}
						blobParts.push(chunk);
						relativeStart = 0;
					}
				}
				const blob = new Blob([], { type: String(type).toLowerCase() });
				blob.#size = span;
				blob.#parts = blobParts;
				return blob;
			}
			get [Symbol.toStringTag]() {
				return 'Blob';
			}
			static [Symbol.hasInstance](object) {
				return (
					object &&
					typeof object === 'object' &&
					typeof object.constructor === 'function' &&
					(typeof object.stream === 'function' ||
						typeof object.arrayBuffer === 'function') &&
					/^(Blob|File)$/.test(object[Symbol.toStringTag])
				);
			}
		};
		Object.defineProperties(_Blob.prototype, {
			size: { enumerable: true },
			type: { enumerable: true },
			slice: { enumerable: true },
		});
		Blob2 = _Blob;
		Blob$1 = Blob2;
		FetchBaseError = class extends Error {
			constructor(message, type) {
				super(message);
				Error.captureStackTrace(this, this.constructor);
				this.type = type;
			}
			get name() {
				return this.constructor.name;
			}
			get [Symbol.toStringTag]() {
				return this.constructor.name;
			}
		};
		FetchError = class extends FetchBaseError {
			constructor(message, type, systemError) {
				super(message, type);
				if (systemError) {
					this.code = this.errno = systemError.code;
					this.erroredSysCall = systemError.syscall;
				}
			}
		};
		NAME = Symbol.toStringTag;
		isURLSearchParameters = (object) => {
			return (
				typeof object === 'object' &&
				typeof object.append === 'function' &&
				typeof object.delete === 'function' &&
				typeof object.get === 'function' &&
				typeof object.getAll === 'function' &&
				typeof object.has === 'function' &&
				typeof object.set === 'function' &&
				typeof object.sort === 'function' &&
				object[NAME] === 'URLSearchParams'
			);
		};
		isBlob = (object) => {
			return (
				typeof object === 'object' &&
				typeof object.arrayBuffer === 'function' &&
				typeof object.type === 'string' &&
				typeof object.stream === 'function' &&
				typeof object.constructor === 'function' &&
				/^(Blob|File)$/.test(object[NAME])
			);
		};
		isAbortSignal = (object) => {
			return (
				typeof object === 'object' &&
				(object[NAME] === 'AbortSignal' ||
					object[NAME] === 'EventTarget')
			);
		};
		carriage = '\r\n';
		dashes = '-'.repeat(2);
		carriageLength = Buffer.byteLength(carriage);
		getFooter = (boundary) =>
			`${dashes}${boundary}${dashes}${carriage.repeat(2)}`;
		getBoundary = () => (0, import_crypto.randomBytes)(8).toString('hex');
		INTERNALS$2 = Symbol('Body internals');
		Body = class {
			constructor(body, { size = 0 } = {}) {
				let boundary = null;
				if (body === null) {
					body = null;
				} else if (isURLSearchParameters(body)) {
					body = Buffer.from(body.toString());
				} else if (isBlob(body));
				else if (Buffer.isBuffer(body));
				else if (import_util.types.isAnyArrayBuffer(body)) {
					body = Buffer.from(body);
				} else if (ArrayBuffer.isView(body)) {
					body = Buffer.from(
						body.buffer,
						body.byteOffset,
						body.byteLength
					);
				} else if (body instanceof import_stream.default);
				else if (isFormData(body)) {
					boundary = `NodeFetchFormDataBoundary${getBoundary()}`;
					body = import_stream.default.Readable.from(
						formDataIterator(body, boundary)
					);
				} else {
					body = Buffer.from(String(body));
				}
				this[INTERNALS$2] = {
					body,
					boundary,
					disturbed: false,
					error: null,
				};
				this.size = size;
				if (body instanceof import_stream.default) {
					body.on('error', (error_) => {
						const error2 =
							error_ instanceof FetchBaseError
								? error_
								: new FetchError(
										`Invalid response body while trying to fetch ${this.url}: ${error_.message}`,
										'system',
										error_
								  );
						this[INTERNALS$2].error = error2;
					});
				}
			}
			get body() {
				return this[INTERNALS$2].body;
			}
			get bodyUsed() {
				return this[INTERNALS$2].disturbed;
			}
			async arrayBuffer() {
				const { buffer, byteOffset, byteLength } = await consumeBody(
					this
				);
				return buffer.slice(byteOffset, byteOffset + byteLength);
			}
			async blob() {
				const ct =
					(this.headers && this.headers.get('content-type')) ||
					(this[INTERNALS$2].body && this[INTERNALS$2].body.type) ||
					'';
				const buf = await this.buffer();
				return new Blob$1([buf], {
					type: ct,
				});
			}
			async json() {
				const buffer = await consumeBody(this);
				return JSON.parse(buffer.toString());
			}
			async text() {
				const buffer = await consumeBody(this);
				return buffer.toString();
			}
			buffer() {
				return consumeBody(this);
			}
		};
		Object.defineProperties(Body.prototype, {
			body: { enumerable: true },
			bodyUsed: { enumerable: true },
			arrayBuffer: { enumerable: true },
			blob: { enumerable: true },
			json: { enumerable: true },
			text: { enumerable: true },
		});
		clone = (instance, highWaterMark) => {
			let p1;
			let p2;
			let { body } = instance;
			if (instance.bodyUsed) {
				throw new Error('cannot clone body after it is used');
			}
			if (
				body instanceof import_stream.default &&
				typeof body.getBoundary !== 'function'
			) {
				p1 = new import_stream.PassThrough({ highWaterMark });
				p2 = new import_stream.PassThrough({ highWaterMark });
				body.pipe(p1);
				body.pipe(p2);
				instance[INTERNALS$2].body = p1;
				body = p2;
			}
			return body;
		};
		extractContentType = (body, request) => {
			if (body === null) {
				return null;
			}
			if (typeof body === 'string') {
				return 'text/plain;charset=UTF-8';
			}
			if (isURLSearchParameters(body)) {
				return 'application/x-www-form-urlencoded;charset=UTF-8';
			}
			if (isBlob(body)) {
				return body.type || null;
			}
			if (
				Buffer.isBuffer(body) ||
				import_util.types.isAnyArrayBuffer(body) ||
				ArrayBuffer.isView(body)
			) {
				return null;
			}
			if (body && typeof body.getBoundary === 'function') {
				return `multipart/form-data;boundary=${body.getBoundary()}`;
			}
			if (isFormData(body)) {
				return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
			}
			if (body instanceof import_stream.default) {
				return null;
			}
			return 'text/plain;charset=UTF-8';
		};
		getTotalBytes = (request) => {
			const { body } = request;
			if (body === null) {
				return 0;
			}
			if (isBlob(body)) {
				return body.size;
			}
			if (Buffer.isBuffer(body)) {
				return body.length;
			}
			if (body && typeof body.getLengthSync === 'function') {
				return body.hasKnownLength && body.hasKnownLength()
					? body.getLengthSync()
					: null;
			}
			if (isFormData(body)) {
				return getFormDataLength(request[INTERNALS$2].boundary);
			}
			return null;
		};
		writeToStream = (dest, { body }) => {
			if (body === null) {
				dest.end();
			} else if (isBlob(body)) {
				import_stream.default.Readable.from(body.stream()).pipe(dest);
			} else if (Buffer.isBuffer(body)) {
				dest.write(body);
				dest.end();
			} else {
				body.pipe(dest);
			}
		};
		validateHeaderName =
			typeof import_http.default.validateHeaderName === 'function'
				? import_http.default.validateHeaderName
				: (name) => {
						if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
							const error2 = new TypeError(
								`Header name must be a valid HTTP token [${name}]`
							);
							Object.defineProperty(error2, 'code', {
								value: 'ERR_INVALID_HTTP_TOKEN',
							});
							throw error2;
						}
				  };
		validateHeaderValue =
			typeof import_http.default.validateHeaderValue === 'function'
				? import_http.default.validateHeaderValue
				: (name, value) => {
						if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
							const error2 = new TypeError(
								`Invalid character in header content ["${name}"]`
							);
							Object.defineProperty(error2, 'code', {
								value: 'ERR_INVALID_CHAR',
							});
							throw error2;
						}
				  };
		Headers = class extends URLSearchParams {
			constructor(init2) {
				let result = [];
				if (init2 instanceof Headers) {
					const raw = init2.raw();
					for (const [name, values] of Object.entries(raw)) {
						result.push(...values.map((value) => [name, value]));
					}
				} else if (init2 == null);
				else if (
					typeof init2 === 'object' &&
					!import_util.types.isBoxedPrimitive(init2)
				) {
					const method = init2[Symbol.iterator];
					if (method == null) {
						result.push(...Object.entries(init2));
					} else {
						if (typeof method !== 'function') {
							throw new TypeError(
								'Header pairs must be iterable'
							);
						}
						result = [...init2]
							.map((pair) => {
								if (
									typeof pair !== 'object' ||
									import_util.types.isBoxedPrimitive(pair)
								) {
									throw new TypeError(
										'Each header pair must be an iterable object'
									);
								}
								return [...pair];
							})
							.map((pair) => {
								if (pair.length !== 2) {
									throw new TypeError(
										'Each header pair must be a name/value tuple'
									);
								}
								return [...pair];
							});
					}
				} else {
					throw new TypeError(
						"Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)"
					);
				}
				result =
					result.length > 0
						? result.map(([name, value]) => {
								validateHeaderName(name);
								validateHeaderValue(name, String(value));
								return [
									String(name).toLowerCase(),
									String(value),
								];
						  })
						: void 0;
				super(result);
				return new Proxy(this, {
					get(target, p, receiver) {
						switch (p) {
							case 'append':
							case 'set':
								return (name, value) => {
									validateHeaderName(name);
									validateHeaderValue(name, String(value));
									return URLSearchParams.prototype[p].call(
										target,
										String(name).toLowerCase(),
										String(value)
									);
								};
							case 'delete':
							case 'has':
							case 'getAll':
								return (name) => {
									validateHeaderName(name);
									return URLSearchParams.prototype[p].call(
										target,
										String(name).toLowerCase()
									);
								};
							case 'keys':
								return () => {
									target.sort();
									return new Set(
										URLSearchParams.prototype.keys.call(
											target
										)
									).keys();
								};
							default:
								return Reflect.get(target, p, receiver);
						}
					},
				});
			}
			get [Symbol.toStringTag]() {
				return this.constructor.name;
			}
			toString() {
				return Object.prototype.toString.call(this);
			}
			get(name) {
				const values = this.getAll(name);
				if (values.length === 0) {
					return null;
				}
				let value = values.join(', ');
				if (/^content-encoding$/i.test(name)) {
					value = value.toLowerCase();
				}
				return value;
			}
			forEach(callback, thisArg = void 0) {
				for (const name of this.keys()) {
					Reflect.apply(callback, thisArg, [
						this.get(name),
						name,
						this,
					]);
				}
			}
			*values() {
				for (const name of this.keys()) {
					yield this.get(name);
				}
			}
			*entries() {
				for (const name of this.keys()) {
					yield [name, this.get(name)];
				}
			}
			[Symbol.iterator]() {
				return this.entries();
			}
			raw() {
				return [...this.keys()].reduce((result, key) => {
					result[key] = this.getAll(key);
					return result;
				}, {});
			}
			[Symbol.for('nodejs.util.inspect.custom')]() {
				return [...this.keys()].reduce((result, key) => {
					const values = this.getAll(key);
					if (key === 'host') {
						result[key] = values[0];
					} else {
						result[key] = values.length > 1 ? values : values[0];
					}
					return result;
				}, {});
			}
		};
		Object.defineProperties(
			Headers.prototype,
			['get', 'entries', 'forEach', 'values'].reduce(
				(result, property) => {
					result[property] = { enumerable: true };
					return result;
				},
				{}
			)
		);
		redirectStatus = new Set([301, 302, 303, 307, 308]);
		isRedirect = (code) => {
			return redirectStatus.has(code);
		};
		INTERNALS$1 = Symbol('Response internals');
		Response = class extends Body {
			constructor(body = null, options2 = {}) {
				super(body, options2);
				const status = options2.status != null ? options2.status : 200;
				const headers = new Headers(options2.headers);
				if (body !== null && !headers.has('Content-Type')) {
					const contentType = extractContentType(body);
					if (contentType) {
						headers.append('Content-Type', contentType);
					}
				}
				this[INTERNALS$1] = {
					type: 'default',
					url: options2.url,
					status,
					statusText: options2.statusText || '',
					headers,
					counter: options2.counter,
					highWaterMark: options2.highWaterMark,
				};
			}
			get type() {
				return this[INTERNALS$1].type;
			}
			get url() {
				return this[INTERNALS$1].url || '';
			}
			get status() {
				return this[INTERNALS$1].status;
			}
			get ok() {
				return (
					this[INTERNALS$1].status >= 200 &&
					this[INTERNALS$1].status < 300
				);
			}
			get redirected() {
				return this[INTERNALS$1].counter > 0;
			}
			get statusText() {
				return this[INTERNALS$1].statusText;
			}
			get headers() {
				return this[INTERNALS$1].headers;
			}
			get highWaterMark() {
				return this[INTERNALS$1].highWaterMark;
			}
			clone() {
				return new Response(clone(this, this.highWaterMark), {
					type: this.type,
					url: this.url,
					status: this.status,
					statusText: this.statusText,
					headers: this.headers,
					ok: this.ok,
					redirected: this.redirected,
					size: this.size,
				});
			}
			static redirect(url, status = 302) {
				if (!isRedirect(status)) {
					throw new RangeError(
						'Failed to execute "redirect" on "response": Invalid status code'
					);
				}
				return new Response(null, {
					headers: {
						location: new URL(url).toString(),
					},
					status,
				});
			}
			static error() {
				const response = new Response(null, {
					status: 0,
					statusText: '',
				});
				response[INTERNALS$1].type = 'error';
				return response;
			}
			get [Symbol.toStringTag]() {
				return 'Response';
			}
		};
		Object.defineProperties(Response.prototype, {
			type: { enumerable: true },
			url: { enumerable: true },
			status: { enumerable: true },
			ok: { enumerable: true },
			redirected: { enumerable: true },
			statusText: { enumerable: true },
			headers: { enumerable: true },
			clone: { enumerable: true },
		});
		getSearch = (parsedURL) => {
			if (parsedURL.search) {
				return parsedURL.search;
			}
			const lastOffset = parsedURL.href.length - 1;
			const hash2 =
				parsedURL.hash ||
				(parsedURL.href[lastOffset] === '#' ? '#' : '');
			return parsedURL.href[lastOffset - hash2.length] === '?' ? '?' : '';
		};
		INTERNALS = Symbol('Request internals');
		isRequest = (object) => {
			return (
				typeof object === 'object' &&
				typeof object[INTERNALS] === 'object'
			);
		};
		Request = class extends Body {
			constructor(input, init2 = {}) {
				let parsedURL;
				if (isRequest(input)) {
					parsedURL = new URL(input.url);
				} else {
					parsedURL = new URL(input);
					input = {};
				}
				let method = init2.method || input.method || 'GET';
				method = method.toUpperCase();
				if (
					(init2.body != null || isRequest(input)) &&
					input.body !== null &&
					(method === 'GET' || method === 'HEAD')
				) {
					throw new TypeError(
						'Request with GET/HEAD method cannot have body'
					);
				}
				const inputBody = init2.body
					? init2.body
					: isRequest(input) && input.body !== null
					? clone(input)
					: null;
				super(inputBody, {
					size: init2.size || input.size || 0,
				});
				const headers = new Headers(
					init2.headers || input.headers || {}
				);
				if (inputBody !== null && !headers.has('Content-Type')) {
					const contentType = extractContentType(inputBody, this);
					if (contentType) {
						headers.append('Content-Type', contentType);
					}
				}
				let signal = isRequest(input) ? input.signal : null;
				if ('signal' in init2) {
					signal = init2.signal;
				}
				if (signal != null && !isAbortSignal(signal)) {
					throw new TypeError(
						'Expected signal to be an instanceof AbortSignal or EventTarget'
					);
				}
				this[INTERNALS] = {
					method,
					redirect: init2.redirect || input.redirect || 'follow',
					headers,
					parsedURL,
					signal,
				};
				this.follow =
					init2.follow === void 0
						? input.follow === void 0
							? 20
							: input.follow
						: init2.follow;
				this.compress =
					init2.compress === void 0
						? input.compress === void 0
							? true
							: input.compress
						: init2.compress;
				this.counter = init2.counter || input.counter || 0;
				this.agent = init2.agent || input.agent;
				this.highWaterMark =
					init2.highWaterMark || input.highWaterMark || 16384;
				this.insecureHTTPParser =
					init2.insecureHTTPParser ||
					input.insecureHTTPParser ||
					false;
			}
			get method() {
				return this[INTERNALS].method;
			}
			get url() {
				return (0, import_url.format)(this[INTERNALS].parsedURL);
			}
			get headers() {
				return this[INTERNALS].headers;
			}
			get redirect() {
				return this[INTERNALS].redirect;
			}
			get signal() {
				return this[INTERNALS].signal;
			}
			clone() {
				return new Request(this);
			}
			get [Symbol.toStringTag]() {
				return 'Request';
			}
		};
		Object.defineProperties(Request.prototype, {
			method: { enumerable: true },
			url: { enumerable: true },
			headers: { enumerable: true },
			redirect: { enumerable: true },
			clone: { enumerable: true },
			signal: { enumerable: true },
		});
		getNodeRequestOptions = (request) => {
			const { parsedURL } = request[INTERNALS];
			const headers = new Headers(request[INTERNALS].headers);
			if (!headers.has('Accept')) {
				headers.set('Accept', '*/*');
			}
			let contentLengthValue = null;
			if (request.body === null && /^(post|put)$/i.test(request.method)) {
				contentLengthValue = '0';
			}
			if (request.body !== null) {
				const totalBytes = getTotalBytes(request);
				if (
					typeof totalBytes === 'number' &&
					!Number.isNaN(totalBytes)
				) {
					contentLengthValue = String(totalBytes);
				}
			}
			if (contentLengthValue) {
				headers.set('Content-Length', contentLengthValue);
			}
			if (!headers.has('User-Agent')) {
				headers.set('User-Agent', 'node-fetch');
			}
			if (request.compress && !headers.has('Accept-Encoding')) {
				headers.set('Accept-Encoding', 'gzip,deflate,br');
			}
			let { agent } = request;
			if (typeof agent === 'function') {
				agent = agent(parsedURL);
			}
			if (!headers.has('Connection') && !agent) {
				headers.set('Connection', 'close');
			}
			const search = getSearch(parsedURL);
			const requestOptions = {
				path: parsedURL.pathname + search,
				pathname: parsedURL.pathname,
				hostname: parsedURL.hostname,
				protocol: parsedURL.protocol,
				port: parsedURL.port,
				hash: parsedURL.hash,
				search: parsedURL.search,
				query: parsedURL.query,
				href: parsedURL.href,
				method: request.method,
				headers: headers[Symbol.for('nodejs.util.inspect.custom')](),
				insecureHTTPParser: request.insecureHTTPParser,
				agent,
			};
			return requestOptions;
		};
		AbortError = class extends FetchBaseError {
			constructor(message, type = 'aborted') {
				super(message, type);
			}
		};
		supportedSchemas = new Set(['data:', 'http:', 'https:']);
	},
});

// node_modules/@sveltejs/adapter-netlify/files/shims.js
var init_shims = __esm({
	'node_modules/@sveltejs/adapter-netlify/files/shims.js'() {
		init_install_fetch();
	},
});

// node_modules/cookie/index.js
var require_cookie = __commonJS({
	'node_modules/cookie/index.js'(exports) {
		init_shims();
		('use strict');
		exports.parse = parse;
		exports.serialize = serialize;
		var decode = decodeURIComponent;
		var encode = encodeURIComponent;
		var pairSplitRegExp = /; */;
		var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
		function parse(str, options2) {
			if (typeof str !== 'string') {
				throw new TypeError('argument str must be a string');
			}
			var obj = {};
			var opt = options2 || {};
			var pairs = str.split(pairSplitRegExp);
			var dec = opt.decode || decode;
			for (var i = 0; i < pairs.length; i++) {
				var pair = pairs[i];
				var eq_idx = pair.indexOf('=');
				if (eq_idx < 0) {
					continue;
				}
				var key = pair.substr(0, eq_idx).trim();
				var val = pair.substr(++eq_idx, pair.length).trim();
				if (val[0] == '"') {
					val = val.slice(1, -1);
				}
				if (obj[key] == void 0) {
					obj[key] = tryDecode(val, dec);
				}
			}
			return obj;
		}
		function serialize(name, val, options2) {
			var opt = options2 || {};
			var enc = opt.encode || encode;
			if (typeof enc !== 'function') {
				throw new TypeError('option encode is invalid');
			}
			if (!fieldContentRegExp.test(name)) {
				throw new TypeError('argument name is invalid');
			}
			var value = enc(val);
			if (value && !fieldContentRegExp.test(value)) {
				throw new TypeError('argument val is invalid');
			}
			var str = name + '=' + value;
			if (opt.maxAge != null) {
				var maxAge = opt.maxAge - 0;
				if (isNaN(maxAge) || !isFinite(maxAge)) {
					throw new TypeError('option maxAge is invalid');
				}
				str += '; Max-Age=' + Math.floor(maxAge);
			}
			if (opt.domain) {
				if (!fieldContentRegExp.test(opt.domain)) {
					throw new TypeError('option domain is invalid');
				}
				str += '; Domain=' + opt.domain;
			}
			if (opt.path) {
				if (!fieldContentRegExp.test(opt.path)) {
					throw new TypeError('option path is invalid');
				}
				str += '; Path=' + opt.path;
			}
			if (opt.expires) {
				if (typeof opt.expires.toUTCString !== 'function') {
					throw new TypeError('option expires is invalid');
				}
				str += '; Expires=' + opt.expires.toUTCString();
			}
			if (opt.httpOnly) {
				str += '; HttpOnly';
			}
			if (opt.secure) {
				str += '; Secure';
			}
			if (opt.sameSite) {
				var sameSite =
					typeof opt.sameSite === 'string'
						? opt.sameSite.toLowerCase()
						: opt.sameSite;
				switch (sameSite) {
					case true:
						str += '; SameSite=Strict';
						break;
					case 'lax':
						str += '; SameSite=Lax';
						break;
					case 'strict':
						str += '; SameSite=Strict';
						break;
					case 'none':
						str += '; SameSite=None';
						break;
					default:
						throw new TypeError('option sameSite is invalid');
				}
			}
			return str;
		}
		function tryDecode(str, decode2) {
			try {
				return decode2(str);
			} catch (e) {
				return str;
			}
		}
	},
});

// .svelte-kit/netlify/entry.js
__export(exports, {
	handler: () => handler,
});
init_shims();

// .svelte-kit/output/server/app.js
init_shims();
var import_cookie = __toModule(require_cookie());

// node_modules/@lukeed/uuid/dist/index.mjs
init_shims();
var IDX = 256;
var HEX = [];
var BUFFER;
while (IDX--) HEX[IDX] = (IDX + 256).toString(16).substring(1);
function v4() {
	var i = 0,
		num,
		out = '';
	if (!BUFFER || IDX + 16 > 256) {
		BUFFER = Array((i = 256));
		while (i--) BUFFER[i] = (256 * Math.random()) | 0;
		i = IDX = 0;
	}
	for (; i < 16; i++) {
		num = BUFFER[IDX + i];
		if (i == 6) out += HEX[(num & 15) | 64];
		else if (i == 8) out += HEX[(num & 63) | 128];
		else out += HEX[num];
		if (i & 1 && i > 1 && i < 11) out += '-';
	}
	IDX++;
	return out;
}

// .svelte-kit/output/server/app.js
var __accessCheck = (obj, member, msg) => {
	if (!member.has(obj)) throw TypeError('Cannot ' + msg);
};
var __privateGet = (obj, member, getter) => {
	__accessCheck(obj, member, 'read from private field');
	return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
	if (member.has(obj))
		throw TypeError('Cannot add the same private member more than once');
	member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
	__accessCheck(obj, member, 'write to private field');
	setter ? setter.call(obj, value) : member.set(obj, value);
	return value;
};
var _map;
function get_single_valued_header(headers, key) {
	const value = headers[key];
	if (Array.isArray(value)) {
		if (value.length === 0) {
			return void 0;
		}
		if (value.length > 1) {
			throw new Error(
				`Multiple headers provided for ${key}. Multiple may be provided only for set-cookie`
			);
		}
		return value[0];
	}
	return value;
}
function coalesce_to_error(err) {
	return err instanceof Error || (err && err.name && err.message)
		? err
		: new Error(JSON.stringify(err));
}
function lowercase_keys(obj) {
	const clone2 = {};
	for (const key in obj) {
		clone2[key.toLowerCase()] = obj[key];
	}
	return clone2;
}
function error$1(body) {
	return {
		status: 500,
		body,
		headers: {},
	};
}
function is_string(s2) {
	return typeof s2 === 'string' || s2 instanceof String;
}
function is_content_type_textual(content_type) {
	if (!content_type) return true;
	const [type] = content_type.split(';');
	return (
		type === 'text/plain' ||
		type === 'application/json' ||
		type === 'application/x-www-form-urlencoded' ||
		type === 'multipart/form-data'
	);
}
async function render_endpoint(request, route, match) {
	const mod = await route.load();
	const handler2 = mod[request.method.toLowerCase().replace('delete', 'del')];
	if (!handler2) {
		return;
	}
	const params = route.params(match);
	const response = await handler2({ ...request, params });
	const preface = `Invalid response from route ${request.path}`;
	if (!response) {
		return;
	}
	if (typeof response !== 'object') {
		return error$1(
			`${preface}: expected an object, got ${typeof response}`
		);
	}
	let { status = 200, body, headers = {} } = response;
	headers = lowercase_keys(headers);
	const type = get_single_valued_header(headers, 'content-type');
	const is_type_textual = is_content_type_textual(type);
	if (!is_type_textual && !(body instanceof Uint8Array || is_string(body))) {
		return error$1(
			`${preface}: body must be an instance of string or Uint8Array if content-type is not a supported textual content-type`
		);
	}
	let normalized_body;
	if (
		(typeof body === 'object' || typeof body === 'undefined') &&
		!(body instanceof Uint8Array) &&
		(!type || type.startsWith('application/json'))
	) {
		headers = {
			...headers,
			'content-type': 'application/json; charset=utf-8',
		};
		normalized_body = JSON.stringify(
			typeof body === 'undefined' ? {} : body
		);
	} else {
		normalized_body = body;
	}
	return { status, body: normalized_body, headers };
}
var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$';
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved =
	/^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
	'<': '\\u003C',
	'>': '\\u003E',
	'/': '\\u002F',
	'\\': '\\\\',
	'\b': '\\b',
	'\f': '\\f',
	'\n': '\\n',
	'\r': '\\r',
	'	': '\\t',
	'\0': '\\0',
	'\u2028': '\\u2028',
	'\u2029': '\\u2029',
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype)
	.sort()
	.join('\0');
function devalue(value) {
	var counts = new Map();
	function walk(thing) {
		if (typeof thing === 'function') {
			throw new Error('Cannot stringify a function');
		}
		if (counts.has(thing)) {
			counts.set(thing, counts.get(thing) + 1);
			return;
		}
		counts.set(thing, 1);
		if (!isPrimitive(thing)) {
			var type = getType(thing);
			switch (type) {
				case 'Number':
				case 'String':
				case 'Boolean':
				case 'Date':
				case 'RegExp':
					return;
				case 'Array':
					thing.forEach(walk);
					break;
				case 'Set':
				case 'Map':
					Array.from(thing).forEach(walk);
					break;
				default:
					var proto = Object.getPrototypeOf(thing);
					if (
						proto !== Object.prototype &&
						proto !== null &&
						Object.getOwnPropertyNames(proto).sort().join('\0') !==
							objectProtoOwnPropertyNames
					) {
						throw new Error('Cannot stringify arbitrary non-POJOs');
					}
					if (Object.getOwnPropertySymbols(thing).length > 0) {
						throw new Error(
							'Cannot stringify POJOs with symbolic keys'
						);
					}
					Object.keys(thing).forEach(function (key) {
						return walk(thing[key]);
					});
			}
		}
	}
	walk(value);
	var names = new Map();
	Array.from(counts)
		.filter(function (entry) {
			return entry[1] > 1;
		})
		.sort(function (a, b) {
			return b[1] - a[1];
		})
		.forEach(function (entry, i) {
			names.set(entry[0], getName(i));
		});
	function stringify(thing) {
		if (names.has(thing)) {
			return names.get(thing);
		}
		if (isPrimitive(thing)) {
			return stringifyPrimitive(thing);
		}
		var type = getType(thing);
		switch (type) {
			case 'Number':
			case 'String':
			case 'Boolean':
				return 'Object(' + stringify(thing.valueOf()) + ')';
			case 'RegExp':
				return (
					'new RegExp(' +
					stringifyString(thing.source) +
					', "' +
					thing.flags +
					'")'
				);
			case 'Date':
				return 'new Date(' + thing.getTime() + ')';
			case 'Array':
				var members = thing.map(function (v, i) {
					return i in thing ? stringify(v) : '';
				});
				var tail =
					thing.length === 0 || thing.length - 1 in thing ? '' : ',';
				return '[' + members.join(',') + tail + ']';
			case 'Set':
			case 'Map':
				return (
					'new ' +
					type +
					'([' +
					Array.from(thing).map(stringify).join(',') +
					'])'
				);
			default:
				var obj =
					'{' +
					Object.keys(thing)
						.map(function (key) {
							return safeKey(key) + ':' + stringify(thing[key]);
						})
						.join(',') +
					'}';
				var proto = Object.getPrototypeOf(thing);
				if (proto === null) {
					return Object.keys(thing).length > 0
						? 'Object.assign(Object.create(null),' + obj + ')'
						: 'Object.create(null)';
				}
				return obj;
		}
	}
	var str = stringify(value);
	if (names.size) {
		var params_1 = [];
		var statements_1 = [];
		var values_1 = [];
		names.forEach(function (name, thing) {
			params_1.push(name);
			if (isPrimitive(thing)) {
				values_1.push(stringifyPrimitive(thing));
				return;
			}
			var type = getType(thing);
			switch (type) {
				case 'Number':
				case 'String':
				case 'Boolean':
					values_1.push('Object(' + stringify(thing.valueOf()) + ')');
					break;
				case 'RegExp':
					values_1.push(thing.toString());
					break;
				case 'Date':
					values_1.push('new Date(' + thing.getTime() + ')');
					break;
				case 'Array':
					values_1.push('Array(' + thing.length + ')');
					thing.forEach(function (v, i) {
						statements_1.push(name + '[' + i + ']=' + stringify(v));
					});
					break;
				case 'Set':
					values_1.push('new Set');
					statements_1.push(
						name +
							'.' +
							Array.from(thing)
								.map(function (v) {
									return 'add(' + stringify(v) + ')';
								})
								.join('.')
					);
					break;
				case 'Map':
					values_1.push('new Map');
					statements_1.push(
						name +
							'.' +
							Array.from(thing)
								.map(function (_a) {
									var k = _a[0],
										v = _a[1];
									return (
										'set(' +
										stringify(k) +
										', ' +
										stringify(v) +
										')'
									);
								})
								.join('.')
					);
					break;
				default:
					values_1.push(
						Object.getPrototypeOf(thing) === null
							? 'Object.create(null)'
							: '{}'
					);
					Object.keys(thing).forEach(function (key) {
						statements_1.push(
							'' +
								name +
								safeProp(key) +
								'=' +
								stringify(thing[key])
						);
					});
			}
		});
		statements_1.push('return ' + str);
		return (
			'(function(' +
			params_1.join(',') +
			'){' +
			statements_1.join(';') +
			'}(' +
			values_1.join(',') +
			'))'
		);
	} else {
		return str;
	}
}
function getName(num) {
	var name = '';
	do {
		name = chars[num % chars.length] + name;
		num = ~~(num / chars.length) - 1;
	} while (num >= 0);
	return reserved.test(name) ? name + '_' : name;
}
function isPrimitive(thing) {
	return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
	if (typeof thing === 'string') return stringifyString(thing);
	if (thing === void 0) return 'void 0';
	if (thing === 0 && 1 / thing < 0) return '-0';
	var str = String(thing);
	if (typeof thing === 'number') return str.replace(/^(-)?0\./, '$1.');
	return str;
}
function getType(thing) {
	return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
	return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
	return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
	return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key)
		? key
		: escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
	return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key)
		? '.' + key
		: '[' + escapeUnsafeChars(JSON.stringify(key)) + ']';
}
function stringifyString(str) {
	var result = '"';
	for (var i = 0; i < str.length; i += 1) {
		var char = str.charAt(i);
		var code = char.charCodeAt(0);
		if (char === '"') {
			result += '\\"';
		} else if (char in escaped$1) {
			result += escaped$1[char];
		} else if (code >= 55296 && code <= 57343) {
			var next = str.charCodeAt(i + 1);
			if (code <= 56319 && next >= 56320 && next <= 57343) {
				result += char + str[++i];
			} else {
				result += '\\u' + code.toString(16).toUpperCase();
			}
		} else {
			result += char;
		}
	}
	result += '"';
	return result;
}
function noop$1() {}
function safe_not_equal$1(a, b) {
	return a != a
		? b == b
		: a !== b || (a && typeof a === 'object') || typeof a === 'function';
}
Promise.resolve();
var subscriber_queue$1 = [];
function writable$1(value, start = noop$1) {
	let stop;
	const subscribers = new Set();
	function set(new_value) {
		if (safe_not_equal$1(value, new_value)) {
			value = new_value;
			if (stop) {
				const run_queue = !subscriber_queue$1.length;
				for (const subscriber of subscribers) {
					subscriber[1]();
					subscriber_queue$1.push(subscriber, value);
				}
				if (run_queue) {
					for (let i = 0; i < subscriber_queue$1.length; i += 2) {
						subscriber_queue$1[i][0](subscriber_queue$1[i + 1]);
					}
					subscriber_queue$1.length = 0;
				}
			}
		}
	}
	function update(fn) {
		set(fn(value));
	}
	function subscribe2(run2, invalidate = noop$1) {
		const subscriber = [run2, invalidate];
		subscribers.add(subscriber);
		if (subscribers.size === 1) {
			stop = start(set) || noop$1;
		}
		run2(value);
		return () => {
			subscribers.delete(subscriber);
			if (subscribers.size === 0) {
				stop();
				stop = null;
			}
		};
	}
	return { set, update, subscribe: subscribe2 };
}
function hash(value) {
	let hash2 = 5381;
	let i = value.length;
	if (typeof value === 'string') {
		while (i) hash2 = (hash2 * 33) ^ value.charCodeAt(--i);
	} else {
		while (i) hash2 = (hash2 * 33) ^ value[--i];
	}
	return (hash2 >>> 0).toString(36);
}
var escape_json_string_in_html_dict = {
	'"': '\\"',
	'<': '\\u003C',
	'>': '\\u003E',
	'/': '\\u002F',
	'\\': '\\\\',
	'\b': '\\b',
	'\f': '\\f',
	'\n': '\\n',
	'\r': '\\r',
	'	': '\\t',
	'\0': '\\0',
	'\u2028': '\\u2028',
	'\u2029': '\\u2029',
};
function escape_json_string_in_html(str) {
	return escape$1(
		str,
		escape_json_string_in_html_dict,
		(code) => `\\u${code.toString(16).toUpperCase()}`
	);
}
var escape_html_attr_dict = {
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
};
function escape_html_attr(str) {
	return (
		'"' + escape$1(str, escape_html_attr_dict, (code) => `&#${code};`) + '"'
	);
}
function escape$1(str, dict, unicode_encoder) {
	let result = '';
	for (let i = 0; i < str.length; i += 1) {
		const char = str.charAt(i);
		const code = char.charCodeAt(0);
		if (char in dict) {
			result += dict[char];
		} else if (code >= 55296 && code <= 57343) {
			const next = str.charCodeAt(i + 1);
			if (code <= 56319 && next >= 56320 && next <= 57343) {
				result += char + str[++i];
			} else {
				result += unicode_encoder(code);
			}
		} else {
			result += char;
		}
	}
	return result;
}
var s$1 = JSON.stringify;
async function render_response({
	branch,
	options: options2,
	$session,
	page_config,
	status,
	error: error2,
	page: page2,
}) {
	const css2 = new Set(options2.entry.css);
	const js = new Set(options2.entry.js);
	const styles = new Set();
	const serialized_data = [];
	let rendered;
	let is_private = false;
	let maxage;
	if (error2) {
		error2.stack = options2.get_stack(error2);
	}
	if (page_config.ssr) {
		branch.forEach(({ node, loaded, fetched, uses_credentials }) => {
			if (node.css) node.css.forEach((url) => css2.add(url));
			if (node.js) node.js.forEach((url) => js.add(url));
			if (node.styles)
				node.styles.forEach((content) => styles.add(content));
			if (fetched && page_config.hydrate)
				serialized_data.push(...fetched);
			if (uses_credentials) is_private = true;
			maxage = loaded.maxage;
		});
		const session = writable$1($session);
		const props = {
			stores: {
				page: writable$1(null),
				navigating: writable$1(null),
				session,
			},
			page: page2,
			components: branch.map(({ node }) => node.module.default),
		};
		for (let i = 0; i < branch.length; i += 1) {
			props[`props_${i}`] = await branch[i].loaded.props;
		}
		let session_tracking_active = false;
		const unsubscribe = session.subscribe(() => {
			if (session_tracking_active) is_private = true;
		});
		session_tracking_active = true;
		try {
			rendered = options2.root.render(props);
		} finally {
			unsubscribe();
		}
	} else {
		rendered = { head: '', html: '', css: { code: '', map: null } };
	}
	const include_js = page_config.router || page_config.hydrate;
	if (!include_js) js.clear();
	const links = options2.amp
		? styles.size > 0 || rendered.css.code.length > 0
			? `<style amp-custom>${Array.from(styles)
					.concat(rendered.css.code)
					.join('\n')}</style>`
			: ''
		: [
				...Array.from(js).map(
					(dep) => `<link rel="modulepreload" href="${dep}">`
				),
				...Array.from(css2).map(
					(dep) => `<link rel="stylesheet" href="${dep}">`
				),
		  ].join('\n		');
	let init2 = '';
	if (options2.amp) {
		init2 = `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"><\/script>`;
	} else if (include_js) {
		init2 = `<script type="module">
			import { start } from ${s$1(options2.entry.file)};
			start({
				target: ${
					options2.target
						? `document.querySelector(${s$1(options2.target)})`
						: 'document.body'
				},
				paths: ${s$1(options2.paths)},
				session: ${try_serialize($session, (error3) => {
					throw new Error(
						`Failed to serialize session data: ${error3.message}`
					);
				})},
				host: ${page2 && page2.host ? s$1(page2.host) : 'location.host'},
				route: ${!!page_config.router},
				spa: ${!page_config.ssr},
				trailing_slash: ${s$1(options2.trailing_slash)},
				hydrate: ${
					page_config.ssr && page_config.hydrate
						? `{
					status: ${status},
					error: ${serialize_error(error2)},
					nodes: [
						${(branch || []).map(({ node }) => `import(${s$1(node.entry)})`).join(',\n						')}
					],
					page: {
						host: ${
							page2 && page2.host
								? s$1(page2.host)
								: 'location.host'
						}, // TODO this is redundant
						path: ${s$1(page2 && page2.path)},
						query: new URLSearchParams(${page2 ? s$1(page2.query.toString()) : ''}),
						params: ${page2 && s$1(page2.params)}
					}
				}`
						: 'null'
				}
			});
		<\/script>`;
	}
	if (options2.service_worker) {
		init2 += `<script>
			if ('serviceWorker' in navigator) {
				navigator.serviceWorker.register('${options2.service_worker}');
			}
		<\/script>`;
	}
	const head = [
		rendered.head,
		styles.size && !options2.amp
			? `<style data-svelte>${Array.from(styles).join('\n')}</style>`
			: '',
		links,
		init2,
	].join('\n\n		');
	const body = options2.amp
		? rendered.html
		: `${rendered.html}

			${serialized_data
				.map(({ url, body: body2, json }) => {
					let attributes = `type="application/json" data-type="svelte-data" data-url=${escape_html_attr(
						url
					)}`;
					if (body2) attributes += ` data-body="${hash(body2)}"`;
					return `<script ${attributes}>${json}<\/script>`;
				})
				.join('\n\n	')}
		`;
	const headers = {
		'content-type': 'text/html',
	};
	if (maxage) {
		headers['cache-control'] = `${
			is_private ? 'private' : 'public'
		}, max-age=${maxage}`;
	}
	if (!options2.floc) {
		headers['permissions-policy'] = 'interest-cohort=()';
	}
	return {
		status,
		headers,
		body: options2.template({ head, body }),
	};
}
function try_serialize(data, fail) {
	try {
		return devalue(data);
	} catch (err) {
		if (fail) fail(coalesce_to_error(err));
		return null;
	}
}
function serialize_error(error2) {
	if (!error2) return null;
	let serialized = try_serialize(error2);
	if (!serialized) {
		const { name, message, stack } = error2;
		serialized = try_serialize({ ...error2, name, message, stack });
	}
	if (!serialized) {
		serialized = '{}';
	}
	return serialized;
}
function normalize(loaded) {
	const has_error_status =
		loaded.status &&
		loaded.status >= 400 &&
		loaded.status <= 599 &&
		!loaded.redirect;
	if (loaded.error || has_error_status) {
		const status = loaded.status;
		if (!loaded.error && has_error_status) {
			return {
				status: status || 500,
				error: new Error(),
			};
		}
		const error2 =
			typeof loaded.error === 'string'
				? new Error(loaded.error)
				: loaded.error;
		if (!(error2 instanceof Error)) {
			return {
				status: 500,
				error: new Error(
					`"error" property returned from load() must be a string or instance of Error, received type "${typeof error2}"`
				),
			};
		}
		if (!status || status < 400 || status > 599) {
			console.warn(
				'"error" returned from load() without a valid status code \u2014 defaulting to 500'
			);
			return { status: 500, error: error2 };
		}
		return { status, error: error2 };
	}
	if (loaded.redirect) {
		if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
			return {
				status: 500,
				error: new Error(
					'"redirect" property returned from load() must be accompanied by a 3xx status code'
				),
			};
		}
		if (typeof loaded.redirect !== 'string') {
			return {
				status: 500,
				error: new Error(
					'"redirect" property returned from load() must be a string'
				),
			};
		}
	}
	if (loaded.context) {
		throw new Error(
			'You are returning "context" from a load function. "context" was renamed to "stuff", please adjust your code accordingly.'
		);
	}
	return loaded;
}
var s = JSON.stringify;
async function load_node({
	request,
	options: options2,
	state,
	route,
	page: page2,
	node,
	$session,
	stuff,
	prerender_enabled,
	is_leaf,
	is_error,
	status,
	error: error2,
}) {
	const { module: module2 } = node;
	let uses_credentials = false;
	const fetched = [];
	let set_cookie_headers = [];
	let loaded;
	const page_proxy = new Proxy(page2, {
		get: (target, prop, receiver) => {
			if (prop === 'query' && prerender_enabled) {
				throw new Error(
					'Cannot access query on a page with prerendering enabled'
				);
			}
			return Reflect.get(target, prop, receiver);
		},
	});
	if (module2.load) {
		const load_input = {
			page: page_proxy,
			get session() {
				uses_credentials = true;
				return $session;
			},
			fetch: async (resource, opts = {}) => {
				let url;
				if (typeof resource === 'string') {
					url = resource;
				} else {
					url = resource.url;
					opts = {
						method: resource.method,
						headers: resource.headers,
						body: resource.body,
						mode: resource.mode,
						credentials: resource.credentials,
						cache: resource.cache,
						redirect: resource.redirect,
						referrer: resource.referrer,
						integrity: resource.integrity,
						...opts,
					};
				}
				const resolved = resolve(request.path, url.split('?')[0]);
				let response;
				const filename = resolved
					.replace(options2.paths.assets, '')
					.slice(1);
				const filename_html = `${filename}/index.html`;
				const asset = options2.manifest.assets.find(
					(d2) => d2.file === filename || d2.file === filename_html
				);
				if (asset) {
					response = options2.read
						? new Response(options2.read(asset.file), {
								headers: asset.type
									? { 'content-type': asset.type }
									: {},
						  })
						: await fetch(
								`http://${page2.host}/${asset.file}`,
								opts
						  );
				} else if (
					resolved.startsWith('/') &&
					!resolved.startsWith('//')
				) {
					const relative = resolved;
					const headers = {
						...opts.headers,
					};
					if (opts.credentials !== 'omit') {
						uses_credentials = true;
						headers.cookie = request.headers.cookie;
						if (!headers.authorization) {
							headers.authorization =
								request.headers.authorization;
						}
					}
					if (opts.body && typeof opts.body !== 'string') {
						throw new Error('Request body must be a string');
					}
					const search = url.includes('?')
						? url.slice(url.indexOf('?') + 1)
						: '';
					const rendered = await respond(
						{
							host: request.host,
							method: opts.method || 'GET',
							headers,
							path: relative,
							rawBody:
								opts.body == null
									? null
									: new TextEncoder().encode(opts.body),
							query: new URLSearchParams(search),
						},
						options2,
						{
							fetched: url,
							initiator: route,
						}
					);
					if (rendered) {
						if (state.prerender) {
							state.prerender.dependencies.set(
								relative,
								rendered
							);
						}
						response = new Response(rendered.body, {
							status: rendered.status,
							headers: rendered.headers,
						});
					}
				} else {
					if (resolved.startsWith('//')) {
						throw new Error(
							`Cannot request protocol-relative URL (${url}) in server-side fetch`
						);
					}
					if (typeof request.host !== 'undefined') {
						const { hostname: fetch_hostname } = new URL(url);
						const [server_hostname] = request.host.split(':');
						if (
							`.${fetch_hostname}`.endsWith(
								`.${server_hostname}`
							) &&
							opts.credentials !== 'omit'
						) {
							uses_credentials = true;
							opts.headers = {
								...opts.headers,
								cookie: request.headers.cookie,
							};
						}
					}
					const external_request = new Request(url, opts);
					response = await options2.hooks.externalFetch.call(
						null,
						external_request
					);
				}
				if (response) {
					const proxy = new Proxy(response, {
						get(response2, key, receiver) {
							async function text() {
								const body = await response2.text();
								const headers = {};
								for (const [key2, value] of response2.headers) {
									if (key2 === 'set-cookie') {
										set_cookie_headers =
											set_cookie_headers.concat(value);
									} else if (key2 !== 'etag') {
										headers[key2] = value;
									}
								}
								if (
									!opts.body ||
									typeof opts.body === 'string'
								) {
									fetched.push({
										url,
										body: opts.body,
										json: `{"status":${
											response2.status
										},"statusText":${s(
											response2.statusText
										)},"headers":${s(
											headers
										)},"body":"${escape_json_string_in_html(
											body
										)}"}`,
									});
								}
								return body;
							}
							if (key === 'text') {
								return text;
							}
							if (key === 'json') {
								return async () => {
									return JSON.parse(await text());
								};
							}
							return Reflect.get(response2, key, response2);
						},
					});
					return proxy;
				}
				return (
					response ||
					new Response('Not found', {
						status: 404,
					})
				);
			},
			stuff: { ...stuff },
		};
		if (is_error) {
			load_input.status = status;
			load_input.error = error2;
		}
		loaded = await module2.load.call(null, load_input);
	} else {
		loaded = {};
	}
	if (!loaded && is_leaf && !is_error) return;
	if (!loaded) {
		throw new Error(
			`${node.entry} - load must return a value except for page fall through`
		);
	}
	return {
		node,
		loaded: normalize(loaded),
		stuff: loaded.stuff || stuff,
		fetched,
		set_cookie_headers,
		uses_credentials,
	};
}
var absolute = /^([a-z]+:)?\/?\//;
function resolve(base2, path) {
	const base_match = absolute.exec(base2);
	const path_match = absolute.exec(path);
	if (!base_match) {
		throw new Error(`bad base path: "${base2}"`);
	}
	const baseparts = path_match
		? []
		: base2.slice(base_match[0].length).split('/');
	const pathparts = path_match
		? path.slice(path_match[0].length).split('/')
		: path.split('/');
	baseparts.pop();
	for (let i = 0; i < pathparts.length; i += 1) {
		const part = pathparts[i];
		if (part === '.') continue;
		else if (part === '..') baseparts.pop();
		else baseparts.push(part);
	}
	const prefix =
		(path_match && path_match[0]) || (base_match && base_match[0]) || '';
	return `${prefix}${baseparts.join('/')}`;
}
async function respond_with_error({
	request,
	options: options2,
	state,
	$session,
	status,
	error: error2,
}) {
	const default_layout = await options2.load_component(
		options2.manifest.layout
	);
	const default_error = await options2.load_component(
		options2.manifest.error
	);
	const page2 = {
		host: request.host,
		path: request.path,
		query: request.url.searchParams,
		params: {},
	};
	const loaded = await load_node({
		request,
		options: options2,
		state,
		route: null,
		page: page2,
		node: default_layout,
		$session,
		stuff: {},
		prerender_enabled: is_prerender_enabled(options2, default_error, state),
		is_leaf: false,
		is_error: false,
	});
	const branch = [
		loaded,
		await load_node({
			request,
			options: options2,
			state,
			route: null,
			page: page2,
			node: default_error,
			$session,
			stuff: loaded ? loaded.stuff : {},
			prerender_enabled: is_prerender_enabled(
				options2,
				default_error,
				state
			),
			is_leaf: false,
			is_error: true,
			status,
			error: error2,
		}),
	];
	try {
		return await render_response({
			options: options2,
			$session,
			page_config: {
				hydrate: options2.hydrate,
				router: options2.router,
				ssr: options2.ssr,
			},
			status,
			error: error2,
			branch,
			page: page2,
		});
	} catch (err) {
		const error3 = coalesce_to_error(err);
		options2.handle_error(error3, request);
		return {
			status: 500,
			headers: {},
			body: error3.stack,
		};
	}
}
function is_prerender_enabled(options2, node, state) {
	return (
		options2.prerender &&
		(!!node.module.prerender || (!!state.prerender && state.prerender.all))
	);
}
async function respond$1(opts) {
	const { request, options: options2, state, $session, route } = opts;
	let nodes;
	try {
		nodes = await Promise.all(
			route.a.map((id) => (id ? options2.load_component(id) : void 0))
		);
	} catch (err) {
		const error3 = coalesce_to_error(err);
		options2.handle_error(error3, request);
		return await respond_with_error({
			request,
			options: options2,
			state,
			$session,
			status: 500,
			error: error3,
		});
	}
	const leaf = nodes[nodes.length - 1].module;
	let page_config = get_page_config(leaf, options2);
	if (!leaf.prerender && state.prerender && !state.prerender.all) {
		return {
			status: 204,
			headers: {},
			body: '',
		};
	}
	let branch = [];
	let status = 200;
	let error2;
	let set_cookie_headers = [];
	ssr: if (page_config.ssr) {
		let stuff = {};
		for (let i = 0; i < nodes.length; i += 1) {
			const node = nodes[i];
			let loaded;
			if (node) {
				try {
					loaded = await load_node({
						...opts,
						node,
						stuff,
						prerender_enabled: is_prerender_enabled(
							options2,
							node,
							state
						),
						is_leaf: i === nodes.length - 1,
						is_error: false,
					});
					if (!loaded) return;
					set_cookie_headers = set_cookie_headers.concat(
						loaded.set_cookie_headers
					);
					if (loaded.loaded.redirect) {
						return with_cookies(
							{
								status: loaded.loaded.status,
								headers: {
									location: encodeURI(loaded.loaded.redirect),
								},
							},
							set_cookie_headers
						);
					}
					if (loaded.loaded.error) {
						({ status, error: error2 } = loaded.loaded);
					}
				} catch (err) {
					const e = coalesce_to_error(err);
					options2.handle_error(e, request);
					status = 500;
					error2 = e;
				}
				if (loaded && !error2) {
					branch.push(loaded);
				}
				if (error2) {
					while (i--) {
						if (route.b[i]) {
							const error_node = await options2.load_component(
								route.b[i]
							);
							let node_loaded;
							let j = i;
							while (!(node_loaded = branch[j])) {
								j -= 1;
							}
							try {
								const error_loaded = await load_node({
									...opts,
									node: error_node,
									stuff: node_loaded.stuff,
									prerender_enabled: is_prerender_enabled(
										options2,
										error_node,
										state
									),
									is_leaf: false,
									is_error: true,
									status,
									error: error2,
								});
								if (error_loaded.loaded.error) {
									continue;
								}
								page_config = get_page_config(
									error_node.module,
									options2
								);
								branch = branch
									.slice(0, j + 1)
									.concat(error_loaded);
								break ssr;
							} catch (err) {
								const e = coalesce_to_error(err);
								options2.handle_error(e, request);
								continue;
							}
						}
					}
					return with_cookies(
						await respond_with_error({
							request,
							options: options2,
							state,
							$session,
							status,
							error: error2,
						}),
						set_cookie_headers
					);
				}
			}
			if (loaded && loaded.loaded.stuff) {
				stuff = {
					...stuff,
					...loaded.loaded.stuff,
				};
			}
		}
	}
	try {
		return with_cookies(
			await render_response({
				...opts,
				page_config,
				status,
				error: error2,
				branch: branch.filter(Boolean),
			}),
			set_cookie_headers
		);
	} catch (err) {
		const error3 = coalesce_to_error(err);
		options2.handle_error(error3, request);
		return with_cookies(
			await respond_with_error({
				...opts,
				status: 500,
				error: error3,
			}),
			set_cookie_headers
		);
	}
}
function get_page_config(leaf, options2) {
	return {
		ssr: 'ssr' in leaf ? !!leaf.ssr : options2.ssr,
		router: 'router' in leaf ? !!leaf.router : options2.router,
		hydrate: 'hydrate' in leaf ? !!leaf.hydrate : options2.hydrate,
	};
}
function with_cookies(response, set_cookie_headers) {
	if (set_cookie_headers.length) {
		response.headers['set-cookie'] = set_cookie_headers;
	}
	return response;
}
async function render_page(request, route, match, options2, state) {
	if (state.initiator === route) {
		return {
			status: 404,
			headers: {},
			body: `Not found: ${request.path}`,
		};
	}
	const params = route.params(match);
	const page2 = {
		host: request.host,
		path: request.path,
		query: request.url.searchParams,
		params,
	};
	const $session = await options2.hooks.getSession(request);
	const response = await respond$1({
		request,
		options: options2,
		state,
		$session,
		route,
		page: page2,
	});
	if (response) {
		return response;
	}
	if (state.fetched) {
		return {
			status: 500,
			headers: {},
			body: `Bad request in load function: failed to fetch ${state.fetched}`,
		};
	}
}
function read_only_form_data() {
	const map = new Map();
	return {
		append(key, value) {
			if (map.has(key)) {
				(map.get(key) || []).push(value);
			} else {
				map.set(key, [value]);
			}
		},
		data: new ReadOnlyFormData(map),
	};
}
var ReadOnlyFormData = class {
	constructor(map) {
		__privateAdd(this, _map, void 0);
		__privateSet(this, _map, map);
	}
	get(key) {
		const value = __privateGet(this, _map).get(key);
		return value && value[0];
	}
	getAll(key) {
		return __privateGet(this, _map).get(key);
	}
	has(key) {
		return __privateGet(this, _map).has(key);
	}
	*[Symbol.iterator]() {
		for (const [key, value] of __privateGet(this, _map)) {
			for (let i = 0; i < value.length; i += 1) {
				yield [key, value[i]];
			}
		}
	}
	*entries() {
		for (const [key, value] of __privateGet(this, _map)) {
			for (let i = 0; i < value.length; i += 1) {
				yield [key, value[i]];
			}
		}
	}
	*keys() {
		for (const [key] of __privateGet(this, _map)) yield key;
	}
	*values() {
		for (const [, value] of __privateGet(this, _map)) {
			for (let i = 0; i < value.length; i += 1) {
				yield value[i];
			}
		}
	}
};
_map = new WeakMap();
function parse_body(raw, headers) {
	if (!raw) return raw;
	const content_type = headers['content-type'];
	const [type, ...directives] = content_type
		? content_type.split(/;\s*/)
		: [];
	const text = () =>
		new TextDecoder(headers['content-encoding'] || 'utf-8').decode(raw);
	switch (type) {
		case 'text/plain':
			return text();
		case 'application/json':
			return JSON.parse(text());
		case 'application/x-www-form-urlencoded':
			return get_urlencoded(text());
		case 'multipart/form-data': {
			const boundary = directives.find((directive) =>
				directive.startsWith('boundary=')
			);
			if (!boundary) throw new Error('Missing boundary');
			return get_multipart(text(), boundary.slice('boundary='.length));
		}
		default:
			return raw;
	}
}
function get_urlencoded(text) {
	const { data, append } = read_only_form_data();
	text.replace(/\+/g, ' ')
		.split('&')
		.forEach((str) => {
			const [key, value] = str.split('=');
			append(decodeURIComponent(key), decodeURIComponent(value));
		});
	return data;
}
function get_multipart(text, boundary) {
	const parts = text.split(`--${boundary}`);
	if (parts[0] !== '' || parts[parts.length - 1].trim() !== '--') {
		throw new Error('Malformed form data');
	}
	const { data, append } = read_only_form_data();
	parts.slice(1, -1).forEach((part) => {
		const match = /\s*([\s\S]+?)\r\n\r\n([\s\S]*)\s*/.exec(part);
		if (!match) {
			throw new Error('Malformed form data');
		}
		const raw_headers = match[1];
		const body = match[2].trim();
		let key;
		const headers = {};
		raw_headers.split('\r\n').forEach((str) => {
			const [raw_header, ...raw_directives] = str.split('; ');
			let [name, value] = raw_header.split(': ');
			name = name.toLowerCase();
			headers[name] = value;
			const directives = {};
			raw_directives.forEach((raw_directive) => {
				const [name2, value2] = raw_directive.split('=');
				directives[name2] = JSON.parse(value2);
			});
			if (name === 'content-disposition') {
				if (value !== 'form-data')
					throw new Error('Malformed form data');
				if (directives.filename) {
					throw new Error('File upload is not yet implemented');
				}
				if (directives.name) {
					key = directives.name;
				}
			}
		});
		if (!key) throw new Error('Malformed form data');
		append(key, body);
	});
	return data;
}
async function respond(incoming, options2, state = {}) {
	if (incoming.path !== '/' && options2.trailing_slash !== 'ignore') {
		const has_trailing_slash = incoming.path.endsWith('/');
		if (
			(has_trailing_slash && options2.trailing_slash === 'never') ||
			(!has_trailing_slash &&
				options2.trailing_slash === 'always' &&
				!(incoming.path.split('/').pop() || '').includes('.'))
		) {
			const path = has_trailing_slash
				? incoming.path.slice(0, -1)
				: incoming.path + '/';
			const q = incoming.query.toString();
			return {
				status: 301,
				headers: {
					location: options2.paths.base + path + (q ? `?${q}` : ''),
				},
			};
		}
	}
	const headers = lowercase_keys(incoming.headers);
	const request = {
		...incoming,
		headers,
		body: parse_body(incoming.rawBody, headers),
		params: {},
		locals: {},
	};
	try {
		return await options2.hooks.handle({
			request,
			resolve: async (request2) => {
				if (state.prerender && state.prerender.fallback) {
					return await render_response({
						options: options2,
						$session: await options2.hooks.getSession(request2),
						page_config: {
							ssr: false,
							router: true,
							hydrate: true,
						},
						status: 200,
						branch: [],
					});
				}
				const decoded = decodeURI(request2.path);
				for (const route of options2.manifest.routes) {
					const match = route.pattern.exec(decoded);
					if (!match) continue;
					const response =
						route.type === 'endpoint'
							? await render_endpoint(request2, route, match)
							: await render_page(
									request2,
									route,
									match,
									options2,
									state
							  );
					if (response) {
						if (response.status === 200) {
							const cache_control = get_single_valued_header(
								response.headers,
								'cache-control'
							);
							if (
								!cache_control ||
								!/(no-store|immutable)/.test(cache_control)
							) {
								const etag = `"${hash(response.body || '')}"`;
								if (
									request2.headers['if-none-match'] === etag
								) {
									return {
										status: 304,
										headers: {},
										body: '',
									};
								}
								response.headers['etag'] = etag;
							}
						}
						return response;
					}
				}
				const $session = await options2.hooks.getSession(request2);
				return await respond_with_error({
					request: request2,
					options: options2,
					state,
					$session,
					status: 404,
					error: new Error(`Not found: ${request2.path}`),
				});
			},
		});
	} catch (err) {
		const e = coalesce_to_error(err);
		options2.handle_error(e, request);
		return {
			status: 500,
			headers: {},
			body: options2.dev ? e.stack : e.message,
		};
	}
}
function noop() {}
function run(fn) {
	return fn();
}
function blank_object() {
	return Object.create(null);
}
function run_all(fns) {
	fns.forEach(run);
}
function safe_not_equal(a, b) {
	return a != a
		? b == b
		: a !== b || (a && typeof a === 'object') || typeof a === 'function';
}
function subscribe(store, ...callbacks) {
	if (store == null) {
		return noop;
	}
	const unsub = store.subscribe(...callbacks);
	return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function compute_rest_props(props, keys) {
	const rest = {};
	keys = new Set(keys);
	for (const k in props) if (!keys.has(k) && k[0] !== '$') rest[k] = props[k];
	return rest;
}
function null_to_empty(value) {
	return value == null ? '' : value;
}
function custom_event(type, detail, bubbles = false) {
	const e = document.createEvent('CustomEvent');
	e.initCustomEvent(type, bubbles, false, detail);
	return e;
}
var current_component;
function set_current_component(component) {
	current_component = component;
}
function get_current_component() {
	if (!current_component)
		throw new Error('Function called outside component initialization');
	return current_component;
}
function createEventDispatcher() {
	const component = get_current_component();
	return (type, detail) => {
		const callbacks = component.$$.callbacks[type];
		if (callbacks) {
			const event = custom_event(type, detail);
			callbacks.slice().forEach((fn) => {
				fn.call(component, event);
			});
		}
	};
}
function setContext(key, context) {
	get_current_component().$$.context.set(key, context);
}
function getContext(key) {
	return get_current_component().$$.context.get(key);
}
Promise.resolve();
var boolean_attributes = new Set([
	'allowfullscreen',
	'allowpaymentrequest',
	'async',
	'autofocus',
	'autoplay',
	'checked',
	'controls',
	'default',
	'defer',
	'disabled',
	'formnovalidate',
	'hidden',
	'ismap',
	'loop',
	'multiple',
	'muted',
	'nomodule',
	'novalidate',
	'open',
	'playsinline',
	'readonly',
	'required',
	'reversed',
	'selected',
]);
var invalid_attribute_name_character =
	/[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
function spread(args, classes_to_add) {
	const attributes = Object.assign({}, ...args);
	if (classes_to_add) {
		if (attributes.class == null) {
			attributes.class = classes_to_add;
		} else {
			attributes.class += ' ' + classes_to_add;
		}
	}
	let str = '';
	Object.keys(attributes).forEach((name) => {
		if (invalid_attribute_name_character.test(name)) return;
		const value = attributes[name];
		if (value === true) str += ' ' + name;
		else if (boolean_attributes.has(name.toLowerCase())) {
			if (value) str += ' ' + name;
		} else if (value != null) {
			str += ` ${name}="${value}"`;
		}
	});
	return str;
}
var escaped = {
	'"': '&quot;',
	"'": '&#39;',
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
};
function escape(html) {
	return String(html).replace(/["'&<>]/g, (match) => escaped[match]);
}
function escape_attribute_value(value) {
	return typeof value === 'string' ? escape(value) : value;
}
function escape_object(obj) {
	const result = {};
	for (const key in obj) {
		result[key] = escape_attribute_value(obj[key]);
	}
	return result;
}
function each(items, fn) {
	let str = '';
	for (let i = 0; i < items.length; i += 1) {
		str += fn(items[i], i);
	}
	return str;
}
var missing_component = {
	$$render: () => '',
};
function validate_component(component, name) {
	if (!component || !component.$$render) {
		if (name === 'svelte:component') name += ' this={...}';
		throw new Error(
			`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`
		);
	}
	return component;
}
var on_destroy;
function create_ssr_component(fn) {
	function $$render(result, props, bindings, slots, context) {
		const parent_component = current_component;
		const $$ = {
			on_destroy,
			context: new Map(
				context || (parent_component ? parent_component.$$.context : [])
			),
			on_mount: [],
			before_update: [],
			after_update: [],
			callbacks: blank_object(),
		};
		set_current_component({ $$ });
		const html = fn(result, props, bindings, slots);
		set_current_component(parent_component);
		return html;
	}
	return {
		render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
			on_destroy = [];
			const result = { title: '', head: '', css: new Set() };
			const html = $$render(result, props, {}, $$slots, context);
			run_all(on_destroy);
			return {
				html,
				css: {
					code: Array.from(result.css)
						.map((css2) => css2.code)
						.join('\n'),
					map: null,
				},
				head: result.title + result.head,
			};
		},
		$$render,
	};
}
function add_attribute(name, value, boolean) {
	if (value == null || (boolean && !value)) return '';
	return ` ${name}${
		value === true
			? ''
			: `=${
					typeof value === 'string'
						? JSON.stringify(escape(value))
						: `"${value}"`
			  }`
	}`;
}
function afterUpdate() {}
var css$8 = {
	code: '#svelte-announcer.svelte-9z6sc{position:absolute;left:0;top:0;clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}',
	map: `{"version":3,"file":"root.svelte","sources":["root.svelte"],"sourcesContent":["<!-- This file is generated by @sveltejs/kit \u2014 do not edit it! -->\\n<script>\\n\\timport { setContext, afterUpdate, onMount } from 'svelte';\\n\\n\\t// stores\\n\\texport let stores;\\n\\texport let page;\\n\\n\\texport let components;\\n\\texport let props_0 = null;\\n\\texport let props_1 = null;\\n\\texport let props_2 = null;\\n\\n\\tsetContext('__svelte__', stores);\\n\\n\\t$: stores.page.set(page);\\n\\tafterUpdate(stores.page.notify);\\n\\n\\tlet mounted = false;\\n\\tlet navigated = false;\\n\\tlet title = null;\\n\\n\\tonMount(() => {\\n\\t\\tconst unsubscribe = stores.page.subscribe(() => {\\n\\t\\t\\tif (mounted) {\\n\\t\\t\\t\\tnavigated = true;\\n\\t\\t\\t\\ttitle = document.title || 'untitled page';\\n\\t\\t\\t}\\n\\t\\t});\\n\\n\\t\\tmounted = true;\\n\\t\\treturn unsubscribe;\\n\\t});\\n<\/script>\\n\\n<svelte:component this={components[0]} {...(props_0 || {})}>\\n\\t{#if components[1]}\\n\\t\\t<svelte:component this={components[1]} {...(props_1 || {})}>\\n\\t\\t\\t{#if components[2]}\\n\\t\\t\\t\\t<svelte:component this={components[2]} {...(props_2 || {})}/>\\n\\t\\t\\t{/if}\\n\\t\\t</svelte:component>\\n\\t{/if}\\n</svelte:component>\\n\\n{#if mounted}\\n\\t<div id=\\"svelte-announcer\\" aria-live=\\"assertive\\" aria-atomic=\\"true\\">\\n\\t\\t{#if navigated}\\n\\t\\t\\t{title}\\n\\t\\t{/if}\\n\\t</div>\\n{/if}\\n\\n<style>\\n\\t#svelte-announcer {\\n\\t\\tposition: absolute;\\n\\t\\tleft: 0;\\n\\t\\ttop: 0;\\n\\t\\tclip: rect(0 0 0 0);\\n\\t\\t-webkit-clip-path: inset(50%);\\n\\t\\t        clip-path: inset(50%);\\n\\t\\toverflow: hidden;\\n\\t\\twhite-space: nowrap;\\n\\t\\twidth: 1px;\\n\\t\\theight: 1px;\\n\\t}</style>"],"names":[],"mappings":"AAsDC,iBAAiB,aAAC,CAAC,AAClB,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACnB,iBAAiB,CAAE,MAAM,GAAG,CAAC,CACrB,SAAS,CAAE,MAAM,GAAG,CAAC,CAC7B,QAAQ,CAAE,MAAM,CAChB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,AACZ,CAAC"}`,
};
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { stores } = $$props;
	let { page: page2 } = $$props;
	let { components } = $$props;
	let { props_0 = null } = $$props;
	let { props_1 = null } = $$props;
	let { props_2 = null } = $$props;
	setContext('__svelte__', stores);
	afterUpdate(stores.page.notify);
	if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
		$$bindings.stores(stores);
	if ($$props.page === void 0 && $$bindings.page && page2 !== void 0)
		$$bindings.page(page2);
	if (
		$$props.components === void 0 &&
		$$bindings.components &&
		components !== void 0
	)
		$$bindings.components(components);
	if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
		$$bindings.props_0(props_0);
	if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
		$$bindings.props_1(props_1);
	if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
		$$bindings.props_2(props_2);
	$$result.css.add(css$8);
	{
		stores.page.set(page2);
	}
	return `


${validate_component(
	components[0] || missing_component,
	'svelte:component'
).$$render(
	$$result,
	Object.assign(props_0 || {}),
	{},
	{
		default: () =>
			`${
				components[1]
					? `${validate_component(
							components[1] || missing_component,
							'svelte:component'
					  ).$$render(
							$$result,
							Object.assign(props_1 || {}),
							{},
							{
								default: () =>
									`${
										components[2]
											? `${validate_component(
													components[2] ||
														missing_component,
													'svelte:component'
											  ).$$render(
													$$result,
													Object.assign(
														props_2 || {}
													),
													{},
													{}
											  )}`
											: ``
									}`,
							}
					  )}`
					: ``
			}`,
	}
)}

${``}`;
});
var base$1 = '';
var assets = '';
function set_paths(paths) {
	base$1 = paths.base;
	assets = paths.assets || base$1;
}
function set_prerendering(value) {}
var handle = async ({ request, resolve: resolve2 }) => {
	const cookies = import_cookie.default.parse(request.headers.cookie || '');
	request.locals.userid = cookies.userid || v4();
	if (request.url.searchParams.has('_method')) {
		request.method = request.url.searchParams.get('_method').toUpperCase();
	}
	const response = await resolve2(request);
	if (!cookies.userid) {
		response.headers['set-cookie'] = import_cookie.default.serialize(
			'userid',
			request.locals.userid,
			{
				path: '/',
				httpOnly: true,
			}
		);
	}
	return response;
};
var user_hooks = /* @__PURE__ */ Object.freeze({
	__proto__: null,
	[Symbol.toStringTag]: 'Module',
	handle,
});
var template = ({ head, body }) =>
	'<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<link rel="icon" href="/favicon.png" />\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\n\n		' +
	head +
	'\n	</head>\n	<body>\n		<div id="svelte">' +
	body +
	'</div>\n	</body>\n</html>\n';
var options = null;
var default_settings = { paths: { base: '', assets: '' } };
function init(settings = default_settings) {
	set_paths(settings.paths);
	set_prerendering(settings.prerendering || false);
	const hooks = get_hooks(user_hooks);
	options = {
		amp: false,
		dev: false,
		entry: {
			file: assets + '/_app/start-26e9105d.js',
			css: [
				assets + '/_app/assets/start-c446e5f0.css',
				assets + '/_app/assets/vendor-53181f56.css',
			],
			js: [
				assets + '/_app/start-26e9105d.js',
				assets + '/_app/chunks/vendor-5317cca6.js',
			],
		},
		fetched: void 0,
		floc: false,
		get_component_path: (id) => assets + '/_app/' + entry_lookup[id],
		get_stack: (error2) => String(error2),
		handle_error: (error2, request) => {
			hooks.handleError({ error: error2, request });
			error2.stack = options.get_stack(error2);
		},
		hooks,
		hydrate: true,
		initiator: void 0,
		load_component,
		manifest,
		paths: settings.paths,
		prerender: true,
		read: settings.read,
		root: Root,
		service_worker: null,
		router: true,
		ssr: true,
		target: '#svelte',
		template,
		trailing_slash: 'never',
	};
}
var d = (s2) =>
	s2
		.replace(/%23/g, '#')
		.replace(/%3[Bb]/g, ';')
		.replace(/%2[Cc]/g, ',')
		.replace(/%2[Ff]/g, '/')
		.replace(/%3[Ff]/g, '?')
		.replace(/%3[Aa]/g, ':')
		.replace(/%40/g, '@')
		.replace(/%26/g, '&')
		.replace(/%3[Dd]/g, '=')
		.replace(/%2[Bb]/g, '+')
		.replace(/%24/g, '$');
var empty = () => ({});
var manifest = {
	assets: [
		{ file: 'favicon.png', size: 1571, type: 'image/png' },
		{ file: 'robots.txt', size: 67, type: 'text/plain' },
	],
	layout: 'src/routes/__layout.svelte',
	error: '.svelte-kit/build/components/error.svelte',
	routes: [
		{
			type: 'page',
			pattern: /^\/$/,
			params: empty,
			a: ['src/routes/__layout.svelte', 'src/routes/index.svelte'],
			b: ['.svelte-kit/build/components/error.svelte'],
		},
		{
			type: 'page',
			pattern: /^\/music-career\/?$/,
			params: empty,
			a: [
				'src/routes/__layout.svelte',
				'src/routes/music-career/index.svelte',
			],
			b: ['.svelte-kit/build/components/error.svelte'],
		},
		{
			type: 'page',
			pattern: /^\/music-career\/birthday-2003\/?$/,
			params: empty,
			a: [
				'src/routes/__layout.svelte',
				'src/routes/music-career/birthday-2003.svelte',
			],
			b: ['.svelte-kit/build/components/error.svelte'],
		},
		{
			type: 'page',
			pattern: /^\/music-career\/cains-feel\/?$/,
			params: empty,
			a: [
				'src/routes/__layout.svelte',
				'src/routes/music-career/cains-feel.svelte',
			],
			b: ['.svelte-kit/build/components/error.svelte'],
		},
		{
			type: 'page',
			pattern: /^\/music-career\/you-gackt\/?$/,
			params: empty,
			a: [
				'src/routes/__layout.svelte',
				'src/routes/music-career/you-gackt.svelte',
			],
			b: ['.svelte-kit/build/components/error.svelte'],
		},
		{
			type: 'page',
			pattern: /^\/music-career\/gacktjob\/?$/,
			params: empty,
			a: [
				'src/routes/__layout.svelte',
				'src/routes/music-career/gacktjob.svelte',
			],
			b: ['.svelte-kit/build/components/error.svelte'],
		},
		{
			type: 'page',
			pattern: /^\/music-career\/maracas\/?$/,
			params: empty,
			a: [
				'src/routes/__layout.svelte',
				'src/routes/music-career/maracas.svelte',
			],
			b: ['.svelte-kit/build/components/error.svelte'],
		},
		{
			type: 'page',
			pattern: /^\/music-career\/sqf\/?$/,
			params: empty,
			a: [
				'src/routes/__layout.svelte',
				'src/routes/music-career/sqf.svelte',
			],
			b: ['.svelte-kit/build/components/error.svelte'],
		},
		{
			type: 'page',
			pattern: /^\/where-to-buy\/?$/,
			params: empty,
			a: ['src/routes/__layout.svelte', 'src/routes/where-to-buy.svelte'],
			b: ['.svelte-kit/build/components/error.svelte'],
		},
		{
			type: 'page',
			pattern: /^\/discography\/?$/,
			params: empty,
			a: [
				'src/routes/__layout.svelte',
				'src/routes/discography/index.svelte',
			],
			b: ['.svelte-kit/build/components/error.svelte'],
		},
		{
			type: 'page',
			pattern: /^\/discography\/full-discography\/?$/,
			params: empty,
			a: [
				'src/routes/__layout.svelte',
				'src/routes/discography/full-discography.svelte',
			],
			b: ['.svelte-kit/build/components/error.svelte'],
		},
		{
			type: 'page',
			pattern: /^\/discography\/life-short-film\/?$/,
			params: empty,
			a: [
				'src/routes/__layout.svelte',
				'src/routes/discography/life-short-film.svelte',
			],
			b: ['.svelte-kit/build/components/error.svelte'],
		},
		{
			type: 'page',
			pattern: /^\/discography\/nine-nine-radio\/?$/,
			params: empty,
			a: [
				'src/routes/__layout.svelte',
				'src/routes/discography/nine-nine-radio.svelte',
			],
			b: ['.svelte-kit/build/components/error.svelte'],
		},
		{
			type: 'page',
			pattern: /^\/discography\/appearances\/?$/,
			params: empty,
			a: [
				'src/routes/__layout.svelte',
				'src/routes/discography/appearances.svelte',
			],
			b: ['.svelte-kit/build/components/error.svelte'],
		},
		{
			type: 'page',
			pattern: /^\/about-you\/?$/,
			params: empty,
			a: [
				'src/routes/__layout.svelte',
				'src/routes/about-you/index.svelte',
			],
			b: ['.svelte-kit/build/components/error.svelte'],
		},
		{
			type: 'page',
			pattern: /^\/about-you\/designs\/?$/,
			params: empty,
			a: [
				'src/routes/__layout.svelte',
				'src/routes/about-you/designs.svelte',
			],
			b: ['.svelte-kit/build/components/error.svelte'],
		},
		{
			type: 'page',
			pattern: /^\/about\/?$/,
			params: empty,
			a: ['src/routes/__layout.svelte', 'src/routes/about.svelte'],
			b: ['.svelte-kit/build/components/error.svelte'],
		},
		{
			type: 'endpoint',
			pattern: /^\/todos\.json$/,
			params: empty,
			load: () =>
				Promise.resolve().then(function () {
					return index_json;
				}),
		},
		{
			type: 'page',
			pattern: /^\/todos\/?$/,
			params: empty,
			a: ['src/routes/__layout.svelte', 'src/routes/todos/index.svelte'],
			b: ['.svelte-kit/build/components/error.svelte'],
		},
		{
			type: 'endpoint',
			pattern: /^\/todos\/([^/]+?)\.json$/,
			params: (m) => ({ uid: d(m[1]) }),
			load: () =>
				Promise.resolve().then(function () {
					return _uid__json;
				}),
		},
		{
			type: 'page',
			pattern: /^\/site\/history\/?$/,
			params: empty,
			a: ['src/routes/__layout.svelte', 'src/routes/site/history.svelte'],
			b: ['.svelte-kit/build/components/error.svelte'],
		},
		{
			type: 'page',
			pattern: /^\/site\/updates\/?$/,
			params: empty,
			a: ['src/routes/__layout.svelte', 'src/routes/site/updates.svelte'],
			b: ['.svelte-kit/build/components/error.svelte'],
		},
		{
			type: 'page',
			pattern: /^\/site\/thanks\/?$/,
			params: empty,
			a: ['src/routes/__layout.svelte', 'src/routes/site/thanks.svelte'],
			b: ['.svelte-kit/build/components/error.svelte'],
		},
	],
};
var get_hooks = (hooks) => ({
	getSession: hooks.getSession || (() => ({})),
	handle:
		hooks.handle || (({ request, resolve: resolve2 }) => resolve2(request)),
	handleError:
		hooks.handleError ||
		(({ error: error2 }) => console.error(error2.stack)),
	externalFetch: hooks.externalFetch || fetch,
});
var module_lookup = {
	'src/routes/__layout.svelte': () =>
		Promise.resolve().then(function () {
			return __layout;
		}),
	'.svelte-kit/build/components/error.svelte': () =>
		Promise.resolve().then(function () {
			return error;
		}),
	'src/routes/index.svelte': () =>
		Promise.resolve().then(function () {
			return index$4;
		}),
	'src/routes/music-career/index.svelte': () =>
		Promise.resolve().then(function () {
			return index$3;
		}),
	'src/routes/music-career/birthday-2003.svelte': () =>
		Promise.resolve().then(function () {
			return birthday2003;
		}),
	'src/routes/music-career/cains-feel.svelte': () =>
		Promise.resolve().then(function () {
			return cainsFeel;
		}),
	'src/routes/music-career/you-gackt.svelte': () =>
		Promise.resolve().then(function () {
			return youGackt;
		}),
	'src/routes/music-career/gacktjob.svelte': () =>
		Promise.resolve().then(function () {
			return gacktjob;
		}),
	'src/routes/music-career/maracas.svelte': () =>
		Promise.resolve().then(function () {
			return maracas;
		}),
	'src/routes/music-career/sqf.svelte': () =>
		Promise.resolve().then(function () {
			return sqf;
		}),
	'src/routes/where-to-buy.svelte': () =>
		Promise.resolve().then(function () {
			return whereToBuy;
		}),
	'src/routes/discography/index.svelte': () =>
		Promise.resolve().then(function () {
			return index$2;
		}),
	'src/routes/discography/full-discography.svelte': () =>
		Promise.resolve().then(function () {
			return fullDiscography;
		}),
	'src/routes/discography/life-short-film.svelte': () =>
		Promise.resolve().then(function () {
			return lifeShortFilm;
		}),
	'src/routes/discography/nine-nine-radio.svelte': () =>
		Promise.resolve().then(function () {
			return nineNineRadio;
		}),
	'src/routes/discography/appearances.svelte': () =>
		Promise.resolve().then(function () {
			return appearances;
		}),
	'src/routes/about-you/index.svelte': () =>
		Promise.resolve().then(function () {
			return index$1;
		}),
	'src/routes/about-you/designs.svelte': () =>
		Promise.resolve().then(function () {
			return designs;
		}),
	'src/routes/about.svelte': () =>
		Promise.resolve().then(function () {
			return about;
		}),
	'src/routes/todos/index.svelte': () =>
		Promise.resolve().then(function () {
			return index;
		}),
	'src/routes/site/history.svelte': () =>
		Promise.resolve().then(function () {
			return history;
		}),
	'src/routes/site/updates.svelte': () =>
		Promise.resolve().then(function () {
			return updates;
		}),
	'src/routes/site/thanks.svelte': () =>
		Promise.resolve().then(function () {
			return thanks;
		}),
};
var metadata_lookup = {
	'src/routes/__layout.svelte': {
		entry: 'pages/__layout.svelte-0dd6e1c6.js',
		css: [
			'assets/pages/__layout.svelte-6566748f.css',
			'assets/vendor-53181f56.css',
		],
		js: [
			'pages/__layout.svelte-0dd6e1c6.js',
			'chunks/vendor-5317cca6.js',
			'chunks/Link-89bf6b11.js',
		],
		styles: [],
	},
	'.svelte-kit/build/components/error.svelte': {
		entry: 'error.svelte-f4fa9ded.js',
		css: ['assets/vendor-53181f56.css'],
		js: ['error.svelte-f4fa9ded.js', 'chunks/vendor-5317cca6.js'],
		styles: [],
	},
	'src/routes/index.svelte': {
		entry: 'pages/index.svelte-e854cf6a.js',
		css: ['assets/vendor-53181f56.css'],
		js: [
			'pages/index.svelte-e854cf6a.js',
			'chunks/vendor-5317cca6.js',
			'chunks/Link-89bf6b11.js',
		],
		styles: [],
	},
	'src/routes/music-career/index.svelte': {
		entry: 'pages/music-career/index.svelte-70bd60ae.js',
		css: ['assets/vendor-53181f56.css'],
		js: [
			'pages/music-career/index.svelte-70bd60ae.js',
			'chunks/vendor-5317cca6.js',
			'chunks/Link-89bf6b11.js',
			'chunks/1996-mm-a4a68d6c.js',
			'chunks/store-14313536.js',
		],
		styles: [],
	},
	'src/routes/music-career/birthday-2003.svelte': {
		entry: 'pages/music-career/birthday-2003.svelte-75b9843f.js',
		css: ['assets/vendor-53181f56.css'],
		js: [
			'pages/music-career/birthday-2003.svelte-75b9843f.js',
			'chunks/vendor-5317cca6.js',
			'chunks/Link-89bf6b11.js',
			'chunks/store-14313536.js',
		],
		styles: [],
	},
	'src/routes/music-career/cains-feel.svelte': {
		entry: 'pages/music-career/cains-feel.svelte-d24a4648.js',
		css: ['assets/vendor-53181f56.css'],
		js: [
			'pages/music-career/cains-feel.svelte-d24a4648.js',
			'chunks/vendor-5317cca6.js',
			'chunks/Link-89bf6b11.js',
			'chunks/store-14313536.js',
		],
		styles: [],
	},
	'src/routes/music-career/you-gackt.svelte': {
		entry: 'pages/music-career/you-gackt.svelte-8325ac17.js',
		css: ['assets/vendor-53181f56.css'],
		js: [
			'pages/music-career/you-gackt.svelte-8325ac17.js',
			'chunks/vendor-5317cca6.js',
			'chunks/Link-89bf6b11.js',
			'chunks/store-14313536.js',
		],
		styles: [],
	},
	'src/routes/music-career/gacktjob.svelte': {
		entry: 'pages/music-career/gacktjob.svelte-255ec256.js',
		css: ['assets/vendor-53181f56.css'],
		js: [
			'pages/music-career/gacktjob.svelte-255ec256.js',
			'chunks/vendor-5317cca6.js',
			'chunks/store-14313536.js',
		],
		styles: [],
	},
	'src/routes/music-career/maracas.svelte': {
		entry: 'pages/music-career/maracas.svelte-6b86f66c.js',
		css: ['assets/vendor-53181f56.css'],
		js: [
			'pages/music-career/maracas.svelte-6b86f66c.js',
			'chunks/vendor-5317cca6.js',
			'chunks/Link-89bf6b11.js',
			'chunks/1996-mm-a4a68d6c.js',
			'chunks/store-14313536.js',
		],
		styles: [],
	},
	'src/routes/music-career/sqf.svelte': {
		entry: 'pages/music-career/sqf.svelte-2b1be53b.js',
		css: ['assets/vendor-53181f56.css'],
		js: [
			'pages/music-career/sqf.svelte-2b1be53b.js',
			'chunks/vendor-5317cca6.js',
			'chunks/store-14313536.js',
		],
		styles: [],
	},
	'src/routes/where-to-buy.svelte': {
		entry: 'pages/where-to-buy.svelte-49d726b9.js',
		css: ['assets/vendor-53181f56.css'],
		js: [
			'pages/where-to-buy.svelte-49d726b9.js',
			'chunks/vendor-5317cca6.js',
			'chunks/Link-89bf6b11.js',
			'chunks/store-14313536.js',
		],
		styles: [],
	},
	'src/routes/discography/index.svelte': {
		entry: 'pages/discography/index.svelte-03cc0aa4.js',
		css: ['assets/vendor-53181f56.css'],
		js: [
			'pages/discography/index.svelte-03cc0aa4.js',
			'chunks/vendor-5317cca6.js',
			'chunks/store-14313536.js',
		],
		styles: [],
	},
	'src/routes/discography/full-discography.svelte': {
		entry: 'pages/discography/full-discography.svelte-dbe170f1.js',
		css: [
			'assets/pages/discography/full-discography.svelte-55e11db3.css',
			'assets/vendor-53181f56.css',
		],
		js: [
			'pages/discography/full-discography.svelte-dbe170f1.js',
			'chunks/vendor-5317cca6.js',
			'chunks/store-14313536.js',
		],
		styles: [],
	},
	'src/routes/discography/life-short-film.svelte': {
		entry: 'pages/discography/life-short-film.svelte-f292fcdc.js',
		css: ['assets/vendor-53181f56.css'],
		js: [
			'pages/discography/life-short-film.svelte-f292fcdc.js',
			'chunks/vendor-5317cca6.js',
			'chunks/Link-89bf6b11.js',
			'chunks/store-14313536.js',
		],
		styles: [],
	},
	'src/routes/discography/nine-nine-radio.svelte': {
		entry: 'pages/discography/nine-nine-radio.svelte-e937edd3.js',
		css: ['assets/vendor-53181f56.css'],
		js: [
			'pages/discography/nine-nine-radio.svelte-e937edd3.js',
			'chunks/vendor-5317cca6.js',
			'chunks/store-14313536.js',
		],
		styles: [],
	},
	'src/routes/discography/appearances.svelte': {
		entry: 'pages/discography/appearances.svelte-f9817c47.js',
		css: ['assets/vendor-53181f56.css'],
		js: [
			'pages/discography/appearances.svelte-f9817c47.js',
			'chunks/vendor-5317cca6.js',
			'chunks/Link-89bf6b11.js',
			'chunks/store-14313536.js',
		],
		styles: [],
	},
	'src/routes/about-you/index.svelte': {
		entry: 'pages/about-you/index.svelte-65da6320.js',
		css: ['assets/vendor-53181f56.css'],
		js: [
			'pages/about-you/index.svelte-65da6320.js',
			'chunks/vendor-5317cca6.js',
			'chunks/Link-89bf6b11.js',
			'chunks/store-14313536.js',
		],
		styles: [],
	},
	'src/routes/about-you/designs.svelte': {
		entry: 'pages/about-you/designs.svelte-63e6e92e.js',
		css: ['assets/vendor-53181f56.css'],
		js: [
			'pages/about-you/designs.svelte-63e6e92e.js',
			'chunks/vendor-5317cca6.js',
			'chunks/Link-89bf6b11.js',
			'chunks/store-14313536.js',
		],
		styles: [],
	},
	'src/routes/about.svelte': {
		entry: 'pages/about.svelte-4509e062.js',
		css: [
			'assets/pages/about.svelte-91e1140c.css',
			'assets/vendor-53181f56.css',
		],
		js: ['pages/about.svelte-4509e062.js', 'chunks/vendor-5317cca6.js'],
		styles: [],
	},
	'src/routes/todos/index.svelte': {
		entry: 'pages/todos/index.svelte-4798bf2f.js',
		css: [
			'assets/pages/todos/index.svelte-6d5ca49c.css',
			'assets/vendor-53181f56.css',
		],
		js: [
			'pages/todos/index.svelte-4798bf2f.js',
			'chunks/vendor-5317cca6.js',
		],
		styles: [],
	},
	'src/routes/site/history.svelte': {
		entry: 'pages/site/history.svelte-1d5b6d1a.js',
		css: ['assets/vendor-53181f56.css'],
		js: [
			'pages/site/history.svelte-1d5b6d1a.js',
			'chunks/vendor-5317cca6.js',
			'chunks/Link-89bf6b11.js',
			'chunks/store-14313536.js',
		],
		styles: [],
	},
	'src/routes/site/updates.svelte': {
		entry: 'pages/site/updates.svelte-2f295fb1.js',
		css: [
			'assets/pages/site/updates.svelte-b9244357.css',
			'assets/vendor-53181f56.css',
		],
		js: [
			'pages/site/updates.svelte-2f295fb1.js',
			'chunks/vendor-5317cca6.js',
			'chunks/Link-89bf6b11.js',
			'chunks/store-14313536.js',
		],
		styles: [],
	},
	'src/routes/site/thanks.svelte': {
		entry: 'pages/site/thanks.svelte-186f18d7.js',
		css: ['assets/vendor-53181f56.css'],
		js: [
			'pages/site/thanks.svelte-186f18d7.js',
			'chunks/vendor-5317cca6.js',
			'chunks/store-14313536.js',
		],
		styles: [],
	},
};
async function load_component(file) {
	const { entry, css: css2, js, styles } = metadata_lookup[file];
	return {
		module: await module_lookup[file](),
		entry: assets + '/_app/' + entry,
		css: css2.map((dep) => assets + '/_app/' + dep),
		js: js.map((dep) => assets + '/_app/' + dep),
		styles,
	};
}
function render(request, { prerender: prerender2 } = {}) {
	const host = request.headers['host'];
	return respond({ ...request, host }, options, { prerender: prerender2 });
}
var base = 'https://api.svelte.dev';
async function api(request, resource, data) {
	if (!request.locals.userid) {
		return { status: 401 };
	}
	const res = await fetch(`${base}/${resource}`, {
		method: request.method,
		headers: {
			'content-type': 'application/json',
		},
		body: data && JSON.stringify(data),
	});
	if (
		res.ok &&
		request.method !== 'GET' &&
		request.headers.accept !== 'application/json'
	) {
		return {
			status: 303,
			headers: {
				location: '/todos',
			},
		};
	}
	return {
		status: res.status,
		body: await res.json(),
	};
}
var get = async (request) => {
	const response = await api(request, `todos/${request.locals.userid}`);
	if (response.status === 404) {
		return { body: [] };
	}
	return response;
};
var post = async (request) => {
	const response = await api(request, `todos/${request.locals.userid}`, {
		text: request.body.get('text'),
	});
	return response;
};
var index_json = /* @__PURE__ */ Object.freeze({
	__proto__: null,
	[Symbol.toStringTag]: 'Module',
	get,
	post,
});
var patch = async (request) => {
	return api(
		request,
		`todos/${request.locals.userid}/${request.params.uid}`,
		{
			text: request.body.get('text'),
			done: request.body.has('done')
				? !!request.body.get('done')
				: void 0,
		}
	);
};
var del = async (request) => {
	return api(request, `todos/${request.locals.userid}/${request.params.uid}`);
};
var _uid__json = /* @__PURE__ */ Object.freeze({
	__proto__: null,
	[Symbol.toStringTag]: 'Module',
	patch,
	del,
});
var browser = false;
var dev = false;
var getStores = () => {
	const stores = getContext('__svelte__');
	return {
		page: {
			subscribe: stores.page.subscribe,
		},
		navigating: {
			subscribe: stores.navigating.subscribe,
		},
		get preloading() {
			console.error(
				'stores.preloading is deprecated; use stores.navigating instead'
			);
			return {
				subscribe: stores.navigating.subscribe,
			};
		},
		session: stores.session,
	};
};
var page = {
	subscribe(fn) {
		const store = getStores().page;
		return store.subscribe(fn);
	},
};
function loader(urls, test2, callback) {
	let remaining = urls.length;
	function maybeCallback() {
		remaining = --remaining;
		if (remaining < 1) {
			callback();
		}
	}
	if (!test2()) {
		urls.forEach(
			({
				type,
				url,
				options: options2 = { async: true, defer: true },
			}) => {
				const isScript = type === 'script';
				const tag = document.createElement(
					isScript ? 'script' : 'link'
				);
				if (isScript) {
					tag.src = url;
					tag.async = options2.async;
					tag.defer = options2.defer;
				} else {
					tag.rel = 'stylesheet';
					tag.href = url;
				}
				tag.onload = maybeCallback;
				document.body.appendChild(tag);
			}
		);
	} else {
		callback();
	}
}
var subscriber_queue = [];
function writable(value, start = noop) {
	let stop;
	const subscribers = new Set();
	function set(new_value) {
		if (safe_not_equal(value, new_value)) {
			value = new_value;
			if (stop) {
				const run_queue = !subscriber_queue.length;
				for (const subscriber of subscribers) {
					subscriber[1]();
					subscriber_queue.push(subscriber, value);
				}
				if (run_queue) {
					for (let i = 0; i < subscriber_queue.length; i += 2) {
						subscriber_queue[i][0](subscriber_queue[i + 1]);
					}
					subscriber_queue.length = 0;
				}
			}
		}
	}
	function update(fn) {
		set(fn(value));
	}
	function subscribe2(run2, invalidate = noop) {
		const subscriber = [run2, invalidate];
		subscribers.add(subscriber);
		if (subscribers.size === 1) {
			stop = start(set) || noop;
		}
		run2(value);
		return () => {
			subscribers.delete(subscriber);
			if (subscribers.size === 0) {
				stop();
				stop = null;
			}
		};
	}
	return { set, update, subscribe: subscribe2 };
}
var gaStore = writable([]);
function test() {
	return (
		Boolean(window.dataLayer).valueOf() && Array.isArray(window.dataLayer)
	);
}
function gtag() {
	window.dataLayer.push(arguments);
}
var GoogleAnalytics = create_ssr_component(
	($$result, $$props, $$bindings, slots) => {
		let { properties } = $$props;
		let { configurations = {} } = $$props;
		let { enabled = true } = $$props;
		function init2() {
			const mainProperty = properties[0];
			loader(
				[
					{
						type: 'script',
						url: `//www.googletagmanager.com/gtag/js?id=${mainProperty}`,
					},
				],
				test,
				callback
			);
		}
		function callback() {
			window.dataLayer = window.dataLayer || [];
			gtag('js', new Date());
			properties.forEach((p) => {
				gtag('config', p, configurations[p] || {});
			});
			return gaStore.subscribe((queue) => {
				let next = queue.length && queue.shift();
				while (next) {
					const { event, data } = next;
					gtag('event', event, data);
					next = queue.shift();
				}
			});
		}
		if (
			$$props.properties === void 0 &&
			$$bindings.properties &&
			properties !== void 0
		)
			$$bindings.properties(properties);
		if (
			$$props.configurations === void 0 &&
			$$bindings.configurations &&
			configurations !== void 0
		)
			$$bindings.configurations(configurations);
		if (
			$$props.enabled === void 0 &&
			$$bindings.enabled &&
			enabled !== void 0
		)
			$$bindings.enabled(enabled);
		if ($$props.init === void 0 && $$bindings.init && init2 !== void 0)
			$$bindings.init(init2);
		return ``;
	}
);
var css$7 = {
	code: 'a.svelte-1jphw99.svelte-1jphw99{display:block;border-bottom-width:2px;--tw-border-opacity:1;border-color:rgb(31 41 55 / var(--tw-border-opacity));padding-top:0.25rem;padding-bottom:0.25rem;padding-left:0.25rem;vertical-align:middle;--tw-text-opacity:1;color:rgb(31 41 55 / var(--tw-text-opacity));-webkit-text-decoration-line:none;text-decoration-line:none\n}a.svelte-1jphw99.svelte-1jphw99:hover{--tw-border-opacity:1;border-color:rgb(34 197 94 / var(--tw-border-opacity));--tw-text-opacity:1;color:rgb(34 197 94 / var(--tw-text-opacity))\n}@media(min-width: 768px){a.svelte-1jphw99.svelte-1jphw99{--tw-border-opacity:1;border-color:rgb(17 24 39 / var(--tw-border-opacity))\n    }a.svelte-1jphw99.svelte-1jphw99{padding-top:0.5rem;padding-bottom:0.5rem\n    }}a.active.svelte-1jphw99.svelte-1jphw99{display:block;border-bottom-width:2px;--tw-border-opacity:1;border-color:rgb(22 163 74 / var(--tw-border-opacity));padding-top:0.25rem;padding-bottom:0.25rem;padding-left:0.25rem;vertical-align:middle;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));-webkit-text-decoration-line:none;text-decoration-line:none\n}a.active.svelte-1jphw99.svelte-1jphw99:hover{--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))\n}@media(min-width: 768px){a.active.svelte-1jphw99.svelte-1jphw99{padding-top:0.5rem;padding-bottom:0.5rem\n    }}li.svelte-1jphw99 span.svelte-1jphw99{display:block;padding-bottom:0.25rem;font-size:1.125rem;line-height:1.75rem;text-transform:lowercase;--tw-text-opacity:1;color:rgb(209 213 219 / var(--tw-text-opacity))\n}@media(min-width: 768px){li.svelte-1jphw99 span.svelte-1jphw99{--tw-text-opacity:1;color:rgb(156 163 175 / var(--tw-text-opacity))\n    }}@media(min-width: 1024px){li.svelte-1jphw99 span.svelte-1jphw99{display:inline-block\n    }li.svelte-1jphw99 span.svelte-1jphw99{padding-bottom:0px\n    }li.svelte-1jphw99 span.svelte-1jphw99{font-size:1rem;line-height:1.5rem\n    }}ul.svelte-1jphw99.svelte-1jphw99{margin-left:0px;margin-bottom:0px\n}ul.svelte-1jphw99 li.svelte-1jphw99{list-style-type:none\n}@media(min-width: 1024px){ul.svelte-1jphw99 li.svelte-1jphw99{display:inline-block\n    }ul.svelte-1jphw99 li.svelte-1jphw99{padding-right:0.75rem\n    }}',
	map: `{"version":3,"file":"NavContent.svelte","sources":["NavContent.svelte"],"sourcesContent":["<script lang=\\"ts\\">export let segment;\\n<\/script>\\n\\n<style lang=\\"postcss\\">\\n\\ta {\\n\\n    display: block;\\n\\n    border-bottom-width: 2px;\\n\\n    --tw-border-opacity: 1;\\n\\n    border-color: rgb(31 41 55 / var(--tw-border-opacity));\\n\\n    padding-top: 0.25rem;\\n\\n    padding-bottom: 0.25rem;\\n\\n    padding-left: 0.25rem;\\n\\n    vertical-align: middle;\\n\\n    --tw-text-opacity: 1;\\n\\n    color: rgb(31 41 55 / var(--tw-text-opacity));\\n\\n    -webkit-text-decoration-line: none;\\n\\n            text-decoration-line: none\\n}\\n\\na:hover {\\n\\n    --tw-border-opacity: 1;\\n\\n    border-color: rgb(34 197 94 / var(--tw-border-opacity));\\n\\n    --tw-text-opacity: 1;\\n\\n    color: rgb(34 197 94 / var(--tw-text-opacity))\\n}\\n\\n@media (min-width: 768px) {\\n\\n    a {\\n\\n        --tw-border-opacity: 1;\\n\\n        border-color: rgb(17 24 39 / var(--tw-border-opacity))\\n    }\\n\\n    a {\\n\\n        padding-top: 0.5rem;\\n\\n        padding-bottom: 0.5rem\\n    }\\n}\\n\\n\\ta.active {\\n\\n    display: block;\\n\\n    border-bottom-width: 2px;\\n\\n    --tw-border-opacity: 1;\\n\\n    border-color: rgb(22 163 74 / var(--tw-border-opacity));\\n\\n    padding-top: 0.25rem;\\n\\n    padding-bottom: 0.25rem;\\n\\n    padding-left: 0.25rem;\\n\\n    vertical-align: middle;\\n\\n    --tw-text-opacity: 1;\\n\\n    color: rgb(255 255 255 / var(--tw-text-opacity));\\n\\n    -webkit-text-decoration-line: none;\\n\\n            text-decoration-line: none\\n}\\n\\n\\ta.active:hover {\\n\\n    --tw-text-opacity: 1;\\n\\n    color: rgb(255 255 255 / var(--tw-text-opacity))\\n}\\n\\n\\t@media (min-width: 768px) {\\n\\n    a.active {\\n\\n        padding-top: 0.5rem;\\n\\n        padding-bottom: 0.5rem\\n    }\\n}\\n\\n\\tli span {\\n\\n    display: block;\\n\\n    padding-bottom: 0.25rem;\\n\\n    font-size: 1.125rem;\\n\\n    line-height: 1.75rem;\\n\\n    text-transform: lowercase;\\n\\n    --tw-text-opacity: 1;\\n\\n    color: rgb(209 213 219 / var(--tw-text-opacity))\\n}\\n\\n\\t@media (min-width: 768px) {\\n\\n    li span {\\n\\n        --tw-text-opacity: 1;\\n\\n        color: rgb(156 163 175 / var(--tw-text-opacity))\\n    }\\n}\\n\\n\\t@media (min-width: 1024px) {\\n\\n    li span {\\n\\n        display: inline-block\\n    }\\n\\n    li span {\\n\\n        padding-bottom: 0px\\n    }\\n\\n    li span {\\n\\n        font-size: 1rem;\\n\\n        line-height: 1.5rem\\n    }\\n}\\n\\n\\tul {\\n\\n    margin-left: 0px;\\n\\n    margin-bottom: 0px\\n}\\n\\n\\tul li {\\n\\n    list-style-type: none\\n}\\n\\n\\t@media (min-width: 1024px) {\\n\\n    ul li {\\n\\n        display: inline-block\\n    }\\n\\n    ul li {\\n\\n        padding-right: 0.75rem\\n    }\\n}</style>\\n\\n<nav>\\n\\t<ul>\\n\\t\\t<li>\\n\\t\\t\\t<a aria-current=\\"{segment === '/' ? 'page' : undefined}\\" class=\\"{segment === '/' ? 'active' : undefined}\\" href=\\".\\">\\n\\t\\t\\t\\t<span>Home</span>\\n\\t\\t\\t</a>\\n\\t\\t</li>\\n\\t\\t<li>\\n\\t\\t\\t<a aria-current=\\"{segment === '/about-you' ? 'page' : undefined}\\" class=\\"{segment === '/about-you' ? 'active' : undefined}\\" href=\\"/about-you\\">\\n\\t\\t\\t\\t<span>About YOU</span>\\n\\t\\t\\t</a>\\n\\t\\t</li>\\n\\t\\t<li>\\n\\t\\t\\t<a aria-current=\\"{segment === '/music-career' ? 'page' : undefined}\\" class=\\"{segment === '/music-career' ? 'active' : undefined}\\" href=\\"/music-career\\">\\n\\t\\t\\t\\t<span>Music Career</span>\\n\\t\\t\\t</a>\\n\\t\\t</li>\\n\\t\\t<li>\\n\\t\\t\\t<a aria-current=\\"{segment === '/discography' ? 'page' : undefined}\\" class=\\"{segment === '/discography' ? 'active' : undefined}\\" href=\\"/discography\\">\\n\\t\\t\\t\\t<span>Discography</span>\\n\\t\\t\\t</a>\\n\\t\\t</li>\\n\\t\\t<li>\\n\\t\\t\\t<a aria-current=\\"{segment === '/where-to-buy' ? 'page' : undefined}\\" class=\\"{segment === '/where-to-buy' ? 'active' : undefined}\\" href=\\"/where-to-buy\\">\\n\\t\\t\\t\\t<span>Where to Buy</span>\\n\\t\\t\\t</a>\\n\\t\\t</li>\\n\\t</ul>\\n</nav>\\n"],"names":[],"mappings":"AAIC,CAAC,8BAAC,CAAC,AAEA,OAAO,CAAE,KAAK,CAEd,mBAAmB,CAAE,GAAG,CAExB,mBAAmB,CAAE,CAAC,CAEtB,YAAY,CAAE,IAAI,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC,IAAI,mBAAmB,CAAC,CAAC,CAEtD,WAAW,CAAE,OAAO,CAEpB,cAAc,CAAE,OAAO,CAEvB,YAAY,CAAE,OAAO,CAErB,cAAc,CAAE,MAAM,CAEtB,iBAAiB,CAAE,CAAC,CAEpB,KAAK,CAAE,IAAI,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC,IAAI,iBAAiB,CAAC,CAAC,CAE7C,4BAA4B,CAAE,IAAI,CAE1B,oBAAoB,CAAE,IAAI;AACtC,CAAC,AAED,+BAAC,MAAM,AAAC,CAAC,AAEL,mBAAmB,CAAE,CAAC,CAEtB,YAAY,CAAE,IAAI,EAAE,CAAC,GAAG,CAAC,EAAE,CAAC,CAAC,CAAC,IAAI,mBAAmB,CAAC,CAAC,CAEvD,iBAAiB,CAAE,CAAC,CAEpB,KAAK,CAAE,IAAI,EAAE,CAAC,GAAG,CAAC,EAAE,CAAC,CAAC,CAAC,IAAI,iBAAiB,CAAC,CAAC;AAClD,CAAC,AAED,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAEvB,CAAC,8BAAC,CAAC,AAEC,mBAAmB,CAAE,CAAC,CAEtB,YAAY,CAAE,IAAI,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC,IAAI,mBAAmB,CAAC,CAAC;IAC1D,CAAC,AAED,CAAC,8BAAC,CAAC,AAEC,WAAW,CAAE,MAAM,CAEnB,cAAc,CAAE,MAAM;IAC1B,CAAC,AACL,CAAC,AAEA,CAAC,OAAO,8BAAC,CAAC,AAEP,OAAO,CAAE,KAAK,CAEd,mBAAmB,CAAE,GAAG,CAExB,mBAAmB,CAAE,CAAC,CAEtB,YAAY,CAAE,IAAI,EAAE,CAAC,GAAG,CAAC,EAAE,CAAC,CAAC,CAAC,IAAI,mBAAmB,CAAC,CAAC,CAEvD,WAAW,CAAE,OAAO,CAEpB,cAAc,CAAE,OAAO,CAEvB,YAAY,CAAE,OAAO,CAErB,cAAc,CAAE,MAAM,CAEtB,iBAAiB,CAAE,CAAC,CAEpB,KAAK,CAAE,IAAI,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,CAAC,CAAC,IAAI,iBAAiB,CAAC,CAAC,CAEhD,4BAA4B,CAAE,IAAI,CAE1B,oBAAoB,CAAE,IAAI;AACtC,CAAC,AAEA,CAAC,qCAAO,MAAM,AAAC,CAAC,AAEb,iBAAiB,CAAE,CAAC,CAEpB,KAAK,CAAE,IAAI,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,CAAC,CAAC,IAAI,iBAAiB,CAAC,CAAC;AACpD,CAAC,AAEA,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAExB,CAAC,OAAO,8BAAC,CAAC,AAEN,WAAW,CAAE,MAAM,CAEnB,cAAc,CAAE,MAAM;IAC1B,CAAC,AACL,CAAC,AAEA,iBAAE,CAAC,IAAI,eAAC,CAAC,AAEN,OAAO,CAAE,KAAK,CAEd,cAAc,CAAE,OAAO,CAEvB,SAAS,CAAE,QAAQ,CAEnB,WAAW,CAAE,OAAO,CAEpB,cAAc,CAAE,SAAS,CAEzB,iBAAiB,CAAE,CAAC,CAEpB,KAAK,CAAE,IAAI,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,CAAC,CAAC,IAAI,iBAAiB,CAAC,CAAC;AACpD,CAAC,AAEA,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAExB,iBAAE,CAAC,IAAI,eAAC,CAAC,AAEL,iBAAiB,CAAE,CAAC,CAEpB,KAAK,CAAE,IAAI,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,CAAC,CAAC,IAAI,iBAAiB,CAAC,CAAC;IACpD,CAAC,AACL,CAAC,AAEA,MAAM,AAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AAEzB,iBAAE,CAAC,IAAI,eAAC,CAAC,AAEL,OAAO,CAAE,YAAY;IACzB,CAAC,AAED,iBAAE,CAAC,IAAI,eAAC,CAAC,AAEL,cAAc,CAAE,GAAG;IACvB,CAAC,AAED,iBAAE,CAAC,IAAI,eAAC,CAAC,AAEL,SAAS,CAAE,IAAI,CAEf,WAAW,CAAE,MAAM;IACvB,CAAC,AACL,CAAC,AAEA,EAAE,8BAAC,CAAC,AAED,WAAW,CAAE,GAAG,CAEhB,aAAa,CAAE,GAAG;AACtB,CAAC,AAEA,iBAAE,CAAC,EAAE,eAAC,CAAC,AAEJ,eAAe,CAAE,IAAI;AACzB,CAAC,AAEA,MAAM,AAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AAEzB,iBAAE,CAAC,EAAE,eAAC,CAAC,AAEH,OAAO,CAAE,YAAY;IACzB,CAAC,AAED,iBAAE,CAAC,EAAE,eAAC,CAAC,AAEH,aAAa,CAAE,OAAO;IAC1B,CAAC,AACL,CAAC"}`,
};
var NavContent = create_ssr_component(
	($$result, $$props, $$bindings, slots) => {
		let { segment } = $$props;
		if (
			$$props.segment === void 0 &&
			$$bindings.segment &&
			segment !== void 0
		)
			$$bindings.segment(segment);
		$$result.css.add(css$7);
		return `<nav><ul class="${'svelte-1jphw99'}"><li class="${'svelte-1jphw99'}"><a${add_attribute(
			'aria-current',
			segment === '/' ? 'page' : void 0,
			0
		)} class="${
			escape(null_to_empty(segment === '/' ? 'active' : void 0)) +
			' svelte-1jphw99'
		}" href="${'.'}"><span class="${'svelte-1jphw99'}">Home</span></a></li>
		<li class="${'svelte-1jphw99'}"><a${add_attribute(
			'aria-current',
			segment === '/about-you' ? 'page' : void 0,
			0
		)} class="${
			escape(
				null_to_empty(segment === '/about-you' ? 'active' : void 0)
			) + ' svelte-1jphw99'
		}" href="${'/about-you'}"><span class="${'svelte-1jphw99'}">About YOU</span></a></li>
		<li class="${'svelte-1jphw99'}"><a${add_attribute(
			'aria-current',
			segment === '/music-career' ? 'page' : void 0,
			0
		)} class="${
			escape(
				null_to_empty(segment === '/music-career' ? 'active' : void 0)
			) + ' svelte-1jphw99'
		}" href="${'/music-career'}"><span class="${'svelte-1jphw99'}">Music Career</span></a></li>
		<li class="${'svelte-1jphw99'}"><a${add_attribute(
			'aria-current',
			segment === '/discography' ? 'page' : void 0,
			0
		)} class="${
			escape(
				null_to_empty(segment === '/discography' ? 'active' : void 0)
			) + ' svelte-1jphw99'
		}" href="${'/discography'}"><span class="${'svelte-1jphw99'}">Discography</span></a></li>
		<li class="${'svelte-1jphw99'}"><a${add_attribute(
			'aria-current',
			segment === '/where-to-buy' ? 'page' : void 0,
			0
		)} class="${
			escape(
				null_to_empty(segment === '/where-to-buy' ? 'active' : void 0)
			) + ' svelte-1jphw99'
		}" href="${'/where-to-buy'}"><span class="${'svelte-1jphw99'}">Where to Buy</span></a></li></ul></nav>`;
	}
);
var Nav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $page, $$unsubscribe_page;
	$$unsubscribe_page = subscribe(page, (value) => ($page = value));
	let { segment = $page.path } = $$props;
	if ($$props.segment === void 0 && $$bindings.segment && segment !== void 0)
		$$bindings.segment(segment);
	$$unsubscribe_page();
	return `<div class="${'hidden lg:block lg:w-3/5 relative top-20'}">${validate_component(
		NavContent,
		'NavContent'
	).$$render($$result, { segment }, {}, {})}</div>

<div class="${'block lg:hidden'}"><button class="${'fixed top-4 right-4 z-40 px-3 py-2 border rounded text-gray-200 bg-gray-800 border-gray-400 hover:text-gray-300 hover:border-gray-600'}"><svg class="${'fill-current h-3 w-3'}" viewBox="${'0 0 20 20'}" xmlns="${'http://www.w3.org/2000/svg'}"><title>Menu</title><path d="${'M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z'}"></path></svg></button></div>`;
});
var NavMobile = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { segment } = $$props;
	if ($$props.segment === void 0 && $$bindings.segment && segment !== void 0)
		$$bindings.segment(segment);
	return `<div id="${'navMobile'}" class="${'fixed w-0 h-full z-50 overflow-x-hidden bg-gray-800 bg-opacity-95'}"><div class="${'flex flex-wrap flex-col content-end px-6 my-4'}"><button class="${'flex-1 p-0 text-white text-5xl'}">\xD7</button></div>

    <div class="${'overlay-content mt-6 px-6'}">${validate_component(
		NavContent,
		'NavContent'
	).$$render($$result, { segment }, {}, {})}</div></div>`;
});
var Link = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $$restProps = compute_rest_props($$props, [
		'href',
		'disabled',
		'outbound',
		'target',
		'rel',
		'download',
	]);
	let { href = 'javascript:void(0);' } = $$props;
	let { disabled = false } = $$props;
	let { outbound = void 0 } = $$props;
	let { target = void 0 } = $$props;
	let { rel = void 0 } = $$props;
	let { download = void 0 } = $$props;
	if ($$props.href === void 0 && $$bindings.href && href !== void 0)
		$$bindings.href(href);
	if (
		$$props.disabled === void 0 &&
		$$bindings.disabled &&
		disabled !== void 0
	)
		$$bindings.disabled(disabled);
	if (
		$$props.outbound === void 0 &&
		$$bindings.outbound &&
		outbound !== void 0
	)
		$$bindings.outbound(outbound);
	if ($$props.target === void 0 && $$bindings.target && target !== void 0)
		$$bindings.target(target);
	if ($$props.rel === void 0 && $$bindings.rel && rel !== void 0)
		$$bindings.rel(rel);
	if (
		$$props.download === void 0 &&
		$$bindings.download &&
		download !== void 0
	)
		$$bindings.download(download);
	{
		if (typeof window !== 'undefined') {
			const isExternal =
				new URL(href, `${location.protocol}//${location.host}`).host !==
				location.host;
			if (isExternal && outbound === void 0) {
				outbound = true;
			}
		}
	}
	{
		if (outbound) {
			target = '_blank';
			if (rel === void 0) rel = 'noopener noreferrer';
		}
	}
	return `${
		disabled
			? `<span${spread([escape_object($$restProps)])}>${
					slots.default ? slots.default({}) : ``
			  }</span>`
			: `<a${spread([
					escape_object($$restProps),
					{ href: escape_attribute_value(href) },
					{ target: escape_attribute_value(target) },
					{ rel: escape_attribute_value(rel) },
					{
						download: escape_attribute_value(download),
					},
			  ])}>${slots.default ? slots.default({}) : ``}</a>`
	}`;
});
var css$6 = {
	code: '.wrapper.svelte-pj5vj2{display:inline-block}',
	map: `{"version":3,"file":"Waypoint.svelte","sources":["Waypoint.svelte"],"sourcesContent":["<script>\\n  import { createEventDispatcher, onDestroy } from 'svelte';\\n\\n  const dispatch = createEventDispatcher();\\n\\n  export let offset = 0;\\n  export let throttle = 250;\\n  export let c = '';\\n  export let style = '';\\n  export let once = true;\\n  export let threshold = 1.0;\\n  export let disabled = false;\\n\\n  let className = \\"\\";\\n  export { className as class };\\n\\n  let visible = disabled;\\n  let wasVisible = false;\\n  let intersecting = false;\\n  let removeHandlers = () => {};\\n\\n  function throttleFn(fn, time) {\\n    let last, deferTimer;\\n\\n    return () => {\\n      const now = +new Date;\\n\\n      if (last && now < last + time) {\\n        // hold on to it\\n        clearTimeout(deferTimer);\\n        deferTimer = setTimeout(function () {\\n          last = now;\\n          fn();\\n        }, time);\\n      } else {\\n        last = now;\\n        fn();\\n      }\\n    };\\n  }\\n\\n  function callEvents(wasVisible, observer, node) {\\n    if (visible && !wasVisible) {\\n      dispatch('enter');\\n      return;\\n    }\\n\\n    if (wasVisible && !intersecting) {\\n      dispatch('leave');\\n    }\\n\\n    if (once && wasVisible && !intersecting) {\\n      removeHandlers();\\n    }\\n  }\\n\\n  function waypoint(node) {\\n    if (!window || disabled) return;\\n\\n    if (window.IntersectionObserver && window.IntersectionObserverEntry) {\\n      const observer = new IntersectionObserver(([ { isIntersecting } ]) => {\\n        wasVisible = visible;\\n\\n        intersecting = isIntersecting;\\n\\n        if (wasVisible && once && !isIntersecting) {\\n          callEvents(wasVisible, observer, node);\\n          return;\\n        }\\n\\n        visible = isIntersecting;\\n\\n        callEvents(wasVisible, observer, node);\\n      }, {\\n        rootMargin: offset + 'px',\\n        threshold,\\n      });\\n\\n      observer.observe(node);\\n\\n      removeHandlers = () => observer.unobserve(node);\\n\\n      return removeHandlers;\\n    }\\n\\n    function checkIsVisible() {\\n      // Kudos https://github.com/twobin/react-lazyload/blob/master/src/index.jsx#L93\\n      if (!(node.offsetWidth || node.offsetHeight || node.getClientRects().length)) return;\\n\\n      let top;\\n      let height;\\n\\n      try {\\n        ({ top, height } = node.getBoundingClientRect());\\n      } catch (e) {\\n        ({ top, height } = defaultBoundingClientRect);\\n      }\\n\\n      const windowInnerHeight = window.innerHeight\\n        || document.documentElement.clientHeight;\\n\\n      wasVisible = visible;\\n      intersecting = (top - offset <= windowInnerHeight) &&\\n        (top + height + offset >= 0);\\n\\n      if (wasVisible && once && !isIntersecting) {\\n        callEvents(wasVisible, observer, node);\\n        return;\\n      }\\n\\n      visible = intersecting;\\n\\n      callEvents(wasVisible);\\n    }\\n\\n    checkIsVisible();\\n\\n    const throttled = throttleFn(checkIsVisible, throttle);\\n\\n    window.addEventListener('scroll', throttled);\\n    window.addEventListener('resize', throttled);\\n\\n    removeHandlers = () => {\\n      window.removeEventListener('scroll', throttled);\\n      window.removeEventListener('resize', throttled);\\n    }\\n\\n    return removeHandlers;\\n  }\\n<\/script>\\n\\n<style>\\n.wrapper {\\n  display: inline-block;\\n}</style>\\n\\n<div class=\\"wrapper {className} {c}\\" {style} use:waypoint>\\n  {#if visible}\\n    <slot />\\n  {/if}\\n</div>\\n"],"names":[],"mappings":"AAoIA,QAAQ,cAAC,CAAC,AACR,OAAO,CAAE,YAAY,AACvB,CAAC"}`,
};
var Waypoint = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	createEventDispatcher();
	let { offset = 0 } = $$props;
	let { throttle = 250 } = $$props;
	let { c = '' } = $$props;
	let { style = '' } = $$props;
	let { once = true } = $$props;
	let { threshold = 1 } = $$props;
	let { disabled = false } = $$props;
	let { class: className = '' } = $$props;
	let visible = disabled;
	if ($$props.offset === void 0 && $$bindings.offset && offset !== void 0)
		$$bindings.offset(offset);
	if (
		$$props.throttle === void 0 &&
		$$bindings.throttle &&
		throttle !== void 0
	)
		$$bindings.throttle(throttle);
	if ($$props.c === void 0 && $$bindings.c && c !== void 0) $$bindings.c(c);
	if ($$props.style === void 0 && $$bindings.style && style !== void 0)
		$$bindings.style(style);
	if ($$props.once === void 0 && $$bindings.once && once !== void 0)
		$$bindings.once(once);
	if (
		$$props.threshold === void 0 &&
		$$bindings.threshold &&
		threshold !== void 0
	)
		$$bindings.threshold(threshold);
	if (
		$$props.disabled === void 0 &&
		$$bindings.disabled &&
		disabled !== void 0
	)
		$$bindings.disabled(disabled);
	if ($$props.class === void 0 && $$bindings.class && className !== void 0)
		$$bindings.class(className);
	$$result.css.add(css$6);
	return `<div class="${
		'wrapper ' + escape(className) + ' ' + escape(c) + ' svelte-pj5vj2'
	}"${add_attribute('style', style, 0)}>${
		visible ? `${slots.default ? slots.default({}) : ``}` : ``
	}</div>`;
});
var css$5 = {
	code: 'img.svelte-uco8jw.svelte-uco8jw,canvas.svelte-uco8jw.svelte-uco8jw{-o-object-position:center;object-position:center;position:absolute;top:0;left:0;width:100%;will-change:opacity}.blur.svelte-uco8jw.svelte-uco8jw{-webkit-filter:blur(15px);filter:blur(15px);transition:opacity 1200ms}.placeholder.svelte-uco8jw.svelte-uco8jw{opacity:1;width:100%;height:100%;transition:opacity 1200ms ease-out;transition-delay:0.4s}.main.svelte-uco8jw.svelte-uco8jw{opacity:0;transition:opacity 1200ms ease-out;transition-delay:0.4s}.loaded.svelte-uco8jw .placeholder.svelte-uco8jw{opacity:0}.loaded.svelte-uco8jw .main.svelte-uco8jw{opacity:1}',
	map: `{"version":3,"file":"Image.svelte","sources":["Image.svelte"],"sourcesContent":["<script>\\n  import { decode } from 'blurhash';\\n  import Waypoint from \\"svelte-waypoint\\";\\n\\n  export let c = \\"\\"; // deprecated\\n  export let alt = \\"\\";\\n  export let width = null;\\n  export let height = null;\\n  export let src = \\"\\";\\n  export let srcset = \\"\\";\\n  export let srcsetWebp = \\"\\";\\n  export let ratio = \\"100%\\";\\n  export let blur = true;\\n  export let sizes = \\"(max-width: 1000px) 100vw, 1000px\\";\\n  export let offset = 0;\\n  export let threshold = 1.0;\\n  export let lazy = true;\\n  export let wrapperClass = \\"\\";\\n  export let placeholderClass = \\"\\";\\n  export let blurhash = null;\\n  export let blurhashSize = null;\\n\\n  let className = \\"\\";\\n  export { className as class };\\n\\n  let loaded = !lazy;\\n\\n  function load(img) {\\n    img.onload = () => (loaded = true);\\n  }\\n\\n  function decodeBlurhash(canvas) {\\n    const pixels = decode(blurhash, blurhashSize.width, blurhashSize.height);\\n    const ctx = canvas.getContext('2d');\\n    const imageData = ctx.createImageData(blurhashSize.width, blurhashSize.height);\\n    imageData.data.set(pixels);\\n    ctx.putImageData(imageData, 0, 0);\\n  }\\n<\/script>\\n\\n<style>\\n  img, canvas {\\n    -o-object-position: center;\\n       object-position: center;\\n    position: absolute;\\n    top: 0;\\n    left: 0;\\n    width: 100%;\\n    will-change: opacity;\\n  }\\n\\n  .blur {\\n    -webkit-filter: blur(15px);\\n            filter: blur(15px);\\n    transition: opacity 1200ms;\\n  }\\n\\n  .placeholder {\\n    opacity: 1;\\n    width: 100%;\\n    height: 100%;\\n    transition: opacity 1200ms ease-out;\\n    transition-delay: 0.4s;\\n  }\\n\\n  .main {\\n    opacity: 0;\\n    transition: opacity 1200ms ease-out;\\n    transition-delay: 0.4s;\\n  }\\n\\n  .loaded .placeholder {\\n    opacity: 0;\\n  }\\n\\n  .loaded .main {\\n    opacity: 1;\\n  }</style>\\n\\n<Waypoint\\n  class=\\"{wrapperClass}\\"\\n  style=\\"min-height: 100px; width: 100%;\\"\\n  once\\n  {threshold}\\n  {offset}\\n  disabled=\\"{!lazy}\\"\\n>  \\n  <div class:loaded style=\\"position: relative; width: 100%;\\">\\n    <div style=\\"position: relative; overflow: hidden;\\">\\n      <div style=\\"width:100%;padding-bottom:{ratio};\\"></div>\\n      {#if blurhash}\\n        <canvas class=\\"placeholder\\" use:decodeBlurhash width={blurhashSize.width} height={blurhashSize.height} />\\n      {:else}\\n        <img class=\\"placeholder {placeholderClass}\\" class:blur {src} {alt} />\\n      {/if}\\n      <picture>\\n        <source type=\\"image/webp\\" srcset=\\"{srcsetWebp}\\" {sizes} />\\n        <source {srcset} {sizes} />\\n        <img\\n          {src}\\n          use:load\\n          class=\\"main {c} {className}\\"\\n          {alt}\\n          {width}\\n          {height}\\n        />\\n      </picture>\\n    </div>\\n  </div>\\n</Waypoint>\\n"],"names":[],"mappings":"AAyCE,+BAAG,CAAE,MAAM,4BAAC,CAAC,AACX,kBAAkB,CAAE,MAAM,CACvB,eAAe,CAAE,MAAM,CAC1B,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,IAAI,CACX,WAAW,CAAE,OAAO,AACtB,CAAC,AAED,KAAK,4BAAC,CAAC,AACL,cAAc,CAAE,KAAK,IAAI,CAAC,CAClB,MAAM,CAAE,KAAK,IAAI,CAAC,CAC1B,UAAU,CAAE,OAAO,CAAC,MAAM,AAC5B,CAAC,AAED,YAAY,4BAAC,CAAC,AACZ,OAAO,CAAE,CAAC,CACV,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,OAAO,CAAC,MAAM,CAAC,QAAQ,CACnC,gBAAgB,CAAE,IAAI,AACxB,CAAC,AAED,KAAK,4BAAC,CAAC,AACL,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,OAAO,CAAC,MAAM,CAAC,QAAQ,CACnC,gBAAgB,CAAE,IAAI,AACxB,CAAC,AAED,qBAAO,CAAC,YAAY,cAAC,CAAC,AACpB,OAAO,CAAE,CAAC,AACZ,CAAC,AAED,qBAAO,CAAC,KAAK,cAAC,CAAC,AACb,OAAO,CAAE,CAAC,AACZ,CAAC"}`,
};
var Image = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { c = '' } = $$props;
	let { alt = '' } = $$props;
	let { width = null } = $$props;
	let { height = null } = $$props;
	let { src: src2 = '' } = $$props;
	let { srcset = '' } = $$props;
	let { srcsetWebp = '' } = $$props;
	let { ratio = '100%' } = $$props;
	let { blur = true } = $$props;
	let { sizes = '(max-width: 1000px) 100vw, 1000px' } = $$props;
	let { offset = 0 } = $$props;
	let { threshold = 1 } = $$props;
	let { lazy = true } = $$props;
	let { wrapperClass = '' } = $$props;
	let { placeholderClass = '' } = $$props;
	let { blurhash = null } = $$props;
	let { blurhashSize = null } = $$props;
	let { class: className = '' } = $$props;
	let loaded = !lazy;
	if ($$props.c === void 0 && $$bindings.c && c !== void 0) $$bindings.c(c);
	if ($$props.alt === void 0 && $$bindings.alt && alt !== void 0)
		$$bindings.alt(alt);
	if ($$props.width === void 0 && $$bindings.width && width !== void 0)
		$$bindings.width(width);
	if ($$props.height === void 0 && $$bindings.height && height !== void 0)
		$$bindings.height(height);
	if ($$props.src === void 0 && $$bindings.src && src2 !== void 0)
		$$bindings.src(src2);
	if ($$props.srcset === void 0 && $$bindings.srcset && srcset !== void 0)
		$$bindings.srcset(srcset);
	if (
		$$props.srcsetWebp === void 0 &&
		$$bindings.srcsetWebp &&
		srcsetWebp !== void 0
	)
		$$bindings.srcsetWebp(srcsetWebp);
	if ($$props.ratio === void 0 && $$bindings.ratio && ratio !== void 0)
		$$bindings.ratio(ratio);
	if ($$props.blur === void 0 && $$bindings.blur && blur !== void 0)
		$$bindings.blur(blur);
	if ($$props.sizes === void 0 && $$bindings.sizes && sizes !== void 0)
		$$bindings.sizes(sizes);
	if ($$props.offset === void 0 && $$bindings.offset && offset !== void 0)
		$$bindings.offset(offset);
	if (
		$$props.threshold === void 0 &&
		$$bindings.threshold &&
		threshold !== void 0
	)
		$$bindings.threshold(threshold);
	if ($$props.lazy === void 0 && $$bindings.lazy && lazy !== void 0)
		$$bindings.lazy(lazy);
	if (
		$$props.wrapperClass === void 0 &&
		$$bindings.wrapperClass &&
		wrapperClass !== void 0
	)
		$$bindings.wrapperClass(wrapperClass);
	if (
		$$props.placeholderClass === void 0 &&
		$$bindings.placeholderClass &&
		placeholderClass !== void 0
	)
		$$bindings.placeholderClass(placeholderClass);
	if (
		$$props.blurhash === void 0 &&
		$$bindings.blurhash &&
		blurhash !== void 0
	)
		$$bindings.blurhash(blurhash);
	if (
		$$props.blurhashSize === void 0 &&
		$$bindings.blurhashSize &&
		blurhashSize !== void 0
	)
		$$bindings.blurhashSize(blurhashSize);
	if ($$props.class === void 0 && $$bindings.class && className !== void 0)
		$$bindings.class(className);
	$$result.css.add(css$5);
	return `${validate_component(Waypoint, 'Waypoint').$$render(
		$$result,
		{
			class: wrapperClass,
			style: 'min-height: 100px; width: 100%;',
			once: true,
			threshold,
			offset,
			disabled: !lazy,
		},
		{},
		{
			default:
				() => `<div style="${'position: relative; width: 100%;'}" class="${[
					'svelte-uco8jw',
					loaded ? 'loaded' : '',
				]
					.join(' ')
					.trim()}"><div style="${'position: relative; overflow: hidden;'}"><div style="${
					'width:100%;padding-bottom:' + escape(ratio) + ';'
				}"></div>
      ${
			blurhash
				? `<canvas class="${'placeholder svelte-uco8jw'}"${add_attribute(
						'width',
						blurhashSize.width,
						0
				  )}${add_attribute(
						'height',
						blurhashSize.height,
						0
				  )}></canvas>`
				: `<img class="${[
						'placeholder ' +
							escape(placeholderClass) +
							' svelte-uco8jw',
						blur ? 'blur' : '',
				  ]
						.join(' ')
						.trim()}"${add_attribute(
						'src',
						src2,
						0
				  )}${add_attribute('alt', alt, 0)}>`
		}
      <picture><source type="${'image/webp'}"${add_attribute(
					'srcset',
					srcsetWebp,
					0
				)}${add_attribute('sizes', sizes, 0)}>
        <source${add_attribute('srcset', srcset, 0)}${add_attribute(
					'sizes',
					sizes,
					0
				)}>
        <img${add_attribute('src', src2, 0)} class="${
					'main ' +
					escape(c) +
					' ' +
					escape(className) +
					' svelte-uco8jw'
				}"${add_attribute('alt', alt, 0)}${add_attribute(
					'width',
					width,
					0
				)}${add_attribute('height', height, 0)}></picture></div></div>`,
		}
	)}`;
});
var bg = '/_app/assets/bg02-83df7930.jpg';
var you01 = '/_app/assets/you01-4884627a.jpg';
var you02 = '/_app/assets/you02-327a01f0.jpg';
var you03 = '/_app/assets/you03-dc335947.jpg';
var you04 = '/_app/assets/you04-af2adb53.jpg';
var you05 = '/_app/assets/you05-467bd2c7.jpg';
var you06 = '/_app/assets/you06-bd5e51be.jpg';
var you07 = '/_app/assets/you07-2fe86a76.jpg';
var you08 = '/_app/assets/you08-1aea5d73.jpg';
var you09 = '/_app/assets/you09-7a3181ed.jpg';
var you10 = '/_app/assets/you10-cbdaa2b8.jpg';
var you11 = '/_app/assets/you11-2d304ea7.jpg';
var you12 = '/_app/assets/you12-1f61a4c0.jpg';
var you13 = '/_app/assets/you13-4380939e.jpg';
var you14 = '/_app/assets/you14-483e0b49.jpg';
var you15 = '/_app/assets/you15-cece2640.jpg';
var you16 = '/_app/assets/you16-a133c18c.jpg';
var css$4 = {
	code: '@media(min-width: 1024px){.image-rotation.svelte-1pidex7 figure.svelte-1pidex7{height:500px}}',
	map: `{"version":3,"file":"__layout.svelte","sources":["__layout.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { dev } from '$app/env';\\nimport { page } from '$app/stores';\\nimport { onMount } from 'svelte';\\nimport { GoogleAnalytics } from '@beyonk/svelte-google-analytics';\\nimport Nav from '$lib/Nav.svelte';\\nimport NavMobile from '$lib/NavMobile.svelte';\\nimport Link from '$lib/Link.svelte';\\nimport Image from \\"svelte-image\\";\\nimport '../styles/tailwind-output.css';\\nimport '../app.css';\\nimport bg from '$lib/images/bg02.jpg';\\nimport you01 from '$lib/images/image-rotation/you01.jpg';\\nimport you02 from '$lib/images/image-rotation/you02.jpg';\\nimport you03 from '$lib/images/image-rotation/you03.jpg';\\nimport you04 from '$lib/images/image-rotation/you04.jpg';\\nimport you05 from '$lib/images/image-rotation/you05.jpg';\\nimport you06 from '$lib/images/image-rotation/you06.jpg';\\nimport you07 from '$lib/images/image-rotation/you07.jpg';\\nimport you08 from '$lib/images/image-rotation/you08.jpg';\\nimport you09 from '$lib/images/image-rotation/you09.jpg';\\nimport you10 from '$lib/images/image-rotation/you10.jpg';\\nimport you11 from '$lib/images/image-rotation/you11.jpg';\\nimport you12 from '$lib/images/image-rotation/you12.jpg';\\nimport you13 from '$lib/images/image-rotation/you13.jpg';\\nimport you14 from '$lib/images/image-rotation/you14.jpg';\\nimport you15 from '$lib/images/image-rotation/you15.jpg';\\nimport you16 from '$lib/images/image-rotation/you16.jpg';\\nlet mainImage = you01;\\nlet mainContent;\\nfunction randomYouImage() {\\n    const youPics = [\\n        you01, you02, you03, you04, you05, you06, you07, you08,\\n        you09, you10, you11, you12, you13, you14, you15, you16\\n    ];\\n    const randomNum = Math.floor(Math.random() * youPics.length);\\n    return youPics[randomNum];\\n}\\nonMount(() => {\\n    mainContent = document.querySelector('.main-content');\\n});\\npage.subscribe(({ path, params, query }) => {\\n    mainImage = randomYouImage();\\n    if (mainContent)\\n        mainContent.scrollTop = 0;\\n});\\nexport let segment;\\n<\/script>\\n\\n<style>\\t\\n\\t@media (min-width: 1024px) {\\n\\t\\t.image-rotation figure {\\n\\t\\t\\theight: 500px;\\n\\t\\t}\\n\\t}</style>\\n\\n{#if !dev}\\n\\t<GoogleAnalytics properties={[ 'G-WN3BJ9W3N5' ]} />\\n{/if}\\n\\n<NavMobile {segment} />\\n\\n<div class=\\"font-sans antialiased text-gray-900 leading-normal tracking-wider bg-cover\\" style=\\"background-image:url({bg});\\">\\n\\t<div class=\\"max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto py-32 px-6 lg:px-0 lg:my-0\\">\\n\\n\\t\\t<Nav {segment} />\\n\\n\\t\\t<div class=\\"main-content w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 lg:mx-0 lg:h-4/6 lg:overflow-y-scroll\\">\\n\\t\\t\\t<div class=\\"p-4 md:p-6\\">\\n\\t\\t\\t\\t<div class=\\"block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-top\\" style=\\"background-image: url({mainImage})\\"></div>\\n\\n\\t\\t\\t\\t<h1 class=\\"text-3xl font-bold pt-8 lg:pt-0 text-center lg:text-left\\">Forget-me-not: a You fansite</h1>\\n\\t\\t\\t\\t<div class=\\"mx-auto lg:mx-0 w-4/5 my-3 border-b-2 border-green-500 opacity-25\\"></div>\\n\\t\\t\\t\\t\\n\\t\\t\\t\\t<slot></slot>\\n\\n\\t\\t\\t\\t<div class=\\"pt-4\\">\\n\\t\\t\\t\\t\\t<p class=\\"italic text-xs text-center lg:text-left\\">\\n\\t\\t\\t\\t\\t\\t&copy; 2004-2021<br>\\n\\t\\t\\t\\t\\t\\t<Link href=\\"https://sekai.co.uk\\" class=\\"no-underline\\">Contact webmaster</Link> &bullet; <Link href=\\"https://github.com/mikachan/forget-me-not\\" class=\\"no-underline\\">View on GitHub</Link>\\n\\t\\t\\t\\t\\t</p>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\n\\t\\t<div class=\\"image-rotation w-full lg:w-2/5\\">\\n\\t\\t\\t<figure class=\\"hidden lg:block\\">\\n\\t\\t\\t\\t<Image src=\\"{mainImage}\\" alt=\\"You\\" class=\\"rounded-none lg:rounded-lg shadow-2xl\\" ratio=\\"141%\\" placeholderClass=\\"rounded-none lg:rounded-lg\\" />\\n\\t\\t\\t</figure>\\n\\t\\t</div>\\n\\t</div>\\n</div>"],"names":[],"mappings":"AAiDC,MAAM,AAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AAC3B,8BAAe,CAAC,MAAM,eAAC,CAAC,AACvB,MAAM,CAAE,KAAK,AACd,CAAC,AACF,CAAC"}`,
};
var _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let mainImage = you01;
	function randomYouImage() {
		const youPics = [
			you01,
			you02,
			you03,
			you04,
			you05,
			you06,
			you07,
			you08,
			you09,
			you10,
			you11,
			you12,
			you13,
			you14,
			you15,
			you16,
		];
		const randomNum = Math.floor(Math.random() * youPics.length);
		return youPics[randomNum];
	}
	page.subscribe(({ path, params, query }) => {
		mainImage = randomYouImage();
	});
	let { segment } = $$props;
	if ($$props.segment === void 0 && $$bindings.segment && segment !== void 0)
		$$bindings.segment(segment);
	$$result.css.add(css$4);
	return `${`${validate_component(
		GoogleAnalytics,
		'GoogleAnalytics'
	).$$render($$result, { properties: ['G-WN3BJ9W3N5'] }, {}, {})}`}

${validate_component(NavMobile, 'NavMobile').$$render(
	$$result,
	{ segment },
	{},
	{}
)}

<div class="${'font-sans antialiased text-gray-900 leading-normal tracking-wider bg-cover'}" style="${
		'background-image:url(' + escape(bg) + ');'
	}"><div class="${'max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto py-32 px-6 lg:px-0 lg:my-0'}">${validate_component(
		Nav,
		'Nav'
	).$$render($$result, { segment }, {}, {})}

		<div class="${'main-content w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 lg:mx-0 lg:h-4/6 lg:overflow-y-scroll'}"><div class="${'p-4 md:p-6'}"><div class="${'block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-top'}" style="${
		'background-image: url(' + escape(mainImage) + ')'
	}"></div>

				<h1 class="${'text-3xl font-bold pt-8 lg:pt-0 text-center lg:text-left'}">Forget-me-not: a You fansite</h1>
				<div class="${'mx-auto lg:mx-0 w-4/5 my-3 border-b-2 border-green-500 opacity-25'}"></div>
				
				${slots.default ? slots.default({}) : ``}

				<div class="${'pt-4'}"><p class="${'italic text-xs text-center lg:text-left'}">\xA9 2004-2021<br>
						${validate_component(Link, 'Link').$$render(
							$$result,
							{
								href: 'https://sekai.co.uk',
								class: 'no-underline',
							},
							{},
							{ default: () => `Contact webmaster` }
						)} \u2022 ${validate_component(Link, 'Link').$$render(
		$$result,
		{
			href: 'https://github.com/mikachan/forget-me-not',
			class: 'no-underline',
		},
		{},
		{ default: () => `View on GitHub` }
	)}</p></div></div></div>

		<div class="${'image-rotation w-full lg:w-2/5 svelte-1pidex7'}"><figure class="${'hidden lg:block svelte-1pidex7'}">${validate_component(
		Image,
		'Image'
	).$$render(
		$$result,
		{
			src: mainImage,
			alt: 'You',
			class: 'rounded-none lg:rounded-lg shadow-2xl',
			ratio: '141%',
			placeholderClass: 'rounded-none lg:rounded-lg',
		},
		{},
		{}
	)}</figure></div></div></div>`;
});
var __layout = /* @__PURE__ */ Object.freeze({
	__proto__: null,
	[Symbol.toStringTag]: 'Module',
	default: _layout,
});
function load$1({ error: error2, status }) {
	return { props: { error: error2, status } };
}
var Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { status } = $$props;
	let { error: error2 } = $$props;
	if ($$props.status === void 0 && $$bindings.status && status !== void 0)
		$$bindings.status(status);
	if ($$props.error === void 0 && $$bindings.error && error2 !== void 0)
		$$bindings.error(error2);
	return `<h1>${escape(status)}</h1>

<pre>${escape(error2.message)}</pre>



${error2.frame ? `<pre>${escape(error2.frame)}</pre>` : ``}
${error2.stack ? `<pre>${escape(error2.stack)}</pre>` : ``}`;
});
var error = /* @__PURE__ */ Object.freeze({
	__proto__: null,
	[Symbol.toStringTag]: 'Module',
	default: Error$1,
	load: load$1,
});
var Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	return `${
		(($$result.head += `${
			(($$result.title = `<title>Forget-me-not | You fansite</title>`),
			'')
		}`),
		'')
	}

<p>Welcome to <strong>Forget-me-not</strong>, an <a href="${'site/history'}">English fansite</a> dedicated to the Japanese musician, <strong>You</strong>, best known for playing guitar and violin for ${validate_component(
		Link,
		'Link'
	).$$render(
		$$result,
		{ href: 'https://gackt.com/' },
		{},
		{ default: () => `Gackt` }
	)} and ${validate_component(Link, 'Link').$$render(
		$$result,
		{ href: 'http://www.sqf.jp/' },
		{},
		{ default: () => `S.Q.F` }
	)}.</p>

<h2>Latest Site Updates <a href="${'site/updates'}" class="${'text-sm'}">read more\xA0\u2192</a></h2>

<p><strong>18.05.21</strong><br>
	Luscious have announced they&#39;re going to be doing another live performance on June 17th! It&#39;ll be at Club Phase Takadanobaba in Tokyo, and will be streamed on ${validate_component(
		Link,
		'Link'
	).$$render(
		$$result,
		{
			href: 'https://twitcasting.tv/chachamaru_yfcz',
		},
		{},
		{ default: () => `TwitCasting` }
	)} again. For full details, see ${validate_component(Link, 'Link').$$render(
		$$result,
		{
			href: 'https://twitter.com/CHACHAMARU_YFCz/status/1394626299394625538',
		},
		{},
		{ default: () => `Chacha&#39;s Twitter` }
	)}.
</p>`;
});
var index$4 = /* @__PURE__ */ Object.freeze({
	__proto__: null,
	[Symbol.toStringTag]: 'Module',
	default: Routes,
});
var cainsFeel$1 = '/_app/assets/cainsfeel03-43c603bc.jpeg';
var maracas$1 = '/_app/assets/1996-mm-8e4498df.jpeg';
var gacktjob$1 = '/_app/assets/gacktjob01-2581c105.jpg';
var yfc = '/_app/assets/yfc01-1ad66621.jpg';
var sqf$1 = '/_app/assets/sqf04-bbd987eb.jpg';
var luscious = '/_app/assets/luscious03-42261a8b.jpeg';
function createTitle() {
	const { subscribe: subscribe2, set, update } = writable('');
	return {
		subscribe: subscribe2,
		set: (value) => {
			set(`${value} \u2022 Forget-me-not: a You fansite`);
		},
		clear: () => {
			set('Forget-me-not: a You fansite');
		},
	};
}
var title = createTitle();
var Music_career = create_ssr_component(
	($$result, $$props, $$bindings, slots) => {
		let $title, $$unsubscribe_title;
		$$unsubscribe_title = subscribe(title, (value) => ($title = value));
		let { pageTitle = 'Music Career' } = $$props;
		title.set(pageTitle);
		if (
			$$props.pageTitle === void 0 &&
			$$bindings.pageTitle &&
			pageTitle !== void 0
		)
			$$bindings.pageTitle(pageTitle);
		$$unsubscribe_title();
		return `${
			(($$result.head += `${
				(($$result.title = `<title>${escape($title)}</title>`), '')
			}`),
			'')
		}

<h2>${escape(pageTitle)}</h2>

<p>You&#39;s best known for playing the guitar and violin, and can also play piano, drums and shamisen. At live shows he usually plays rhythm guitar, violin and sometimes backing vocals.</p>

<p>You also writes music, including a song for Chachamaru&#39;s album <em>Air</em>; several songs for Yellow Fried Chickenz first album; a song for Pokota&#39;s album <em>Lady Imagination</em>; and several songs for S.Q.F. See his <a href="${'/discography/full-discography'}">full discography here</a>.</p>

<h3>Pre-1989</h3>

<p>You&#39;s first band was a cover band that he formed in high school. They used to practice in the evenings either at home or at small studios in Kyoto. Shortly after graduating he became a guitarist and writer for another band who frequently performed at small venues around Kyoto.</p>

<p>He was also really into motorbikes when he was younger and I believe he managed a bike shop with a friend around this time.</p>
	
<p>In 1989, he met Gackt at the studio his band were using, and eventually they became good friends and decided to start a band together.</p>

<p>Read more about <a href="${'/music-career/you-gackt'}">You &amp; Gackt here</a>.</p>

<h3>CAINS:FEEL (1989/93-1995) <a href="${'/music-career/cains-feel'}" class="${'text-sm'}">read more\xA0\u2192</a></h3>

<figure>${validate_component(Image, 'Image').$$render(
			$$result,
			{
				alt: 'CAINS:FEEL',
				class: 'pb-4 mx-auto',
				src: cainsFeel$1,
				ratio: '45%',
			},
			{},
			{}
		)}</figure>

<p>CAINS:FEEL was an indie Japanese visual kei (rock/goth) band, formed by You and Gackt, and was their first band together.</p>

<p>The majority of songs were written by Gackt and You together at You&#39;s house. Gackt used to go round in the afternoon and they would stay up writing until 7am.</p>

<h3>Maracas (1996) <a href="${'/music-career/maracas'}" class="${'text-sm'}">read more\xA0\u2192</a></h3>

<figure>${validate_component(Image, 'Image').$$render(
			$$result,
			{
				alt: 'You in Malice Mizer cover band 1996',
				class: 'pb-4 mx-auto',
				src: maracas$1,
			},
			{},
			{}
		)}</figure>

<p>This isn&#39;t technically a separate band as they only performed together a couple of times, but I thought it was worth including as it&#39;s pretty interesting.</p>

<p>Maracas was a cover band put together by Gackt as part of Malice Mizer&#39;s 4th anniversary celebrations. The full line-up included Gackt, You, all of Maschera (Michi on vocals, Takuya on guitar, Hiro on bass, Tomo on drums) and Makoto (another old friend of Gackt&#39;s).</p>

<h3>GacktJob (1999-2019) <a href="${'/music-career/gacktjob'}" class="${'text-sm'}">read more\xA0\u2192</a></h3>

<figure>${validate_component(Image, 'Image').$$render(
			$$result,
			{
				alt: 'GacktJob around 2001',
				class: 'pb-4 mx-auto',
				src: gacktjob$1,
				ratio: '67%',
			},
			{},
			{}
		)}</figure>

<p>As soon as Gackt decided to go solo, he called You up to ask him to join his support band, and shortly after You moved to Tokyo to join him. It was around this time that he learnt how to play violin and piano, on Gackt&#39;s recommendation.</p>

<p>You has been in JOB from the beginning of Gackt&#39;s solo career, first recording in LA in January 1999.</p>

<p>Alongside guitar and violin, he also provides vocals on <em>Dybbuk</em> from the album <em>Crescent</em>, and on <em>Redemption</em> from the <em>Dirge of Cerberus: Final Fantasy VII</em> soundtrack.</p>

<p>You last performed live with Gackt in 2019 at Yokohama Pacifico, and since 2020 Gackt has a new band at live shows. However, Gackt has said that You (and Chacha) are still part of his family, and they will perform together again in the future. You still attends Gackt&#39;s performances as JOB &#39;alumni&#39;.</p>

<h3>Yellow Fried Chickenz (2010-2012)</h3>

<figure>${validate_component(Image, 'Image').$$render(
			$$result,
			{
				alt: 'Yellow Fried Chickenz',
				class: 'pb-4 mx-auto',
				src: yfc,
				ratio: '50%',
			},
			{},
			{}
		)}</figure>

<p>Yellow Fried Chickenz (also known as &quot;YFC&quot; or &quot;YFCz&quot;) began as a project by Gackt to express &quot;the cowardice in men&#39;s souls&quot;, increase the amount of good men in the world or as an attempt to &#39;form&#39;/celebrate men&#39;s spirit (don&#39;t ask me to explain, all sounds very ~Gackt~). They released one studio album, one &#39;best of&#39; album, a couple of singles, a live album from their first European tour and a couple of DVDs.</p>

<p>A highlight during YFC&#39;s time was their two European tours, where they performed at sold out venues in London, Paris, Barcelona, Munich, Bochum, Cologne, Amsterdam, Berlin, Budapest, Warsaw, Leipzig, Stockholm and Moscow. This was Gackt&#39;s (and his band&#39;s) first time successfully touring outside of Asia. A European tour documentary, <em>The Graffiti - Attack of The &quot;Yellow Fried Chickenz&quot; in Europe - &quot;I Love You All&quot;</em> was released on DVD in 2011.</p>

<h3>S.Q.F (2013-2018)</h3>

<figure>${validate_component(Image, 'Image').$$render(
			$$result,
			{
				alt: 'S.Q.F',
				class: 'pb-4 mx-auto',
				src: sqf$1,
			},
			{},
			{}
		)}</figure>

<p>S.Q.F is a Japanese band formed in 2000 by ex-Maschera vocalist Michi and was originally Michi&#39;s solo project, with ex-iLLUMINA guitarist, Nao. The name S.Q.F stands for &quot;Spinning Q Factor.&quot;</p>

<p>You was a support band member from 2013 to 2018, playing guitar at their live shows and on studio recordings, as well as writing some of their more recent songs.</p>

<h3>Luscious (2018-present)</h3>

<figure>${validate_component(Image, 'Image').$$render(
			$$result,
			{
				alt: 'Luscious',
				class: 'pb-4 mx-auto',
				src: luscious,
				ratio: '60%',
			},
			{},
			{}
		)}</figure>

<p>Luscious is a Japanese band formed by ${validate_component(
			Link,
			'Link'
		).$$render(
			$$result,
			{
				href: 'https://twitter.com/CHACHAMARU_YFCz',
			},
			{},
			{
				default: () => `Chachamaru (Yukihiro Fujimura)`,
			}
		)}, and includes Chacha on vocals and guitar, You on guitar, ${validate_component(
			Link,
			'Link'
		).$$render(
			$$result,
			{
				href: 'https://twitter.com/Satos_Cafe_Bar',
			},
			{},
			{ default: () => `Sato` }
		)} (ex. GacktJob, LiSA) on bass and ${validate_component(
			Link,
			'Link'
		).$$render(
			$$result,
			{
				href: 'https://twitter.com/DuelJewel_val',
			},
			{},
			{ default: () => `Val` }
		)} (ex. GacktJob, DuelJewel) on drums. They have performed at several events alongside Chacha&#39;s other band, Ded Chaplin.</p>

<p>Chacha posts about Luscious on his Twitter account and often streams on ${validate_component(
			Link,
			'Link'
		).$$render(
			$$result,
			{
				href: 'https://twitcasting.tv/chachamaru_yfcz',
			},
			{},
			{ default: () => `TwitCasting` }
		)} with the other band members.</p>`;
	}
);
var index$3 = /* @__PURE__ */ Object.freeze({
	__proto__: null,
	[Symbol.toStringTag]: 'Module',
	default: Music_career,
});
var cake = '/_app/assets/bdaycake-cc22d69f.jpg';
var Birthday_2003 = create_ssr_component(
	($$result, $$props, $$bindings, slots) => {
		let $title, $$unsubscribe_title;
		$$unsubscribe_title = subscribe(title, (value) => ($title = value));
		let { pageTitle = 'Birthday 2003' } = $$props;
		title.set(pageTitle);
		if (
			$$props.pageTitle === void 0 &&
			$$bindings.pageTitle &&
			pageTitle !== void 0
		)
			$$bindings.pageTitle(pageTitle);
		$$unsubscribe_title();
		return `${
			(($$result.head += `${
				(($$result.title = `<title>${escape($title)}</title>`), '')
			}`),
			'')
		}

<h2>${escape(pageTitle)}</h2>

<p>Gackt&#39;s well known for making a big deal out of staff members&#39; birthdays, usually involving pranks and cake. I decided, since I seem to have so much information on You&#39;s birthday from 2003, why not make a seperate page for it? Yup.</p>

<h3>Where, when, who?</h3>

<p><strong>Where?</strong> - Gackt&#39;s All Night Nippon radio show<br>
	<strong>When?</strong> - February 10th, 2003<br>
	<strong>Who?</strong> - All of GacktJOB and crew
</p>

<h3>Translation</h3>

<p>Here&#39;s a translation from the radio show, sent to me by Sei-chan.</p>

<b>Gackt</b>: ^__^ Today it\u2019s YOU&#39;S birthday!! That\u2019s why we made a program especially for him, it\u2019s dedicated to love!! So, phone us and tell us directly your love-problems... You and I will answer!!<br><br>

*Everything went normal and calm until this last girl phoned...*<br><br>

<b>Girl</b>: -__- Hi... you see, I\u2019ve got a big problem... I went out with a boy, and he was nice and everything... but when he drank he changed entirely, he got violent and uncontrollable, he pushed me and made me do things that you can\u2019t even imagine...<br><br>

<b>Gackt</b>: O_O That\u2019s terrible! *everybody in the studio : O_O!*<br><br>

<b>Girl</b>: Yes... well... but... but this boy I\u2019m talking about... is a member of your band...<br><br>

<b>Gackt</b>: O____O WHAT DID YOU SAY?<br> 
*Chacha&amp;You = O___________O!*<br><br>

<b>Gackt</b>: O_o Bu... But... Who do you mean...?<br><br>

<b>Girl</b>: -_-....he plays guitar...<br><br>

<b>Gackt</b>: *looks over to You and Chacha* O_O b...but... this can\u2019t be anybody else but...<br><br>

<b>Chacha</b>: O_o Don\u2019t look at me...<br><br>

<b>You</b>: O_o But... But it\u2019s IMPOSSIBLE that it\u2019s ME !! ~~you know it...~~<br><br>

<b>Gackt</b>: We will see my pretty one... Describe him...<br><br>

<b>Girl</b>: He is very tall... and we met after a concert...<br><br>

<b>Gackt</b>: O___o You say he\u2019s very tall? So it can only be You... O__O *Gackt looks over to You seriously*<br><br>

<b>You</b>:  WHAAAAAAAAAAT!?? SHE\u2019S LYING!! It\u2019s ... it\u2019s totally IMPOSSIBLE!!~ no no nooo!!<br><br>

<b>Gackt</b> (stressed): ... we will see... what you say is enormous... you can\u2019t phone and say this if you can\u2019t prove 
it... so we\u2019ll see... right now we are writing a new song for our next album, and nobody knows it so far... of course only the members of my band... but if it\u2019s true what you said about You, you should know this song, don\u2019t you?<br><br>

<b>You</b>:  NO NO NO NOOOOOOOOOOO NOOOOO I REALLY don\u2019t know her  O_O Gakuchan!! Believe meeee~~O_O she\u2019s lying she\u2019s 
lying she\u2019s LYING IT\u2019S WRONG!! I don\u2019t know her!! *nearly dying*<br><br>

<b>The girl, totally self-confident</b>: Of course I know this song...<br><br>

<b>You</b>: ... But this isn\u2019t RIGHT! Gaaaackt!! believe meeeeee!! She\u2019s a liar! Don\u2019t believe her! 
I don\u2019t know who she is! It\u2019s impossible!! IMPOSSIBLE!! NOOO!!<br><br>

<b>Gackt</b>: Very well.  Sing this song...<br><br>

And the girl begins to sing....... HAAAAPPY BITHDAAAAAY YOUUUUUUUUUU!!! HAPPY BIRTHDAAAAAAY YOUUUUUUUUUUU!!!!<br><br>

So a lot of people and all of the staff arrive in the room with a cake and sing Happy Birthday for You. ^o^<br><br>

<b>You</b>: (O_____O) *still shocked*<br><br>

And the studio was full of people who sang for him ~ And You was still trembling all over~<br><br>

<b>Gackt</b>: ^^ This was my gift for your birthday, did you like it?<br><br>

<b>You</b>: (O____O) huh... yes?<br><br>

<b>Gackt</b>: ^^ I just wanted to watch your face in a situation like this... ^^ It was so funny! ^o^<br><br>

<b>You</b>: ... (O___O)<br><br>

<b>Gackt</b>: ^_____^ But the best thing... was your smile when you understood that it was only a joke. ^^ It was perfect... Like I thought it would be. ^o^<br><br>

<b>You</b>: --_____-- why meeeeee?!<br><br> 

<b>Gackt</b> (to the audience): Well... so this was my surprise for You... I wanted him to open up every now and then... and I prepared everything very careful... because he\u2019s always with me he would have noticed something... so it was very difficult... Even Chacha and the others didn\u2019t know... ^^ I just told the staff members right before the program started so that there would be no problem! ^_^ It was good!<br><br> 

<b>You</b>: --____-- Sniff~<br><br>

<b>Gackt</b>: ~^_______^ But you can\u2019t imagine the way he laughed when he understood everything!  =^_^= It\u2019s...  hmm... the best thing in the world... I work only to see it!!<br><br> 

<b>You</b>:  ah really?<br><br>

<b>Gackt</b>: ^_^ Well... I know that it was a bit of a risk as well because I had no idea how You would react... ^^ But well...<br><br> 

<b>You</b>: ^_^ you are very nice, thank you.... Hmmm...<br><br>

<h3>Cake</h3>

<p>The cake that You received is shown below (snagged it off the ${validate_component(
			Link,
			'Link'
		).$$render(
			$$result,
			{
				href: 'http://www.allnightnippon.com/gackt',
			},
			{},
			{ default: () => `ANN` }
		)} site), topped with strawberries of course!</p>

<figure>${validate_component(Image, 'Image').$$render(
			$$result,
			{
				alt: 'Birthday cake',
				class: 'mb-4',
				src: cake,
				ratio: '75%',
			},
			{},
			{}
		)}</figure>

<p><a href="${'/music-career/gacktjob'}">\u2190 Backt to GacktJob</a></p>`;
	}
);
var birthday2003 = /* @__PURE__ */ Object.freeze({
	__proto__: null,
	[Symbol.toStringTag]: 'Module',
	default: Birthday_2003,
});
var tape = '/_app/assets/tape-2eb60c80.jpg';
var tape2 = '/_app/assets/tape-brown-4cc21d54.jpg';
var band = '/_app/assets/cainsfeel-97d557e4.jpg';
var Cains_feel = create_ssr_component(
	($$result, $$props, $$bindings, slots) => {
		let $title, $$unsubscribe_title;
		$$unsubscribe_title = subscribe(title, (value) => ($title = value));
		let { pageTitle = 'CAINS:FEEL' } = $$props;
		title.set(pageTitle);
		if (
			$$props.pageTitle === void 0 &&
			$$bindings.pageTitle &&
			pageTitle !== void 0
		)
			$$bindings.pageTitle(pageTitle);
		$$unsubscribe_title();
		return `${
			(($$result.head += `${
				(($$result.title = `<title>${escape($title)}</title>`), '')
			}`),
			'')
		}

<h2>${escape(pageTitle)}</h2>

<p>CAINS:FEEL was an indie Japanese visual kei (rock/goth) band formed in 1989 (although some sources say 1993) by You and Gackt. The band members were known as troublemakers as they often started fights at local venues, usually between rival bands. They mainly performed locally in Kyoto.</p>

<p>The origin of the name is from Cain and Abel, the sons of Adam and Eve from Genesis in the Old Testament.</p>

<p>At first, they struggled to find a vocalist and after a year of searching, Gackt jokingly suggested that he should do it, but You just laughed. After a couple of arguments and proving each other wrong, You gave Gackt a list of songs to practice and Gackt agreed to take vocal lessons. After a week of lessons, he sung in front of You for the first time, and You&#39;s response was, &quot;Why haven&#39;t you sung before?&quot;. Maybe without You&#39;s encouragment, Gackt wouldn&#39;t have even considered being a lead vocalist...</p>

<p>After Gackt had decided to be the lead vocalist, him and You recorded some demo songs to help recruit other band members. The majority of songs were written by Gackt and You.</p>

<h3>Band Members</h3>

<p><strong>Vocals:</strong> Gakuto (Gackt)<br>
	<strong>Guitar:</strong> You, Nao<br>
	<strong>Bass:</strong> Ren<br>
	<strong>Drums:</strong> Kazu, Ichirou<br>
	<strong>Keyboard:</strong> Reiona
</p>

<figure>${validate_component(Image, 'Image').$$render(
			$$result,
			{
				alt: 'CAINS:FEEL 1995',
				class: 'pb-4 mx-auto',
				src: band,
				ratio: '68%',
			},
			{},
			{}
		)}</figure>

<p>They disbanded in 1995 when Gackt decided to move to Tokyo to join Malice Mizer as their vocalist. After the split, You became a studio guitarist for several different bands in Kyoto.</p>

<h3>Demo Tapes</h3>

<p>They made a demo tape in 1994, of which there were two versions: green and brown.</p>

<p>Whilst they recorded a lot of songs for these demo tapes, they only chose to include a couple. Some of the songs were later used by Gackt in his solo career (<em>etude</em> was used on <em>Love Letter</em>, <em>refrain</em> was renamed to <em>Solitude ~regret~</em> and performed during the ${validate_component(
			Link,
			'Link'
		).$$render(
			$$result,
			{
				href: 'https://www.youtube.com/watch?v=eRvHzl6ENhk',
			},
			{},
			{
				default: () => `Jougen no Tsuki 2003 tour`,
			}
		)}).</p>

<h4>Credits</h4>

<p><strong>Vocals:</strong> Gaku (Gackt)<br>
	<strong>Guitar:</strong> You<br>
	<strong>Bass:</strong> Ren<br>
	<strong>Drums:</strong> Kazu (studio drummer)
</p>

<h4>Green version:</h4>

<figure style="${'width: 140px;'}">${validate_component(
			Image,
			'Image'
		).$$render(
			$$result,
			{
				alt: 'CAINS:FEEL 1994 demo tape open',
				class: 'p-4 pt-0',
				src: tape,
				ratio: '138%',
			},
			{},
			{}
		)}</figure>

<ol class="${'list-decimal list-inside'}"><li>\uFF5Elie\uFF5E [${validate_component(
			Link,
			'Link'
		).$$render(
			$$result,
			{ href: 'https://youtu.be/cVe9rssPA84' },
			{},
			{ default: () => `youtube` }
		)}]</li>
	<li>MARINE BLUE no kazeni dakarete (marine blue\u306E\u98A8\u306B\u62B1\u304B\u308C\u3066) [${validate_component(
		Link,
		'Link'
	).$$render(
		$$result,
		{ href: 'https://youtu.be/A6CEeoU1KG4' },
		{},
		{ default: () => `youtube` }
	)}]</li>
	<li>etude [${validate_component(Link, 'Link').$$render(
		$$result,
		{ href: 'https://youtu.be/cvGPKVu3LPQ' },
		{},
		{ default: () => `youtube` }
	)}] [${validate_component(Link, 'Link').$$render(
			$$result,
			{
				href: 'downloads/etude.txt',
				download: 'etude lyric translation',
			},
			{},
			{ default: () => `lyric translation` }
		)}]</li></ol>

<h4>Brown version:</h4>

<figure>${validate_component(Image, 'Image').$$render(
			$$result,
			{
				alt: 'CAINS:FEEL 1994 demo tape brown rare version',
				class: 'p-4 pt-0',
				width: '130px',
				src: tape2,
				ratio: '60%',
			},
			{},
			{}
		)}</figure>

<ol class="${'list-decimal list-inside'}"><li>refrain</li>
	<li>\uFF5Elie\uFF5E [${validate_component(Link, 'Link').$$render(
		$$result,
		{ href: 'https://youtu.be/cVe9rssPA84' },
		{},
		{ default: () => `youtube` }
	)}]</li>
	<li>MARINE BLUE no kazeni dakarete (marine blue\u306E\u98A8\u306B\u62B1\u304B\u308C\u3066) [${validate_component(
		Link,
		'Link'
	).$$render(
		$$result,
		{ href: 'https://youtu.be/A6CEeoU1KG4' },
		{},
		{ default: () => `youtube` }
	)}]</li>
	<li>etude [${validate_component(Link, 'Link').$$render(
		$$result,
		{ href: 'https://youtu.be/cvGPKVu3LPQ' },
		{},
		{ default: () => `youtube` }
	)}] [${validate_component(Link, 'Link').$$render(
			$$result,
			{
				href: 'downloads/etude.txt',
				download: 'etude lyric translation',
			},
			{},
			{ default: () => `lyric translation` }
		)}]</li></ol>

<p><a href="${'/music-career'}">\u2190 Backt to Music Career</a></p>`;
	}
);
var cainsFeel = /* @__PURE__ */ Object.freeze({
	__proto__: null,
	[Symbol.toStringTag]: 'Module',
	default: Cains_feel,
});
var hana = '/_app/assets/hana-776a226e.png';
var You_gackt = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $title, $$unsubscribe_title;
	$$unsubscribe_title = subscribe(title, (value) => ($title = value));
	let { pageTitle = 'You & Gackt' } = $$props;
	title.set(pageTitle);
	if (
		$$props.pageTitle === void 0 &&
		$$bindings.pageTitle &&
		pageTitle !== void 0
	)
		$$bindings.pageTitle(pageTitle);
	$$unsubscribe_title();
	return `${
		(($$result.head += `${
			(($$result.title = `<title>${escape($title)}</title>`), '')
		}`),
		'')
	}

<h2>${escape(pageTitle)}</h2>

<h3>Meeting Gackt</h3>

<p>While You was a guitarist for a band in Kyoto, him and his band regularly visited a recording studio where Gackt worked as a sound technician. Gackt had seen You&#39;s band perform live at venues in Kyoto several times and was fond of one of the guitarists, but he&#39;d never made the connection between this guitarist and You. This was partly because they would wear makeup on stage, which made them hard to recognise otherwise.</p>

<p>He knew of You from when they were in the studio together (roughly every two weeks), however they didn&#39;t speak much as Gackt thought You was quite hostile, as he didn&#39;t talk a lot and usually glared at him. He&#39;s since found out that the glaring was because You is short-sighted...</p>

<p>One day he asked You who the guitarist he liked was, and You explained it was him. Gackt didn&#39;t believe him, going so far as arguing against it! So You took him to his house to show him photos and videos, to prove he was the guitarist, and from that point they became good friends. Gackt really liked the contrast between You&#39;s on-stage persona compared to his real personality.</p>

<p>During this visit, You also played Gackt some songs he had written, and shortly after they decided to form <a href="${'/music-career/cains-feel'}">a band</a> together.</p>

<p class="${'text-sm'}">* See references at the bottom.</p>

<h3>Christmas Eve Street Performance in 1993</h3>

<figure>${validate_component(Image, 'Image').$$render(
		$$result,
		{
			alt: 'Gackt and You performance at Christmas',
			class: 'p-4 pt-0',
			width: '200',
			align: 'right',
			src: hana,
			ratio: '58%',
		},
		{},
		{}
	)}</figure>

<p>Just before Christmas in 1993, Gackt was struggling to cope with a recent break-up, so much that it was affecting his sleep and he was feeling more and more depressed. You made a plan to cheer him up by asking him to sing a bunch of songs on the street with him on Christmas Eve, including <em>hanashitaku wa nai</em> by T-Bolan and <em>Gekkou</em> by B&#39;z. At first Gackt refused, but You insisted because it would mean that he wasn&#39;t alone at Christmas and it would take his mind off what had happened. They ended up performing for just over an hour in Kamogawa, under Sanjo Ohashi bridge on the Kamo River.</p>

<p>They recreated the performance on the Happy Xmas Show in 2003, with You on the guitar and Gackt singing.</p>

<iframe title="${'hanashitaku wa nai'}" src="${'https://www.youtube.com/embed/8v2FPRve0S4'}" frameborder="${'0'}" allow="${'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'}" allowfullscreen class="${'mb-4'}"></iframe>

<p>Gackt has also described this night in an interview from <em>Vicious 08.1998</em>. Ryuik has scanned and translated ${validate_component(
		Link,
		'Link'
	).$$render(
		$$result,
		{
			href: 'https://ryuik.livejournal.com/218356.html',
		},
		{},
		{
			default: () => `the whole interview here`,
		}
	)} \u2764\uFE0F</p>

<h3>Relationship with Gackt</h3>

<p>You has been by Gackt&#39;s side for over 20 years, and Gackt has explained endless times how close they are, comparing their relationship to that of a close family member or soulmate. They have an extremely sweet relationship and this is, in part, why You is such a firm fan favourite.</p>

<p>Here&#39;s some random quotes from Gackt, either to You or about You. Bare in mind that these &quot;quotes&quot; are translations from Japanese either by myself or others, so they are of course not <em>direct</em> quotations. And as when anything is translated, the intended meaning is often lost. Having said that, most are easy to interpret!</p>

<ul><li><em>&quot;I know what you think... Because You and I are always together, live together, sleep together, you think that we&#39;re gay, don&#39;t you? Myself, I&#39;d rather say that You is my soulmate. I prefer to say it this way.&quot;</em></li>
	<li><em>&quot;I first met him 10 years ago... It&#39;s been 10 years already. He rode his big motorbike just like a prince on a white horse, and riding behind, I was the princess.&quot;</em></li>
	<li><em>&quot;He really is... amazing.&quot;</em></li>
	<li><em>&quot;We ain&#39;t gay!&quot;</em></li>
	<li><em>&quot;Well, isn&#39;t he cute? See that smile? No one can really blame him.&quot;</em></li>
	<li><em>&quot;See, this guy You... Well, he&#39;s very cute.&quot;</em></li>
	<li><em>&quot;He&#39;ll say Happy Birthday to me... maybe around 28th July.&quot;</em> (Gackt&#39;s birthday is 4th July..)</li>
	<li><em>(To the fans, as You comes on stage:) &quot;Oh, please! You don&#39;t have to get that excited...&quot;</em></li>
	<li><em>&quot;Watch out for his charming, innocent smile, girls.&quot;</em></li>
	<li><em>&quot;Isn&#39;t he such a good looking guy?&quot;</em></li>
	<li><em>&quot;... I&#39;ll always continue to love him.&quot;</em></li>
	<li><em>&quot;Even if one day in the future, you can&#39;t see with your eyes, I&#39;ll be happy to be your eyes! Also, if one day my waist doesn&#39;t work, you have to be my waist!&quot;</em></li>
	<li><em>&quot;And my oldest friend. My best friend, his name is You!&quot;</em></li></ul>

<p>I wonder if Gackt ever says anything bad about You...</p>

<ul><li><em>&quot;Clean the damn toilet from time to time!&quot;</em></li></ul>

<h3>Trivia</h3>
<ul><li>The catalyst for them initially becoming close friends was both of them being dumped by their girlfriends!</li>
	<li>You and Gackt used to go for drives together for song inspiration. They also drove to scenic locations (mountains, forests) and would break into abandoned buildings together (to write songs, obviously.)</li>
	<li><em>ANOTHER WORLD</em> was written while on holiday together in Hawaii after they went for a drive in the rain.</li>
	<li>Gackt has said that when he is with You he can truly relax and be himself, and when they&#39;re together it&#39;s more like two people merging as one.</li>
	<li>When asked about their relationship, You has said that he is like the ocean and Gackt is the moon. You likes to be calm and careful, and do everything at his own pace, while supporting Gackt. And Gackt is a beacon, guiding the way and inspiring him.</li>
	<li>Gackt talked about You a lot on his ${validate_component(
		Link,
		'Link'
	).$$render(
		$$result,
		{ href: 'http://allnightnippon.com/gackt' },
		{},
		{ default: () => `radio show` }
	)}.</li>
	<li>In <em>The Ichiban</em> from 07.05.99, Vol.21 No.25, there was an interview with Gackt from a series called <em>Gackt Conquers the World</em>. In the Japan entry, he mentioned a recent conversation with You where Gackt was explaining how if he were to lose everything, it would be OK as long as he still had the same people with him. You&#39;s response was, &quot;If you lost everything and went to Hell, I&#39;d always stay with you.&quot; Gackt then went on to explain how happy that made him, and that it felt strange coming from a non-romantic relationship, but because of this it made it even more special.</li>
	<li>You once made Gackt a cake for his birthday that was made of kimchi and other Korean vegetables, as Gackt isn&#39;t keen on anything sweet.</li></ul>

<p class="${'text-sm'}">* References: Gackt&#39;s autobiography, <em>Jihaku</em>, Section 2: Kakusei, Chapter 4: <em>Hatsu Bando CAIN&#39;S FEEL</em>; <em>Diabolos</em> tour document; various interviews with GacktJob</p>

<p><a href="${'/music-career'}">\u2190 Backt to Music Career</a></p>`;
});
var youGackt = /* @__PURE__ */ Object.freeze({
	__proto__: null,
	[Symbol.toStringTag]: 'Module',
	default: You_gackt,
});
var Gacktjob = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $title, $$unsubscribe_title;
	$$unsubscribe_title = subscribe(title, (value) => ($title = value));
	let { pageTitle = 'GacktJob' } = $$props;
	title.set(pageTitle);
	if (
		$$props.pageTitle === void 0 &&
		$$bindings.pageTitle &&
		pageTitle !== void 0
	)
		$$bindings.pageTitle(pageTitle);
	$$unsubscribe_title();
	return `${
		(($$result.head += `${
			(($$result.title = `<title>${escape($title)}</title>`), '')
		}`),
		'')
	}

<h2>${escape(pageTitle)}</h2>

<p>The members of GacktJob have said that You is like a robot, with the exception of Gackt, who says he&#39;s half donkey, half horse.</p>

<p>They celebrated You&#39;s 30th birthday on Gackt&#39;s radio show together; I&#39;ve dedicated a page to it <a href="${'/music-career/birthday-2003'}">here</a> since I had so much info about it.</p>

<p><em>More info coming soon.</em></p>

<p><a href="${'/music-career'}">\u2190 Backt to Music Career</a></p>`;
});
var gacktjob = /* @__PURE__ */ Object.freeze({
	__proto__: null,
	[Symbol.toStringTag]: 'Module',
	default: Gacktjob,
});
var Maracas = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $title, $$unsubscribe_title;
	$$unsubscribe_title = subscribe(title, (value) => ($title = value));
	let { pageTitle = 'Maracas' } = $$props;
	title.set(pageTitle);
	if (
		$$props.pageTitle === void 0 &&
		$$bindings.pageTitle &&
		pageTitle !== void 0
	)
		$$bindings.pageTitle(pageTitle);
	$$unsubscribe_title();
	return `${
		(($$result.head += `${
			(($$result.title = `<title>${escape($title)}</title>`), '')
		}`),
		'')
	}

<h2>${escape(pageTitle)}</h2>

<p>In 1996, Malice Mizer organised a series of events to celebrate their 4th anniversary, called <em>\u559C\u5287\u306E\u6669\u9910~VISUAL ART COLLECTION VOL.1~</em>, made up of performances by cover bands each band member had put together. The first event was held on 8th November 1996 at Shibuya <em>ON AIR WEST</em>, a small venue that holds about 600 people. It was reviewed in <em>Fool&#39;s Mate 02.1997</em>, which is where the photo is from.</p>

<p>Gackt described the cover band he put together in the Malice Mizer fanclub magazine <em>Ma ch\xE9rie</em> (vol. 2&amp;3). He first called ${validate_component(
		Link,
		'Link'
	).$$render(
		$$result,
		{
			href: 'https://en.wikipedia.org/wiki/Maschera_(band)',
		},
		{},
		{ default: () => `Maschera` }
	)}, another visual kei band that were active at the time, who were excited to perform with him. He then called You and invited him to perform as well, &quot;We spent 2-3 hours on the phone discussing details, chose the songs to perform and arranged a meeting.&quot;</p>

<figure>${validate_component(Image, 'Image').$$render(
		$$result,
		{
			alt: 'You in Malice Mizer cover band 1996',
			class: 'pb-4 mx-auto',
			src: maracas$1,
		},
		{},
		{}
	)}</figure>

<p>The final line-up included Gackt, You, all of Maschera (Michi on vocals, Takuya on guitar, Hiro on bass, Tomo on drums) and Makoto (another old friend of Gackt&#39;s).</p>

<p>Massive thank you to ${validate_component(Link, 'Link').$$render(
		$$result,
		{
			href: 'https://ryuik.livejournal.com/224213.html',
		},
		{},
		{ default: () => `Ryuik` }
	)} for the information and photo.</p>

<p><a href="${'/music-career'}">\u2190 Backt to Music Career</a></p>`;
});
var maracas = /* @__PURE__ */ Object.freeze({
	__proto__: null,
	[Symbol.toStringTag]: 'Module',
	default: Maracas,
});
var Sqf = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $title, $$unsubscribe_title;
	$$unsubscribe_title = subscribe(title, (value) => ($title = value));
	let { pageTitle = 'S.Q.F' } = $$props;
	title.set(pageTitle);
	if (
		$$props.pageTitle === void 0 &&
		$$bindings.pageTitle &&
		pageTitle !== void 0
	)
		$$bindings.pageTitle(pageTitle);
	$$unsubscribe_title();
	return `${
		(($$result.head += `${
			(($$result.title = `<title>${escape($title)}</title>`), '')
		}`),
		'')
	}

<h2>${escape(pageTitle)}</h2>

<p>Coming soon.</p>

<p><a href="${'/music-career'}">\u2190 Backt to Music Career</a></p>`;
});
var sqf = /* @__PURE__ */ Object.freeze({
	__proto__: null,
	[Symbol.toStringTag]: 'Module',
	default: Sqf,
});
var Where_to_buy = create_ssr_component(
	($$result, $$props, $$bindings, slots) => {
		let $title, $$unsubscribe_title;
		$$unsubscribe_title = subscribe(title, (value) => ($title = value));
		let { pageTitle = 'Where to Buy' } = $$props;
		title.set(pageTitle);
		if (
			$$props.pageTitle === void 0 &&
			$$bindings.pageTitle &&
			pageTitle !== void 0
		)
			$$bindings.pageTitle(pageTitle);
		$$unsubscribe_title();
		return `${
			(($$result.head += `${
				(($$result.title = `<title>${escape($title)}</title>`), '')
			}`),
			'')
		}

<h2>${escape(pageTitle)}</h2>

<p>There are several places you can buy Gackt, S.Q.F etc releases online.</p>

<ul><li>${validate_component(Link, 'Link').$$render(
			$$result,
			{ href: 'http://www.yesasia.com/' },
			{},
			{ default: () => `YesAsia` }
		)}</li>
	<li>${validate_component(Link, 'Link').$$render(
		$$result,
		{ href: 'http://www.cdjapan.co.jp/' },
		{},
		{ default: () => `CD Japan` }
	)}</li>
	<li>${validate_component(Link, 'Link').$$render(
		$$result,
		{ href: 'http://www.amazon.co.jp/' },
		{},
		{ default: () => `Amazon Japan` }
	)}</li>
	<li>${validate_component(Link, 'Link').$$render(
		$$result,
		{ href: 'http://www.hmv.co.jp/' },
		{},
		{ default: () => `HMV Japan` }
	)}</li>
	<li>${validate_component(Link, 'Link').$$render(
		$$result,
		{ href: 'http://buyee.jp/' },
		{},
		{ default: () => `Buyee.jp` }
	)}</li>
	<li>${validate_component(Link, 'Link').$$render(
		$$result,
		{ href: 'http://www.jlist.com/' },
		{},
		{ default: () => `JList` }
	)}</li></ul>

<p>Both Gackt and S.Q.F are available on most popular music streaming services.</p>

<h3>Suggested Merch for You Fans</h3>

<h4>Albums</h4>
<ul><li><em>Moon</em> (Gackt): You is heavily featured in the CD booklet</li>
	<li><em>The Seventh Night</em> (Gackt): Nice pictures of You and Gackt in the chunky booklet that comes with the CD</li></ul>

<h4>Photobooks &amp; Magazines</h4>
<ul><li>Mizerable ~Unmei~ photobook</li>
	<li>For Dears</li>
	<li>Jougen no Tsuki Tour Book</li>
	<li>The Air Moon (The Crescent side)</li>
	<li>The Sixth Day &amp; Seventh Night Tour Book</li>
	<li>Gackt File 1999-2004</li>
	<li>DIABOLOS tour book</li></ul>

<h4>Live Tour DVDs</h4>

<p>Any of Gackt&#39;s from 2000-2019, but my personal favourites are:</p>

<ul><li><em>Kagen no Tsuki (2002)</em></li>
	<li><em>Jougen no Tsuki (2003)</em></li>
	<li><em>The Sixth Day &amp; Seventh Night (2004)</em></li>
	<li><em>Diablos (2005)</em></li>
	<li><em>Training Days Drug Party (2006)</em></li>
	<li><em>Requiem Et Reminiscence II (2009)</em></li>
	<li><em>Best of the Best - 40th birthday (2013)</em></li>
	<li><em>Last Visualive Saigo no Tsuki (2016)</em></li></ul>`;
	}
);
var whereToBuy = /* @__PURE__ */ Object.freeze({
	__proto__: null,
	[Symbol.toStringTag]: 'Module',
	default: Where_to_buy,
});
var moonchild = '/_app/assets/moonchild-53a59bb5.jpg';
var Discography = create_ssr_component(
	($$result, $$props, $$bindings, slots) => {
		let $title, $$unsubscribe_title;
		$$unsubscribe_title = subscribe(title, (value) => ($title = value));
		let { pageTitle = 'Discography' } = $$props;
		title.set(pageTitle);
		if (
			$$props.pageTitle === void 0 &&
			$$bindings.pageTitle &&
			pageTitle !== void 0
		)
			$$bindings.pageTitle(pageTitle);
		$$unsubscribe_title();
		return `${
			(($$result.head += `${
				(($$result.title = `<title>${escape($title)}</title>`), '')
			}`),
			'')
		}

<h2>${escape(pageTitle)}</h2>

<h3>Full Discography <a href="${'discography/full-discography'}" class="${'text-sm'}">read more\xA0\u2192</a></h3>

<p>View You&#39;s full discography including release dates, artist collaborations and credits.</p>

<h3>Appearances <a href="${'discography/appearances'}" class="${'text-sm'}">read more\xA0\u2192</a></h3>

<p>You has appeared in many videos, books, magazines and interviews, especially from working with Gackt. The highlight obviously being his acting skillz in <em>Moon Child</em>:</p>

<figure>${validate_component(Image, 'Image').$$render(
			$$result,
			{
				alt: 'You in Moon Child',
				class: 'p-2 pt-0 mx-auto mb-2',
				src: moonchild,
				ratio: '55%',
			},
			{},
			{}
		)}</figure>`;
	}
);
var index$2 = /* @__PURE__ */ Object.freeze({
	__proto__: null,
	[Symbol.toStringTag]: 'Module',
	default: Discography,
});
var css$3 = {
	code: '.table-container.svelte-14x1pov.svelte-14x1pov{position:relative\n}.table-scroll.svelte-14x1pov.svelte-14x1pov{width:100%;overflow-x:auto;padding-right:5rem\n}.table-fade.svelte-14x1pov.svelte-14x1pov{position:absolute;top:0px;bottom:0px;right:0px;z-index:50;width:5rem;background-image:linear-gradient(to right, var(--tw-gradient-stops));--tw-gradient-from:transparent;--tw-gradient-stops:var(--tw-gradient-from), var(--tw-gradient-to, rgb(0 0 0 / 0));--tw-gradient-to:#fff\n}@media(min-width: 768px){.table-fade.svelte-14x1pov.svelte-14x1pov{display:none\n    }}table.svelte-14x1pov.svelte-14x1pov{margin-bottom:1rem;font-size:0.875rem;line-height:1.25rem\n}th.svelte-14x1pov.svelte-14x1pov{--tw-bg-opacity:1;background-color:rgb(220 252 231 / var(--tw-bg-opacity))\n}th.svelte-14x1pov.svelte-14x1pov,td.svelte-14x1pov.svelte-14x1pov{border-width:1px;--tw-border-opacity:1;border-color:rgb(34 197 94 / var(--tw-border-opacity));padding-left:1rem;padding-right:1rem;padding-top:0.5rem;padding-bottom:0.5rem\n}td.svelte-14x1pov em.svelte-14x1pov{font-size:0.75rem;line-height:1rem\n}',
	map: `{"version":3,"file":"full-discography.svelte","sources":["full-discography.svelte"],"sourcesContent":["<script lang=\\"ts\\">let albumsTable, albumsFade, singlesTable, singlesFade, dvdsTable, dvdsFade;\\nfunction handleGradientVisibility(el, fadeEl) {\\n    if (!el || !fadeEl)\\n        return;\\n    fadeEl.classList.remove('hidden');\\n    const isOverThreshold = (el.scrollWidth - el.scrollLeft) - el.offsetWidth <= 10;\\n    // const isScrolledToEnd: Boolean = el.scrollWidth - el.scrollLeft == el.offsetWidth;\\n    if (isOverThreshold)\\n        fadeEl.classList.add('hidden');\\n}\\nimport { title } from \\"../../store\\";\\nexport let pageTitle = 'Full Discography';\\ntitle.set(pageTitle);\\n<\/script>\\n\\n<svelte:head>\\n\\t<title>{$title}</title>\\n</svelte:head>\\n\\n<style lang=\\"postcss\\">\\n\\t.table-container {\\n\\n    position: relative\\n}\\n\\n\\t.table-scroll {\\n\\n    width: 100%;\\n\\n    overflow-x: auto;\\n\\n    padding-right: 5rem\\n}\\n\\n\\t.table-fade {\\n\\n    position: absolute;\\n\\n    top: 0px;\\n\\n    bottom: 0px;\\n\\n    right: 0px;\\n\\n    z-index: 50;\\n\\n    width: 5rem;\\n\\n    background-image: linear-gradient(to right, var(--tw-gradient-stops));\\n\\n    --tw-gradient-from: transparent;\\n\\n    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgb(0 0 0 / 0));\\n\\n    --tw-gradient-to: #fff\\n}\\n\\n\\t@media (min-width: 768px) {\\n\\n    .table-fade {\\n\\n        display: none\\n    }\\n}\\n\\n\\ttable {\\n\\n    margin-bottom: 1rem;\\n\\n    font-size: 0.875rem;\\n\\n    line-height: 1.25rem\\n}\\n\\n\\tth {\\n\\n    --tw-bg-opacity: 1;\\n\\n    background-color: rgb(220 252 231 / var(--tw-bg-opacity))\\n}\\n\\n\\tth, td {\\n\\n    border-width: 1px;\\n\\n    --tw-border-opacity: 1;\\n\\n    border-color: rgb(34 197 94 / var(--tw-border-opacity));\\n\\n    padding-left: 1rem;\\n\\n    padding-right: 1rem;\\n\\n    padding-top: 0.5rem;\\n\\n    padding-bottom: 0.5rem\\n}\\n\\n\\ttd em {\\n\\n    font-size: 0.75rem;\\n\\n    line-height: 1rem\\n}</style>\\n\\n<h2>{pageTitle}</h2>\\n\\n<h3 id=\\"studio-albums\\">Studio Albums</h3>\\n<div class=\\"table-container\\">\\n\\t<div class=\\"table-fade\\" bind:this={albumsFade}></div>\\n\\t<div class=\\"table-scroll\\" bind:this={albumsTable} on:scroll={() => handleGradientVisibility(albumsTable, albumsFade)}>\\n\\t\\t<table>\\n\\t\\t\\t<thead>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<th>Year</th>\\n\\t\\t\\t\\t\\t<th>Title</th>\\n\\t\\t\\t\\t\\t<th>Artist</th>\\n\\t\\t\\t\\t\\t<th>Credits</th>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t</thead>\\n\\t\\t\\t<tbody>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<td>1994</td>\\n\\t\\t\\t\\t\\t<td>CAINS:FEEL<br> <em>demo tape</em></td>\\n\\t\\t\\t\\t\\t<td>CAINS:FEEL</td>\\n\\t\\t\\t\\t\\t<td>Guitar, writer</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<td>1999</td>\\n\\t\\t\\t\\t\\t<td>Miz\xE9rable</td>\\n\\t\\t\\t\\t\\t<td>Gackt</td>\\n\\t\\t\\t\\t\\t<td>Guitar</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<td>2000</td>\\n\\t\\t\\t\\t\\t<td>Mars</td>\\n\\t\\t\\t\\t\\t<td>Gackt</td>\\n\\t\\t\\t\\t\\t<td>Guitar, violin</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<td>2001</td>\\n\\t\\t\\t\\t\\t<td>Rebirth</td>\\n\\t\\t\\t\\t\\t<td>Gackt</td>\\n\\t\\t\\t\\t\\t<td>Guitar, violin</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<td>2002</td>\\n\\t\\t\\t\\t\\t<td>Moon</td>\\n\\t\\t\\t\\t\\t<td>Gackt</td>\\n\\t\\t\\t\\t\\t<td>Guitar, violin</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<td>2002</td>\\n\\t\\t\\t\\t\\t<td>Air</td>\\n\\t\\t\\t\\t\\t<td>Chachamaru</td>\\n\\t\\t\\t\\t\\t<td>Writer (<em>Metamorphose</em>)</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<td>2003</td>\\n\\t\\t\\t\\t\\t<td>Crescent</td>\\n\\t\\t\\t\\t\\t<td>Gackt</td>\\n\\t\\t\\t\\t\\t<td>Guitar, violin</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<td>2004</td>\\n\\t\\t\\t\\t\\t<td>The Seventh Night ~Unplugged~</td>\\n\\t\\t\\t\\t\\t<td>Gackt</td>\\n\\t\\t\\t\\t\\t<td>Guitar</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<td>2005</td>\\n\\t\\t\\t\\t\\t<td>Love Letter</td>\\n\\t\\t\\t\\t\\t<td>Gackt</td>\\n\\t\\t\\t\\t\\t<td>Guitar</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<td>2005</td>\\n\\t\\t\\t\\t\\t<td>Diabolos</td>\\n\\t\\t\\t\\t\\t<td>Gackt</td>\\n\\t\\t\\t\\t\\t<td>Guitar</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<td>2009</td>\\n\\t\\t\\t\\t\\t<td>Re:Born</td>\\n\\t\\t\\t\\t\\t<td>Gackt</td>\\n\\t\\t\\t\\t\\t<td>Guitar, violin</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<td>2010</td>\\n\\t\\t\\t\\t\\t<td>Are You \\"Fried Chickenz\\"??</td>\\n\\t\\t\\t\\t\\t<td>Gackt</td>\\n\\t\\t\\t\\t\\t<td>Guitar</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<td>2012</td>\\n\\t\\t\\t\\t\\t<td>Yellow Fried Chickenz I</td>\\n\\t\\t\\t\\t\\t<td>Yellow Fried Chickenz</td>\\n\\t\\t\\t\\t\\t<td>Guitar, writer (<em>Circle</em>, <em>Mata kokode aimassho</em>, <em>Not Alone - Kimi Wa Hitori Ja Nai</em>)</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<td>2014</td>\\n\\t\\t\\t\\t\\t<td>Lady Imagination</td>\\n\\t\\t\\t\\t\\t<td>Pokota</td>\\n\\t\\t\\t\\t\\t<td>Writer (<em>white love</em>)</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<td>2016</td>\\n\\t\\t\\t\\t\\t<td>Last Moon</td>\\n\\t\\t\\t\\t\\t<td>Gackt</td>\\n\\t\\t\\t\\t\\t<td>Guitar, violin,<br>arrangement, programming</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t</tbody>\\n\\t\\t</table>\\n\\t</div>\\n</div>\\n\\n<h3 id=\\"singles\\">Singles</h3>\\n<div class=\\"table-container\\">\\n\\t<div class=\\"table-fade\\" bind:this={singlesFade}></div>\\n\\t<div class=\\"table-scroll\\" bind:this={singlesTable} on:scroll={() => handleGradientVisibility(singlesTable, singlesFade)}>\\n\\t\\t<table>\\n\\t\\t\\t<thead>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<th>Year</th>\\n\\t\\t\\t\\t\\t<th>Title</th>\\n\\t\\t\\t\\t\\t<th>Artist</th>\\n\\t\\t\\t\\t\\t<th>Credits</th>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t</thead>\\n\\t\\t\\t<tbody>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<td>1994</td>\\n\\t\\t\\t\\t\\t<td>-Lie-</td>\\n\\t\\t\\t\\t\\t<td>CAINS:FEEL</td>\\n\\t\\t\\t\\t\\t<td>Guitar</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<td>1999-2016</td>\\n\\t\\t\\t\\t\\t<td><em>Titles coming soon</em></td>\\n\\t\\t\\t\\t\\t<td>Gackt</td>\\n\\t\\t\\t\\t\\t<td>Guitar, violin</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<td>2011</td>\\n\\t\\t\\t\\t\\t<td>All My Love / You Are the Reason</td>\\n\\t\\t\\t\\t\\t<td>Yellow Fried Chickenz</td>\\n\\t\\t\\t\\t\\t<td>Guitar</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<td>2011</td>\\n\\t\\t\\t\\t\\t<td>The End of the Day</td>\\n\\t\\t\\t\\t\\t<td>Yellow Fried Chickenz</td>\\n\\t\\t\\t\\t\\t<td>Guitar</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<td>2016</td>\\n\\t\\t\\t\\t\\t<td>Winter Express</td>\\n\\t\\t\\t\\t\\t<td>S.Q.F</td>\\n\\t\\t\\t\\t\\t<td>Guitar, writer</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<td>2017</td>\\n\\t\\t\\t\\t\\t<td>Egoistic Game</td>\\n\\t\\t\\t\\t\\t<td>S.Q.F</td>\\n\\t\\t\\t\\t\\t<td>Guitar, writer</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<td>2017</td>\\n\\t\\t\\t\\t\\t<td>ETERNAL CHILD</td>\\n\\t\\t\\t\\t\\t<td>S.Q.F</td>\\n\\t\\t\\t\\t\\t<td>Guitar, writer</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<td>2017</td>\\n\\t\\t\\t\\t\\t<td>PARADIGM SHIFT</td>\\n\\t\\t\\t\\t\\t<td>S.Q.F</td>\\n\\t\\t\\t\\t\\t<td>Guitar, writer</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<td>2017</td>\\n\\t\\t\\t\\t\\t<td>iDOL</td>\\n\\t\\t\\t\\t\\t<td>S.Q.F</td>\\n\\t\\t\\t\\t\\t<td>Guitar, writer</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t</tbody>\\n\\t\\t</table>\\n\\t</div>\\n</div>\\n\\n<h3 id=\\"live-music-dvds\\">Live Music DVDs</h3>\\n<div class=\\"table-container\\">\\n\\t<div class=\\"table-fade\\" bind:this={dvdsFade}></div>\\n\\t<div class=\\"table-scroll\\" bind:this={dvdsTable} on:scroll={() => handleGradientVisibility(dvdsTable, dvdsFade)}>\\n\\t\\t<table>\\n\\t\\t\\t<thead>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<th>Year</th>\\n\\t\\t\\t\\t\\t<th>Title</th>\\n\\t\\t\\t\\t\\t<th>Artist</th>\\n\\t\\t\\t\\t\\t<th>Credits</th>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t</thead>\\n\\t\\t\\t<tbody>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<td>2000</td>\\n\\t\\t\\t\\t\\t<td>Mars Sora Kara no Homonsha: Kais\u014D</td>\\n\\t\\t\\t\\t\\t<td>Gackt</td>\\n\\t\\t\\t\\t\\t<td>Guitar, violin</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<td>2001</td>\\n\\t\\t\\t\\t\\t<td>Requiem et Reminiscence (Shuuen to Seijyaku)</td>\\n\\t\\t\\t\\t\\t<td>Gackt</td>\\n\\t\\t\\t\\t\\t<td>Guitar, violin</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<td>2003</td>\\n\\t\\t\\t\\t\\t<td>Live Tour 2002 Kagen no Tsuki (Seiya no Shirabe)</td>\\n\\t\\t\\t\\t\\t<td>Gackt</td>\\n\\t\\t\\t\\t\\t<td>Guitar, violin</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<td>2003</td>\\n\\t\\t\\t\\t\\t<td>Live Tour 2003 Jougen no Tsuki (Saishusho)</td>\\n\\t\\t\\t\\t\\t<td>Gackt</td>\\n\\t\\t\\t\\t\\t<td>Guitar, violin</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<td>2004</td>\\n\\t\\t\\t\\t\\t<td>Live Tour 2004 The Sixth Day & Seventh Night (Final)</td>\\n\\t\\t\\t\\t\\t<td>Gackt</td>\\n\\t\\t\\t\\t\\t<td>Guitar, violin</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<td>2006</td>\\n\\t\\t\\t\\t\\t<td>Live Tour 2005 Diabolos (Aien no Shi to Seiya no Namida)</td>\\n\\t\\t\\t\\t\\t<td>Gackt</td>\\n\\t\\t\\t\\t\\t<td>Guitar, violin</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<td>2007</td>\\n\\t\\t\\t\\t\\t<td>Training Days 2006 Drug Party</td>\\n\\t\\t\\t\\t\\t<td>Gackt</td>\\n\\t\\t\\t\\t\\t<td>Guitar</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<td>2010</td>\\n\\t\\t\\t\\t\\t<td>Visualive Arena Tour 2009 Requiem Et Reminiscence II</td>\\n\\t\\t\\t\\t\\t<td>Gackt</td>\\n\\t\\t\\t\\t\\t<td>Guitar, violin</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<td>2011</td>\\n\\t\\t\\t\\t\\t<td>YELLOW FRIED CHICKENz Kirameki Otokojuku - Danjo Konyoku Mizugi Matsuri</td>\\n\\t\\t\\t\\t\\t<td>Yellow Fried Chickenz</td>\\n\\t\\t\\t\\t\\t<td>Guitar</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<td>2011</td>\\n\\t\\t\\t\\t\\t<td>The Graffiti - Attack of The \\"Yellow Fried Chickenz\\" in Europe - \\"I Love You All\\"</td>\\n\\t\\t\\t\\t\\t<td>Yellow Fried Chickenz</td>\\n\\t\\t\\t\\t\\t<td>Guitar</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<td>2012</td>\\n\\t\\t\\t\\t\\t<td>WORLD TOUR *SHOW UR SOUL.I* Sekai Shoketsu Aikonsai at MAKUHARI 2011</td>\\n\\t\\t\\t\\t\\t<td>Yellow Fried Chickenz</td>\\n\\t\\t\\t\\t\\t<td>Guitar</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<td>2012</td>\\n\\t\\t\\t\\t\\t<td>WORLD TOUR *SHOW UR SOUL.I* Sekai Shoketsu Aikonsai at BERLIN 2011</td>\\n\\t\\t\\t\\t\\t<td>Yellow Fried Chickenz</td>\\n\\t\\t\\t\\t\\t<td>Guitar</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<td>2013</td>\\n\\t\\t\\t\\t\\t<td>Best of the Best I - 40th Birthday</td>\\n\\t\\t\\t\\t\\t<td>Gackt</td>\\n\\t\\t\\t\\t\\t<td>Guitar, violin</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<td>2013</td>\\n\\t\\t\\t\\t\\t<td>Best of the Best I - Xtasy</td>\\n\\t\\t\\t\\t\\t<td>Gackt</td>\\n\\t\\t\\t\\t\\t<td>Guitar, violin</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<td>2014</td>\\n\\t\\t\\t\\t\\t<td>2013 Kamui Gakuen de Semena Sai</td>\\n\\t\\t\\t\\t\\t<td>Gackt</td>\\n\\t\\t\\t\\t\\t<td>Guitar</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<td>2015</td>\\n\\t\\t\\t\\t\\t<td>2014 Kamui Gakuen de Matomena Sai</td>\\n\\t\\t\\t\\t\\t<td>Gackt</td>\\n\\t\\t\\t\\t\\t<td>Guitar</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<td>2016</td>\\n\\t\\t\\t\\t\\t<td>2015 Camui G School de Dashitekudasai</td>\\n\\t\\t\\t\\t\\t<td>Gackt</td>\\n\\t\\t\\t\\t\\t<td>Guitar</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<td>2017</td>\\n\\t\\t\\t\\t\\t<td>2016 Last Visualive Saigo no Tsuki</td>\\n\\t\\t\\t\\t\\t<td>Gackt</td>\\n\\t\\t\\t\\t\\t<td>Guitar</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<td>2017</td>\\n\\t\\t\\t\\t\\t<td>OTOKO-BAN - Hyakka Ryoran vs MMQ2016 -</td>\\n\\t\\t\\t\\t\\t<td>S.Q.F</td>\\n\\t\\t\\t\\t\\t<td>Guitar</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<td>2018</td>\\n\\t\\t\\t\\t\\t<td>MMQ2017</td>\\n\\t\\t\\t\\t\\t<td>S.Q.F</td>\\n\\t\\t\\t\\t\\t<td>Guitar</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<td>2018</td>\\n\\t\\t\\t\\t\\t<td>Sirque Du Freak 2018 - The Resonance -</td>\\n\\t\\t\\t\\t\\t<td>S.Q.F</td>\\n\\t\\t\\t\\t\\t<td>Guitar</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<td>2018</td>\\n\\t\\t\\t\\t\\t<td>GACKT\u2019s -45th Birthday Concert- LAST SONGS</td>\\n\\t\\t\\t\\t\\t<td>Gackt</td>\\n\\t\\t\\t\\t\\t<td>Guitar, violin</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t<td>2020</td>\\n\\t\\t\\t\\t\\t<td>95th Kamui \u2642\uFE0E Raku \\"Garden de Tobina Festival ~ 10th Anniversary...\\"</td>\\n\\t\\t\\t\\t\\t<td>Gackt</td>\\n\\t\\t\\t\\t\\t<td>Guitar</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t</tbody>\\n\\t\\t</table>\\n\\t</div>\\n</div>\\n\\n<p><a href=\\"/discography\\">&larr; Back to Discography</a></p>"],"names":[],"mappings":"AAoBC,gBAAgB,8BAAC,CAAC,AAEf,QAAQ,CAAE,QAAQ;AACtB,CAAC,AAEA,aAAa,8BAAC,CAAC,AAEZ,KAAK,CAAE,IAAI,CAEX,UAAU,CAAE,IAAI,CAEhB,aAAa,CAAE,IAAI;AACvB,CAAC,AAEA,WAAW,8BAAC,CAAC,AAEV,QAAQ,CAAE,QAAQ,CAElB,GAAG,CAAE,GAAG,CAER,MAAM,CAAE,GAAG,CAEX,KAAK,CAAE,GAAG,CAEV,OAAO,CAAE,EAAE,CAEX,KAAK,CAAE,IAAI,CAEX,gBAAgB,CAAE,gBAAgB,EAAE,CAAC,KAAK,CAAC,CAAC,IAAI,mBAAmB,CAAC,CAAC,CAErE,kBAAkB,CAAE,WAAW,CAE/B,mBAAmB,CAAE,8DAA8D,CAEnF,gBAAgB,CAAE;AACtB,CAAC,AAEA,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAExB,WAAW,8BAAC,CAAC,AAET,OAAO,CAAE,IAAI;IACjB,CAAC,AACL,CAAC,AAEA,KAAK,8BAAC,CAAC,AAEJ,aAAa,CAAE,IAAI,CAEnB,SAAS,CAAE,QAAQ,CAEnB,WAAW,CAAE,OAAO;AACxB,CAAC,AAEA,EAAE,8BAAC,CAAC,AAED,eAAe,CAAE,CAAC,CAElB,gBAAgB,CAAE,IAAI,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,CAAC,CAAC,IAAI,eAAe,CAAC,CAAC;AAC7D,CAAC,AAEA,gCAAE,CAAE,EAAE,8BAAC,CAAC,AAEL,YAAY,CAAE,GAAG,CAEjB,mBAAmB,CAAE,CAAC,CAEtB,YAAY,CAAE,IAAI,EAAE,CAAC,GAAG,CAAC,EAAE,CAAC,CAAC,CAAC,IAAI,mBAAmB,CAAC,CAAC,CAEvD,YAAY,CAAE,IAAI,CAElB,aAAa,CAAE,IAAI,CAEnB,WAAW,CAAE,MAAM,CAEnB,cAAc,CAAE,MAAM;AAC1B,CAAC,AAEA,iBAAE,CAAC,EAAE,eAAC,CAAC,AAEJ,SAAS,CAAE,OAAO,CAElB,WAAW,CAAE,IAAI;AACrB,CAAC"}`,
};
var Full_discography = create_ssr_component(
	($$result, $$props, $$bindings, slots) => {
		let $title, $$unsubscribe_title;
		$$unsubscribe_title = subscribe(title, (value) => ($title = value));
		let albumsTable,
			albumsFade,
			singlesTable,
			singlesFade,
			dvdsTable,
			dvdsFade;
		let { pageTitle = 'Full Discography' } = $$props;
		title.set(pageTitle);
		if (
			$$props.pageTitle === void 0 &&
			$$bindings.pageTitle &&
			pageTitle !== void 0
		)
			$$bindings.pageTitle(pageTitle);
		$$result.css.add(css$3);
		$$unsubscribe_title();
		return `${
			(($$result.head += `${
				(($$result.title = `<title>${escape($title)}</title>`), '')
			}`),
			'')
		}



<h2>${escape(pageTitle)}</h2>

<h3 id="${'studio-albums'}">Studio Albums</h3>
<div class="${'table-container svelte-14x1pov'}"><div class="${'table-fade svelte-14x1pov'}"${add_attribute(
			'this',
			albumsFade,
			0
		)}></div>
	<div class="${'table-scroll svelte-14x1pov'}"${add_attribute(
			'this',
			albumsTable,
			0
		)}><table class="${'svelte-14x1pov'}"><thead><tr><th class="${'svelte-14x1pov'}">Year</th>
					<th class="${'svelte-14x1pov'}">Title</th>
					<th class="${'svelte-14x1pov'}">Artist</th>
					<th class="${'svelte-14x1pov'}">Credits</th></tr></thead>
			<tbody><tr><td class="${'svelte-14x1pov'}">1994</td>
					<td class="${'svelte-14x1pov'}">CAINS:FEEL<br> <em class="${'svelte-14x1pov'}">demo tape</em></td>
					<td class="${'svelte-14x1pov'}">CAINS:FEEL</td>
					<td class="${'svelte-14x1pov'}">Guitar, writer</td></tr>
				<tr><td class="${'svelte-14x1pov'}">1999</td>
					<td class="${'svelte-14x1pov'}">Miz\xE9rable</td>
					<td class="${'svelte-14x1pov'}">Gackt</td>
					<td class="${'svelte-14x1pov'}">Guitar</td></tr>
				<tr><td class="${'svelte-14x1pov'}">2000</td>
					<td class="${'svelte-14x1pov'}">Mars</td>
					<td class="${'svelte-14x1pov'}">Gackt</td>
					<td class="${'svelte-14x1pov'}">Guitar, violin</td></tr>
				<tr><td class="${'svelte-14x1pov'}">2001</td>
					<td class="${'svelte-14x1pov'}">Rebirth</td>
					<td class="${'svelte-14x1pov'}">Gackt</td>
					<td class="${'svelte-14x1pov'}">Guitar, violin</td></tr>
				<tr><td class="${'svelte-14x1pov'}">2002</td>
					<td class="${'svelte-14x1pov'}">Moon</td>
					<td class="${'svelte-14x1pov'}">Gackt</td>
					<td class="${'svelte-14x1pov'}">Guitar, violin</td></tr>
				<tr><td class="${'svelte-14x1pov'}">2002</td>
					<td class="${'svelte-14x1pov'}">Air</td>
					<td class="${'svelte-14x1pov'}">Chachamaru</td>
					<td class="${'svelte-14x1pov'}">Writer (<em class="${'svelte-14x1pov'}">Metamorphose</em>)</td></tr>
				<tr><td class="${'svelte-14x1pov'}">2003</td>
					<td class="${'svelte-14x1pov'}">Crescent</td>
					<td class="${'svelte-14x1pov'}">Gackt</td>
					<td class="${'svelte-14x1pov'}">Guitar, violin</td></tr>
				<tr><td class="${'svelte-14x1pov'}">2004</td>
					<td class="${'svelte-14x1pov'}">The Seventh Night ~Unplugged~</td>
					<td class="${'svelte-14x1pov'}">Gackt</td>
					<td class="${'svelte-14x1pov'}">Guitar</td></tr>
				<tr><td class="${'svelte-14x1pov'}">2005</td>
					<td class="${'svelte-14x1pov'}">Love Letter</td>
					<td class="${'svelte-14x1pov'}">Gackt</td>
					<td class="${'svelte-14x1pov'}">Guitar</td></tr>
				<tr><td class="${'svelte-14x1pov'}">2005</td>
					<td class="${'svelte-14x1pov'}">Diabolos</td>
					<td class="${'svelte-14x1pov'}">Gackt</td>
					<td class="${'svelte-14x1pov'}">Guitar</td></tr>
				<tr><td class="${'svelte-14x1pov'}">2009</td>
					<td class="${'svelte-14x1pov'}">Re:Born</td>
					<td class="${'svelte-14x1pov'}">Gackt</td>
					<td class="${'svelte-14x1pov'}">Guitar, violin</td></tr>
				<tr><td class="${'svelte-14x1pov'}">2010</td>
					<td class="${'svelte-14x1pov'}">Are You &quot;Fried Chickenz&quot;??</td>
					<td class="${'svelte-14x1pov'}">Gackt</td>
					<td class="${'svelte-14x1pov'}">Guitar</td></tr>
				<tr><td class="${'svelte-14x1pov'}">2012</td>
					<td class="${'svelte-14x1pov'}">Yellow Fried Chickenz I</td>
					<td class="${'svelte-14x1pov'}">Yellow Fried Chickenz</td>
					<td class="${'svelte-14x1pov'}">Guitar, writer (<em class="${'svelte-14x1pov'}">Circle</em>, <em class="${'svelte-14x1pov'}">Mata kokode aimassho</em>, <em class="${'svelte-14x1pov'}">Not Alone - Kimi Wa Hitori Ja Nai</em>)</td></tr>
				<tr><td class="${'svelte-14x1pov'}">2014</td>
					<td class="${'svelte-14x1pov'}">Lady Imagination</td>
					<td class="${'svelte-14x1pov'}">Pokota</td>
					<td class="${'svelte-14x1pov'}">Writer (<em class="${'svelte-14x1pov'}">white love</em>)</td></tr>
				<tr><td class="${'svelte-14x1pov'}">2016</td>
					<td class="${'svelte-14x1pov'}">Last Moon</td>
					<td class="${'svelte-14x1pov'}">Gackt</td>
					<td class="${'svelte-14x1pov'}">Guitar, violin,<br>arrangement, programming</td></tr></tbody></table></div></div>

<h3 id="${'singles'}">Singles</h3>
<div class="${'table-container svelte-14x1pov'}"><div class="${'table-fade svelte-14x1pov'}"${add_attribute(
			'this',
			singlesFade,
			0
		)}></div>
	<div class="${'table-scroll svelte-14x1pov'}"${add_attribute(
			'this',
			singlesTable,
			0
		)}><table class="${'svelte-14x1pov'}"><thead><tr><th class="${'svelte-14x1pov'}">Year</th>
					<th class="${'svelte-14x1pov'}">Title</th>
					<th class="${'svelte-14x1pov'}">Artist</th>
					<th class="${'svelte-14x1pov'}">Credits</th></tr></thead>
			<tbody><tr><td class="${'svelte-14x1pov'}">1994</td>
					<td class="${'svelte-14x1pov'}">-Lie-</td>
					<td class="${'svelte-14x1pov'}">CAINS:FEEL</td>
					<td class="${'svelte-14x1pov'}">Guitar</td></tr>
				<tr><td class="${'svelte-14x1pov'}">1999-2016</td>
					<td class="${'svelte-14x1pov'}"><em class="${'svelte-14x1pov'}">Titles coming soon</em></td>
					<td class="${'svelte-14x1pov'}">Gackt</td>
					<td class="${'svelte-14x1pov'}">Guitar, violin</td></tr>
				<tr><td class="${'svelte-14x1pov'}">2011</td>
					<td class="${'svelte-14x1pov'}">All My Love / You Are the Reason</td>
					<td class="${'svelte-14x1pov'}">Yellow Fried Chickenz</td>
					<td class="${'svelte-14x1pov'}">Guitar</td></tr>
				<tr><td class="${'svelte-14x1pov'}">2011</td>
					<td class="${'svelte-14x1pov'}">The End of the Day</td>
					<td class="${'svelte-14x1pov'}">Yellow Fried Chickenz</td>
					<td class="${'svelte-14x1pov'}">Guitar</td></tr>
				<tr><td class="${'svelte-14x1pov'}">2016</td>
					<td class="${'svelte-14x1pov'}">Winter Express</td>
					<td class="${'svelte-14x1pov'}">S.Q.F</td>
					<td class="${'svelte-14x1pov'}">Guitar, writer</td></tr>
				<tr><td class="${'svelte-14x1pov'}">2017</td>
					<td class="${'svelte-14x1pov'}">Egoistic Game</td>
					<td class="${'svelte-14x1pov'}">S.Q.F</td>
					<td class="${'svelte-14x1pov'}">Guitar, writer</td></tr>
				<tr><td class="${'svelte-14x1pov'}">2017</td>
					<td class="${'svelte-14x1pov'}">ETERNAL CHILD</td>
					<td class="${'svelte-14x1pov'}">S.Q.F</td>
					<td class="${'svelte-14x1pov'}">Guitar, writer</td></tr>
				<tr><td class="${'svelte-14x1pov'}">2017</td>
					<td class="${'svelte-14x1pov'}">PARADIGM SHIFT</td>
					<td class="${'svelte-14x1pov'}">S.Q.F</td>
					<td class="${'svelte-14x1pov'}">Guitar, writer</td></tr>
				<tr><td class="${'svelte-14x1pov'}">2017</td>
					<td class="${'svelte-14x1pov'}">iDOL</td>
					<td class="${'svelte-14x1pov'}">S.Q.F</td>
					<td class="${'svelte-14x1pov'}">Guitar, writer</td></tr></tbody></table></div></div>

<h3 id="${'live-music-dvds'}">Live Music DVDs</h3>
<div class="${'table-container svelte-14x1pov'}"><div class="${'table-fade svelte-14x1pov'}"${add_attribute(
			'this',
			dvdsFade,
			0
		)}></div>
	<div class="${'table-scroll svelte-14x1pov'}"${add_attribute(
			'this',
			dvdsTable,
			0
		)}><table class="${'svelte-14x1pov'}"><thead><tr><th class="${'svelte-14x1pov'}">Year</th>
					<th class="${'svelte-14x1pov'}">Title</th>
					<th class="${'svelte-14x1pov'}">Artist</th>
					<th class="${'svelte-14x1pov'}">Credits</th></tr></thead>
			<tbody><tr><td class="${'svelte-14x1pov'}">2000</td>
					<td class="${'svelte-14x1pov'}">Mars Sora Kara no Homonsha: Kais\u014D</td>
					<td class="${'svelte-14x1pov'}">Gackt</td>
					<td class="${'svelte-14x1pov'}">Guitar, violin</td></tr>
				<tr><td class="${'svelte-14x1pov'}">2001</td>
					<td class="${'svelte-14x1pov'}">Requiem et Reminiscence (Shuuen to Seijyaku)</td>
					<td class="${'svelte-14x1pov'}">Gackt</td>
					<td class="${'svelte-14x1pov'}">Guitar, violin</td></tr>
				<tr><td class="${'svelte-14x1pov'}">2003</td>
					<td class="${'svelte-14x1pov'}">Live Tour 2002 Kagen no Tsuki (Seiya no Shirabe)</td>
					<td class="${'svelte-14x1pov'}">Gackt</td>
					<td class="${'svelte-14x1pov'}">Guitar, violin</td></tr>
				<tr><td class="${'svelte-14x1pov'}">2003</td>
					<td class="${'svelte-14x1pov'}">Live Tour 2003 Jougen no Tsuki (Saishusho)</td>
					<td class="${'svelte-14x1pov'}">Gackt</td>
					<td class="${'svelte-14x1pov'}">Guitar, violin</td></tr>
				<tr><td class="${'svelte-14x1pov'}">2004</td>
					<td class="${'svelte-14x1pov'}">Live Tour 2004 The Sixth Day &amp; Seventh Night (Final)</td>
					<td class="${'svelte-14x1pov'}">Gackt</td>
					<td class="${'svelte-14x1pov'}">Guitar, violin</td></tr>
				<tr><td class="${'svelte-14x1pov'}">2006</td>
					<td class="${'svelte-14x1pov'}">Live Tour 2005 Diabolos (Aien no Shi to Seiya no Namida)</td>
					<td class="${'svelte-14x1pov'}">Gackt</td>
					<td class="${'svelte-14x1pov'}">Guitar, violin</td></tr>
				<tr><td class="${'svelte-14x1pov'}">2007</td>
					<td class="${'svelte-14x1pov'}">Training Days 2006 Drug Party</td>
					<td class="${'svelte-14x1pov'}">Gackt</td>
					<td class="${'svelte-14x1pov'}">Guitar</td></tr>
				<tr><td class="${'svelte-14x1pov'}">2010</td>
					<td class="${'svelte-14x1pov'}">Visualive Arena Tour 2009 Requiem Et Reminiscence II</td>
					<td class="${'svelte-14x1pov'}">Gackt</td>
					<td class="${'svelte-14x1pov'}">Guitar, violin</td></tr>
				<tr><td class="${'svelte-14x1pov'}">2011</td>
					<td class="${'svelte-14x1pov'}">YELLOW FRIED CHICKENz Kirameki Otokojuku - Danjo Konyoku Mizugi Matsuri</td>
					<td class="${'svelte-14x1pov'}">Yellow Fried Chickenz</td>
					<td class="${'svelte-14x1pov'}">Guitar</td></tr>
				<tr><td class="${'svelte-14x1pov'}">2011</td>
					<td class="${'svelte-14x1pov'}">The Graffiti - Attack of The &quot;Yellow Fried Chickenz&quot; in Europe - &quot;I Love You All&quot;</td>
					<td class="${'svelte-14x1pov'}">Yellow Fried Chickenz</td>
					<td class="${'svelte-14x1pov'}">Guitar</td></tr>
				<tr><td class="${'svelte-14x1pov'}">2012</td>
					<td class="${'svelte-14x1pov'}">WORLD TOUR *SHOW UR SOUL.I* Sekai Shoketsu Aikonsai at MAKUHARI 2011</td>
					<td class="${'svelte-14x1pov'}">Yellow Fried Chickenz</td>
					<td class="${'svelte-14x1pov'}">Guitar</td></tr>
				<tr><td class="${'svelte-14x1pov'}">2012</td>
					<td class="${'svelte-14x1pov'}">WORLD TOUR *SHOW UR SOUL.I* Sekai Shoketsu Aikonsai at BERLIN 2011</td>
					<td class="${'svelte-14x1pov'}">Yellow Fried Chickenz</td>
					<td class="${'svelte-14x1pov'}">Guitar</td></tr>
				<tr><td class="${'svelte-14x1pov'}">2013</td>
					<td class="${'svelte-14x1pov'}">Best of the Best I - 40th Birthday</td>
					<td class="${'svelte-14x1pov'}">Gackt</td>
					<td class="${'svelte-14x1pov'}">Guitar, violin</td></tr>
				<tr><td class="${'svelte-14x1pov'}">2013</td>
					<td class="${'svelte-14x1pov'}">Best of the Best I - Xtasy</td>
					<td class="${'svelte-14x1pov'}">Gackt</td>
					<td class="${'svelte-14x1pov'}">Guitar, violin</td></tr>
				<tr><td class="${'svelte-14x1pov'}">2014</td>
					<td class="${'svelte-14x1pov'}">2013 Kamui Gakuen de Semena Sai</td>
					<td class="${'svelte-14x1pov'}">Gackt</td>
					<td class="${'svelte-14x1pov'}">Guitar</td></tr>
				<tr><td class="${'svelte-14x1pov'}">2015</td>
					<td class="${'svelte-14x1pov'}">2014 Kamui Gakuen de Matomena Sai</td>
					<td class="${'svelte-14x1pov'}">Gackt</td>
					<td class="${'svelte-14x1pov'}">Guitar</td></tr>
				<tr><td class="${'svelte-14x1pov'}">2016</td>
					<td class="${'svelte-14x1pov'}">2015 Camui G School de Dashitekudasai</td>
					<td class="${'svelte-14x1pov'}">Gackt</td>
					<td class="${'svelte-14x1pov'}">Guitar</td></tr>
				<tr><td class="${'svelte-14x1pov'}">2017</td>
					<td class="${'svelte-14x1pov'}">2016 Last Visualive Saigo no Tsuki</td>
					<td class="${'svelte-14x1pov'}">Gackt</td>
					<td class="${'svelte-14x1pov'}">Guitar</td></tr>
				<tr><td class="${'svelte-14x1pov'}">2017</td>
					<td class="${'svelte-14x1pov'}">OTOKO-BAN - Hyakka Ryoran vs MMQ2016 -</td>
					<td class="${'svelte-14x1pov'}">S.Q.F</td>
					<td class="${'svelte-14x1pov'}">Guitar</td></tr>
				<tr><td class="${'svelte-14x1pov'}">2018</td>
					<td class="${'svelte-14x1pov'}">MMQ2017</td>
					<td class="${'svelte-14x1pov'}">S.Q.F</td>
					<td class="${'svelte-14x1pov'}">Guitar</td></tr>
				<tr><td class="${'svelte-14x1pov'}">2018</td>
					<td class="${'svelte-14x1pov'}">Sirque Du Freak 2018 - The Resonance -</td>
					<td class="${'svelte-14x1pov'}">S.Q.F</td>
					<td class="${'svelte-14x1pov'}">Guitar</td></tr>
				<tr><td class="${'svelte-14x1pov'}">2018</td>
					<td class="${'svelte-14x1pov'}">GACKT\u2019s -45th Birthday Concert- LAST SONGS</td>
					<td class="${'svelte-14x1pov'}">Gackt</td>
					<td class="${'svelte-14x1pov'}">Guitar, violin</td></tr>
				<tr><td class="${'svelte-14x1pov'}">2020</td>
					<td class="${'svelte-14x1pov'}">95th Kamui \u2642\uFE0E Raku &quot;Garden de Tobina Festival ~ 10th Anniversary...&quot;</td>
					<td class="${'svelte-14x1pov'}">Gackt</td>
					<td class="${'svelte-14x1pov'}">Guitar</td></tr></tbody></table></div></div>

<p><a href="${'/discography'}">\u2190 Back to Discography</a></p>`;
	}
);
var fullDiscography = /* @__PURE__ */ Object.freeze({
	__proto__: null,
	[Symbol.toStringTag]: 'Module',
	default: Full_discography,
});
var Life_short_film = create_ssr_component(
	($$result, $$props, $$bindings, slots) => {
		let $title, $$unsubscribe_title;
		$$unsubscribe_title = subscribe(title, (value) => ($title = value));
		let { pageTitle = 'Life from Soyokaze' } = $$props;
		title.set(pageTitle);
		if (
			$$props.pageTitle === void 0 &&
			$$bindings.pageTitle &&
			pageTitle !== void 0
		)
			$$bindings.pageTitle(pageTitle);
		$$unsubscribe_title();
		return `${
			(($$result.head += `${
				(($$result.title = `<title>${escape($title)}</title>`), '')
			}`),
			'')
		}

<h2>${escape(pageTitle)}</h2>

<p><em>Life</em> is a short film from Gackt&#39;s <em>Soyokaze</em> VHS, starring Gackt and You. It was released in 2002 and is linked to the MOON story and concept.</p>

<p>Gackt has mentioned in interviews that the concept for the video was inspired by the German film, ${validate_component(
			Link,
			'Link'
		).$$render(
			$$result,
			{
				href: 'https://www.imdb.com/title/tt0093191/',
			},
			{},
			{
				default: () => `<em>Wings of Desire</em>`,
			}
		)}, from 1987, which was shot in black and white. This features angels in the mortal world who wear long dark coats, and one angel decides to &#39;fall from grace&#39; after falling in love with a human. There&#39;s an American remake called ${validate_component(
			Link,
			'Link'
		).$$render(
			$$result,
			{
				href: 'https://www.imdb.com/title/tt0120632/',
			},
			{},
			{ default: () => `<em>City of Angels</em>` }
		)}.</p>

<h3>Watch on Youtube</h3>
<iframe title="${'Life'}" class="${'mb-4'}" src="${'https://www.youtube.com/embed/a1hBJimcnQc'}" frameborder="${'0'}" allow="${'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'}" allowfullscreen></iframe>

<h3>Download</h3>
<p><em>Soyokaze</em> seems pretty difficult to get hold of these days, so I&#39;ve uploaded <em>Life</em> ${validate_component(
			Link,
			'Link'
		).$$render(
			$$result,
			{
				href: 'downloads/life-soyokaze.mp4',
				download: 'life soyokaze video',
			},
			{},
			{ default: () => `here for download` }
		)} (~60MB).</p>

<h3>Transcript &amp; Translation</h3>

<h4>Life~\u305D\u3088\u98A8</h4>

<p>YOU: \u751F\u307E\u308C\u3044\u3067\u305F\u6642\u304B\u3089\u50D5\u306F\u8AB0\u304B\u306B\u898B\u5B88\u3089\u308C\u3066\u3044\u308B\u3088\u3046\u306A\u6C17\u304C\u3059\u308B\u3002<br>
\u3060\u304B\u3089\u5171\u540C\u3055\u3048\u3082\u4E57\u308A\u8D8A\u3048\u3089\u308C\u308B\u304B\u3082\u3057\u308C\u306A\u3044\u3002</p>

<p>From the time I was born, I&#39;ve felt there was someone watching over me.<br>
And so, perhaps I will overcome even this cooperation...</p>

<p>GACKT: \u305D\u3046------\u79C1\u304C\u305A\u3063\u3068\u5B88\u3063\u3066\u3044\u308B\u306E\u3060\u304B\u3089\u3002<br>
\u5F7C\u306F\u307E\u3060\u79C1\u306E\u5B58\u5728\u306B\u6C17\u3065\u3044\u3066\u306F\u3044\u306A\u3044\u3002</p>

<p>That&#39;s right... because I have been protecting him...<br>
He is still not aware of my existence.</p>

<p>YOU/GACKT: \u8FF7\u3044\u304C\u50D5\u306B\u8986\u3044\u304B\u3076\u3055\u308B\u6642\u3001\u50D5\u306F\u4F55\u304B\u3092\u6C42\u3081\u3066\u5F77\u5FA8\u3044\u6B69\u304F\u3002<br>
\u3069\u3053\u304B\u3089\u304B\u58F0\u304C\u805E\u3053\u3048\u3066\u304F\u308B\u3088\u3046\u306A\u305D\u3093\u306A\u6C17\u304C\u3059\u308B\u304B\u3089\u3002</p>

<p>When uncertainty bears down on me, I wander aimlessly in search of something...<br>
I feel as though I can hear a voice... coming from somewhere...</p>

<p>GACKT: \u50D5\u306E\u4E2D\u306B\u5B58\u5728\u3059\u308B\u50D5\u3067\u306F\u306A\u3044\u5B58\u5728\u3002<br>
\u5F7C\u306E\u4E2D\u306B\u5B58\u5728\u3059\u308B\u4F55\u8005\u3067\u3082\u306A\u3044\u5B58\u5728\u3002<br>
\u4E09\u3064\u306E\u8996\u70B9\u304B\u3089\u5F7C\u3092\u5BDF\u77E5\u3057\u3066\u307F\u308B\u3002</p>

<p>It exists within me, an existence that is not me.<br>
It exists within him, an existence that is no one at all.<br>
From three perspectives, I sense him and watch.</p>

<p>\u5F7C\u306E\u8FF7\u3044\u3092\u53D6\u308A\u53BB\u308B\u3053\u3068\u306F\u79C1\u306B\u306F\u3067\u304D\u306A\u3044\u3002<br>
\u305D\u3046------\u4ECA\u306E\u79C1\u306B\u306F\u307E\u3060\u3067\u304D\u306A\u3044\u306E\u3060\u3002</p>

<p>I cannot remove his uncertainty.<br>
No... even now, I still cannot.</p>

<p>\u79C1\u306F\u3044\u3064\u3082\u5F7C\u306E\u5F8C\u3092\u8FFD\u3063\u3066\u3044\u308B</p>

<p>I am always following behind him.</p>

<p>\u5F7C\u304C\u4ECA\u4F55\u3092\u611F\u3058\u3066\u3044\u308B\u306E\u304B<br>
\u5F7C\u306F\u4ECA\u4F55\u3092\u8003\u3048\u3066\u3044\u308B\u306E\u304B<br>
\u5F7C\u306B\u89E6\u308C\u308B\u77AC\u9593\u3001\u307E\u308B\u3067\u79C1\u306E\u3053\u3068\u306E\u3088\u3046\u306B\u624B\u306B\u53D6\u308B\u3088\u3046\u306B\u308F\u304B\u308B\u3002</p>

<p>What is he feeling now?<br>
What is he thinking now?<br>
The moment I touch him, I know it as though it was myself I had touched...</p>

<p>\u53E4\u4EE3\u304B\u3089\u4EBA\u306F\u697D\u5712\u3092\u6C42\u3081\u3001\u305D\u3057\u3066\u305D\u306E\u4EBA\u9054\u306E\u591A\u304F\u306F\u7A7A\u306B\u8FD1\u3044\u5834\u6240\u3092\u6C42\u3081\u7D9A\u3051\u305F\u3002<br>
\u8AB0\u306B\u3082\u89E6\u308C\u3089\u308C\u306A\u3044\u6697\u96F2\u3092\u6D88\u3057\u53BB\u308B\u9375\u304C\u3042\u308B\u3088\u3046\u306A\u305D\u3093\u306A\u6C17\u304C\u3057\u305F\u306E\u3060\u308D\u3046\u3002<br>
\u9060\u3044\u8A18\u61B6\u306B\u7E1B\u3089\u308C\u305F\u5F7C\u3089\u306F\u4ECA\u3082\u306A\u304A\u3001\u7A7A\u306B\u61A7\u308C\u7D9A\u3051\u308B\u3002</p>

<p>From ancient times, people have sought paradise, and many such people continue to seek that place that is so close to the sky.<br>
I wonder if people sense there is some key that will erase the dark clouds no one can touch...<br>
Those who are tied down by distant memories, even now, continue to long for the sky.</p>

<p>\u3042\u308B\u6642\u671F\u4EBA\u306F\u81EA\u5206\u304C\u4ED6\u4EBA\u3068\u306F\u9055\u3046\u7279\u5225\u306A\u5B58\u5728\u306A\u306E\u3067\u306F\u306A\u3044\u304B\u3068\u601D\u3044\u3001\u305D\u3057\u3066\u60A9\u3080\u3002</p>

<p>At times, people think, &quot;Am I not different from others? Is my existence not special?&quot;, and they are troubled...</p>

<p>\u5B64\u7ACB\u3059\u308B\u3002</p>

<p>Isolated...</p>

<p>\u98FD\u548C\u72B6\u614B\u306E\u4E2D\u3067\u5B58\u5728\u3059\u308B\u7A7A\u6C17\u306F<br>
\u5F7C\u306F\u5354\u8ABF\u3092\u907F\u3051\u3001\u5B64\u72EC\u306B\u9665\u308B\u3002</p>

<p>He avoids cooperation in the atmosphere that exists within the saturation, and sinks into solitude.</p>

<p>\u79C1\u306F\u5F7C\u306E\u8FF7\u3044\u306E\u6839\u6E90\u306B\u89E6\u308C\u3088\u3046\u3068\u540C\u3058\u3088\u3046\u306B\u4EBA\u3005\u306E\u6DF7\u6C8C\u306B\u8DB3\u3092\u8E0F\u307F\u5165\u308C\u305F\u3002</p>

<p>Like trying to touch the source of his uncertainty, in people&#39;s confusion, they trample upon it.</p>

<p>\u8089\u4F53\u306E\u98FD\u548C\u72B6\u614B\u3002</p>

<p>Saturation of the body...</p>

<p>\u9B42\u306E\u7A7A\u865A\u3002</p>

<p>Emptiness of the soul...</p>

<p>\u5F7C\u306E\u6DF7\u6C8C\u306E\u539F\u56E0\u306F\u305D\u308C\u3060\u3051\u3067\u306F\u306A\u3044\u3002<br>
\u4ED6\u306B\u3042\u308B\u3002</p>

<p>That is not the only source of his confusion.</p>

<p>There are others...</p>

<p>\u79C1\u306F\u5358\u4E00\u306E\u5B58\u5728\u3067\u306F\u306A\u3044\u3002<br>
\u6545\u306B\u4E00\u4EBA\u3067\u3082\u5B64\u72EC\u3067\u306F\u306A\u3044\u3002</p>

<p>Mine is not a singular existence.<br>
And so, even alone, I am not alone.</p>

<p>\u5F7C\u306F\u4EBA\u3067\u3042\u308B\u304C\u6545\u306B\u5ACC\u3044\u306A\u306F\u305A\u306E\u5B64\u72EC\u3092\u611B\u3057\u3066\u3057\u307E\u3063\u305F\u306E\u304B</p>

<p>Although he is human, does he then love the solitude which he should despise?</p>

<p>\u5225\u306E\u79C1\u304C\u5F7C\u306B\u89E6\u308C\u308B\u3053\u3068\u3092\u90AA\u9B54\u3059\u308B\u3002<br>
\u3044\u3064\u306E\u307E\u306B\u304B\u5F7C\u306E\u59FF\u304C\u79C1\u306B\u306F\u898B\u3048\u306A\u304F\u306A\u3063\u305F\u6642<br>
\u5F7C\u306E\u5B58\u5728\u304C\u79C1\u306B\u89E6\u308C\u3066\u3044\u308B\u3088\u3046\u306A\u3000\u305D\u3093\u306A\u6C17\u304C\u3057\u305F\u3002</p>

<p>Another me is prevented from touching him.<br>
When, before I know it, I can no longer see him.<br>
I feel as though his existence is touching me...</p>

<p>\u5F7C\u306F\u307E\u3060\u79C1\u306E\u5B58\u5728\u306B\u660E\u78BA\u306B\u6C17\u3065\u3044\u3066\u3044\u306A\u3044</p>

<p>Although he is still unaware of mine.</p>

<p>Translation by <strong>muchuu</strong>, originally on myspace and later found ${validate_component(
			Link,
			'Link'
		).$$render(
			$$result,
			{
				href: 'https://dears.livejournal.com/1817818.html',
			},
			{},
			{ default: () => `on LJ` }
		)} \u2764\uFE0F</p>

<p><a href="${'/discography/appearances'}">\u2190 Back to Appearances</a></p>`;
	}
);
var lifeShortFilm = /* @__PURE__ */ Object.freeze({
	__proto__: null,
	[Symbol.toStringTag]: 'Module',
	default: Life_short_film,
});
var Nine_nine_radio = create_ssr_component(
	($$result, $$props, $$bindings, slots) => {
		let $title, $$unsubscribe_title;
		$$unsubscribe_title = subscribe(title, (value) => ($title = value));
		let { pageTitle = 'Radio Phone Call from nine*nine' } = $$props;
		title.set(pageTitle);
		if (
			$$props.pageTitle === void 0 &&
			$$bindings.pageTitle &&
			pageTitle !== void 0
		)
			$$bindings.pageTitle(pageTitle);
		$$unsubscribe_title();
		return `${
			(($$result.head += `${
				(($$result.title = `<title>${escape($title)}</title>`), '')
			}`),
			'')
		}

<h2>${escape(pageTitle)}</h2>

<p>The following is from a radio broadcast that was included on a DVD in Gackt&#39;s <em>nine*nine</em> box set. The broadcast was held by Gackt and one of his staff members. They mainly talk about the beginning of Gackt&#39;s solo career in 1999, and Miyavi and Kamijo appear as guests. Later on in the show, around 3am, You calls in and has a short conversation with Gackt.</p>

<h3>Watch on Youtube</h3>
<iframe title="${'Life'}" class="${'mb-4'}" src="${'https://www.youtube.com/embed/d1HitQ9jTxY'}" frameborder="${'0'}" allow="${'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'}" allowfullscreen></iframe>

<h3>Transcript &amp; Translation</h3>

<p>You: Morimori (&#39;Hello&#39; in Kansai dialect)<br>
	Gackt: You&#39;re not motivated huh?<br>
	You: Yeahh, I&#39;m tireddd...<br>
	Gackt: You&#39;re just on the phone, I&#39;m in the studio recording right now!<br>
	You: Tell everybody what time it is<br>
	Gackt: Hm now? 3:10 AM...<br>
	You: hahahahaha<br>
	Gackt: This feels good this tension!<br>
	You: Ahhhh... *sigh*<br>
	Gackt: I did it right?<br>
	You: Yeah<br>
	Gackt: Did you think I could do it?<br>
	You: Hmm...<br>
	Gackt: By the way, what colour are your pants (underwear)?<br>
	You: Wait a minute...<br>
	Gackt: hahahahaha<br>
	You: I have to check... Wait... Hmmm... cream color. hahahahaha<br>
	Gackt: HAHAHAHA !! What a fool you are!<br>
	You: hahahahaha<br>
	Gackt: (To the staff member) We&#39;re good friends huh? Isn&#39;t it strange?<br>
	Staff: It is<br>
	Gackt: It is right?!<br>
	Staff: Are you dating / going out together?<br>
	Gackt: Yes we are<br>
	You: hahahahaha<br>
	Gackt: We&#39;ve been so close for 17 years, isn&#39;t it so strange? He&#39;s my childhood friend, my family, my best friend, my intimate friend, we even work together, he&#39;s also my &quot;member&quot; (band member), we&#39;re playing on the same stage, we realised our dream together, isn&#39;t it great?!<br>
	Staff: You&#39;re lovers too<br>
	Gackt: RIGHT! hahahahahaha Ok time to end the conversation...<br>
	You: Yes!<br>
	Gackt: Don&#39;t just say &quot;yes&quot;! Can&#39;t you just talk? hahahaha<br>
	You: Well then &quot;eeeeeeeee??&quot;<br>
	Gackt: But WHO are you??<br>
	You: Or &quot;already over??&quot; (as in, isn&#39;t the conversation already over..)<br>
	Gackt: Well then, give a message to the fans<br>
	You: A message...<br>
	Gackt: So cute...!<br>
	You: What are you talking about? What are you looking at?<br>
	Gackt: Kyonkyon (Kyoku Koizumi from morning musume)<br>
	You: What?? From when?<br>
	Gackt: 10 years ago<br>
	You: alalalalala...<br>
	Gackt: She is really cute<br>
	Staff: The message, the message...<br>
	You: Ah the message!<br>
	Gackt: Ohh but you take so long!<br>
	You: Well then...<br>
	Gackt: Cute<br>
	You: This year during the live shows, let&#39;s have fun baby, I love you!<br>
	Gackt: hn who is this? (looking at magazines)<br>
	Staff and You: hahahahahaha<br>
	You: Heh? You ignore me?<br>
	Gackt: Thank you. Well, You...<br>
	You: hahahaha really?!<br>
	Gackt: Thanks<br>
	You: No probs, bye bye<br>
	Gackt: Bye!
</p>

<p>Original translation by <strong>emi1002</strong> on Youtube \u2764\uFE0F</p>

<p><a href="${'/discography/appearances'}">\u2190 Back to Appearances</a></p>`;
	}
);
var nineNineRadio = /* @__PURE__ */ Object.freeze({
	__proto__: null,
	[Symbol.toStringTag]: 'Module',
	default: Nine_nine_radio,
});
var Appearances = create_ssr_component(
	($$result, $$props, $$bindings, slots) => {
		let $title, $$unsubscribe_title;
		$$unsubscribe_title = subscribe(title, (value) => ($title = value));
		let { pageTitle = 'Appearances' } = $$props;
		title.set(pageTitle);
		if (
			$$props.pageTitle === void 0 &&
			$$bindings.pageTitle &&
			pageTitle !== void 0
		)
			$$bindings.pageTitle(pageTitle);
		$$unsubscribe_title();
		return `${
			(($$result.head += `${
				(($$result.title = `<title>${escape($title)}</title>`), '')
			}`),
			'')
		}

<h2>${escape(pageTitle)}</h2>

<h3>DVDs/Videos</h3>

<p>Alongside <a href="${'discography/full-discography#live-music-dvds'}">live tour DVDs</a>, You has also appeared in the following:</p>

<ul><li>He played <em>Jun</em> in ${validate_component(Link, 'Link').$$render(
			$$result,
			{
				href: 'https://www.imdb.com/title/tt0365514/',
			},
			{},
			{ default: () => `Moon Child` }
		)} (2003)</li>
	<li><em>Life</em> short film, from Gackt&#39;s <em>Soyokaze</em> VHS (2002) <a href="${'discography/life-short-film'}">Read more\xA0\u2192</a></li>
	<li>Gackt PVs: <em>Mirror</em>, <em>ANOTHER WORLD</em>, <em>Juunigatsu no love song</em>, <em>Black Stone</em> &amp; <em>Redemption</em></li>
	<li>Yellow Fried Chickenz PVs: <em>All My Love</em> &amp; <em>Mata koko de Aimashou</em></li>
	<li>Gackt&#39;s <em>Gekkou</em> DVD (2003)</li>
	<li>Phone call on the radio between You and Gackt, from the <em>nine*nine</em> box set (2008) <a href="${'discography/nine-nine-radio'}">Read more\xA0\u2192</a></li>
	<li>Gackt&#39;s Platinum Boxes (DVDs)</li>
	<li>Gackt and You gave advice on bisexual relationships on NicoNico from 2015.07.01 (Subbed video on ${validate_component(
		Link,
		'Link'
	).$$render(
		$$result,
		{ href: 'https://youtu.be/f4Tdz24iRPI' },
		{},
		{
			default: () => `Youtube from Yuzu Translations`,
		}
	)}. There&#39;s two other parts/sections to this video ${validate_component(
			Link,
			'Link'
		).$$render(
			$$result,
			{ href: 'https://youtu.be/Z9W-f5qJFGc' },
			{},
			{ default: () => `here` }
		)} and ${validate_component(Link, 'Link').$$render(
			$$result,
			{ href: 'https://youtu.be/-ogP-Vc2SUA' },
			{},
			{ default: () => `here` }
		)}.)</li></ul>

<h3>CDs</h3>
<ul><li>Lyric booklet that comes with Gackt&#39;s <em>Moon</em> album</li>
	<li>Lyric booklet that comes with Gackt&#39;s <em>The Seventh Night</em> album</li></ul>

<h3>Books</h3>
<ul><li>Gackt&#39;s <em>Mizerable ~Unmei~</em> photobook</li>
	<li>All of Gackt&#39;s tour document photobooks (<em>The Gift</em>, <em>Just Bring it!</em> etc)</li>
	<li>The Crescent side of <em>The Air Moon</em></li>
	<li>Gackt File 1999-2004</li></ul>

<h3>Magazines*</h3>
<ul><li><em>Shoxx</em> May 1999</li>
	<li>UV 100 magazine</li>
	<li>Motto2 vol. 01</li>
	<li>Motto2 vol. 08</li></ul>

<h3>Other</h3>
<ul><li>Gackt Dears fan club videos</li>
	<li>Interviews with Gackt</li>
	<li>Gackt&#39;s radio show</li>
	<li>Modeling jewelery for ${validate_component(Link, 'Link').$$render(
		$$result,
		{ href: 'http://h-darts.com' },
		{},
		{ default: () => `h-Darts` }
	)}</li>
	<li>${validate_component(Link, 'Link').$$render(
		$$result,
		{
			href: 'http://www.executivemonthly.com/english/about/index.php',
		},
		{},
		{ default: () => `Executive Monthly` }
	)} CM. He&#39;s sitting at the bar talking to a girl.</li></ul>

<p><em class="${'text-sm'}">There&#39;s loads more... these lists are definitely a work in progress.</em></p>

<p><a href="${'/discography'}">\u2190 Back to Discography</a></p>`;
	}
);
var appearances = /* @__PURE__ */ Object.freeze({
	__proto__: null,
	[Symbol.toStringTag]: 'Module',
	default: Appearances,
});
var About_you = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $title, $$unsubscribe_title;
	$$unsubscribe_title = subscribe(title, (value) => ($title = value));
	let { pageTitle = 'About You' } = $$props;
	title.set(pageTitle);
	if (
		$$props.pageTitle === void 0 &&
		$$bindings.pageTitle &&
		pageTitle !== void 0
	)
		$$bindings.pageTitle(pageTitle);
	$$unsubscribe_title();
	return `${
		(($$result.head += `${
			(($$result.title = `<title>${escape($title)}</title>`), '')
		}`),
		'')
	}

<h2>${escape(pageTitle)}</h2>
<p><strong>Stage Name:</strong> You (pronounced &#39;yuu&#39;), aka YOU, \u512A, You Kurosaki, \u{1F916}<br>
	<strong>Plays:</strong> Guitar, violin, piano, drums, shamisen<br>
	<strong>Birthday:</strong> 10th February 1974<br>
	<strong>From:</strong> Kyoto, Japan<br>
	<strong>Height:</strong> 186cm (6&#39;2&quot;)<br>
	<strong>${validate_component(Link, 'Link').$$render(
		$$result,
		{
			href: 'https://www.tofugu.com/japan/japanese-blood-type/',
		},
		{},
		{ default: () => `Blood Type` }
	)}:</strong> A<br>
	<strong>Guitar Model:</strong> ${validate_component(Link, 'Link').$$render(
		$$result,
		{
			href: 'https://www.caparisonguitars.com/',
		},
		{},
		{ default: () => `Caparison` }
	)}, Mercury<br>
	<strong>Hobbies:</strong> Cooking, photography, motorbikes, martial arts, snowboarding, bowling, reading manga<br>
	<strong>Likes:</strong> Jean Paul Gaultier fragrance, cooking yaki udon, all things robot-themed, collecting plushies
</p>

<h3>Official Sites &amp; Socials</h3>

<p>You has always been an avid blogger and used to have his own site at ${validate_component(
		Link,
		'Link'
	).$$render(
		$$result,
		{ href: 'http://www.you-robots.com' },
		{},
		{ default: () => `You-robots.com` }
	)}. It contained a short discography, a gallery, links, etc. He also had an old ${validate_component(
		Link,
		'Link'
	).$$render(
		$$result,
		{
			href: 'http://www.gackt-and-lovers.com/free/youblog/',
		},
		{},
		{ default: () => `Gackt staff blog` }
	)} and an ${validate_component(Link, 'Link').$$render(
		$$result,
		{
			href: 'https://www.facebook.com/YOU-161091424051137/',
		},
		{},
		{ default: () => `official Facebook page` }
	)}.</p>

<p>Most recently, he writes in his ${validate_component(Link, 'Link').$$render(
		$$result,
		{ href: 'https://ameblo.jp/yourobot' },
		{},
		{ default: () => `Ameblo blog` }
	)} and occasionally updates his Twitter account, ${validate_component(
		Link,
		'Link'
	).$$render(
		$$result,
		{ href: 'https://twitter.com/yourobot0210' },
		{},
		{ default: () => `@yourobot0210` }
	)}.</p>

<h3>Designs <a href="${'/about-you/designs'}" class="${'text-sm'}">read more\xA0\u2192</a></h3>

<p>You has collaborated with several designers for both jewellery and clothing.</p>

<h3>Trivia</h3>

<ul><li>He has lots of different nicknames, including &quot;Grapefruit boy&quot; because of Gackt&#39;s Mizerable ~Unmei~ photobook, old man, &quot;Big Brother You&quot; (You-ni-san), pole (denchu) because he&#39;s tall and quiet. And of course, robot, because of how he moves on stage but also because of how he tends to hide his emotions.</li>
	<li>He&#39;s extremely friendly and laid-back, and known for getting on well with everyone. For example, on a band holiday to Paris he was found laughing with the locals on a night out, despite the language barrier.</li>
	<li>He really enjoys cooking, especially noodles, and is a bit of a foodie.</li>
	<li>He&#39;s very close friends with <a href="${'music-career/you-gackt'}">Gackt</a> and has lived with him on several occasions.</li>
	<li>He usually stands on stage left.</li>
	<li>He is a great photographer and has had his work featured in galleries. He&#39;s also hosted his own photo exhibitions, taken photos of Gackt for the monthly fan club magazine and hosted photo contests with the fans.</li>
	<li>He loves tech and is generally a bit of a geek.</li>
	<li>He&#39;s short-sighted.</li>
	<li>He&#39;s right handed.</li>
	<li>His left ear is pierced twice.</li>
	<li>He has an older sister.</li>
	<li>When he was younger he owned a Harley Davidson motorbike.</li>
	<li>He thinks he resembles the Takara and Kiddy Land character, Aokubi Daikon. Daikon plushies appeared throughout his old blog behind plates and on top of his laptop in his daily pictures.</li>
	<li>He&#39;s a big fan of Apple products, and is normally seen using a MacBook Pro or iMac. He has a robot-themed USB-C adapter.</li>
	<li>He read through the whole of ${validate_component(Link, 'Link').$$render(
		$$result,
		{
			href: 'http://en.wikipedia.org/wiki/City_Hunter',
		},
		{},
		{ default: () => `City Hunter` }
	)} manga series before a concert on 02.07.02. There are over 30 volumes! You prefers to read through a whole manga series in one go.</li>
	<li>He married Nana Sakurai in 2014.</li>
	<li>On 10th February 2018, he announced that he was going to be a father to a mini YOU. He frequently posts about his son on his ${validate_component(
		Link,
		'Link'
	).$$render(
		$$result,
		{ href: 'https://ameblo.jp/yourobot' },
		{},
		{ default: () => `blog` }
	)}.</li></ul>`;
});
var index$1 = /* @__PURE__ */ Object.freeze({
	__proto__: null,
	[Symbol.toStringTag]: 'Module',
	default: About_you,
});
var bracelet = '/_app/assets/bracelet-f013da83.jpg';
var earring =
	'data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAAGQAA/+4ADkFkb2JlAGTAAAAAAf/bAIQAEQ0NDQ4NEg4OEhoRDxEaHxcSEhcfIhcXFxcXIiMbHh0dHhsjIykqLSopIzY2Ozs2NkFBQUFBQUFBQUFBQUFBQQESEREUFhQYFRUYFxMXExcdFxkZFx0sHR0gHR0sOCgjIyMjKDgyNS0tLTUyPT04OD09QUFBQUFBQUFBQUFBQUFB/8AAEQgARgBGAwEiAAIRAQMRAf/EAHYAAQEAAwEBAQAAAAAAAAAAAAABAgUGBAMHAQEBAQEAAAAAAAAAAAAAAAAAAQIDEAABAwMCBAUEAwEAAAAAAAABAAIDESEEEgUxQWFxUYEiEwahQlIUkWIjghEBAQACAgMBAAAAAAAAAAAAAAERAiFBMVEDEv/aAAwDAQACEQMRAD8A4kA1U4G6V8b9UHAnkqBSvStUVAJt4IIUSnJKUvWyAE7p9EtS6B5ooigKgWrXyUoeduitlRlXhW5S9brcQfHpHwNmyMqDF1t1Mjkd/oQeHpHCqxkw4MUNa3TkOdaWXixrj9sdDcjxWbtF/Nakc0pZdTjbPt+ZiROh1RzCT2pg64DnXY+vIHgs8TbsbDkkbNDHPI0lrhICWjtdZv0kWaWuT6UtyWPNbrctugaDLjjR+TK1b/ytM5pFityyzMSyy4qc0UqiqKB4r1Yu35ma4NxoXzONvS0kDuV6dtzNuxInvyMP9vKJ/wA9bqQtb1aLkrOf5DuUsQx45BjY44RQARt86cVMnHtsIdndhObLuU0LHCwxyP2JXdNLTQeZXqx/kmJin248SIvBIbJIBG1jezQadVyBe8nUXGp51uvrHNEG0kYSbeoG9OxUs7WXHEdJuu6yPxhpDI/fLS98dQCGk0rZtf4W42aA5Tf25fU03bX73ePZci/Lx8s4+JGwxR6g10shGrSaDlYL9LxIIWQMjxnMfExoa3Q4EUHZcd5eOHXWzNuWk+SYbpsUTMaGmLi1oDajyXFOhD6g81+oZEY9lzXijTa64TcMNmNM97nBkAu1/j/Vv5Fa+e/VZ+mvcc5oOvRzrRE1evVW9aou2XNEUqiCqKKoKDS4Xpg3HLx3B8T6EcKgOH1Xk4qqYPDbO+Sbs4Wla3qI2Vt3C10+TPkP9yeR0rz9zjVfJSqTWRbbfNWo4ooiIqIioIiICIiCFXkiICIig//Z';
var edhardy1 = '/_app/assets/edhardy01-03f9f3a2.jpg';
var edhardy2 = '/_app/assets/edhardy03-151fb84a.jpg';
var hdarts01 = '/_app/assets/hdarts01-221dcdd5.jpg';
var hdarts02 = '/_app/assets/hdarts02-2e211d43.jpg';
var hdarts03 = '/_app/assets/hdarts03-70510b13.jpg';
var hdarts04 = '/_app/assets/hdarts04-fc324f67.jpg';
var Designs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $title, $$unsubscribe_title;
	$$unsubscribe_title = subscribe(title, (value) => ($title = value));
	let { pageTitle = 'Designs' } = $$props;
	title.set(pageTitle);
	if (
		$$props.pageTitle === void 0 &&
		$$bindings.pageTitle &&
		pageTitle !== void 0
	)
		$$bindings.pageTitle(pageTitle);
	$$unsubscribe_title();
	return `${
		(($$result.head += `${
			(($$result.title = `<title>${escape($title)}</title>`), '')
		}`),
		'')
	}

<h2>${escape(pageTitle)}</h2>

<h3>Jewellery</h3>

<figure style="${'width: 120px;'}">${validate_component(
		Image,
		'Image'
	).$$render(
		$$result,
		{
			alt: 'Bracelet',
			class: 'p-2 pt-0',
			align: 'right',
			src: bracelet,
			ratio: '70%',
		},
		{},
		{}
	)}</figure>

<p>You has designed a couple of bracelets with Monkey-act-web. All You-related things could be found under the <em>WithMAD</em> section of the site. The last bracelet on the ${validate_component(
		Link,
		'Link'
	).$$render(
		$$result,
		{
			href: 'http://www.monkey-act-web.com/you/youpage.html',
		},
		{},
		{ default: () => `this page` }
	)} he designed in 2003.</p>

<figure style="${'width: 100px;'}">${validate_component(
		Image,
		'Image'
	).$$render(
		$$result,
		{
			alt: 'Earring',
			class: 'p-2 pt-0',
			align: 'right',
			src: earring,
			ratio: '90%',
		},
		{},
		{}
	)}</figure>

<p>He also designed a silver earring and a pendant in 2004, also under the WithMAD branding.</p>

<p>You has made comments on the bracelets, saying they were his first collaboration with Monkey, and that it took a long time to design them.</p>

<p>He&#39;s also designed other pieces of jewelery for <em>h-Darts</em>, including earrings, bracelets and necklaces. His latest design is a bracelet titled &quot;Earth&quot;, which can be seen ${validate_component(
		Link,
		'Link'
	).$$render(
		$$result,
		{
			href: 'http://www.h-darts.com/original/order/image/g_you_model.jpg',
		},
		{},
		{ default: () => `here` }
	)}.</p>

<p>The best thing from the h-darts collab was this gorgeous but slightly awkward must-show-hands-and-wrists-in-all-shots photoshoot:</p>

<figure>${validate_component(Image, 'Image').$$render(
		$$result,
		{
			alt: 'h-darts',
			class: 'p-2 pt-0 inline-block',
			src: hdarts01,
		},
		{},
		{}
	)}
	${validate_component(Image, 'Image').$$render(
		$$result,
		{
			alt: 'h-darts',
			class: 'p-2 pt-0 inline-block',
			src: hdarts02,
		},
		{},
		{}
	)}</figure>

<figure>${validate_component(Image, 'Image').$$render(
		$$result,
		{
			alt: 'h-darts',
			class: 'p-2 pt-0 inline-block',
			src: hdarts03,
		},
		{},
		{}
	)}
	${validate_component(Image, 'Image').$$render(
		$$result,
		{
			alt: 'h-darts',
			class: 'p-2 pt-0 inline-block',
			src: hdarts04,
		},
		{},
		{}
	)}</figure>

<h3 class="${'mt-4'}">Clothing</h3>
<p>You collaborated with Ed Hardy in 2014 on a clothing range.</p>

<figure>${validate_component(Image, 'Image').$$render(
		$$result,
		{
			alt: 'Ed Hardy x You',
			class: 'p-2 pt-0',
			align: 'right',
			src: edhardy1,
		},
		{},
		{}
	)}</figure>

<figure>${validate_component(Image, 'Image').$$render(
		$$result,
		{
			alt: 'Ed Hardy x You',
			class: 'p-2 pt-0 mb-4',
			align: 'right',
			src: edhardy2,
			ratio: '50%',
		},
		{},
		{}
	)}</figure>

<p><a href="${'/about-you'}">\u2190 Back to About You</a></p>`;
});
var designs = /* @__PURE__ */ Object.freeze({
	__proto__: null,
	[Symbol.toStringTag]: 'Module',
	default: Designs,
});
var css$2 = {
	code: '.content.svelte-1sfqw64{width:100%;max-width:var(--column-width);margin:var(--column-margin-top) auto 0 auto}',
	map: `{"version":3,"file":"about.svelte","sources":["about.svelte"],"sourcesContent":["<script context=\\"module\\">\\n\\timport { browser, dev } from '$app/env';\\n\\n\\t// we don't need any JS on this page, though we'll load\\n\\t// it in dev so that we get hot module replacement...\\n\\texport const hydrate = dev;\\n\\n\\t// ...but if the client-side router is already loaded\\n\\t// (i.e. we came here from elsewhere in the app), use it\\n\\texport const router = browser;\\n\\n\\t// since there's no dynamic data here, we can prerender\\n\\t// it so that it gets served as a static asset in prod\\n\\texport const prerender = true;\\n<\/script>\\n\\n<svelte:head>\\n\\t<title>About</title>\\n</svelte:head>\\n\\n<div class=\\"content\\">\\n\\t<h1>About this app</h1>\\n\\n\\t<p>\\n\\t\\tThis is a <a href=\\"https://kit.svelte.dev\\">SvelteKit</a> app. You can make your own by typing the\\n\\t\\tfollowing into your command line and following the prompts:\\n\\t</p>\\n\\n\\t<!-- TODO lose the @next! -->\\n\\t<pre>npm init svelte@next</pre>\\n\\n\\t<p>\\n\\t\\tThe page you're looking at is purely static HTML, with no client-side interactivity needed.\\n\\t\\tBecause of that, we don't need to load any JavaScript. Try viewing the page's source, or opening\\n\\t\\tthe devtools network panel and reloading.\\n\\t</p>\\n\\n\\t<p>\\n\\t\\tThe <a href=\\"/todos\\">TODOs</a> page illustrates SvelteKit's data loading and form handling. Try using\\n\\t\\tit with JavaScript disabled!\\n\\t</p>\\n</div>\\n\\n<style>\\n\\t.content {\\n\\t\\twidth: 100%;\\n\\t\\tmax-width: var(--column-width);\\n\\t\\tmargin: var(--column-margin-top) auto 0 auto;\\n\\t}</style>\\n"],"names":[],"mappings":"AA4CC,QAAQ,eAAC,CAAC,AACT,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,IAAI,cAAc,CAAC,CAC9B,MAAM,CAAE,IAAI,mBAAmB,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,IAAI,AAC7C,CAAC"}`,
};
var hydrate = dev;
var router = browser;
var prerender = true;
var About = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	$$result.css.add(css$2);
	return `${
		(($$result.head += `${
			(($$result.title = `<title>About</title>`), '')
		}`),
		'')
	}

<div class="${'content svelte-1sfqw64'}"><h1>About this app</h1>

	<p>This is a <a href="${'https://kit.svelte.dev'}">SvelteKit</a> app. You can make your own by typing the
		following into your command line and following the prompts:
	</p>

	
	<pre>npm init svelte@next</pre>

	<p>The page you&#39;re looking at is purely static HTML, with no client-side interactivity needed.
		Because of that, we don&#39;t need to load any JavaScript. Try viewing the page&#39;s source, or opening
		the devtools network panel and reloading.
	</p>

	<p>The <a href="${'/todos'}">TODOs</a> page illustrates SvelteKit&#39;s data loading and form handling. Try using
		it with JavaScript disabled!
	</p>
</div>`;
});
var about = /* @__PURE__ */ Object.freeze({
	__proto__: null,
	[Symbol.toStringTag]: 'Module',
	default: About,
	hydrate,
	router,
	prerender,
});
var css$1 = {
	code: `.todos.svelte-1dauu4f.svelte-1dauu4f.svelte-1dauu4f{width:100%;max-width:var(--column-width);margin:var(--column-margin-top) auto 0 auto;line-height:1}.new.svelte-1dauu4f.svelte-1dauu4f.svelte-1dauu4f{margin:0 0 0.5rem 0}input.svelte-1dauu4f.svelte-1dauu4f.svelte-1dauu4f{border:1px solid transparent}input.svelte-1dauu4f.svelte-1dauu4f.svelte-1dauu4f:focus-visible{box-shadow:inset 1px 1px 6px rgba(0, 0, 0, 0.1);border:1px solid #ff3e00 !important;outline:none}.new.svelte-1dauu4f input.svelte-1dauu4f.svelte-1dauu4f{font-size:28px;width:100%;padding:0.5em 1em 0.3em 1em;box-sizing:border-box;background:rgba(255, 255, 255, 0.05);border-radius:8px;text-align:center}.todo.svelte-1dauu4f.svelte-1dauu4f.svelte-1dauu4f{display:grid;grid-template-columns:2rem 1fr 2rem;grid-gap:0.5rem;align-items:center;margin:0 0 0.5rem 0;padding:0.5rem;background-color:white;border-radius:8px;-webkit-filter:drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.1));filter:drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.1));-webkit-transform:translate(-1px, -1px);transform:translate(-1px, -1px);transition:-webkit-filter 0.2s, -webkit-transform 0.2s;transition:filter 0.2s, transform 0.2s;transition:filter 0.2s, transform 0.2s, -webkit-filter 0.2s, -webkit-transform 0.2s}.done.svelte-1dauu4f.svelte-1dauu4f.svelte-1dauu4f{-webkit-transform:none;transform:none;opacity:0.4;-webkit-filter:drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.1));filter:drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.1))}form.text.svelte-1dauu4f.svelte-1dauu4f.svelte-1dauu4f{position:relative;display:flex;align-items:center;flex:1}.todo.svelte-1dauu4f input.svelte-1dauu4f.svelte-1dauu4f{flex:1;padding:0.5em 2em 0.5em 0.8em;border-radius:3px}.todo.svelte-1dauu4f button.svelte-1dauu4f.svelte-1dauu4f{width:2em;height:2em;border:none;background-color:transparent;background-position:50% 50%;background-repeat:no-repeat}button.toggle.svelte-1dauu4f.svelte-1dauu4f.svelte-1dauu4f{border:1px solid rgba(0, 0, 0, 0.2);border-radius:50%;box-sizing:border-box;background-size:1em auto}.done.svelte-1dauu4f .toggle.svelte-1dauu4f.svelte-1dauu4f{background-image:url("data:image/svg+xml,%3Csvg width='22' height='16' viewBox='0 0 22 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.5 1.5L7.4375 14.5L1.5 8.5909' stroke='%23676778' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")}.delete.svelte-1dauu4f.svelte-1dauu4f.svelte-1dauu4f{background-image:url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.5 5V22H19.5V5H4.5Z' fill='%23676778' stroke='%23676778' stroke-width='1.5' stroke-linejoin='round'/%3E%3Cpath d='M10 10V16.5' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M14 10V16.5' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M2 5H22' stroke='%23676778' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M8 5L9.6445 2H14.3885L16 5H8Z' fill='%23676778' stroke='%23676778' stroke-width='1.5' stroke-linejoin='round'/%3E%3C/svg%3E%0A");opacity:0.2}.delete.svelte-1dauu4f.svelte-1dauu4f.svelte-1dauu4f:hover,.delete.svelte-1dauu4f.svelte-1dauu4f.svelte-1dauu4f:focus{transition:opacity 0.2s;opacity:1}.save.svelte-1dauu4f.svelte-1dauu4f.svelte-1dauu4f{position:absolute;right:0;opacity:0;background-image:url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.5 2H3.5C2.67158 2 2 2.67157 2 3.5V20.5C2 21.3284 2.67158 22 3.5 22H20.5C21.3284 22 22 21.3284 22 20.5V3.5C22 2.67157 21.3284 2 20.5 2Z' fill='%23676778' stroke='%23676778' stroke-width='1.5' stroke-linejoin='round'/%3E%3Cpath d='M17 2V11H7.5V2H17Z' fill='white' stroke='white' stroke-width='1.5' stroke-linejoin='round'/%3E%3Cpath d='M13.5 5.5V7.5' stroke='%23676778' stroke-width='1.5' stroke-linecap='round'/%3E%3Cpath d='M5.99844 2H18.4992' stroke='%23676778' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E%0A")}.todo.svelte-1dauu4f input.svelte-1dauu4f:focus+.save.svelte-1dauu4f,.save.svelte-1dauu4f.svelte-1dauu4f.svelte-1dauu4f:focus{transition:opacity 0.2s;opacity:1}`,
	map: `{"version":3,"file":"index.svelte","sources":["index.svelte"],"sourcesContent":["<script context=\\"module\\" lang=\\"ts\\">import { enhance } from '$lib/form';\\n// see https://kit.svelte.dev/docs#loading\\nexport const load = async ({ fetch }) => {\\n    const res = await fetch('/todos.json');\\n    if (res.ok) {\\n        const todos = await res.json();\\n        return {\\n            props: { todos }\\n        };\\n    }\\n    const { message } = await res.json();\\n    return {\\n        error: new Error(message)\\n    };\\n};\\n<\/script>\\n\\n<script lang=\\"ts\\">import { scale } from 'svelte/transition';\\nimport { flip } from 'svelte/animate';\\nexport let todos;\\nasync function patch(res) {\\n    const todo = await res.json();\\n    todos = todos.map((t) => {\\n        if (t.uid === todo.uid)\\n            return todo;\\n        return t;\\n    });\\n}\\n<\/script>\\n\\n<svelte:head>\\n\\t<title>Todos</title>\\n</svelte:head>\\n\\n<div class=\\"todos\\">\\n\\t<h1>Todos</h1>\\n\\n\\t<form\\n\\t\\tclass=\\"new\\"\\n\\t\\taction=\\"/todos.json\\"\\n\\t\\tmethod=\\"post\\"\\n\\t\\tuse:enhance={{\\n\\t\\t\\tresult: async (res, form) => {\\n\\t\\t\\t\\tconst created = await res.json();\\n\\t\\t\\t\\ttodos = [...todos, created];\\n\\n\\t\\t\\t\\tform.reset();\\n\\t\\t\\t}\\n\\t\\t}}\\n\\t>\\n\\t\\t<input name=\\"text\\" aria-label=\\"Add todo\\" placeholder=\\"+ tap to add a todo\\" />\\n\\t</form>\\n\\n\\t{#each todos as todo (todo.uid)}\\n\\t\\t<div\\n\\t\\t\\tclass=\\"todo\\"\\n\\t\\t\\tclass:done={todo.done}\\n\\t\\t\\ttransition:scale|local={{ start: 0.7 }}\\n\\t\\t\\tanimate:flip={{ duration: 200 }}\\n\\t\\t>\\n\\t\\t\\t<form\\n\\t\\t\\t\\taction=\\"/todos/{todo.uid}.json?_method=patch\\"\\n\\t\\t\\t\\tmethod=\\"post\\"\\n\\t\\t\\t\\tuse:enhance={{\\n\\t\\t\\t\\t\\tpending: (data) => {\\n\\t\\t\\t\\t\\t\\ttodo.done = !!data.get('done');\\n\\t\\t\\t\\t\\t},\\n\\t\\t\\t\\t\\tresult: patch\\n\\t\\t\\t\\t}}\\n\\t\\t\\t>\\n\\t\\t\\t\\t<input type=\\"hidden\\" name=\\"done\\" value={todo.done ? '' : 'true'} />\\n\\t\\t\\t\\t<button class=\\"toggle\\" aria-label=\\"Mark todo as {todo.done ? 'not done' : 'done'}\\" />\\n\\t\\t\\t</form>\\n\\n\\t\\t\\t<form\\n\\t\\t\\t\\tclass=\\"text\\"\\n\\t\\t\\t\\taction=\\"/todos/{todo.uid}.json?_method=patch\\"\\n\\t\\t\\t\\tmethod=\\"post\\"\\n\\t\\t\\t\\tuse:enhance={{\\n\\t\\t\\t\\t\\tresult: patch\\n\\t\\t\\t\\t}}\\n\\t\\t\\t>\\n\\t\\t\\t\\t<input aria-label=\\"Edit todo\\" type=\\"text\\" name=\\"text\\" value={todo.text} />\\n\\t\\t\\t\\t<button class=\\"save\\" aria-label=\\"Save todo\\" />\\n\\t\\t\\t</form>\\n\\n\\t\\t\\t<form\\n\\t\\t\\t\\taction=\\"/todos/{todo.uid}.json?_method=delete\\"\\n\\t\\t\\t\\tmethod=\\"post\\"\\n\\t\\t\\t\\tuse:enhance={{\\n\\t\\t\\t\\t\\tpending: () => (todo.pending_delete = true),\\n\\t\\t\\t\\t\\tresult: () => {\\n\\t\\t\\t\\t\\t\\ttodos = todos.filter((t) => t.uid !== todo.uid);\\n\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t}}\\n\\t\\t\\t>\\n\\t\\t\\t\\t<button class=\\"delete\\" aria-label=\\"Delete todo\\" disabled={todo.pending_delete} />\\n\\t\\t\\t</form>\\n\\t\\t</div>\\n\\t{/each}\\n</div>\\n\\n<style>\\n\\t.todos {\\n\\t\\twidth: 100%;\\n\\t\\tmax-width: var(--column-width);\\n\\t\\tmargin: var(--column-margin-top) auto 0 auto;\\n\\t\\tline-height: 1;\\n\\t}\\n\\n\\t.new {\\n\\t\\tmargin: 0 0 0.5rem 0;\\n\\t}\\n\\n\\tinput {\\n\\t\\tborder: 1px solid transparent;\\n\\t}\\n\\n\\tinput:focus-visible {\\n\\t\\tbox-shadow: inset 1px 1px 6px rgba(0, 0, 0, 0.1);\\n\\t\\tborder: 1px solid #ff3e00 !important;\\n\\t\\toutline: none;\\n\\t}\\n\\n\\t.new input {\\n\\t\\tfont-size: 28px;\\n\\t\\twidth: 100%;\\n\\t\\tpadding: 0.5em 1em 0.3em 1em;\\n\\t\\tbox-sizing: border-box;\\n\\t\\tbackground: rgba(255, 255, 255, 0.05);\\n\\t\\tborder-radius: 8px;\\n\\t\\ttext-align: center;\\n\\t}\\n\\n\\t.todo {\\n\\t\\tdisplay: grid;\\n\\t\\tgrid-template-columns: 2rem 1fr 2rem;\\n\\t\\tgrid-gap: 0.5rem;\\n\\t\\talign-items: center;\\n\\t\\tmargin: 0 0 0.5rem 0;\\n\\t\\tpadding: 0.5rem;\\n\\t\\tbackground-color: white;\\n\\t\\tborder-radius: 8px;\\n\\t\\t-webkit-filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.1));\\n\\t\\t        filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.1));\\n\\t\\t-webkit-transform: translate(-1px, -1px);\\n\\t\\t        transform: translate(-1px, -1px);\\n\\t\\ttransition: -webkit-filter 0.2s, -webkit-transform 0.2s;\\n\\t\\ttransition: filter 0.2s, transform 0.2s;\\n\\t\\ttransition: filter 0.2s, transform 0.2s, -webkit-filter 0.2s, -webkit-transform 0.2s;\\n\\t}\\n\\n\\t.done {\\n\\t\\t-webkit-transform: none;\\n\\t\\t        transform: none;\\n\\t\\topacity: 0.4;\\n\\t\\t-webkit-filter: drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.1));\\n\\t\\t        filter: drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.1));\\n\\t}\\n\\n\\tform.text {\\n\\t\\tposition: relative;\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tflex: 1;\\n\\t}\\n\\n\\t.todo input {\\n\\t\\tflex: 1;\\n\\t\\tpadding: 0.5em 2em 0.5em 0.8em;\\n\\t\\tborder-radius: 3px;\\n\\t}\\n\\n\\t.todo button {\\n\\t\\twidth: 2em;\\n\\t\\theight: 2em;\\n\\t\\tborder: none;\\n\\t\\tbackground-color: transparent;\\n\\t\\tbackground-position: 50% 50%;\\n\\t\\tbackground-repeat: no-repeat;\\n\\t}\\n\\n\\tbutton.toggle {\\n\\t\\tborder: 1px solid rgba(0, 0, 0, 0.2);\\n\\t\\tborder-radius: 50%;\\n\\t\\tbox-sizing: border-box;\\n\\t\\tbackground-size: 1em auto;\\n\\t}\\n\\n\\t.done .toggle {\\n\\t\\tbackground-image: url(\\"data:image/svg+xml,%3Csvg width='22' height='16' viewBox='0 0 22 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.5 1.5L7.4375 14.5L1.5 8.5909' stroke='%23676778' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\\");\\n\\t}\\n\\n\\t.delete {\\n\\t\\tbackground-image: url(\\"data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.5 5V22H19.5V5H4.5Z' fill='%23676778' stroke='%23676778' stroke-width='1.5' stroke-linejoin='round'/%3E%3Cpath d='M10 10V16.5' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M14 10V16.5' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M2 5H22' stroke='%23676778' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M8 5L9.6445 2H14.3885L16 5H8Z' fill='%23676778' stroke='%23676778' stroke-width='1.5' stroke-linejoin='round'/%3E%3C/svg%3E%0A\\");\\n\\t\\topacity: 0.2;\\n\\t}\\n\\n\\t.delete:hover,\\n\\t.delete:focus {\\n\\t\\ttransition: opacity 0.2s;\\n\\t\\topacity: 1;\\n\\t}\\n\\n\\t.save {\\n\\t\\tposition: absolute;\\n\\t\\tright: 0;\\n\\t\\topacity: 0;\\n\\t\\tbackground-image: url(\\"data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.5 2H3.5C2.67158 2 2 2.67157 2 3.5V20.5C2 21.3284 2.67158 22 3.5 22H20.5C21.3284 22 22 21.3284 22 20.5V3.5C22 2.67157 21.3284 2 20.5 2Z' fill='%23676778' stroke='%23676778' stroke-width='1.5' stroke-linejoin='round'/%3E%3Cpath d='M17 2V11H7.5V2H17Z' fill='white' stroke='white' stroke-width='1.5' stroke-linejoin='round'/%3E%3Cpath d='M13.5 5.5V7.5' stroke='%23676778' stroke-width='1.5' stroke-linecap='round'/%3E%3Cpath d='M5.99844 2H18.4992' stroke='%23676778' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E%0A\\");\\n\\t}\\n\\n\\t.todo input:focus + .save,\\n\\t.save:focus {\\n\\t\\ttransition: opacity 0.2s;\\n\\t\\topacity: 1;\\n\\t}</style>\\n"],"names":[],"mappings":"AAuGC,MAAM,6CAAC,CAAC,AACP,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,IAAI,cAAc,CAAC,CAC9B,MAAM,CAAE,IAAI,mBAAmB,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,IAAI,CAC5C,WAAW,CAAE,CAAC,AACf,CAAC,AAED,IAAI,6CAAC,CAAC,AACL,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,MAAM,CAAC,CAAC,AACrB,CAAC,AAED,KAAK,6CAAC,CAAC,AACN,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,WAAW,AAC9B,CAAC,AAED,kDAAK,cAAc,AAAC,CAAC,AACpB,UAAU,CAAE,KAAK,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAChD,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CAAC,UAAU,CACpC,OAAO,CAAE,IAAI,AACd,CAAC,AAED,mBAAI,CAAC,KAAK,8BAAC,CAAC,AACX,SAAS,CAAE,IAAI,CACf,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,KAAK,CAAC,GAAG,CAAC,KAAK,CAAC,GAAG,CAC5B,UAAU,CAAE,UAAU,CACtB,UAAU,CAAE,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,CAAC,CACrC,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,MAAM,AACnB,CAAC,AAED,KAAK,6CAAC,CAAC,AACN,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,IAAI,CAAC,GAAG,CAAC,IAAI,CACpC,QAAQ,CAAE,MAAM,CAChB,WAAW,CAAE,MAAM,CACnB,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,MAAM,CAAC,CAAC,CACpB,OAAO,CAAE,MAAM,CACf,gBAAgB,CAAE,KAAK,CACvB,aAAa,CAAE,GAAG,CAClB,cAAc,CAAE,YAAY,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CACnD,MAAM,CAAE,YAAY,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAC3D,iBAAiB,CAAE,UAAU,IAAI,CAAC,CAAC,IAAI,CAAC,CAChC,SAAS,CAAE,UAAU,IAAI,CAAC,CAAC,IAAI,CAAC,CACxC,UAAU,CAAE,cAAc,CAAC,IAAI,CAAC,CAAC,iBAAiB,CAAC,IAAI,CACvD,UAAU,CAAE,MAAM,CAAC,IAAI,CAAC,CAAC,SAAS,CAAC,IAAI,CACvC,UAAU,CAAE,MAAM,CAAC,IAAI,CAAC,CAAC,SAAS,CAAC,IAAI,CAAC,CAAC,cAAc,CAAC,IAAI,CAAC,CAAC,iBAAiB,CAAC,IAAI,AACrF,CAAC,AAED,KAAK,6CAAC,CAAC,AACN,iBAAiB,CAAE,IAAI,CACf,SAAS,CAAE,IAAI,CACvB,OAAO,CAAE,GAAG,CACZ,cAAc,CAAE,YAAY,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CACnD,MAAM,CAAE,YAAY,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,AAC5D,CAAC,AAED,IAAI,KAAK,6CAAC,CAAC,AACV,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,IAAI,CAAE,CAAC,AACR,CAAC,AAED,oBAAK,CAAC,KAAK,8BAAC,CAAC,AACZ,IAAI,CAAE,CAAC,CACP,OAAO,CAAE,KAAK,CAAC,GAAG,CAAC,KAAK,CAAC,KAAK,CAC9B,aAAa,CAAE,GAAG,AACnB,CAAC,AAED,oBAAK,CAAC,MAAM,8BAAC,CAAC,AACb,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,CACX,MAAM,CAAE,IAAI,CACZ,gBAAgB,CAAE,WAAW,CAC7B,mBAAmB,CAAE,GAAG,CAAC,GAAG,CAC5B,iBAAiB,CAAE,SAAS,AAC7B,CAAC,AAED,MAAM,OAAO,6CAAC,CAAC,AACd,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CACpC,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,UAAU,CACtB,eAAe,CAAE,GAAG,CAAC,IAAI,AAC1B,CAAC,AAED,oBAAK,CAAC,OAAO,8BAAC,CAAC,AACd,gBAAgB,CAAE,IAAI,uQAAuQ,CAAC,AAC/R,CAAC,AAED,OAAO,6CAAC,CAAC,AACR,gBAAgB,CAAE,IAAI,yrBAAyrB,CAAC,CAChtB,OAAO,CAAE,GAAG,AACb,CAAC,AAED,oDAAO,MAAM,CACb,oDAAO,MAAM,AAAC,CAAC,AACd,UAAU,CAAE,OAAO,CAAC,IAAI,CACxB,OAAO,CAAE,CAAC,AACX,CAAC,AAED,KAAK,6CAAC,CAAC,AACN,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,CAAC,CACR,OAAO,CAAE,CAAC,CACV,gBAAgB,CAAE,IAAI,gpBAAgpB,CAAC,AACxqB,CAAC,AAED,oBAAK,CAAC,oBAAK,MAAM,CAAG,oBAAK,CACzB,kDAAK,MAAM,AAAC,CAAC,AACZ,UAAU,CAAE,OAAO,CAAC,IAAI,CACxB,OAAO,CAAE,CAAC,AACX,CAAC"}`,
};
var load = async ({ fetch: fetch2 }) => {
	const res = await fetch2('/todos.json');
	if (res.ok) {
		const todos = await res.json();
		return { props: { todos } };
	}
	const { message } = await res.json();
	return { error: new Error(message) };
};
var Todos = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { todos } = $$props;
	if ($$props.todos === void 0 && $$bindings.todos && todos !== void 0)
		$$bindings.todos(todos);
	$$result.css.add(css$1);
	return `${
		(($$result.head += `${
			(($$result.title = `<title>Todos</title>`), '')
		}`),
		'')
	}

<div class="${'todos svelte-1dauu4f'}"><h1>Todos</h1>

	<form class="${'new svelte-1dauu4f'}" action="${'/todos.json'}" method="${'post'}"><input name="${'text'}" aria-label="${'Add todo'}" placeholder="${'+ tap to add a todo'}" class="${'svelte-1dauu4f'}"></form>

	${each(
		todos,
		(todo) => `<div class="${[
			'todo svelte-1dauu4f',
			todo.done ? 'done' : '',
		]
			.join(' ')
			.trim()}"><form action="${
			'/todos/' + escape(todo.uid) + '.json?_method=patch'
		}" method="${'post'}"><input type="${'hidden'}" name="${'done'}"${add_attribute(
			'value',
			todo.done ? '' : 'true',
			0
		)} class="${'svelte-1dauu4f'}">
				<button class="${'toggle svelte-1dauu4f'}" aria-label="${
			'Mark todo as ' + escape(todo.done ? 'not done' : 'done')
		}"></button></form>

			<form class="${'text svelte-1dauu4f'}" action="${
			'/todos/' + escape(todo.uid) + '.json?_method=patch'
		}" method="${'post'}"><input aria-label="${'Edit todo'}" type="${'text'}" name="${'text'}"${add_attribute(
			'value',
			todo.text,
			0
		)} class="${'svelte-1dauu4f'}">
				<button class="${'save svelte-1dauu4f'}" aria-label="${'Save todo'}"></button></form>

			<form action="${
				'/todos/' + escape(todo.uid) + '.json?_method=delete'
			}" method="${'post'}"><button class="${'delete svelte-1dauu4f'}" aria-label="${'Delete todo'}" ${
			todo.pending_delete ? 'disabled' : ''
		}></button></form>
		</div>`
	)}
</div>`;
});
var index = /* @__PURE__ */ Object.freeze({
	__proto__: null,
	[Symbol.toStringTag]: 'Module',
	default: Todos,
	load,
});
var History = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $title, $$unsubscribe_title;
	$$unsubscribe_title = subscribe(title, (value) => ($title = value));
	let { pageTitle = 'Site History' } = $$props;
	title.set(pageTitle);
	if (
		$$props.pageTitle === void 0 &&
		$$bindings.pageTitle &&
		pageTitle !== void 0
	)
		$$bindings.pageTitle(pageTitle);
	$$unsubscribe_title();
	return `${
		(($$result.head += `${
			(($$result.title = `<title>${escape($title)}</title>`), '')
		}`),
		'')
	}

<h2>${escape(pageTitle)}</h2>

<p>The site was first opened on 23rd March, 2004. I decided to make a You fan site because, at the time, there were no sites dedicated to him in English.</p>

<p>The site was named after the Gackt song, <em>Wasurenai kara</em> (\u5FD8\u308C\u306A\u3044\u304B\u3089, &#39;I won&#39;t forget&#39;). It was originally called <em>Silence and Motion</em> after the Final Fantasy VIII track of the same name.</p>

<p>You can view the site source on ${validate_component(Link, 'Link').$$render(
		$$result,
		{
			href: 'https://github.com/mikachan/forget-me-not',
		},
		{},
		{ default: () => `GitHub` }
	)}.</p>

<p><a href="${'site/thanks'}">Thank you</a> to everyone who helped make this site possible over the years.</p>

<p>I&#39;m ${validate_component(Link, 'Link').$$render(
		$$result,
		{ href: 'https://sekai.co.uk' },
		{},
		{ default: () => `Sarah` }
	)}, your average J-rock/anything-Japanese nerd from the UK.</p>`;
});
var history = /* @__PURE__ */ Object.freeze({
	__proto__: null,
	[Symbol.toStringTag]: 'Module',
	default: History,
});
var css = {
	code: 'hr.svelte-1thul10{margin-top:0.5rem;margin-bottom:1rem;--tw-border-opacity:1;border-color:rgb(74 222 128 / var(--tw-border-opacity));opacity:0.25\n}',
	map: `{"version":3,"file":"updates.svelte","sources":["updates.svelte"],"sourcesContent":["<script lang=\\"ts\\">import Link from '$lib/Link.svelte';\\nimport { title } from \\"../../store\\";\\nexport let pageTitle = 'Site Updates';\\ntitle.set(pageTitle);\\n<\/script>\\n\\n<svelte:head>\\n\\t<title>{$title}</title>\\n</svelte:head>\\n\\n<style lang=\\"postcss\\">\\n\\thr {\\n    margin-top: 0.5rem;\\n    margin-bottom: 1rem;\\n    --tw-border-opacity: 1;\\n    border-color: rgb(74 222 128 / var(--tw-border-opacity));\\n    opacity: 0.25\\n}</style>\\n\\n<h2>{pageTitle}</h2>\\n\\n<p>\\n\\t<strong>18.05.21</strong><br>\\n\\tLuscious have announced they're going to be doing another live performance on June 17th! It'll be at Club Phase Takadanobaba in Tokyo, and will be streamed on <Link href=\\"https://twitcasting.tv/chachamaru_yfcz\\">TwitCasting</Link> again. For full details, see <Link href=\\"https://twitter.com/CHACHAMARU_YFCz/status/1394626299394625538\\">Chacha's Twitter</Link>.\\n</p>\\n\\n<hr class=\\"border-b-1\\">\\n\\n<p>\\n\\t<strong>16.02.21</strong><br>\\n\\tDed Chaplin and Luscious are streaming two live performances on 17th and 18th February, from The Doors in Hatsudai. You can purchase tickets to watch the performances live through <Link href=\\"https://twitcasting.tv/chachamaru_yfcz\\">TwitCasting</Link>, which also gives you access to watch the stream recording up to 2 weeks from the original broadcast. See <Link href=\\"https://twitter.com/CHACHAMARU_YFCz/status/1359381600425758722\\">Chacha's Twitter</Link> for more info. Looking forward to it!\\n</p>\\n\\n<hr class=\\"border-b-1\\">\\n\\n<p>\\n\\t<strong>10.02.21</strong><br>\\n\\tHappy birthday YOU! \u304A\u8A95\u751F\u65E5\u304A\u3081\u3067\u3068\u3046!\\n</p>\\n\\n<hr class=\\"border-b-1\\">\\n\\n<p>\\n\\t<strong>01.01.21</strong><br>\\n\\tHappy New Year! \u660E\u3051\u307E\u3057\u3066\u304A\u3081\u3067\u3068\u3046\u3054\u3056\u3044\u307E\u3059!\\n</p>\\n\\n<hr class=\\"border-b-1\\">\\n\\n<p>\\n\\t<strong>12.12.20</strong><br>\\n\\tGuess who's back! After over 6 years I've decided to rebuild this fansite. I've restored most of the content but not many images yet, and I'm guessing loads of the information is now incorrect or wildy out of date. But it's back and I'd forgotten how much I enjoy fangirling over You!\\n</p>"],"names":[],"mappings":"AAWC,EAAE,eAAC,CAAC,AACD,UAAU,CAAE,MAAM,CAClB,aAAa,CAAE,IAAI,CACnB,mBAAmB,CAAE,CAAC,CACtB,YAAY,CAAE,IAAI,EAAE,CAAC,GAAG,CAAC,GAAG,CAAC,CAAC,CAAC,IAAI,mBAAmB,CAAC,CAAC,CACxD,OAAO,CAAE,IAAI;AACjB,CAAC"}`,
};
var Updates = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $title, $$unsubscribe_title;
	$$unsubscribe_title = subscribe(title, (value) => ($title = value));
	let { pageTitle = 'Site Updates' } = $$props;
	title.set(pageTitle);
	if (
		$$props.pageTitle === void 0 &&
		$$bindings.pageTitle &&
		pageTitle !== void 0
	)
		$$bindings.pageTitle(pageTitle);
	$$result.css.add(css);
	$$unsubscribe_title();
	return `${
		(($$result.head += `${
			(($$result.title = `<title>${escape($title)}</title>`), '')
		}`),
		'')
	}



<h2>${escape(pageTitle)}</h2>

<p><strong>18.05.21</strong><br>
	Luscious have announced they&#39;re going to be doing another live performance on June 17th! It&#39;ll be at Club Phase Takadanobaba in Tokyo, and will be streamed on ${validate_component(
		Link,
		'Link'
	).$$render(
		$$result,
		{
			href: 'https://twitcasting.tv/chachamaru_yfcz',
		},
		{},
		{ default: () => `TwitCasting` }
	)} again. For full details, see ${validate_component(Link, 'Link').$$render(
		$$result,
		{
			href: 'https://twitter.com/CHACHAMARU_YFCz/status/1394626299394625538',
		},
		{},
		{ default: () => `Chacha&#39;s Twitter` }
	)}.
</p>

<hr class="${'border-b-1 svelte-1thul10'}">

<p><strong>16.02.21</strong><br>
	Ded Chaplin and Luscious are streaming two live performances on 17th and 18th February, from The Doors in Hatsudai. You can purchase tickets to watch the performances live through ${validate_component(
		Link,
		'Link'
	).$$render(
		$$result,
		{
			href: 'https://twitcasting.tv/chachamaru_yfcz',
		},
		{},
		{ default: () => `TwitCasting` }
	)}, which also gives you access to watch the stream recording up to 2 weeks from the original broadcast. See ${validate_component(
		Link,
		'Link'
	).$$render(
		$$result,
		{
			href: 'https://twitter.com/CHACHAMARU_YFCz/status/1359381600425758722',
		},
		{},
		{ default: () => `Chacha&#39;s Twitter` }
	)} for more info. Looking forward to it!
</p>

<hr class="${'border-b-1 svelte-1thul10'}">

<p><strong>10.02.21</strong><br>
	Happy birthday YOU! \u304A\u8A95\u751F\u65E5\u304A\u3081\u3067\u3068\u3046!
</p>

<hr class="${'border-b-1 svelte-1thul10'}">

<p><strong>01.01.21</strong><br>
	Happy New Year! \u660E\u3051\u307E\u3057\u3066\u304A\u3081\u3067\u3068\u3046\u3054\u3056\u3044\u307E\u3059!
</p>

<hr class="${'border-b-1 svelte-1thul10'}">

<p><strong>12.12.20</strong><br>
	Guess who&#39;s back! After over 6 years I&#39;ve decided to rebuild this fansite. I&#39;ve restored most of the content but not many images yet, and I&#39;m guessing loads of the information is now incorrect or wildy out of date. But it&#39;s back and I&#39;d forgotten how much I enjoy fangirling over You!
</p>`;
});
var updates = /* @__PURE__ */ Object.freeze({
	__proto__: null,
	[Symbol.toStringTag]: 'Module',
	default: Updates,
});
var Thanks = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $title, $$unsubscribe_title;
	$$unsubscribe_title = subscribe(title, (value) => ($title = value));
	let { pageTitle = 'Special Thanks' } = $$props;
	title.set(pageTitle);
	if (
		$$props.pageTitle === void 0 &&
		$$bindings.pageTitle &&
		pageTitle !== void 0
	)
		$$bindings.pageTitle(pageTitle);
	$$unsubscribe_title();
	return `${
		(($$result.head += `${
			(($$result.title = `<title>${escape($title)}</title>`), '')
		}`),
		'')
	}

<h2>${escape(pageTitle)}</h2>

<ul><li><strong>Torabara</strong> for images, the Starlight Gig screencaps and R&amp;R screencaps.</li>
	<li><strong>Jirion</strong> for images.</li>
	<li><strong>Sei-chan</strong> for information, images and lots of other random things.</li>
	<li><strong>Akiko</strong> for R&amp;R screencaps, icons, images, for the pronunciation of You and for plugging my site everywhere.</li>
	<li><strong>Sari</strong> for images and information.</li>
	<li><strong>Alexy</strong> for icons.</li>
	<li><strong>Natalie</strong> for a recording of You&#39;s voice.</li>
	<li><strong>Kana</strong> for R&amp;R screencaps and being the lovely person that you are.</li>
	<li><strong>Mitsuki</strong> for the translation of Etude.</li>
	<li><strong>Chi</strong> for information.</li>
	<li><strong>Lindley</strong> for screen caps.</li></ul>

<p>Thank you thank you thank you! Also, thank you to all the people that have signed my guestbook, emailed me and just mentioned this site to me, it means a lot.</p>`;
});
var thanks = /* @__PURE__ */ Object.freeze({
	__proto__: null,
	[Symbol.toStringTag]: 'Module',
	default: Thanks,
});

// .svelte-kit/netlify/entry.js
init();
async function handler(event) {
	const { path, httpMethod, headers, rawQuery, body, isBase64Encoded } =
		event;
	const query = new URLSearchParams(rawQuery);
	const encoding = isBase64Encoded
		? 'base64'
		: headers['content-encoding'] || 'utf-8';
	const rawBody =
		typeof body === 'string' ? Buffer.from(body, encoding) : body;
	const rendered = await render({
		method: httpMethod,
		headers,
		path,
		query,
		rawBody,
	});
	if (!rendered) {
		return {
			statusCode: 404,
			body: 'Not found',
		};
	}
	const partial_response = {
		statusCode: rendered.status,
		...split_headers(rendered.headers),
	};
	if (rendered.body instanceof Uint8Array) {
		return {
			...partial_response,
			isBase64Encoded: true,
			body: Buffer.from(rendered.body).toString('base64'),
		};
	}
	return {
		...partial_response,
		body: rendered.body,
	};
}
function split_headers(headers) {
	const h = {};
	const m = {};
	for (const key in headers) {
		const value = headers[key];
		const target = Array.isArray(value) ? m : h;
		target[key] = value;
	}
	return {
		headers: h,
		multiValueHeaders: m,
	};
}
// Annotate the CommonJS export names for ESM import in node:
0 &&
	(module.exports = {
		handler,
	});
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
