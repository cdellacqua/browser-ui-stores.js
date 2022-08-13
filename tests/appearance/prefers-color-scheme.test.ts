import chai, {expect} from 'chai';
import spies from 'chai-spies';
import {Unsubscribe} from 'universal-stores';
import {
	ColorScheme,
	prefersColorScheme$,
	prefersColorSchemeDarkDefault$,
} from '../../src/lib';
import {windowShim} from '../../src/lib/ssr-shim';

chai.use(spies);

describe('"prefers color scheme" stores', () => {
	const sandbox = chai.spy.sandbox();
	const updateCbs: (() => void)[] = [];
	let currentColorScheme: ColorScheme | undefined;

	const stub = (query: string) => ({
		addEventListener: (_: string, cb: () => void) => updateCbs.push(cb),
		removeEventListener: (_: string, cb: () => void) =>
			updateCbs.splice(updateCbs.indexOf(cb), 1),
		get matches() {
			return !currentColorScheme ? false : query.includes(currentColorScheme);
		},
	});
	function setColorScheme(o: ColorScheme | undefined) {
		currentColorScheme = o;
		updateCbs.forEach((cb) => cb());
	}
	const subscriptions: Unsubscribe[] = [];
	beforeEach(() => {
		setColorScheme(undefined);
		sandbox.on(windowShim, 'matchMedia', (query) => stub(query));
		subscriptions.push(prefersColorScheme$.subscribe(() => undefined));
	});
	afterEach(() => {
		subscriptions.forEach((s) => s());
		subscriptions.splice(0, subscriptions.length);
		setColorScheme('light');
		sandbox.restore(windowShim, 'matchMedia');
	});

	it('checks the value of prefersColorScheme$', async () => {
		expect(prefersColorScheme$.content()).to.eq('light');
		setColorScheme('dark');
		expect(prefersColorScheme$.content()).to.eq('dark');
	});

	it('checks the value of prefersColorSchemeDefaultDark$', async () => {
		expect(prefersColorSchemeDarkDefault$.content()).to.eq('dark');
		setColorScheme('light');
		expect(prefersColorSchemeDarkDefault$.content()).to.eq('light');
	});
});
