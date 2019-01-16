Besides the types mentioned specifically for the components a set of generic types exist, which may be very useful to know.

| Type               | Description                                                                                      |
| ------------------ | ------------------------------------------------------------------------------------------------ |
| `CSSProperties`    | A standard object consisting of camelCased CSS property names with their values as pure strings. |
| `ReactChild`       | Either a single React element, a `string`, or a `number`.                                        |
| `ReactNode`        | Either a `ReactChild`, `null`, `undefined`, a boolean, or an array of the former.                |
| `PreciseTheme`     | An object defining all properties to be used consistently for styling purposes.                  |
| `StandardProps`    | Defines a set of shared props used by all Precise components.                                    |
| `InputProps`       | Extends the standard props to a circle of props used by all Precise UI input components.         |
| `InputChangeEvent` | The common shape of all `onChange` events emitted by Precise UI input components.                |

The `RgbaColor` interface is defined as follows:

```ts
interface RgbaColor {
  // The red part of the color.
  r: number;
  // The green part of the color.
  g: number;
  // The blue part of the color.
  b: number;
  // The optional alpha part of the color - by default 1.
  a?: number;
}
```

The `DashboardTile` is defined as follows:

```ts
interface DashboardTile {
  // The unique id of the tile.
  id: string;
  // The initial column for the tile.
  column?: number;
  // The initial row for the tile.
  row?: number;
  // The number of columns to use.
  colSpan?: number;
  // The number of rows to use.
  rowSpan?: number;
}
```

The `DropdownItem` is defined as follows.

```ts
interface DropdownItem {
  // The unique string.
  key: string;
  // The content to be used for display (otherwise key is used).
  content?: React.ReactChild;
  // The search text to be preferred for searching text (otherwise content then key is used).
  searchText?: string;
  // The type of the item (by default 'item').
  type?: 'item' | 'divider' | 'header';
}
```
