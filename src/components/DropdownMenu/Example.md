**Elementary**

A simple dropdown menu for displaying menu items.

```jsx
const { DropdownMenu } = require('precise-ui');

<DropdownMenu icon="Favorite" text="Menu" items={['One', 'Two', 'Three']} />
```

You can add `InteractiveListItem` objects.

```jsx
const { DropdownMenu } = require('precise-ui');

<DropdownMenu icon="Menu" text="Menu" items={[
  {
    key: 'One',
    content: <Anchor href="#">One</Anchor>,
  },
  {
    key: 'Two',
    content: <Anchor href="#">Two</Anchor>,
  },
  {
    key: 'Three',
    content: <Anchor href="#">Three</Anchor>,
  }]} />
```
