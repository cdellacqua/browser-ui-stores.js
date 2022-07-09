[browser-ui-stores](../README.md) / ScreenSize

# Interface: ScreenSize

A screen size descriptor consists of a name indicating the category (e.g. 'sm', 'md', 'lg', ...),
a threshold indicating its validity and an index with
respect to other registered breakpoints. The lower
the index, the lower the corresponding threshold.

## Table of contents

### Properties

- [index](ScreenSize.md#index)
- [name](ScreenSize.md#name)
- [threshold](ScreenSize.md#threshold)

## Properties

### index

• **index**: `number`

Index of the breakpoint, from 0 (lower threshold) to n. of names - 1.

#### Defined in

[viewport/screen.ts:17](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/viewport/screen.ts#L17)

___

### name

• **name**: `string`

A name that identifies the screen size (e.g. 'sm', 'md', 'lg', ...).

#### Defined in

[viewport/screen.ts:21](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/viewport/screen.ts#L21)

___

### threshold

• **threshold**: `number`

A value in pixel.

#### Defined in

[viewport/screen.ts:19](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/viewport/screen.ts#L19)
