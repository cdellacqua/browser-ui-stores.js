import {expect} from 'chai';
import {makeMediaQueryStore} from '../src/lib';

describe('examples', () => {
	it('media query', () => {
		const prefersLightTheme$ = makeMediaQueryStore(
			'(prefers-color-scheme: light)',
		);

		expect(prefersLightTheme$.content()).to.be.false;
		let actual: boolean | null = null;
		prefersLightTheme$.subscribe((v) => (actual = v));
		expect(actual).to.be.false;
	});
});
