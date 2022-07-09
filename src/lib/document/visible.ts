import {makeReadonlyStore} from 'universal-stores';
import {documentShim} from '../ssr-shim';

/**
 * A readonly store that contains true if the document is visible, false otherwise.
 */
export const documentVisible$ = makeReadonlyStore<boolean>(undefined, (set) => {
	const update = () => set(documentShim.visibilityState === 'visible');
	update();
	documentShim.addEventListener('visibilitychange', update);
	return () => {
		documentShim.removeEventListener('visibilitychange', update);
	};
});
