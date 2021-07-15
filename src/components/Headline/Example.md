**Elementary**

Simplest example of `Headline` component will render the default h3 tag.

```jsx
import { Headline } from 'precise-ui';

<Headline>h3 headline</Headline>
```

**Semantics**

Component is supporting levels from 1-5, setting the `level` property will set the corresponding html tag:

```jsx
import { Headline } from 'precise-ui';

<Headline level={2}>h2 headline</Headline>
```

Headline could also be used as subheader by passing subheader flag.

```jsx
import { Headline } from 'precise-ui';

<div>
  <Headline>Adipisicing dolore ut sit dolor.</Headline>
  <Headline level={4} subheader>Commodo nulla officia</Headline>
</div>
```

**Presentation Options**

Headlines are responsive by nature: they adjust font-size and line-height depending on screen size.

```jsx
import { Headline } from 'precise-ui';

<div>
  <Headline level={1}>h1 headline</Headline>
  <Headline level={2}>h2 headline</Headline>
  <Headline level={3}>h3 headline</Headline>
  <Headline level={4}>h4 headline</Headline>
  <Headline level={5}>h5 headline</Headline>
</div>
```
