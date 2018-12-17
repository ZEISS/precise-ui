We can use the (default) auto placement to just show a simple tooltip on its ideal position. The component supports two modes - managed and controlled. By default, the managed mode is selected.

```jsx
const { Tooltip, Avatar } = require('precise-ui');

<Tooltip content={'Tooltip content'}>
  <Avatar initials="R" description="Sample" size="x-small" />
</Tooltip>
```
