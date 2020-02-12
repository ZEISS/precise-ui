**Elementary**

A simple navigation example.

```jsx
import { IconLink } from 'precise-ui';

<IconLink icon="Add" href="#🎩" />
```

Component could be used for user click interactions.

```jsx
import { IconLink } from 'precise-ui';

<IconLink icon="Favorite" onClick={() => alert('Saved!')}>Save to favorites</IconLink>
```

The following example shows how `IconLink` could be displayed in a `block` mode and how to disable it.

```jsx
import { IconLink } from 'precise-ui';

<div>
  This link is <IconLink block icon="Cached">Refresh</IconLink> displayed as a block and this is <IconLink disabled icon="VisibilityOff">disabled</IconLink>
</div>
```
