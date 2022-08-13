import chai, {expect} from 'chai';
import {windowShim} from '../../src/lib/ssr-shim';
import {
	bodyScrollSize$,
	bodyScrollSizePassive$,
	bodyScrollWidth$,
	bodyScrollWidthPassive$,
	bodyScrollHeight$,
	bodyScrollHeightPassive$,
} from '../../src/lib';
import spies from 'chai-spies';
import {Unsubscribe} from 'universal-stores';
import {debounce} from '@cdellacqua/debounce';

chai.use(spies);

describe('document size stores', () => {
	const sandbox = chai.spy.sandbox();
	const updateCbs: (() => void)[] = [];
	function setSize({width, height}: {width: number; height: number}) {
		windowShim.innerWidth = width;
		windowShim.innerHeight = height;
		updateCbs.forEach((cb) => cb());
	}
	const subscriptions: Unsubscribe[] = [];
	beforeEach(() => {
		setSize({width: 0, height: 0});
		sandbox.on(
			windowShim,
			'addEventListener',
			(_, cb, opt?: {passive?: boolean}) =>
				updateCbs.push(opt?.passive ? debounce(cb) : cb),
		);
		sandbox.on(windowShim, 'removeEventListener', (_, cb) =>
			updateCbs.splice(updateCbs.indexOf(cb), 1),
		);
		subscriptions.push(
			bodyScrollSize$.subscribe(() => undefined),
			bodyScrollSizePassive$.subscribe(() => undefined),
			bodyScrollWidth$.subscribe(() => undefined),
			bodyScrollWidthPassive$.subscribe(() => undefined),
			bodyScrollHeight$.subscribe(() => undefined),
			bodyScrollHeightPassive$.subscribe(() => undefined),
		);
	});
	afterEach(() => {
		subscriptions.forEach((s) => s());
		subscriptions.splice(0, subscriptions.length);
		sandbox.restore();
	});
	it('tests the non-passive version of bodyScrollSize$', () => {
		expect(bodyScrollSize$.content()).to.eqls({width: 0, height: 0});
		setSize({width: 10, height: 10});
		expect(bodyScrollSize$.content()).to.eqls({width: 10, height: 10});
	});
	it('tests the passive version of bodyScrollSize$', async () => {
		expect(bodyScrollSizePassive$.content()).to.eqls({width: 0, height: 0});
		setSize({width: 10, height: 10});
		expect(bodyScrollSizePassive$.content()).to.eqls({width: 0, height: 0});
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 / 60th of a second
		expect(bodyScrollSizePassive$.content()).to.eqls({width: 10, height: 10});
	});
	it('tests the non-passive version of bodyScrollWidth$', () => {
		expect(bodyScrollWidth$.content()).to.eqls(0);
		setSize({width: 20, height: 30});
		expect(bodyScrollWidth$.content()).to.eqls(20);
	});
	it('tests the passive version of bodyScrollWidth$', async () => {
		expect(bodyScrollWidthPassive$.content()).to.eqls(0);
		setSize({width: 40, height: 50});
		expect(bodyScrollWidthPassive$.content()).to.eqls(0);
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 / 60th of a second
		expect(bodyScrollWidthPassive$.content()).to.eqls(40);
	});
	it('tests the non-passive version of bodyScrollHeight$', () => {
		expect(bodyScrollHeight$.content()).to.eqls(0);
		setSize({width: 20, height: 30});
		expect(bodyScrollHeight$.content()).to.eqls(30);
	});
	it('tests the passive version of bodyScrollHeight$', async () => {
		expect(bodyScrollHeightPassive$.content()).to.eqls(0);
		setSize({width: 40, height: 50});
		expect(bodyScrollHeightPassive$.content()).to.eqls(0);
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 / 60th of a second
		expect(bodyScrollHeightPassive$.content()).to.eqls(50);
	});
});
