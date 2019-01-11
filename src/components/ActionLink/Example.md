A simple call to Action Link:

```jsx
const { ActionLink } = require('precise-ui');

<ActionLink href="#🍕">Click me</ActionLink>
```

This is a disabled Action Link:

```jsx
const { ActionLink } = require('precise-ui');

<ActionLink disabled href="#🍕">Click me</ActionLink>
```

Custom interaction after clicking the link.

```jsx
const { ActionLink } = require('precise-ui');

<ActionLink onClick={() => alert('Hi')}>Click me</ActionLink>
```
