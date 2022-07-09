import {makeDerivedStore} from 'universal-stores';
import {
	bodyScrollSize$,
	makeScreenSizeStore,
	orientation$,
	prefersColorScheme$,
	scrollY$,
	viewportSize$,
	windowScroll$,
} from './lib';
import './style.css';

const appDiv = document.getElementById('app') as HTMLDivElement;

if (window.location.pathname === '/colorscheme') {
	prefersColorScheme$.subscribe(
		(scheme) => (appDiv.textContent = `Preferred color scheme: ${scheme}`),
	);
} else if (window.location.pathname === '/screensize') {
	const screenSize$ = makeScreenSizeStore({
		names: ['sm', 'md', 'lg'],
		thresholds: [768, 992],
	});

	screenSize$.subscribe(
		({name}) => (appDiv.textContent = `Your screen is categorized as ${name}`),
	);
} else if (window.location.pathname === '/scrolltotop') {
	appDiv.style.height = '200vh';
	appDiv.textContent = 'try scrolling down';

	const goToTopButton = document.createElement('button');
	goToTopButton.type = 'button';
	goToTopButton.textContent = 'Go to the top';
	goToTopButton.style.position = 'fixed';
	goToTopButton.style.bottom = '0';
	goToTopButton.style.right = '0';
	goToTopButton.addEventListener('click', () => window.scrollTo(0, 0));
	scrollY$.subscribe((scrollY) => {
		goToTopButton.style.display = scrollY > 10 ? 'inline-block' : 'none';
	});

	document.body.appendChild(goToTopButton);
} else if (window.location.pathname === '/orientation') {
	orientation$.subscribe((orientation) => {
		appDiv.textContent = `Your screen is in ${orientation} mode`;
	});
} else {
	const screenSize$ = makeScreenSizeStore({
		names: ['xs', 'sm', 'md', 'lg', 'xl'],
		thresholds: [480, 768, 992, 1280],
		dimension: 'width',
		strategy: 'min',
	});
	const screenSizeAlt$ = makeScreenSizeStore({
		names: ['xs', 'sm', 'md', 'lg', 'xl'],
		thresholds: [480, 768, 992, 1280],
		dimension: 'width',
		strategy: 'max',
	});

	appDiv.style.width = '200vw';
	appDiv.style.height = '200vh';

	const statsDiv = document.createElement('div');
	statsDiv.style.whiteSpace = 'pre-line';
	statsDiv.style.position = 'fixed';
	statsDiv.style.top = '0';
	statsDiv.style.paddingLeft = '1rem';
	statsDiv.style.paddingTop = '1rem';
	statsDiv.style.left = '0';
	statsDiv.style.textAlign = 'left';
	appDiv.append(statsDiv);

	const stats$ = makeDerivedStore(
		[
			screenSize$,
			screenSizeAlt$,
			prefersColorScheme$,
			bodyScrollSize$,
			viewportSize$,
			windowScroll$,
			orientation$,
		],
		(x) => x,
	);

	stats$.subscribe(
		([
			screenSize,
			screenSizeAlt,
			prefersColorScheme,
			bodyScrollSize,
			viewportSize,
			windowScroll,
			orientation,
		]) => {
			statsDiv.textContent = `Your screen size is ${screenSize.name}
			# Store values:
			prefersColorScheme: '${prefersColorScheme}'
			bodyScrollSize: { width: ${bodyScrollSize.width}, height: ${bodyScrollSize.height} }
			screenSize: { threshold: ${screenSize.threshold}, name: '${screenSize.name}', index: ${screenSize.index} }
			screenSizeAlt: { threshold: ${screenSizeAlt.threshold}, name: '${screenSizeAlt.name}', index: ${screenSizeAlt.index} }
			viewportSize: { width: ${viewportSize.width}, height: ${viewportSize.height} }
			orientation: '${orientation}'
			windowScroll: { x: ${windowScroll.x}, y: ${windowScroll.y} }
			# bodyScrollSize.width <= windowSize.width
			# and
			# bodyScrollSize.height <= windowSize.height
			# because the former takes into account scrollbars that
			# could decrease the actual rendering space.`;
		},
	);
}
