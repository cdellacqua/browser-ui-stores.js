import chai, {expect} from 'chai';
import {documentShim} from '../../src/lib/ssr-shim';
import {documentVisible$} from '../../src/lib/document/index';
import spies from 'chai-spies';

chai.use(spies);

describe('document visibility stores', () => {
	const sandbox = chai.spy.sandbox();
	const updateCbs: (() => void)[] = [];
	function setVisibility(visibilityState: DocumentVisibilityState) {
		(documentShim as {visibilityState: string}).visibilityState =
			visibilityState;
		updateCbs.forEach((cb) => cb());
	}
	beforeEach(() => {
		setVisibility('visible');
		sandbox.on(documentShim, 'addEventListener', (_, cb) => updateCbs.push(cb));
		sandbox.on(documentShim, 'removeEventListener', (_, cb) =>
			updateCbs.splice(updateCbs.indexOf(cb), 1),
		);
	});
	afterEach(() => {
		sandbox.restore();
	});
	it('tests the visibility state', () => {
		expect(documentVisible$.value).to.be.true;
		setVisibility('hidden');
		expect(documentVisible$.value).to.be.false;
	});
	it('tests the visibility state with an active subscription', () => {
		let actual: boolean | undefined;

		const unsubscribe = documentVisible$.subscribe((v) => (actual = v));

		expect(actual).to.be.true;
		setVisibility('hidden');
		expect(actual).to.be.false;

		unsubscribe();
	});
});
