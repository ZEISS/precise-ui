**Elementary**

The `OverflowMenu` provides a simple button hosting a fylout menu with some options.

```jsx
const { OverflowMenu } = require('precise-ui');

<OverflowMenu
  items={[
    "First",
    "Second",
    "Third",
  ]}
  />
```

**Decoration Options**

The button can be freely chosen. Furthermore, the props passed on the flyout and interactive list can be changed as well.

```jsx
const { OverflowMenu, IconLink } = require('precise-ui');

<OverflowMenu
  button={<IconLink icon="MoreVert" />}
  items={[
    "First",
    "Second",
    "Third",
  ]}
  />
```
