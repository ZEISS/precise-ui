**Elementary**

A simple call to action link:

```jsx
const { ActionLink } = require('precise-ui');

<ActionLink href="#🍕">Click me</ActionLink>
```

Custom interaction after clicking the link.

```jsx
const { ActionLink } = require('precise-ui');

<ActionLink onClick={() => alert('Hi')}>Click me</ActionLink>
```

**Decoration Options**

This is a disabled action link:

```jsx
const { ActionLink } = require('precise-ui');

<ActionLink disabled href="#🍕">Click me</ActionLink>
```
