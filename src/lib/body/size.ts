import {
	makeDerivedStore,
	makeReadonlyStore,
	ReadonlyStore,
} from 'universal-stores';
import {documentShim} from '../ssr-shim';

let referenceWindow: Window | undefined;

function getReferenceWindow(): Window {
	if (!referenceWindow) {
		const bodyStyle = documentShim.createElement('style');
		bodyStyle.innerHTML = 'body{position:relative}';
		const iframe = documentShim.createElement('iframe') as HTMLIFrameElement;
		iframe.style.display = 'block';
		iframe.style.position = 'absolute';
		iframe.style.top = '0px';
		iframe.style.left = '0px';
		iframe.style.width = '100%';
		iframe.style.height = '100%';
		iframe.style.overflow = 'hidden';
		iframe.style.border = '0px';
		iframe.style.opacity = '0';
		iframe.style.pointerEvents = 'none';
		iframe.style.zIndex = '-1';
		iframe.src = 'about:blank';
		iframe.tabIndex = -1;
		iframe.setAttribute('aria-hidden', 'true');

		documentShim.head.appendChild(bodyStyle as HTMLElement);
		documentShim.body.appendChild(iframe as HTMLIFrameElement);

		referenceWindow = iframe.contentWindow as Window;
	}

	return referenceWindow;
}

function makeSizeStore(
	passive = false,
): ReadonlyStore<{width: number; height: number}> {
	return makeReadonlyStore<{width: number; height: number}>(undefined, {
		start: (set) => {
			const refWindow = getReferenceWindow();

			const update = () =>
				set({
					width: refWindow.innerWidth,
					height: refWindow.innerHeight,
				});
			update();
			refWindow.addEventListener('resize', update, {passive});
			return () => {
				refWindow.removeEventListener('resize', update);
			};
		},
		comparator: (a, b) => a.width === b.width && a.height === b.height,
	});
}

/**
 * A readonly store that contains the scroll size of the body.
 *
 * Note that using this store will append a style element to the head of the document to position the body in 'relative' mode element will be appended to the head of the document,
 * so that you can still override when needed by editing the body inline style.
 */
export const bodyScrollSize$ = makeSizeStore();

/**
 * A readonly store that contains the scroll size of the body (uses a passive event listener).
 *
 * Note that using this store will append a style element to the head of the document to position the body in 'relative' mode element will be appended to the head of the document,
 * so that you can still override when needed by editing the body inline style.
 */
export const bodyScrollSizePassive$ = makeSizeStore(true);

/**
 * A readonly store that contains the scrollWidth of the body.
 *
 * Note that using this store will append a style element to the head of the document to position the body in 'relative' mode element will be appended to the head of the document,
 * so that you can still override when needed by editing the body inline style.
 */
export const bodyScrollWidth$ = makeDerivedStore(
	bodyScrollSize$,
	({width}) => width,
);

/**
 * A readonly store that contains the scrollWidth of the body (uses a passive event listener).
 *
 * Note that using this store will append a style element to the head of
 * the document to position the body in 'relative' mode.
 * You will still be able to override tp needed by editing the body inline style.
 */
export const bodyScrollWidthPassive$ = makeDerivedStore(
	bodyScrollSizePassive$,
	({width}) => width,
);

/**
 * A readonly store that contains the scrollHeight of the body.
 *
 * Note that using this store will append a style element to the head of the document to position the body in 'relative' mode element will be appended to the head of the document,
 * so that you can still override when needed by editing the body inline style.
 */
export const bodyScrollHeight$ = makeDerivedStore(
	bodyScrollSize$,
	({height}) => height,
);

/**
 * A readonly store that contains the scrollHeight of the body (uses a passive event listener).
 *
 * Note that using this store will append a style element to the head of the document to position the body in 'relative' mode element will be appended to the head of the document,
 * so that you can still override when needed by editing the body inline style.
 */
export const bodyScrollHeightPassive$ = makeDerivedStore(
	bodyScrollSizePassive$,
	({height}) => height,
);
