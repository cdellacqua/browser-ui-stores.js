import {
	makeDerivedStore,
	makeReadonlyStore,
	ReadonlyStore,
} from 'universal-stores';
import {windowShim} from '../ssr-shim';

function makeWindowScrollStore(
	passive = false,
): ReadonlyStore<{x: number; y: number}> {
	return makeReadonlyStore<{x: number; y: number}>(undefined, {
		start: (set) => {
			const update = () => set({x: windowShim.scrollX, y: windowShim.scrollY});
			update();
			windowShim.addEventListener('scroll', update, {passive});
			return () => {
				windowShim.removeEventListener('scroll', update);
			};
		},
		comparator: (a, b) => a.x === b.x && a.y === b.y,
	});
}

/**
 * A readonly store that contains the current scrolling position (x and y).
 */
export const windowScroll$ = makeWindowScrollStore();

/**
 * A readonly store that contains the current scrolling position (x and y) (uses a passive event listener).
 */
export const windowScrollPassive$ = makeWindowScrollStore(true);

/**
 * A readonly store that contains the current scrolling position on the X axis.
 */
export const scrollX$ = makeDerivedStore(windowScroll$, ({x}) => x);

/**
 * A readonly store that contains the current scrolling position on the X axis (uses a passive event listener).
 */
export const scrollXPassive$ = makeDerivedStore(
	windowScrollPassive$,
	({x}) => x,
);

/**
 * A readonly store that contains the current scrolling position on the Y axis.
 */
export const scrollY$ = makeDerivedStore(windowScroll$, ({y}) => y);

/**
 * A readonly store that contains the current scrolling position on the Y axis (uses a passive event listener).
 */
export const scrollYPassive$ = makeDerivedStore(
	windowScrollPassive$,
	({y}) => y,
);
