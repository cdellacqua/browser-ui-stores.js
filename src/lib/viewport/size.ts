import {windowShim} from '../ssr-shim';
import {
	makeDerivedStore,
	makeReadonlyStore,
	ReadonlyStore,
} from 'universal-stores';

function makeSizeStore(
	passive = false,
): ReadonlyStore<{width: number; height: number}> {
	return makeReadonlyStore<{width: number; height: number}>(undefined, {
		start: (set) => {
			const update = () =>
				set({width: windowShim.innerWidth, height: windowShim.innerHeight});
			update();
			windowShim.addEventListener('resize', update, {passive});
			return () => {
				windowShim.removeEventListener('resize', update);
			};
		},
		comparator: (a, b) => a.width === b.width && a.height === b.height,
	});
}

/**
 * A readonly store that contains the size of the viewport (innerWidth and innerHeight of the window).
 */
export const viewportSize$ = makeSizeStore();

/**
 * A readonly store that contains the size of the viewport (innerWidth and innerHeight of the window) (uses a passive event listener).
 */
export const viewportSizePassive$ = makeSizeStore(true);

/**
 * A readonly store that contains the innerWidth of the window.
 */
export const innerWidth$ = makeDerivedStore(viewportSize$, ({width}) => width);

/**
 * A readonly store that contains the innerWidth of the window (uses a passive event listener).
 */
export const innerWidthPassive$ = makeDerivedStore(
	viewportSizePassive$,
	({width}) => width,
);

/**
 * A readonly store that contains the innerHeight of the window.
 */
export const innerHeight$ = makeDerivedStore(
	viewportSize$,
	({height}) => height,
);

/**
 * A readonly store that contains the innerHeight of the window (uses a passive event listener).
 */
export const innerHeightPassive$ = makeDerivedStore(
	viewportSizePassive$,
	({height}) => height,
);
