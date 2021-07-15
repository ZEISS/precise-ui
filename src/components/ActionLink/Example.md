**Elementary**

A simple call to action link:

```jsx
import { ActionLink } from 'precise-ui';

<ActionLink href="#🍕">Click me</ActionLink>
```

Custom interaction after clicking the link.

```jsx
import { ActionLink } from 'precise-ui';

<ActionLink onClick={() => alert('Hi')}>Click me</ActionLink>
```

**Decoration Options**

This is a disabled action link:

```jsx
import { ActionLink } from 'precise-ui';

<ActionLink disabled href="#🍕">Click me</ActionLink>
```
