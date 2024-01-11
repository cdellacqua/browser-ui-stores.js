[browser-ui-stores](../README.md) / MakeScreenSizeStoreParams

# Interface: MakeScreenSizeStoreParams

## Table of contents

### Properties

- [dimension](MakeScreenSizeStoreParams.md#dimension)
- [names](MakeScreenSizeStoreParams.md#names)
- [passive](MakeScreenSizeStoreParams.md#passive)
- [strategy](MakeScreenSizeStoreParams.md#strategy)
- [thresholds](MakeScreenSizeStoreParams.md#thresholds)

## Properties

### dimension

• `Optional` **dimension**: ``"height"`` \| ``"width"``

(optional, default 'width') Determines which dimension should be compared to the thresholds, the width or the height of the viewport.

#### Defined in

[src/lib/viewport/screen.ts:30](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/viewport/screen.ts#L30)

___

### names

• `Optional` **names**: `string`[]

(optional) A list of names identifying the possible screen sizes and that will be associated to the thresholds.

#### Defined in

[src/lib/viewport/screen.ts:26](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/viewport/screen.ts#L26)

___

### passive

• `Optional` **passive**: `boolean`

(optional, default false) Determines if the store should be updated immediately or if it can use a passive event listener.

#### Defined in

[src/lib/viewport/screen.ts:34](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/viewport/screen.ts#L34)

___

### strategy

• `Optional` **strategy**: ``"max"`` \| ``"min"``

(optional, default 'min') Determines if the thresholds describe the starting or the ending point of the screen size.

#### Defined in

[src/lib/viewport/screen.ts:32](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/viewport/screen.ts#L32)

___

### thresholds

• **thresholds**: `number`[]

A list of thresholds that will be used to determine the current screen size.

#### Defined in

[src/lib/viewport/screen.ts:28](https://github.com/cdellacqua/browser-ui-stores.js/blob/main/src/lib/viewport/screen.ts#L28)
