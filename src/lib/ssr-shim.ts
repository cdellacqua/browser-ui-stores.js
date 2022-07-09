export type MediaQuery = {
	addEventListener(eventName: string, cb: () => unknown): void;
	removeEventListener(eventName: string, cb: () => unknown): void;
	matches: boolean;
};

/**
 * Shim that provides support for server-side rendering
 * by emulating the window behavior on specific
 * properties and methods used in this library.
 */
export const windowShim =
	typeof window !== 'undefined'
		? window
		: {
				scrollX: 0,
				scrollY: 0,
				innerWidth: 1920,
				innerHeight: 1080,
				addEventListener: (() => undefined) as (
					eventName: string,
					cb: () => unknown,
					opts?: unknown,
				) => void,
				removeEventListener: (() => undefined) as (
					eventName: string,
					cb: () => unknown,
				) => void,
				matchMedia: () =>
					({
						addEventListener: () => undefined,
						removeEventListener: () => undefined,
						matches: false,
					} as MediaQuery),
		  };

/**
 * Shim that provides support for server-side rendering
 * by emulating the document behavior on specific
 * properties and methods used in this library.
 */
export const documentShim =
	typeof document !== 'undefined'
		? document
		: {
				documentElement: {} as Element,
				scrollingElement: {} as Element,
				visibilityState: 'visible',
				addEventListener: () => undefined,
				removeEventListener: () => undefined,
				createElement: () => ({
					style: {} as Record<string, string>,
					tabIndex: -1,
					setAttribute: () => undefined,
					contentWindow: windowShim,
					src: '',
					innerHTML: '',
				}),
				body: {
					style: {
						position: '',
					},
					appendChild: () => undefined,
					scrollHeight: 1080,
					scrollWidth: 1920,
				} as unknown as HTMLBodyElement,
				head: {
					appendChild: () => undefined,
				},
		  };
