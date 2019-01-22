**Elementary**

A simple anchor button.

```jsx
const { Button } = require('precise-ui');

<Button href="#🍕">Click me</Button>
```

Custom interaction after clicking the button.

```jsx
const { Button } = require('precise-ui');

<Button onClick={() => alert('Hi')}>Click me</Button>
```

**Button Styles**

There are two types of buttons with their own color themes: `primary` (default) and `secondary`.

```jsx
const { Button } = require('precise-ui');

<div>
  <div>
    <Button>Default</Button>
    <Button buttonStyle="primary">Primary</Button>
    <Button buttonStyle="secondary">Secondary</Button>
  </div>
</div>

```

Button size could be changed with help of `size` property. The following example demonstrates small buttons.

```jsx
const { Button } = require('precise-ui');

  <div>
    <Button size='small' buttonStyle="primary">Primary</Button>
    <Button size='small' buttonStyle="secondary">Secondary</Button>
  </div>
```

With icons on either position.

```jsx
const { Button } = require('precise-ui');

<div>
  <Button href="#🍕" icon="Close" theme={{ buttonIconPosition: 'left'}} buttonStyle='secondary'>Abort</Button>
  <Button href="#🍕" icon="Check">Accept</Button>
  <Button href="#🍕" icon="Check" size="small">Accept small</Button>
</div>
```
