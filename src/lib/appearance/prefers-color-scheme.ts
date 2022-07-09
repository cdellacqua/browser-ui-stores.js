import {makeDerivedStore} from 'universal-stores';
import {makeMediaQueryStore} from '../utils/media-query';

export type ColorScheme = 'light' | 'dark';

/**
 * A readonly store that contains the preferred color scheme.
 * It defaults to 'light' if no explicit preference has been set by
 * the user agent.
 */
export const prefersColorScheme$ = makeDerivedStore<boolean, ColorScheme>(
	makeMediaQueryStore('(prefers-color-scheme: dark)'),
	(matches) => (matches ? 'dark' : 'light'),
);

/**
 * A readonly store that contains the preferred color scheme.
 * It defaults to 'dark' if no explicit preference has been set by
 * the user agent.
 */
export const prefersColorSchemeDarkDefault$ = makeDerivedStore<
	boolean,
	ColorScheme
>(makeMediaQueryStore('(prefers-color-scheme: light)'), (matches) =>
	matches ? 'light' : 'dark',
);
