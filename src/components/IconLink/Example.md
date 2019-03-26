**Elementary**

A simple navigation example.

```jsx
const { IconLink } = require('precise-ui');

<IconLink icon="Add" href="#🎩" />
```

Component could be used for user click interactions.

```jsx
const { IconLink } = require('precise-ui');

<IconLink icon="Favorite" onClick={() => alert('Saved!')}>Save to favorites</IconLink>
```

The following example shows how `IconLink` could be displayed in a `block` mode and how to disable it.

```jsx
const { IconLink } = require('precise-ui');

<div>
  This link is <IconLink block icon="Cached">Refresh</IconLink> displayed as a block and this is <IconLink disabled icon="VisibilityOff">disabled</IconLink>
</div>
```
