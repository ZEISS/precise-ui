**Elementary**

Simplest example of `Headline` component will render the default h3 tag.

```jsx
const { Headline } = require('precise-ui');

<Headline>h3 headline</Headline>
```

**Semantics**

Component is supporting levels from 1-6, setting the `level` property will set the corresponding html tag:

```jsx
const { Headline } = require('precise-ui');

<Headline level={2}>h2 headline</Headline>
```

Headline could also be used as subheader by passing subheader flag.

```jsx
const { Headline } = require('precise-ui');

<div>
  <Headline>Adipisicing dolore ut sit dolor.</Headline>
  <Headline level={4} subheader>Commodo nulla officia</Headline>
</div>
```

**Presentation Options**

Headlines are responsive by nature: they adjust font-size and line-height depending on screen size.

```jsx
const { Headline }= require('precise-ui');

<div>
  <Headline level={1}>h1 headline</Headline>
  <Headline level={2}>h2 headline</Headline>
  <Headline level={3}>h3 headline</Headline>
  <Headline level={4}>h4 headline</Headline>
  <Headline level={5}>h5 headline</Headline>
  <Headline level={6}>h6 headline</Headline>
</div>
```