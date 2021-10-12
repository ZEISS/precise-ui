**Elementary**

We can use the (default) auto placement to just show a simple tooltip on its ideal position. The component supports two modes - managed and controlled. By default, the managed mode is selected.

```jsx
const { Tooltip, Avatar } = require('precise-ui');

<Tooltip content="Tooltip content">
  <Avatar initials="R" description="Sample" size="x-small" />
</Tooltip>
```

The tooltip needs to wrap the content for which it needs to present some content. This pattern ensures the autoplacement and managed mode (on hover) is applied correctly.

**Styled**

We can use `styled()` wrapper to customize Tooltip appearance

```jsx
const { styled, Tooltip, Avatar } = require('precise-ui');

const StyledTooltip = styled(Tooltip)`
  min-width: 350px;
  display: flex;
  justify-content: center;
}`;

<StyledTooltip content="Tooltip content" position="right">
  <Avatar initials="R" description="Sample" size="x-small" />
</StyledTooltip>
```
