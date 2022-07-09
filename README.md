# browser-ui-stores

A collection of stores that monitor the size, orientation, color scheme and scroll of the browser window.

_Compatible with Server-Side Rendering._

[NPM Package](https://www.npmjs.com/package/browser-ui-stores)

`npm install browser-ui-stores`

[Documentation](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/docs/README.md)

## Highlights

- Check the user's preferred color scheme:

```ts
import {prefersColorScheme$} from 'browser-ui-stores';

prefersColorScheme$.subscribe((scheme) =>
	console.log(`Preferred color scheme: ${scheme}`),
);
```

- Use responsive media query in your code:

```ts
import {makeScreenSizeStore} from 'browser-ui-stores';

const screenSize$ = makeScreenSizeStore({
	names: ['sm', 'md', 'lg'],
	thresholds: [768, 992],
});

screenSize$.subscribe(({name}) =>
	console.log(`Your screen is categorized as ${name}`),
);
```

- Show a "go to the top" button when the user scrolls down the page:

```ts
import {scrollY$} from 'browser-ui-stores';

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
```

- Detect device orientation:

```ts
import {orientation$} from 'browser-ui-stores';

orientation$.subscribe((orientation) => {
	console.log(`Your screen is in ${orientation} mode`);
});
```
