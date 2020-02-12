**Elementary**

A simple anchor button.

```jsx
import { Button } from 'precise-ui';

<Button href="#🍕">Click me</Button>
```

Custom interaction after clicking the button.

```jsx
import { Button } from 'precise-ui';

<Button onClick={() => alert('Hi')}>Click me</Button>
```

**Button Styles**

There are two types of buttons with their own color themes: `primary` (default) and `secondary`.

```jsx
import { Button } from 'precise-ui';

<div>
    <Button>Default</Button>
    <Button buttonStyle="primary">Primary</Button>
    <Button buttonStyle="secondary">Secondary</Button>
</div>

```

Button size could be changed with help of `size` property. The following example demonstrates small buttons.

```jsx
import { Button } from 'precise-ui';

<div>
    <Button size='small' buttonStyle="primary">Primary</Button>
    <Button size='small' buttonStyle="secondary">Secondary</Button>
</div>
```

With icons on either position.

```jsx
import { Button } from 'precise-ui';

<div>
  <Button href="#🍕" icon="Close" theme={{ buttonIconPosition: 'left'}} buttonStyle='secondary'>Abort</Button>
  <Button href="#🍕" icon="Check">Accept</Button>
  <Button href="#🍕" icon="Check" size="small">Accept small</Button>
</div>
```
