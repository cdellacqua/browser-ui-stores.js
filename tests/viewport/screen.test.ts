import chai, {expect} from 'chai';
import {windowShim} from '../../src/lib/ssr-shim';
import {makeScreenSizeStore} from '../../src/lib';
import spies from 'chai-spies';
import {Unsubscribe} from 'universal-stores';
import {debounce} from '@cdellacqua/debounce';

chai.use(spies);

describe('custom screen size store', () => {
	const sandbox = chai.spy.sandbox();
	const updateCbs: (() => void)[] = [];
	function setSize({width, height}: {width: number; height: number}) {
		windowShim.innerWidth = width;
		windowShim.innerHeight = height;
		updateCbs.forEach((cb) => cb());
	}
	const screenSizeMinWidth$ = makeScreenSizeStore({
		names: ['sm', 'md', 'lg'],
		thresholds: [768, 992],
		dimension: 'width',
		strategy: 'min',
		passive: false,
	});
	const screenSizeMinWidthPassive$ = makeScreenSizeStore({
		names: ['sm', 'md', 'lg'],
		thresholds: [768, 992],
		dimension: 'width',
		strategy: 'min',
		passive: true,
	});
	const screenSizeMaxWidth$ = makeScreenSizeStore({
		names: ['sm', 'md', 'lg'],
		thresholds: [768, 992],
		dimension: 'width',
		strategy: 'max',
		passive: false,
	});
	const screenSizeMaxWidthPassive$ = makeScreenSizeStore({
		names: ['sm', 'md', 'lg'],
		thresholds: [768, 992],
		dimension: 'width',
		strategy: 'max',
		passive: true,
	});
	const screenSizeMinHeight$ = makeScreenSizeStore({
		names: ['sm', 'md', 'lg'],
		thresholds: [768, 992],
		dimension: 'height',
		strategy: 'min',
		passive: false,
	});
	const screenSizeMinHeightPassive$ = makeScreenSizeStore({
		names: ['sm', 'md', 'lg'],
		thresholds: [768, 992],
		dimension: 'height',
		strategy: 'min',
		passive: true,
	});
	const screenSizeMaxHeight$ = makeScreenSizeStore({
		names: ['sm', 'md', 'lg'],
		thresholds: [768, 992],
		dimension: 'height',
		strategy: 'max',
		passive: false,
	});
	const screenSizeMaxHeightPassive$ = makeScreenSizeStore({
		names: ['sm', 'md', 'lg'],
		thresholds: [768, 992],
		dimension: 'height',
		strategy: 'max',
		passive: true,
	});
	const subscriptions: Unsubscribe[] = [];
	beforeEach(() => {
		setSize({width: 1000, height: 1000});
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
			screenSizeMinWidth$.subscribe(() => undefined),
			screenSizeMinWidthPassive$.subscribe(() => undefined),
			screenSizeMinHeight$.subscribe(() => undefined),
			screenSizeMinHeightPassive$.subscribe(() => undefined),
			screenSizeMaxWidth$.subscribe(() => undefined),
			screenSizeMaxWidthPassive$.subscribe(() => undefined),
			screenSizeMaxHeight$.subscribe(() => undefined),
			screenSizeMaxHeightPassive$.subscribe(() => undefined),
		);
	});
	afterEach(() => {
		subscriptions.forEach((s) => s());
		subscriptions.splice(0, subscriptions.length);
		sandbox.restore();
	});

	it('tests the non-passive version of screenSizeMaxWidth$', () => {
		setSize({width: 9000, height: 1000});
		expect(screenSizeMaxWidth$.value.name).to.eqls('lg');
		setSize({width: 993, height: 1000});
		expect(screenSizeMaxWidth$.value.name).to.eqls('lg');
		setSize({width: 992, height: 1000});
		expect(screenSizeMaxWidth$.value.name).to.eqls('md');
		setSize({width: 769, height: 1000});
		expect(screenSizeMaxWidth$.value.name).to.eqls('md');
		setSize({width: 768, height: 1000});
		expect(screenSizeMaxWidth$.value.name).to.eqls('sm');
		setSize({width: 0, height: 1000});
		expect(screenSizeMaxWidth$.value.name).to.eqls('sm');
	});
	it('tests the passive version of screenSizeMaxWidth', async () => {
		setSize({width: 9000, height: 1000});
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 / 60th of a second
		expect(screenSizeMaxWidthPassive$.value.name).to.eqls('lg');

		setSize({width: 993, height: 1000});
		expect(screenSizeMaxWidthPassive$.value.name).to.eqls('lg');
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 / 60th of a second
		expect(screenSizeMaxWidthPassive$.value.name).to.eqls('lg');

		setSize({width: 992, height: 1000});
		expect(screenSizeMaxWidthPassive$.value.name).to.eqls('lg');
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 / 60th of a second
		expect(screenSizeMaxWidthPassive$.value.name).to.eqls('md');

		setSize({width: 769, height: 1000});
		expect(screenSizeMaxWidthPassive$.value.name).to.eqls('md');
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 / 60th of a second
		expect(screenSizeMaxWidthPassive$.value.name).to.eqls('md');

		setSize({width: 768, height: 1000});
		expect(screenSizeMaxWidthPassive$.value.name).to.eqls('md');
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 / 60th of a second
		expect(screenSizeMaxWidthPassive$.value.name).to.eqls('sm');

		setSize({width: 0, height: 1000});
		expect(screenSizeMaxWidthPassive$.value.name).to.eqls('sm');
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 / 60th of a second
		expect(screenSizeMaxWidthPassive$.value.name).to.eqls('sm');
	});

	it('tests the non-passive version of screenSizeMaxHeight$', () => {
		setSize({height: 9000, width: 1000});
		expect(screenSizeMaxHeight$.value.name).to.eqls('lg');
		setSize({height: 993, width: 1000});
		expect(screenSizeMaxHeight$.value.name).to.eqls('lg');
		setSize({height: 992, width: 1000});
		expect(screenSizeMaxHeight$.value.name).to.eqls('md');
		setSize({height: 769, width: 1000});
		expect(screenSizeMaxHeight$.value.name).to.eqls('md');
		setSize({height: 768, width: 1000});
		expect(screenSizeMaxHeight$.value.name).to.eqls('sm');
		setSize({height: 0, width: 1000});
		expect(screenSizeMaxHeight$.value.name).to.eqls('sm');
	});
	it('tests the passive version of screenSizeMaxHeight', async () => {
		setSize({height: 9000, width: 1000});
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 / 60th of a second
		expect(screenSizeMaxHeightPassive$.value.name).to.eqls('lg');

		setSize({height: 993, width: 1000});
		expect(screenSizeMaxHeightPassive$.value.name).to.eqls('lg');
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 / 60th of a second
		expect(screenSizeMaxHeightPassive$.value.name).to.eqls('lg');

		setSize({height: 992, width: 1000});
		expect(screenSizeMaxHeightPassive$.value.name).to.eqls('lg');
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 / 60th of a second
		expect(screenSizeMaxHeightPassive$.value.name).to.eqls('md');

		setSize({height: 769, width: 1000});
		expect(screenSizeMaxHeightPassive$.value.name).to.eqls('md');
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 / 60th of a second
		expect(screenSizeMaxHeightPassive$.value.name).to.eqls('md');

		setSize({height: 768, width: 1000});
		expect(screenSizeMaxHeightPassive$.value.name).to.eqls('md');
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 / 60th of a second
		expect(screenSizeMaxHeightPassive$.value.name).to.eqls('sm');

		setSize({height: 0, width: 1000});
		expect(screenSizeMaxHeightPassive$.value.name).to.eqls('sm');
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 / 60th of a second
		expect(screenSizeMaxHeightPassive$.value.name).to.eqls('sm');
	});

	it('tests the non-passive version of screenSizeMinWidth$', () => {
		setSize({width: 9000, height: 1000});
		expect(screenSizeMinWidth$.value.name).to.eqls('lg');
		setSize({width: 992, height: 1000});
		expect(screenSizeMinWidth$.value.name).to.eqls('lg');
		setSize({width: 991, height: 1000});
		expect(screenSizeMinWidth$.value.name).to.eqls('md');
		setSize({width: 768, height: 1000});
		expect(screenSizeMinWidth$.value.name).to.eqls('md');
		setSize({width: 767, height: 1000});
		expect(screenSizeMinWidth$.value.name).to.eqls('sm');
		setSize({width: 0, height: 1000});
		expect(screenSizeMinWidth$.value.name).to.eqls('sm');
	});
	it('tests the passive version of screenSizeMinWidth', async () => {
		setSize({width: 9000, height: 1000});
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 / 60th of a second
		expect(screenSizeMinWidthPassive$.value.name).to.eqls('lg');

		setSize({width: 992, height: 1000});
		expect(screenSizeMinWidthPassive$.value.name).to.eqls('lg');
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 / 60th of a second
		expect(screenSizeMinWidthPassive$.value.name).to.eqls('lg');

		setSize({width: 991, height: 1000});
		expect(screenSizeMinWidthPassive$.value.name).to.eqls('lg');
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 / 60th of a second
		expect(screenSizeMinWidthPassive$.value.name).to.eqls('md');

		setSize({width: 768, height: 1000});
		expect(screenSizeMinWidthPassive$.value.name).to.eqls('md');
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 / 60th of a second
		expect(screenSizeMinWidthPassive$.value.name).to.eqls('md');

		setSize({width: 767, height: 1000});
		expect(screenSizeMinWidthPassive$.value.name).to.eqls('md');
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 / 60th of a second
		expect(screenSizeMinWidthPassive$.value.name).to.eqls('sm');

		setSize({width: 0, height: 1000});
		expect(screenSizeMinWidthPassive$.value.name).to.eqls('sm');
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 / 60th of a second
		expect(screenSizeMinWidthPassive$.value.name).to.eqls('sm');
	});

	it('tests the non-passive version of screenSizeMinHeight$', () => {
		setSize({height: 9000, width: 1000});
		expect(screenSizeMinHeight$.value.name).to.eqls('lg');
		setSize({height: 992, width: 1000});
		expect(screenSizeMinHeight$.value.name).to.eqls('lg');
		setSize({height: 991, width: 1000});
		expect(screenSizeMinHeight$.value.name).to.eqls('md');
		setSize({height: 768, width: 1000});
		expect(screenSizeMinHeight$.value.name).to.eqls('md');
		setSize({height: 767, width: 1000});
		expect(screenSizeMinHeight$.value.name).to.eqls('sm');
		setSize({height: 0, width: 1000});
		expect(screenSizeMinHeight$.value.name).to.eqls('sm');
	});
	it('tests the passive version of screenSizeMinHeight', async () => {
		setSize({height: 9000, width: 1000});
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 / 60th of a second
		expect(screenSizeMinHeightPassive$.value.name).to.eqls('lg');

		setSize({height: 992, width: 1000});
		expect(screenSizeMinHeightPassive$.value.name).to.eqls('lg');
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 / 60th of a second
		expect(screenSizeMinHeightPassive$.value.name).to.eqls('lg');

		setSize({height: 991, width: 1000});
		expect(screenSizeMinHeightPassive$.value.name).to.eqls('lg');
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 / 60th of a second
		expect(screenSizeMinHeightPassive$.value.name).to.eqls('md');

		setSize({height: 768, width: 1000});
		expect(screenSizeMinHeightPassive$.value.name).to.eqls('md');
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 / 60th of a second
		expect(screenSizeMinHeightPassive$.value.name).to.eqls('md');

		setSize({height: 767, width: 1000});
		expect(screenSizeMinHeightPassive$.value.name).to.eqls('md');
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 / 60th of a second
		expect(screenSizeMinHeightPassive$.value.name).to.eqls('sm');

		setSize({height: 0, width: 1000});
		expect(screenSizeMinHeightPassive$.value.name).to.eqls('sm');
		await new Promise<void>((res) => setTimeout(res, 1000 / 60)); // approximating requestAnimationFrame to 1 / 60th of a second
		expect(screenSizeMinHeightPassive$.value.name).to.eqls('sm');
	});

	it('verifies that indexes are from lower to higher resolution', async () => {
		setSize({width: 0, height: 0});
		expect(screenSizeMaxWidth$.value.index).to.be.eq(0);
		expect(screenSizeMinWidth$.value.index).to.be.eq(0);
		expect(screenSizeMaxHeight$.value.index).to.be.eq(0);
		expect(screenSizeMinHeight$.value.index).to.be.eq(0);
		setSize({width: 800, height: 800});
		expect(screenSizeMaxWidth$.value.index).to.be.eq(1);
		expect(screenSizeMinWidth$.value.index).to.be.eq(1);
		expect(screenSizeMaxHeight$.value.index).to.be.eq(1);
		expect(screenSizeMinHeight$.value.index).to.be.eq(1);
		setSize({width: 1000, height: 1000});
		expect(screenSizeMaxWidth$.value.index).to.be.eq(2);
		expect(screenSizeMinWidth$.value.index).to.be.eq(2);
		expect(screenSizeMaxHeight$.value.index).to.be.eq(2);
		expect(screenSizeMinHeight$.value.index).to.be.eq(2);
	});

	it('checks parameter validation', () => {
		expect(() =>
			makeScreenSizeStore({
				names: ['universal'],
				thresholds: [],
			}),
		).to.not.throw();
		expect(() =>
			makeScreenSizeStore({
				names: ['sm', 'md'],
				thresholds: [],
			}),
		).to.throw();
		expect(() =>
			makeScreenSizeStore({
				names: [],
				thresholds: [1, 2, 3],
			}),
		).to.throw();
		expect(() =>
			makeScreenSizeStore({
				names: [],
				thresholds: [1, 2],
			}),
		).to.throw();
		expect(() =>
			makeScreenSizeStore({
				names: [],
				thresholds: [1],
			}),
		).to.throw();
		expect(() =>
			makeScreenSizeStore({
				names: [],
				thresholds: [],
			}),
		).to.throw();
		expect(() =>
			makeScreenSizeStore({
				thresholds: [],
			}),
		).to.not.throw();
	});
});
