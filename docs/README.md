browser-ui-stores

# browser-ui-stores

## Table of contents

### Interfaces

- [MakeScreenSizeStoreParams](interfaces/MakeScreenSizeStoreParams.md)
- [ScreenSize](interfaces/ScreenSize.md)

### Type Aliases

- [ColorScheme](README.md#colorscheme)
- [Orientation](README.md#orientation)

### Variables

- [bodyScrollHeight$](README.md#bodyscrollheight$)
- [bodyScrollHeightPassive$](README.md#bodyscrollheightpassive$)
- [bodyScrollSize$](README.md#bodyscrollsize$)
- [bodyScrollSizePassive$](README.md#bodyscrollsizepassive$)
- [bodyScrollWidth$](README.md#bodyscrollwidth$)
- [bodyScrollWidthPassive$](README.md#bodyscrollwidthpassive$)
- [documentVisible$](README.md#documentvisible$)
- [innerHeight$](README.md#innerheight$)
- [innerHeightPassive$](README.md#innerheightpassive$)
- [innerWidth$](README.md#innerwidth$)
- [innerWidthPassive$](README.md#innerwidthpassive$)
- [orientation$](README.md#orientation$)
- [prefersColorScheme$](README.md#preferscolorscheme$)
- [prefersColorSchemeDarkDefault$](README.md#preferscolorschemedarkdefault$)
- [scrollX$](README.md#scrollx$)
- [scrollXPassive$](README.md#scrollxpassive$)
- [scrollY$](README.md#scrolly$)
- [scrollYPassive$](README.md#scrollypassive$)
- [viewportSize$](README.md#viewportsize$)
- [viewportSizePassive$](README.md#viewportsizepassive$)
- [windowScroll$](README.md#windowscroll$)
- [windowScrollPassive$](README.md#windowscrollpassive$)

### Functions

- [makeMediaQueryStore](README.md#makemediaquerystore)
- [makeScreenSizeStore](README.md#makescreensizestore)

## Type Aliases

### ColorScheme

Ƭ **ColorScheme**: ``"light"`` \| ``"dark"``

#### Defined in

[appearance/prefers-color-scheme.ts:4](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/appearance/prefers-color-scheme.ts#L4)

___

### Orientation

Ƭ **Orientation**: ``"landscape"`` \| ``"portrait"``

#### Defined in

[viewport/orientation.ts:4](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/viewport/orientation.ts#L4)

## Variables

### bodyScrollHeight$

• `Const` **bodyScrollHeight$**: `ReadonlyStore`<`number`\>

A readonly store that contains the scrollHeight of the body.

Note that using this store will append a style element to the head of the document to position the body in 'relative' mode element will be appended to the head of the document,
so that you can still override when needed by editing the body inline style.

#### Defined in

[body/size.ts:106](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/body/size.ts#L106)

___

### bodyScrollHeightPassive$

• `Const` **bodyScrollHeightPassive$**: `ReadonlyStore`<`number`\>

A readonly store that contains the scrollHeight of the body (uses a passive event listener).

Note that using this store will append a style element to the head of the document to position the body in 'relative' mode element will be appended to the head of the document,
so that you can still override when needed by editing the body inline style.

#### Defined in

[body/size.ts:117](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/body/size.ts#L117)

___

### bodyScrollSize$

• `Const` **bodyScrollSize$**: `ReadonlyStore`<{ `height`: `number` ; `width`: `number`  }\>

A readonly store that contains the scroll size of the body.

Note that using this store will append a style element to the head of the document to position the body in 'relative' mode element will be appended to the head of the document,
so that you can still override when needed by editing the body inline style.

#### Defined in

[body/size.ts:67](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/body/size.ts#L67)

___

### bodyScrollSizePassive$

• `Const` **bodyScrollSizePassive$**: `ReadonlyStore`<{ `height`: `number` ; `width`: `number`  }\>

A readonly store that contains the scroll size of the body (uses a passive event listener).

Note that using this store will append a style element to the head of the document to position the body in 'relative' mode element will be appended to the head of the document,
so that you can still override when needed by editing the body inline style.

#### Defined in

[body/size.ts:75](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/body/size.ts#L75)

___

### bodyScrollWidth$

• `Const` **bodyScrollWidth$**: `ReadonlyStore`<`number`\>

A readonly store that contains the scrollWidth of the body.

Note that using this store will append a style element to the head of the document to position the body in 'relative' mode element will be appended to the head of the document,
so that you can still override when needed by editing the body inline style.

#### Defined in

[body/size.ts:83](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/body/size.ts#L83)

___

### bodyScrollWidthPassive$

• `Const` **bodyScrollWidthPassive$**: `ReadonlyStore`<`number`\>

A readonly store that contains the scrollWidth of the body (uses a passive event listener).

Note that using this store will append a style element to the head of
the document to position the body in 'relative' mode.
You will still be able to override tp needed by editing the body inline style.

#### Defined in

[body/size.ts:95](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/body/size.ts#L95)

___

### documentVisible$

• `Const` **documentVisible$**: `ReadonlyStore`<`boolean`\>

A readonly store that contains true if the document is visible, false otherwise.

#### Defined in

[document/visible.ts:7](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/document/visible.ts#L7)

___

### innerHeight$

• `Const` **innerHeight$**: `ReadonlyStore`<`number`\>

A readonly store that contains the innerHeight of the window.

#### Defined in

[viewport/size.ts:51](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/viewport/size.ts#L51)

___

### innerHeightPassive$

• `Const` **innerHeightPassive$**: `ReadonlyStore`<`number`\>

A readonly store that contains the innerHeight of the window (uses a passive event listener).

#### Defined in

[viewport/size.ts:59](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/viewport/size.ts#L59)

___

### innerWidth$

• `Const` **innerWidth$**: `ReadonlyStore`<`number`\>

A readonly store that contains the innerWidth of the window.

#### Defined in

[viewport/size.ts:38](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/viewport/size.ts#L38)

___

### innerWidthPassive$

• `Const` **innerWidthPassive$**: `ReadonlyStore`<`number`\>

A readonly store that contains the innerWidth of the window (uses a passive event listener).

#### Defined in

[viewport/size.ts:43](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/viewport/size.ts#L43)

___

### orientation$

• `Const` **orientation$**: `ReadonlyStore`<[`Orientation`](README.md#orientation)\>

A readonly store that indicates whether the viewport is in landscape or portrait mode.

#### Defined in

[viewport/orientation.ts:9](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/viewport/orientation.ts#L9)

___

### prefersColorScheme$

• `Const` **prefersColorScheme$**: `ReadonlyStore`<[`ColorScheme`](README.md#colorscheme)\>

A readonly store that contains the preferred color scheme.
It defaults to 'light' if no explicit preference has been set by
the user agent.

#### Defined in

[appearance/prefers-color-scheme.ts:11](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/appearance/prefers-color-scheme.ts#L11)

___

### prefersColorSchemeDarkDefault$

• `Const` **prefersColorSchemeDarkDefault$**: `ReadonlyStore`<[`ColorScheme`](README.md#colorscheme)\>

A readonly store that contains the preferred color scheme.
It defaults to 'dark' if no explicit preference has been set by
the user agent.

#### Defined in

[appearance/prefers-color-scheme.ts:21](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/appearance/prefers-color-scheme.ts#L21)

___

### scrollX$

• `Const` **scrollX$**: `ReadonlyStore`<`number`\>

A readonly store that contains the current scrolling position on the X axis.

#### Defined in

[viewport/scroll.ts:37](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/viewport/scroll.ts#L37)

___

### scrollXPassive$

• `Const` **scrollXPassive$**: `ReadonlyStore`<`number`\>

A readonly store that contains the current scrolling position on the X axis (uses a passive event listener).

#### Defined in

[viewport/scroll.ts:42](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/viewport/scroll.ts#L42)

___

### scrollY$

• `Const` **scrollY$**: `ReadonlyStore`<`number`\>

A readonly store that contains the current scrolling position on the Y axis.

#### Defined in

[viewport/scroll.ts:50](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/viewport/scroll.ts#L50)

___

### scrollYPassive$

• `Const` **scrollYPassive$**: `ReadonlyStore`<`number`\>

A readonly store that contains the current scrolling position on the Y axis (uses a passive event listener).

#### Defined in

[viewport/scroll.ts:55](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/viewport/scroll.ts#L55)

___

### viewportSize$

• `Const` **viewportSize$**: `ReadonlyStore`<{ `height`: `number` ; `width`: `number`  }\>

A readonly store that contains the size of the viewport (innerWidth and innerHeight of the window).

#### Defined in

[viewport/size.ts:28](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/viewport/size.ts#L28)

___

### viewportSizePassive$

• `Const` **viewportSizePassive$**: `ReadonlyStore`<{ `height`: `number` ; `width`: `number`  }\>

A readonly store that contains the size of the viewport (innerWidth and innerHeight of the window) (uses a passive event listener).

#### Defined in

[viewport/size.ts:33](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/viewport/size.ts#L33)

___

### windowScroll$

• `Const` **windowScroll$**: `ReadonlyStore`<{ `x`: `number` ; `y`: `number`  }\>

A readonly store that contains the current scrolling position (x and y).

#### Defined in

[viewport/scroll.ts:27](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/viewport/scroll.ts#L27)

___

### windowScrollPassive$

• `Const` **windowScrollPassive$**: `ReadonlyStore`<{ `x`: `number` ; `y`: `number`  }\>

A readonly store that contains the current scrolling position (x and y) (uses a passive event listener).

#### Defined in

[viewport/scroll.ts:32](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/viewport/scroll.ts#L32)

## Functions

### makeMediaQueryStore

▸ **makeMediaQueryStore**(`mediaQueryString`): `ReadonlyStore`<`boolean`\>

Create a boolean ReadonlyStore whose value corresponds to whether or not
a media query "matches".

Example usage:
```ts
const prefersLightTheme$ = makeMediaQueryStore('(prefers-color-scheme: light)');
console.log(prefersLightTheme$.value); // true or false depending on the browser/system settings.

prefersLightTheme$.subscribe(console.log); // will print true or false immediately and every time the preference changes.
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mediaQueryString` | `string` | a media query string compatible with window.matchMedia. |

#### Returns

`ReadonlyStore`<`boolean`\>

a boolean ReadonlyStore

#### Defined in

[utils/media-query.ts:19](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/utils/media-query.ts#L19)

___

### makeScreenSizeStore

▸ **makeScreenSizeStore**(`__namedParameters`): `ReadonlyStore`<[`ScreenSize`](interfaces/ScreenSize.md)\>

Creates a store that indicates the screen size based on the width or height of the viewport.

Example usage:
```ts
const screenSize$ = makeScreenSizeStore({
	names: ['sm', 'md', 'lg'],
	thresholds: [768, 992],
});

screenSize$.subscribe(({name}) =>
	console.log(`Your screen is categorized as ${name}`),
);
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`MakeScreenSizeStoreParams`](interfaces/MakeScreenSizeStoreParams.md) |

#### Returns

`ReadonlyStore`<[`ScreenSize`](interfaces/ScreenSize.md)\>

a readonly store

#### Defined in

[viewport/screen.ts:59](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/viewport/screen.ts#L59)
