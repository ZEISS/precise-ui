**Elementary**

The `Badge` component is a rather simple component for displaying simple number-based pieces of information in a highlighting manner.

```jsx
const { Badge } = require('precise-ui');

<Badge>12</Badge>
```

**With Avatar**

Such badges can also play nicely together with the `Avatar` if set to `fill` mode.

```jsx
const { Avatar, Badge } = require('precise-ui');

<Avatar initials="FR" description="Sample" size="x-large"><Badge fill theme={{ badgecolor: 'red' }}>1</Badge></Avatar>
```
