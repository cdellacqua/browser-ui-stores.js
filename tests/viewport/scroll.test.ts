import chai, {expect} from 'chai';
import {windowShim} from '../../src/lib/ssr-shim';
import {
	scrollX$,
	scrollXPassive$,
	scrollY$,
	scrollYPassive$,
	windowScroll$,
	windowScrollPassive$,
} from '../../src/lib';
import spies from 'chai-spies';
import {Unsubscribe} from 'universal-stores';
import {debounce} from '@cdellacqua/debounce';

chai.use(spies);

describe('scroll stores', () => {
	const sandbox = chai.spy.sandbox();
	const updateCbs: (() => void)[] = [];
	function setScroll({x, y}: {x: number; y: number}) {
		windowShim.scrollX = x;
		windowShim.scrollY = y;
		updateCbs.forEach((cb) => cb());
	}
	const subscriptions: Unsubscribe[] = [];
	beforeEach(() => {
		setScroll({x: 0, y: 0});
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
			windowScroll$.subscribe(() => undefined),
			windowScrollPassive$.subscribe(() => undefined),
			scrollX$.subscribe(() => undefined),
			scrollXPassive$.subscribe(() => undefined),
			scrollY$.subscribe(() => undefined),
			scrollYPassive$.subscribe(() => undefined),
		);
	});
	afterEach(() => {
		subscriptions.forEach((s) => s());
		subscriptions.splice(0, subscriptions.length);
		sandbox.restore();
	});
	it('tests the non-passive version of windowScroll$', () => {
		expect(windowScroll$.value).to.eqls({x: 0, y: 0});
		setScroll({x: 10, y: 10});
		expect(windowScroll$.value).to.eqls({x: 10, y: 10});
	});
	it('tests the passive version of windowScroll$', async () => {
		expect(windowScrollPassive$.value).to.eqls({x: 0, y: 0});
		setScroll({x: 10, y: 10});
		expect(windowScrollPassive$.value).to.eqls({x: 0, y: 0});
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 / 60th of a second
		expect(windowScrollPassive$.value).to.eqls({x: 10, y: 10});
	});
	it('tests the non-passive version of scrollX$', () => {
		expect(scrollX$.value).to.eqls(0);
		setScroll({x: 20, y: 30});
		expect(scrollX$.value).to.eqls(20);
	});
	it('tests the non version of scrollX$', async () => {
		expect(scrollXPassive$.value).to.eqls(0);
		setScroll({x: 40, y: 50});
		expect(scrollXPassive$.value).to.eqls(0);
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 / 60th of a second
		expect(scrollXPassive$.value).to.eqls(40);
	});
	it('tests the non-passive version of scrollY$', () => {
		expect(scrollY$.value).to.eqls(0);
		setScroll({x: 20, y: 30});
		expect(scrollY$.value).to.eqls(30);
	});
	it('tests the passive version of scrollY$', async () => {
		expect(scrollYPassive$.value).to.eqls(0);
		setScroll({x: 40, y: 50});
		expect(scrollYPassive$.value).to.eqls(0);
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 / 60th of a second
		expect(scrollYPassive$.value).to.eqls(50);
	});
});
