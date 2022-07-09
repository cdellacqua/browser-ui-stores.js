import {makeDerivedStore} from 'universal-stores';
import {makeMediaQueryStore} from '../utils/media-query';

export type Orientation = 'landscape' | 'portrait';

/**
 * A readonly store that indicates whether the viewport is in landscape or portrait mode.
 */
export const orientation$ = makeDerivedStore<boolean, Orientation>(
	makeMediaQueryStore('(orientation: portrait)'),
	(matches) => (matches ? 'portrait' : 'landscape'),
);
