**Elementary**

Default Container behaviour is fluid, with 100% occupation of its parent's width.

```jsx
const { Container, StackPanel, StackItem } = require('precise-ui');
const style = { background: 'gray', padding: '5px', margin: '5px' };

<Container>
  <StackPanel>
    <StackItem style={style}>First</StackItem>
    <StackItem style={style}>Second</StackItem>
    <StackItem style={style}>Third</StackItem>
  </StackPanel>
</Container>
```

**Appareance Options**

By defining container's maximum width, container stops being fluid and becomes defined with the maximum available width. By default, the container is centered.

```jsx
const { Container, StackPanel, StackItem } = require('precise-ui');
const style = { background: 'gray', padding: '5px', margin: '5px' };

<Container maxWidth={200}>
  <StackPanel>
    <StackItem style={style}>First</StackItem>
    <StackItem style={style}>Second</StackItem>
    <StackItem style={style}>Third</StackItem>
  </StackPanel>
</Container>
```

There is also a possibility of changing the alignment by passing `align` property. Containers can be aligned `left`, `right` or `center`.

```jsx
const { Container, StackPanel, StackItem } = require('precise-ui');
const style = { background: 'gray', padding: '5px', margin: '5px' };

<Container maxWidth={200} align="left">
  <StackPanel>
    <StackItem style={style}>First</StackItem>
    <StackItem style={style}>Second</StackItem>
    <StackItem style={style}>Third</StackItem>
  </StackPanel>
</Container>
```
