import {makeReadonlyStore, ReadonlyStore} from 'universal-stores';
import {MediaQuery, windowShim} from '../ssr-shim';

/**
 * Create a boolean ReadonlyStore whose value corresponds to whether or not
 * a media query "matches".
 *
 * Example usage:
 * ```ts
 * const prefersLightTheme$ = makeMediaQueryStore('(prefers-color-scheme: light)');
 * console.log(prefersLightTheme$.value); // true or false depending on the browser/system settings.
 *
 * prefersLightTheme$.subscribe(console.log); // will print true or false immediately and every time the preference changes.
 * ```
 *
 * @param mediaQueryString a media query string compatible with window.matchMedia.
 * @returns a boolean ReadonlyStore
 */
export function makeMediaQueryStore(
	mediaQueryString: string,
): ReadonlyStore<boolean> {
	let lazyLoadedMediaQuery: MediaQuery | undefined;
	function getMediaQuery(): MediaQuery {
		if (!lazyLoadedMediaQuery) {
			lazyLoadedMediaQuery = windowShim.matchMedia(mediaQueryString);
		}
		return lazyLoadedMediaQuery;
	}

	return makeReadonlyStore<boolean>(undefined, (set) => {
		const mediaQuery = getMediaQuery();

		const update = () => set(mediaQuery.matches);
		update();
		mediaQuery.addEventListener('change', update);
		return () => {
			mediaQuery.removeEventListener('change', update);
		};
	});
}
