**Elementary**

Using the stack panel with the default options.

```jsx
const { StackPanel, StackItem } = require('precise-ui');
const style = { background: 'gray', padding: '5px', margin: '5px' };

<StackPanel>
  <StackItem style={style}>First</StackItem>
  <StackItem style={style}>Second</StackItem>
  <StackItem style={style}>Third</StackItem>
</StackPanel>
```

**Presentational Options**

The widths of the boxes can be varied with an optional wrapping option to prevent some overflow. Note that the given layout is already responsive by nature.

```jsx
const { StackPanel, StackItem } = require('precise-ui');
const style = { background: 'gray', padding: '5px', margin: '5px' };

<StackPanel wrap>
  <StackItem width="440px" style={style}>First</StackItem>
  <StackItem width="300px" style={style}>Second</StackItem>
  <StackItem width="40%" style={style}>Third</StackItem>
</StackPanel>
```

The row is not necessarily filled up. We can tell individual items to not fill (i.e., divide) the remaining space. If all items are set to `nofill` then the remaining space will be left unused.

```jsx
const { StackPanel, StackItem } = require('precise-ui');
const style = { background: 'gray', padding: '5px', margin: '5px' };

<StackPanel>
  <StackItem width="100px" nofill style={style}>First</StackItem>
  <StackItem width="100px" nofill style={style}>Second</StackItem>
</StackPanel>
```

The stack panel can also be used to create flexible layouts. For instance, the following example uses a top-down layout.

```jsx
const { StackPanel, StackItem } = require('precise-ui');
const style = { background: 'gray', padding: '5px', margin: '5px' };

<StackPanel direction="top" style={{ height: '400px' }}>
  <StackItem height="20%" style={style}>First</StackItem>
  <StackItem height="60%" style={style}>Second</StackItem>
  <StackItem height="20%" style={style}>Third</StackItem>
</StackPanel>
```
