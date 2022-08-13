import chai, {expect} from 'chai';
import {windowShim} from '../../src/lib/ssr-shim';
import {
	viewportSize$,
	innerWidth$,
	innerHeight$,
	viewportSizePassive$,
	innerWidthPassive$,
	innerHeightPassive$,
} from '../../src/lib';
import spies from 'chai-spies';
import {Unsubscribe} from 'universal-stores';
import {debounce} from '@cdellacqua/debounce';

chai.use(spies);

describe('viewport size stores', () => {
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
			viewportSize$.subscribe(() => undefined),
			viewportSizePassive$.subscribe(() => undefined),
			innerWidth$.subscribe(() => undefined),
			innerWidthPassive$.subscribe(() => undefined),
			innerHeight$.subscribe(() => undefined),
			innerHeightPassive$.subscribe(() => undefined),
		);
	});
	afterEach(() => {
		subscriptions.forEach((s) => s());
		subscriptions.splice(0, subscriptions.length);
		sandbox.restore();
	});
	it('tests the non-passive version of viewportSize$', () => {
		expect(viewportSize$.content()).to.eqls({width: 0, height: 0});
		setSize({width: 10, height: 10});
		expect(viewportSize$.content()).to.eqls({width: 10, height: 10});
	});
	it('tests the passive version of viewportSize$', async () => {
		expect(viewportSizePassive$.content()).to.eqls({width: 0, height: 0});
		setSize({width: 10, height: 10});
		expect(viewportSizePassive$.content()).to.eqls({width: 0, height: 0});
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 / 60th of a second
		expect(viewportSizePassive$.content()).to.eqls({width: 10, height: 10});
	});
	it('tests the non-passive version of innerWidth$', () => {
		expect(innerWidth$.content()).to.eqls(0);
		setSize({width: 20, height: 30});
		expect(innerWidth$.content()).to.eqls(20);
	});
	it('tests the passive version of innerWidth$', async () => {
		expect(innerWidthPassive$.content()).to.eqls(0);
		setSize({width: 40, height: 50});
		expect(innerWidthPassive$.content()).to.eqls(0);
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 / 60th of a second
		expect(innerWidthPassive$.content()).to.eqls(40);
	});
	it('tests the non-passive version of innerHeight$', () => {
		expect(innerHeight$.content()).to.eqls(0);
		setSize({width: 20, height: 30});
		expect(innerHeight$.content()).to.eqls(30);
	});
	it('tests the passive version of innerHeight$', async () => {
		expect(innerHeightPassive$.content()).to.eqls(0);
		setSize({width: 40, height: 50});
		expect(innerHeightPassive$.content()).to.eqls(0);
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 / 60th of a second
		expect(innerHeightPassive$.content()).to.eqls(50);
	});
});
