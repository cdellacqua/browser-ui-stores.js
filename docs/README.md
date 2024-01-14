browser-ui-stores

# browser-ui-stores

## Table of contents

### Interfaces

- [MakeScreenSizeStoreParams](interfaces/MakeScreenSizeStoreParams.md)
- [ScreenSize](interfaces/ScreenSize.md)

### Type Aliases

- [ColorScheme](README.md#colorscheme)
- [Orientation](README.md#orientation)
- [ReadonlyStore](README.md#readonlystore)
- [Subscriber](README.md#subscriber)
- [Unsubscribe](README.md#unsubscribe)

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

[src/lib/appearance/prefers-color-scheme.ts:4](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/appearance/prefers-color-scheme.ts#L4)

___

### Orientation

Ƭ **Orientation**: ``"landscape"`` \| ``"portrait"``

#### Defined in

[src/lib/viewport/orientation.ts:4](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/viewport/orientation.ts#L4)

___

### ReadonlyStore

Ƭ **ReadonlyStore**<`T`\>: `Object`

A store that can have subscribers and emit values to them. It also
provides the current value upon subscription. It's readonly in the
sense that it doesn't provide direct set/update methods, unlike {@link Store},
therefore its value can only be changed by a {@link StartHandler} (see also {@link makeReadonlyStore}).

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `content` | () => `T` |
| `nOfSubscriptions` | () => `number` |
| `subscribe` | (`subscriber`: [`Subscriber`](README.md#subscriber)<`T`\>) => [`Unsubscribe`](README.md#unsubscribe) |

#### Defined in

node_modules/universal-stores/dist/index.d.ts:33

___

### Subscriber

Ƭ **Subscriber**<`T`\>: (`current`: `T`) => `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`current`): `void`

A generic subscriber that takes a value emitted by a signal as its only parameter.

##### Parameters

| Name | Type |
| :------ | :------ |
| `current` | `T` |

##### Returns

`void`

#### Defined in

node_modules/@cdellacqua/signals/dist/index.d.ts:2

___

### Unsubscribe

Ƭ **Unsubscribe**: () => `void`

#### Type declaration

▸ (): `void`

A function that's used to unsubscribe a subscriber from a signal.

##### Returns

`void`

#### Defined in

node_modules/@cdellacqua/signals/dist/index.d.ts:4

## Variables

### bodyScrollHeight$

• `Const` **bodyScrollHeight$**: [`ReadonlyStore`](README.md#readonlystore)<`number`\>

A readonly store that contains the scrollHeight of the body.

Note that using this store will append a style element to the head of the document to position the body in 'relative' mode element will be appended to the head of the document,
so that you can still override when needed by editing the body inline style.

#### Defined in

[src/lib/body/size.ts:106](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/body/size.ts#L106)

___

### bodyScrollHeightPassive$

• `Const` **bodyScrollHeightPassive$**: [`ReadonlyStore`](README.md#readonlystore)<`number`\>

A readonly store that contains the scrollHeight of the body (uses a passive event listener).

Note that using this store will append a style element to the head of the document to position the body in 'relative' mode element will be appended to the head of the document,
so that you can still override when needed by editing the body inline style.

#### Defined in

[src/lib/body/size.ts:117](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/body/size.ts#L117)

___

### bodyScrollSize$

• `Const` **bodyScrollSize$**: [`ReadonlyStore`](README.md#readonlystore)<{ `height`: `number` ; `width`: `number`  }\>

A readonly store that contains the scroll size of the body.

Note that using this store will append a style element to the head of the document to position the body in 'relative' mode element will be appended to the head of the document,
so that you can still override when needed by editing the body inline style.

#### Defined in

[src/lib/body/size.ts:67](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/body/size.ts#L67)

___

### bodyScrollSizePassive$

• `Const` **bodyScrollSizePassive$**: [`ReadonlyStore`](README.md#readonlystore)<{ `height`: `number` ; `width`: `number`  }\>

A readonly store that contains the scroll size of the body (uses a passive event listener).

Note that using this store will append a style element to the head of the document to position the body in 'relative' mode element will be appended to the head of the document,
so that you can still override when needed by editing the body inline style.

#### Defined in

[src/lib/body/size.ts:75](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/body/size.ts#L75)

___

### bodyScrollWidth$

• `Const` **bodyScrollWidth$**: [`ReadonlyStore`](README.md#readonlystore)<`number`\>

A readonly store that contains the scrollWidth of the body.

Note that using this store will append a style element to the head of the document to position the body in 'relative' mode element will be appended to the head of the document,
so that you can still override when needed by editing the body inline style.

#### Defined in

[src/lib/body/size.ts:83](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/body/size.ts#L83)

___

### bodyScrollWidthPassive$

• `Const` **bodyScrollWidthPassive$**: [`ReadonlyStore`](README.md#readonlystore)<`number`\>

A readonly store that contains the scrollWidth of the body (uses a passive event listener).

Note that using this store will append a style element to the head of
the document to position the body in 'relative' mode.
You will still be able to override tp needed by editing the body inline style.

#### Defined in

[src/lib/body/size.ts:95](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/body/size.ts#L95)

___

### documentVisible$

• `Const` **documentVisible$**: [`ReadonlyStore`](README.md#readonlystore)<`boolean`\>

A readonly store that contains true if the document is visible, false otherwise.

#### Defined in

[src/lib/document/visible.ts:7](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/document/visible.ts#L7)

___

### innerHeight$

• `Const` **innerHeight$**: [`ReadonlyStore`](README.md#readonlystore)<`number`\>

A readonly store that contains the innerHeight of the window.

#### Defined in

[src/lib/viewport/size.ts:51](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/viewport/size.ts#L51)

___

### innerHeightPassive$

• `Const` **innerHeightPassive$**: [`ReadonlyStore`](README.md#readonlystore)<`number`\>

A readonly store that contains the innerHeight of the window (uses a passive event listener).

#### Defined in

[src/lib/viewport/size.ts:59](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/viewport/size.ts#L59)

___

### innerWidth$

• `Const` **innerWidth$**: [`ReadonlyStore`](README.md#readonlystore)<`number`\>

A readonly store that contains the innerWidth of the window.

#### Defined in

[src/lib/viewport/size.ts:38](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/viewport/size.ts#L38)

___

### innerWidthPassive$

• `Const` **innerWidthPassive$**: [`ReadonlyStore`](README.md#readonlystore)<`number`\>

A readonly store that contains the innerWidth of the window (uses a passive event listener).

#### Defined in

[src/lib/viewport/size.ts:43](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/viewport/size.ts#L43)

___

### orientation$

• `Const` **orientation$**: [`ReadonlyStore`](README.md#readonlystore)<[`Orientation`](README.md#orientation)\>

A readonly store that indicates whether the viewport is in landscape or portrait mode.

#### Defined in

[src/lib/viewport/orientation.ts:9](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/viewport/orientation.ts#L9)

___

### prefersColorScheme$

• `Const` **prefersColorScheme$**: [`ReadonlyStore`](README.md#readonlystore)<[`ColorScheme`](README.md#colorscheme)\>

A readonly store that contains the preferred color scheme.
It defaults to 'light' if no explicit preference has been set by
the user agent.

#### Defined in

[src/lib/appearance/prefers-color-scheme.ts:11](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/appearance/prefers-color-scheme.ts#L11)

___

### prefersColorSchemeDarkDefault$

• `Const` **prefersColorSchemeDarkDefault$**: [`ReadonlyStore`](README.md#readonlystore)<[`ColorScheme`](README.md#colorscheme)\>

A readonly store that contains the preferred color scheme.
It defaults to 'dark' if no explicit preference has been set by
the user agent.

#### Defined in

[src/lib/appearance/prefers-color-scheme.ts:21](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/appearance/prefers-color-scheme.ts#L21)

___

### scrollX$

• `Const` **scrollX$**: [`ReadonlyStore`](README.md#readonlystore)<`number`\>

A readonly store that contains the current scrolling position on the X axis.

#### Defined in

[src/lib/viewport/scroll.ts:37](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/viewport/scroll.ts#L37)

___

### scrollXPassive$

• `Const` **scrollXPassive$**: [`ReadonlyStore`](README.md#readonlystore)<`number`\>

A readonly store that contains the current scrolling position on the X axis (uses a passive event listener).

#### Defined in

[src/lib/viewport/scroll.ts:42](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/viewport/scroll.ts#L42)

___

### scrollY$

• `Const` **scrollY$**: [`ReadonlyStore`](README.md#readonlystore)<`number`\>

A readonly store that contains the current scrolling position on the Y axis.

#### Defined in

[src/lib/viewport/scroll.ts:50](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/viewport/scroll.ts#L50)

___

### scrollYPassive$

• `Const` **scrollYPassive$**: [`ReadonlyStore`](README.md#readonlystore)<`number`\>

A readonly store that contains the current scrolling position on the Y axis (uses a passive event listener).

#### Defined in

[src/lib/viewport/scroll.ts:55](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/viewport/scroll.ts#L55)

___

### viewportSize$

• `Const` **viewportSize$**: [`ReadonlyStore`](README.md#readonlystore)<{ `height`: `number` ; `width`: `number`  }\>

A readonly store that contains the size of the viewport (innerWidth and innerHeight of the window).

#### Defined in

[src/lib/viewport/size.ts:28](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/viewport/size.ts#L28)

___

### viewportSizePassive$

• `Const` **viewportSizePassive$**: [`ReadonlyStore`](README.md#readonlystore)<{ `height`: `number` ; `width`: `number`  }\>

A readonly store that contains the size of the viewport (innerWidth and innerHeight of the window) (uses a passive event listener).

#### Defined in

[src/lib/viewport/size.ts:33](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/viewport/size.ts#L33)

___

### windowScroll$

• `Const` **windowScroll$**: [`ReadonlyStore`](README.md#readonlystore)<{ `x`: `number` ; `y`: `number`  }\>

A readonly store that contains the current scrolling position (x and y).

#### Defined in

[src/lib/viewport/scroll.ts:27](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/viewport/scroll.ts#L27)

___

### windowScrollPassive$

• `Const` **windowScrollPassive$**: [`ReadonlyStore`](README.md#readonlystore)<{ `x`: `number` ; `y`: `number`  }\>

A readonly store that contains the current scrolling position (x and y) (uses a passive event listener).

#### Defined in

[src/lib/viewport/scroll.ts:32](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/viewport/scroll.ts#L32)

## Functions

### makeMediaQueryStore

▸ **makeMediaQueryStore**(`mediaQueryString`): [`ReadonlyStore`](README.md#readonlystore)<`boolean`\>

Create a boolean ReadonlyStore whose value corresponds to whether or not
a media query "matches".

Example usage:
```ts
const prefersLightTheme$ = makeMediaQueryStore('(prefers-color-scheme: light)');
console.log(prefersLightTheme$.content()); // true or false depending on the browser/system settings.

prefersLightTheme$.subscribe(console.log); // will print true or false immediately and every time the preference changes.
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mediaQueryString` | `string` | a media query string compatible with window.matchMedia. |

#### Returns

[`ReadonlyStore`](README.md#readonlystore)<`boolean`\>

a boolean ReadonlyStore

#### Defined in

[src/lib/utils/media-query.ts:19](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/utils/media-query.ts#L19)

___

### makeScreenSizeStore

▸ **makeScreenSizeStore**(`__namedParameters`): [`ReadonlyStore`](README.md#readonlystore)<[`ScreenSize`](interfaces/ScreenSize.md)\>

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

[`ReadonlyStore`](README.md#readonlystore)<[`ScreenSize`](interfaces/ScreenSize.md)\>

a readonly store

#### Defined in

[src/lib/viewport/screen.ts:59](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/viewport/screen.ts#L59)
