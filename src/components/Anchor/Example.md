**Elementary**

The `Anchor` is a generic component that can be used for routing purposes. It is unstyled and waits to be themed.

```jsx
import { Anchor } from 'precise-ui';

<Anchor href="https://google.com" target="_blank">Google</Anchor>
```

Or any other allowed HTML element via its tag name.

```jsx
import { Anchor } from 'precise-ui';

<Anchor tagName="button" to="/foo">Navigate to foo</Anchor>
```

**Internal Routes**

In conjunction with the React router a `to` is supported.

```jsx
import { Anchor } from 'precise-ui';

<Anchor to="/foo">Navigate to foo</Anchor>
```
