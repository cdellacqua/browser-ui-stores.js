import chai, {expect} from 'chai';
import {windowShim} from '../../src/lib/ssr-shim';
import {orientation$, Orientation} from '../../src/lib';
import spies from 'chai-spies';
import {Unsubscribe} from 'universal-stores';

chai.use(spies);

describe('orientation stores', () => {
	const sandbox = chai.spy.sandbox();
	const updateCbs: (() => void)[] = [];
	const stub = {
		addEventListener: (_: string, cb: () => void) => updateCbs.push(cb),
		removeEventListener: (_: string, cb: () => void) =>
			updateCbs.splice(updateCbs.indexOf(cb), 1),
		matches: false,
	};
	function setOrientation(o: Orientation) {
		stub.matches = o === 'portrait';
		updateCbs.forEach((cb) => cb());
	}
	const subscriptions: Unsubscribe[] = [];
	beforeEach(() => {
		sandbox.on(windowShim, 'matchMedia', () => stub);
		subscriptions.push(orientation$.subscribe(() => undefined));
	});
	afterEach(() => {
		subscriptions.forEach((s) => s());
		subscriptions.splice(0, subscriptions.length);
		setOrientation('landscape');
		sandbox.restore(windowShim, 'matchMedia');
	});

	it('checks the value', async () => {
		expect(orientation$.content()).to.eq('landscape');
		setOrientation('portrait');
		expect(orientation$.content()).to.eq('portrait');
	});
});
